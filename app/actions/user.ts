'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getUsers() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('User')
      .select('*, department:Department(*)')
      .order('createdAt', { ascending: false });
    
    if (error) {
      console.error('[Supabase Error] getUsers:', error);
      throw error;
    }
    return data;
  }

  return prisma.user.findMany({
    include: { department: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function getUserStats() {
  if (isSupabaseConfigured()) {
    const [totalRes, activeRes, onboardingRes] = await Promise.all([
      supabaseAdmin.from('User').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('User').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabaseAdmin.from('User').select('*', { count: 'exact', head: true }).eq('status', 'onboarding')
    ]);

    return {
      total: totalRes.count || 0,
      active: activeRes.count || 0,
      onboarding: onboardingRes.count || 0,
      pendingHR: onboardingRes.count || 0
    };
  }

  const total = await prisma.user.count()
  const active = await prisma.user.count({ where: { status: 'active' } })
  const onboarding = await prisma.user.count({ where: { status: 'onboarding' } })
  const pendingHR = await prisma.user.count({ where: { status: 'onboarding' } })
  return { total, active, onboarding, pendingHR }
}

export async function createUser(data: {
  name: string
  email: string
  phone?: string
  title?: string
  role?: string
  department?: string
  teamName?: string
}) {
  let departmentId: string | undefined = undefined

  if (isSupabaseConfigured()) {
    if (data.department) {
      const { data: dept } = await supabaseAdmin
        .from('Department')
        .select('id')
        .ilike('name', `%${data.department}%`)
        .single();
      if (dept) departmentId = dept.id;
    }

    const { data: user, error } = await supabaseAdmin
      .from('User')
      .insert({
        email: data.email,
        name: data.name,
        phone: data.phone || '',
        role: data.role || 'employee',
        title: data.title || (data.department ? `${data.department} Employee` : 'Employee'),
        teamName: data.teamName || '',
        departmentId: departmentId || null,
        status: 'onboarding'
      })
      .select()
      .single();

    if (error) throw error;
    revalidatePath('/admin')
    revalidatePath('/hr')
    return user;
  }

  if (data.department) {
    const dept = await prisma.department.findFirst({
      where: { name: { contains: data.department } }
    })
    departmentId = dept?.id ?? undefined
  }

  const user = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      phone: data.phone || '',
      role: data.role || 'employee',
      title: data.title || (data.department ? `${data.department} Employee` : 'Employee'),
      teamName: data.teamName || '',
      departmentId,
      status: 'onboarding',
    }
  })

  revalidatePath('/admin')
  revalidatePath('/hr')
  return user
}

export async function getUserById(id: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('User')
      .select('*, department:Department(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('[Supabase Error] getUserById:', error);
      return null;
    }
    return data;
  }

  return prisma.user.findUnique({
    where: { id },
    include: { department: true }
  })
}

export async function approveUser(id: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('User')
      .update({ status: 'active' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/hr')
    revalidatePath('/ceo')
    return data;
  }

  const user = await prisma.user.update({
    where: { id },
    data: { status: 'active' }
  })
  revalidatePath('/hr')
  revalidatePath('/ceo')
  return user
}

export async function assignUserToTeam(id: string, teamName: string, project?: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('User')
      .update({ teamName, status: 'active' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/ceo')
    revalidatePath('/tl')
    return data;
  }

  const user = await prisma.user.update({
    where: { id },
    data: { teamName: teamName, status: 'active' }
  })
  revalidatePath('/ceo')
  revalidatePath('/tl')
  return user
}

export async function rejectUser(id: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('User')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/hr')
    return data;
  }

  const user = await prisma.user.update({
    where: { id },
    data: { status: 'rejected' }
  })
  revalidatePath('/hr')
  return user
}
