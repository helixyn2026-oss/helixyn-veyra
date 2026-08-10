'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { generateOfferLetterPDF } from '@/lib/pdf-generator'
import { sendOfferLetterEmail, sendWelcomeEmail, sendSignatureOtpEmail } from '@/lib/email-service'
import { getCurrentUser } from '@/app/actions/auth'
import fs from 'fs'
import path from 'path'

// Notifications helper
export async function createNotification(userId: string | null, role: string | null, title: string, message: string) {
  const notif = await prisma.notification.create({
    data: {
      userId,
      role,
      title,
      message,
      read: false
    }
  })
  return notif
}

export async function getNotifications(userId: string | undefined, role: string | undefined) {
  return await prisma.notification.findMany({
    where: {
      OR: [
        { userId: userId },
        { role: role }
      ]
    },
    orderBy: { createdAt: 'desc' }
  });
}

export async function markNotificationRead(id: string) {
  return await prisma.notification.update({
    where: { id },
    data: { read: true }
  });
}

export async function markAllNotificationsRead(userId: string | undefined, role: string | undefined) {
  return await prisma.notification.updateMany({
    where: {
      OR: [
        { userId: userId },
        { role: role }
      ]
    },
    data: { read: true }
  });
}

// Audit Log Helper
export async function logAuditEvent(action: string, actor: string, details: string) {
  await prisma.auditLog.create({
    data: {
      action,
      actor,
      details
    }
  })
}

// 1. Offer Letter Draft & OTP Generation
export async function createOfferDraft(data: {
  candidateName: string;
  candidateEmail: string;
  role: string;
  salaryBand: string;
  joiningDate: string;
}) {
  const currentUser = await getCurrentUser();
  const hrEmail = currentUser?.email || 'hr@helixyn.com';
  
  // Generate 6 digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const draft = await prisma.offerDraft.create({
    data: {
      ...data,
      status: 'PENDING_SIGNATURE',
      signatureOtp: otp,
      approverRole: 'hr' 
    }
  });

  await logAuditEvent('DRAFT_CREATED', 'HR', `Offer drafted for ${data.candidateName}. Waiting for digital signature.`);
  
  // Send OTP to HR
  await sendSignatureOtpEmail(hrEmail, otp, data.candidateName);
  
  revalidatePath('/hr');
  return draft;
}

// 2. HR Digital Signature (OTP Verification & Send)
export async function signAndSendOffer(draftId: string, providedOtp: string) {
  const draft = await prisma.offerDraft.findUnique({
    where: { id: draftId }
  });

  if (!draft || draft.status !== 'PENDING_SIGNATURE') {
    throw new Error('Draft not found or not pending signature.');
  }

  if (draft.signatureOtp !== providedOtp) {
    throw new Error('Invalid Digital Signature OTP.');
  }

  const updatedDraft = await prisma.offerDraft.update({
    where: { id: draftId },
    data: { 
      status: 'APPROVED',
      signatureOtp: null // Clear OTP after use
    }
  });

  // Generate PDF
  let pdfUrl = '';
  try {
    const publicDir = path.join(process.cwd(), 'public', 'offer-letters')
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true })
    }
    const pdfBuffer = await generateOfferLetterPDF(updatedDraft.candidateName, updatedDraft.role, updatedDraft.salaryBand, updatedDraft.joiningDate)
    const pdfFileName = `offer-${updatedDraft.id}.pdf`
    fs.writeFileSync(path.join(publicDir, pdfFileName), pdfBuffer)
    pdfUrl = `/offer-letters/${pdfFileName}`
  } catch (e) {
    console.error('[PDF ERROR] Failed to write offer letter document:', e)
  }

  // Generate Acceptance Link
  const acceptanceLink = `http://localhost:3000/accept-offer/${updatedDraft.acceptanceToken}`;

  await sendOfferLetterEmail(updatedDraft.candidateEmail, updatedDraft.candidateName, pdfUrl, acceptanceLink);
  await logAuditEvent('OFFER_APPROVED', 'HR', `Offer digitally signed with OTP and sent to ${updatedDraft.candidateEmail}`);
  
  revalidatePath('/hr');
  return updatedDraft;
}

// 4 & 5 & 6. Candidate Acceptance & Credential Issue & TL Notification
export async function acceptOffer(token: string) {
  const draft = await prisma.offerDraft.findUnique({
    where: { acceptanceToken: token }
  });

  if (!draft || draft.status !== 'APPROVED') {
    throw new Error('Invalid or expired offer token.');
  }

  // Update draft to ACCEPTED
  await prisma.offerDraft.update({
    where: { id: draft.id },
    data: { status: 'ACCEPTED' }
  });

  // Generate Credentials
  const sanitizedName = draft.candidateName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const companyEmail = `${sanitizedName}@helixyn.com`;
  const password = `Welcome${new Date().getFullYear()}!${Math.floor(100 + Math.random() * 900)}`;

  // Create real User record
  const user = await prisma.user.create({
    data: {
      name: draft.candidateName,
      email: draft.candidateEmail,
      companyEmail,
      password, // In real app, hash this
      role: 'employee',
      title: draft.role,
      status: 'ONBOARDING', // Status waiting for TL assignment
      forcePasswordReset: true
    }
  });

  await logAuditEvent('OFFER_ACCEPTED', draft.candidateName, `Candidate accepted offer and User record created.`);
  await logAuditEvent('CREDENTIALS_ISSUED', 'System', `Credentials issued to ${draft.candidateEmail}`);

  // Send Credentials
  try {
    await sendWelcomeEmail(draft.candidateEmail, draft.candidateName, companyEmail, password);
  } catch (e) {
    console.error('[EMAIL ERROR] Failed to dispatch welcome credentials:', e);
  }

  // Notify TL & CEO
  await createNotification(null, 'tl', 'New Employee Joined', `${user.name} has accepted their offer and needs project assignment.`);
  await createNotification(null, 'ceo', 'New Employee Hired', `${user.name} has officially accepted the offer for the ${draft.role} position.`);

  revalidatePath('/tl');
  revalidatePath('/ceo');
  return user;
}

// 7 & 8. Project Assignment & GitHub Provisioning
export async function assignProjectAndProvisionGitHub(userId: string, projectId: string) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { 
      projectId: projectId,
      status: 'ACTIVE'
    }
  });

  const project = await prisma.project.findUnique({ where: { id: projectId } });

  // Simulate GitHub Provisioning API Call
  console.log('\\n================================================================');
  console.log('              [GITHUB API SIMULATION] PROVISIONING               ');
  console.log(`User: ${user.name} (${user.companyEmail})`);
  console.log(`Project/Repo: ${project?.name || projectId}`);
  console.log('Action: Added as collaborator with role "developer"');
  console.log('================================================================\n');

  await logAuditEvent('PROJECT_ASSIGNED', 'Tech Lead', `Assigned ${user.name} to project ${project?.name}`);
  await logAuditEvent('GITHUB_PROVISIONED', 'System', `GitHub access provisioned for ${user.name} on ${project?.name}`);

  await createNotification(user.id, null, 'Project Assigned', `You have been assigned to ${project?.name}. GitHub access is provisioned.`);

  revalidatePath('/tl');
  return user;
}
