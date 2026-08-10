import { prisma } from '@/lib/db';
import HRDashboardClient from './hr-dashboard-client';

export default async function HRDashboard() {
  const drafts = await prisma.offerDraft.findMany({
    orderBy: { createdAt: 'desc' }
  });

  return <HRDashboardClient drafts={drafts} />;
}
