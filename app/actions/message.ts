'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getMessages(channel: string = 'direct') {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Message')
      .select('*, sender:User(*)')
      .eq('channel', channel)
      .order('createdAt', { ascending: true });
    
    if (error) {
      console.error('[Supabase Error] getMessages:', error);
      throw error;
    }
    return data;
  }

  return prisma.message.findMany({
    where: { channel },
    include: { sender: true },
    orderBy: { createdAt: 'asc' }
  });
}

export async function sendMessage(data: {
  content: string
  senderId: string
  channel?: string
}) {
  if (!data.content?.trim()) throw new Error('Message cannot be empty')
  if (!data.senderId) throw new Error('Sender ID required')

  if (isSupabaseConfigured()) {
    // Verify sender
    const { data: sender } = await supabaseAdmin
      .from('User')
      .select('id')
      .eq('id', data.senderId)
      .single();
    if (!sender) throw new Error('Sender not found');

    const { data: msg, error } = await supabaseAdmin
      .from('Message')
      .insert({
        content: data.content.trim(),
        senderId: data.senderId,
        channel: data.channel || 'direct'
      })
      .select('*, sender:User(*)')
      .single();
    
    if (error) throw error;
    revalidatePath('/employee/messages')
    revalidatePath('/hr/messages')
    return msg;
  }

  const sender = await prisma.user.findUnique({ where: { id: data.senderId } })
  if (!sender) throw new Error('Sender not found')

  const message = await prisma.message.create({
    data: {
      content: data.content.trim(),
      senderId: data.senderId,
      channel: data.channel || 'direct'
    },
    include: { sender: true }
  })

  revalidatePath('/employee/messages')
  revalidatePath('/hr/messages')
  return message
}
