'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getStandups() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Standup')
      .select('*, user:User(*)')
      .order('createdAt', { ascending: false });
    
    if (error) {
      console.error('[Supabase Error] getStandups:', error);
      throw error;
    }
    return data;
  }

  return prisma.standup.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function submitStandup(data: {
  userId: string
  yesterday: string
  today: string
  blockers: string
}) {
  if (isSupabaseConfigured()) {
    // Verify user exists
    const { data: user } = await supabaseAdmin
      .from('User')
      .select('id')
      .eq('id', data.userId)
      .single();
    if (!user) throw new Error('User not found');

    const { data: standup, error } = await supabaseAdmin
      .from('Standup')
      .insert({
        userId: data.userId,
        yesterday: data.yesterday,
        today: data.today,
        blockers: data.blockers || ''
      })
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/tl/standups')
    return standup;
  }

  const user = await prisma.user.findUnique({ where: { id: data.userId } })
  if (!user) {
    throw new Error('User not found')
  }

  const standup = await prisma.standup.create({
    data: {
      userId: data.userId,
      yesterday: data.yesterday,
      today: data.today,
      blockers: data.blockers || ''
    }
  })
  revalidatePath('/tl/standups')
  return standup
}
