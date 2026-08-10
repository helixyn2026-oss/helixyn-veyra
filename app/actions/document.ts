'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getDocuments() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Document')
      .select('*, user:User(*)')
      .order('createdAt', { ascending: false });
    
    if (error) {
      console.error('[Supabase Error] getDocuments:', error);
      throw error;
    }
    return data;
  }

  return prisma.document.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function uploadDocument(data: {
  name: string
  type: string
  status?: string
  userId?: string
}) {
  if (isSupabaseConfigured()) {
    const { data: doc, error } = await supabaseAdmin
      .from('Document')
      .insert({
        name: data.name,
        type: data.type,
        status: data.status || 'pending',
        userId: data.userId || null
      })
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/hr/documents')
    return doc;
  }

  const doc = await prisma.document.create({
    data: {
      name: data.name,
      type: data.type,
      status: data.status || 'pending',
      userId: data.userId || undefined
    }
  })
  revalidatePath('/hr/documents')
  return doc
}

export async function verifyDocument(id: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Document')
      .update({ status: 'verified' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/hr/documents')
    return data;
  }

  const doc = await prisma.document.update({
    where: { id },
    data: { status: 'verified' }
  })
  revalidatePath('/hr/documents')
  return doc
}
