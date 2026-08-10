'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getProjects() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Project')
      .select('*')
      .order('createdAt', { ascending: false });
    
    if (error) {
      console.error('[Supabase Error] getProjects:', error);
      throw error;
    }
    return data;
  }

  return prisma.project.findMany({
    orderBy: { createdAt: 'desc' }
  });
}

export async function createProject(data: any) {
  if (isSupabaseConfigured()) {
    const { data: proj, error } = await supabaseAdmin
      .from('Project')
      .insert({
        name: data.name,
        status: data.status || 'on-track',
        progress: data.progress || 0,
        budget: data.budget?.toString() || '0',
        teamName: data.teamName || 'Unassigned'
      })
      .select()
      .single();
    
    if (error) throw error;
    return proj;
  }

  return prisma.project.create({
    data: {
      name: data.name,
      status: data.status || 'on-track',
      progress: data.progress || 0,
      budget: data.budget?.toString() || '0',
      teamName: data.teamName || 'Unassigned'
    }
  });
}

export async function getProjectStats() {
  if (isSupabaseConfigured()) {
    const [activeRes, totalRes] = await Promise.all([
      supabaseAdmin.from('Project').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabaseAdmin.from('Project').select('*', { count: 'exact', head: true })
    ]);

    return {
      active: activeRes.count || 0,
      total: totalRes.count || 0
    };
  }

  const active = await prisma.project.count({ where: { status: 'active' } })
  const total = await prisma.project.count()
  return { active, total }
}
