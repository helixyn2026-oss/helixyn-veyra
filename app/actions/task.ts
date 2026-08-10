'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

export async function getTasks(assigneeId?: string) {
  if (isSupabaseConfigured()) {
    let query = supabaseAdmin
      .from('Task')
      .select('*, assignee:User(*)');
    
    if (assigneeId) {
      query = query.eq('assigneeId', assigneeId);
    }
    
    const { data, error } = await query.order('createdAt', { ascending: false });
    
    if (error) {
      console.error('[Supabase Error] getTasks:', error);
      throw error;
    }
    return data;
  }

  return prisma.task.findMany({
    where: assigneeId ? { assigneeId } : undefined,
    include: { assignee: true },
    orderBy: { createdAt: 'desc' }
  });
}

export async function createTask(data: {
  title: string
  category?: string
  status?: string
  priority?: string
  assigneeId?: string
}) {
  if (isSupabaseConfigured()) {
    const { data: task, error } = await supabaseAdmin
      .from('Task')
      .insert({
        title: data.title,
        status: data.status || 'todo',
        category: data.category || 'General',
        priority: data.priority || 'medium',
        assigneeId: data.assigneeId || null
      })
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/tl/sprints')
    revalidatePath('/employee/tasks')
    return task;
  }

  const task = await prisma.task.create({
    data: {
      title: data.title,
      status: data.status || 'todo',
      category: data.category || 'General',
      priority: data.priority || 'medium',
      assigneeId: data.assigneeId || undefined
    }
  })
  revalidatePath('/tl/sprints')
  revalidatePath('/employee/tasks')
  return task
}

export async function updateTaskStatus(id: string, status: string) {
  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('Task')
      .update({ status })
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    revalidatePath('/tl/sprints')
    revalidatePath('/employee/tasks')
    revalidatePath('/employee')
    return data;
  }

  const task = await prisma.task.update({
    where: { id },
    data: { status }
  })
  revalidatePath('/tl/sprints')
  revalidatePath('/employee/tasks')
  revalidatePath('/employee')
  return task
}
