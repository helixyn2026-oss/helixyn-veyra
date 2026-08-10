'use server'

import { prisma } from '@/lib/db'
import { supabaseAdmin } from '@/lib/supabase-admin'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'

const isSupabaseConfigured = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return url && !url.includes('placeholder-project') && !url.includes('[YOUR-PROJECT-ID]');
};

// Get current logged in user from cookies
export async function getCurrentUser() {
  const cookieStore = await cookies()
  const userId = cookieStore.get('user-id')?.value
  
  if (!userId) return null

  if (isSupabaseConfigured()) {
    const { data, error } = await supabaseAdmin
      .from('User')
      .select('*, department:Department(*)')
      .eq('id', userId)
      .single();
    if (error) {
      console.error('[Supabase Error] getCurrentUser:', error);
      return null;
    }
    return data;
  }

  return prisma.user.findUnique({
    where: { id: userId },
    include: { department: true }
  })
}

// Log in using email & password
export async function loginUser(email: string, password?: string) {
  let user: any = null;

  if (isSupabaseConfigured()) {
    const { data } = await supabaseAdmin
      .from('User')
      .select('*')
      .or(`email.eq.${email},companyEmail.eq.${email}`)
      .maybeSingle();
    user = data;
  } else {
    user = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { companyEmail: email }
        ]
      }
    });
  }

  if (!user) {
    throw new Error('User not found')
  }

  // Simplified password check for development
  if (user.password && password && user.password !== password) {
    throw new Error('Invalid password')
  }

  // Transition from VERIFIED to ONBOARDING if logging in first time
  let finalUser = user
  if (user.status === 'VERIFIED') {
    if (isSupabaseConfigured()) {
      const { data } = await supabaseAdmin
        .from('User')
        .update({ status: 'ONBOARDING' })
        .eq('id', user.id)
        .select()
        .single();
      finalUser = data;

      await supabaseAdmin.from('Task').insert([
        { title: 'Upload Signed Offer Letter', category: 'Compliance', status: 'todo', priority: 'high', assigneeId: user.id },
        { title: 'Complete Profile Information', category: 'General', status: 'todo', priority: 'medium', assigneeId: user.id },
        { title: 'Review Company Policies & Wiki', category: 'Training', status: 'todo', priority: 'low', assigneeId: user.id }
      ]);

      await supabaseAdmin.from('Notification').insert({
        userId: user.id,
        title: 'Welcome to Helixyn!',
        message: 'Your onboarding has officially started. Please check and complete your pending tasks.'
      });
    } else {
      finalUser = await prisma.user.update({
        where: { id: user.id },
        data: { status: 'ONBOARDING' }
      })

      // Create default onboarding tasks
      await prisma.task.createMany({
        data: [
          { title: 'Upload Signed Offer Letter', category: 'Compliance', status: 'todo', priority: 'high', assigneeId: user.id },
          { title: 'Complete Profile Information', category: 'General', status: 'todo', priority: 'medium', assigneeId: user.id },
          { title: 'Review Company Policies & Wiki', category: 'Training', status: 'todo', priority: 'low', assigneeId: user.id }
        ]
      })

      // Create notification
      await prisma.notification.create({
        data: {
          userId: user.id,
          title: 'Welcome to Helixyn!',
          message: 'Your onboarding has officially started. Please check and complete your pending tasks.'
        }
      })
    }
  }

  const cookieStore = await cookies()
  cookieStore.set('user-id', finalUser.id, { path: '/' })
  cookieStore.set('user-role', finalUser.role, { path: '/' })

  return finalUser
}

// Helper to switch roles instantly for testing/onboarding simulation
export async function loginAsRole(role: string, userId?: string) {
  const cookieStore = await cookies()

  if (userId) {
    let user: any = null;
    if (isSupabaseConfigured()) {
      const { data } = await supabaseAdmin.from('User').select('*').eq('id', userId).single();
      user = data;
    } else {
      user = await prisma.user.findUnique({ where: { id: userId } });
    }

    if (user) {
      cookieStore.set('user-id', user.id, { path: '/' })
      cookieStore.set('user-role', user.role, { path: '/' })
      return user
    }
  }

  // Find seeded user for role
  let user: any = null;
  if (isSupabaseConfigured()) {
    const { data } = await supabaseAdmin.from('User').select('*').eq('role', role).limit(1).maybeSingle();
    user = data;
  } else {
    user = await prisma.user.findFirst({ where: { role } });
  }
  
  if (!user) {
    const roleNames: Record<string, string> = {
      admin: 'Administrator',
      hr: 'HR Manager',
      ceo: 'Chief Executive',
      tl: 'Sarah Jenkins',
      employee: 'John Doe'
    }

    if (isSupabaseConfigured()) {
      const { data } = await supabaseAdmin
        .from('User')
        .insert({
          email: `${role}@helixyn.com`,
          name: roleNames[role] || 'User',
          role: role,
          title: role === 'tl' ? 'Team Leader' : role.toUpperCase(),
          status: 'active'
        })
        .select()
        .single();
      user = data;
    } else {
      user = await prisma.user.create({
        data: {
          email: `${role}@helixyn.com`,
          name: roleNames[role] || 'User',
          role: role,
          title: role === 'tl' ? 'Team Leader' : role.toUpperCase(),
          status: 'active'
        }
      })
    }
  }

  cookieStore.set('user-id', user.id, { path: '/' })
  cookieStore.set('user-role', user.role, { path: '/' })
  
  return user
}

// Log out
export async function logoutUser() {
  const cookieStore = await cookies()
  cookieStore.delete('user-id')
  cookieStore.delete('user-role')
}
