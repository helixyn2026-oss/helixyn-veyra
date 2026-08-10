'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getDepartments() {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Department')
      .select('*, users:User(*)')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('[Supabase Error] getDepartments:', error);
      throw error;
    }
    return data;
  }

  return prisma.department.findMany({
    include: { users: true },
    orderBy: { name: 'asc' }
  });
}

export async function createDepartment(data: {
  name: string
  headName: string
  budget: string
}) {
  if (isSupabaseConfigured()) {
    const { data: dept, error } = await supabaseAdmin
      .from('Department')
      .insert({
        name: data.name,
        headName: data.headName,
        budget: data.budget
      })
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/admin/departments')
    return dept;
  }

  const dept = await prisma.department.create({
    data: {
      name: data.name,
      headName: data.headName,
      budget: data.budget
    }
  })
  revalidatePath('/admin/departments')
  return dept
}

export async function getDepartmentById(id: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Department')
      .select('*, users:User(*)')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error('[Supabase Error] getDepartmentById:', error);
      return null;
    }
    return data;
  }

  return prisma.department.findUnique({
    where: { id },
    include: { users: true }
  })
}
