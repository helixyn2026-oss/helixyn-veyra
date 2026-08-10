import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { 
  createOfferDraft, 
  signAndSendOffer, 
  acceptOffer, 
  assignProjectAndProvisionGitHub 
} from '@/app/actions/workflow';

export const dynamic = 'force-dynamic';

export async function GET() {
  const logs: string[] = [];
  const log = (msg: string) => {
    console.log(msg);
    logs.push(msg);
  };

  log('🧪 Starting End-to-End Workflow Test...');
  
  try {
    let project = await prisma.project.findFirst();
    if (!project) {
      project = await prisma.project.create({
        data: {
          name: 'Test Project Alpha',
          budget: '$1M',
          teamName: 'Alpha Team',
          status: 'on-track'
        }
      });
      log('✅ Created mock project for assignment');
    }

    log('⏳ 1. Testing HR Draft Creation...');
    const candidateEmail = `test.candidate.${Date.now()}@example.com`;
    const draft = await createOfferDraft({
      candidateName: 'Test Candidate',
      candidateEmail: candidateEmail,
      role: 'Test Engineer',
      salaryBand: '$100k - $120k',
      joiningDate: '2026-09-01'
    });
    
    if (draft.status !== 'PENDING_SIGNATURE') throw new Error('Draft status should be PENDING_SIGNATURE');
    if (!draft.signatureOtp) throw new Error('OTP was not generated');
    log(`✅ Draft created successfully with OTP: ${draft.signatureOtp}`);

    log('⏳ 2. Testing HR Digital Signature (OTP Verification)...');
    try {
      await signAndSendOffer(draft.id, '000000');
      throw new Error('Should have failed with wrong OTP');
    } catch (e: any) {
      if (!e.message.includes('Invalid Digital Signature OTP')) {
        throw e;
      }
      log('✅ Correctly rejected invalid OTP');
    }

    const signedDraft = await signAndSendOffer(draft.id, draft.signatureOtp);
    if (signedDraft.status !== 'APPROVED') throw new Error('Draft status should be APPROVED');
    if (signedDraft.signatureOtp !== null) throw new Error('OTP should be cleared after signing');
    log('✅ Offer signed and sent successfully');

    log('⏳ 3. Testing Candidate Offer Acceptance...');
    const employee = await acceptOffer(signedDraft.acceptanceToken);
    
    if (employee.status !== 'ONBOARDING') throw new Error('Employee status should be ONBOARDING');
    if (employee.email !== candidateEmail) throw new Error('Email mismatch');
    if (!employee.companyEmail?.includes('testcandidate@helixyn.com')) throw new Error('Company email not generated correctly');
    log(`✅ Candidate accepted! User created with ID: ${employee.id}`);

    log('⏳ 4. Testing TL Project Assignment & GitHub Provisioning...');
    const activeEmployee = await assignProjectAndProvisionGitHub(employee.id, project.id);
    
    if (activeEmployee.status !== 'ACTIVE') throw new Error('Employee status should be ACTIVE');
    if (activeEmployee.projectId !== project.id) throw new Error('Project ID mismatch');
    log('✅ Project assigned and GitHub simulated successfully!');

    log('⏳ 5. Verifying Audit Trail...');
    const dbLogs = await prisma.auditLog.findMany({
      where: { details: { contains: 'Test Candidate' } },
      orderBy: { createdAt: 'asc' }
    });
    
    if (dbLogs.length === 0) throw new Error('Audit logs missing');
    log(`✅ Audit trail verified (${dbLogs.length} related events found)`);

    log('🎉 ALL WORKFLOW TESTS PASSED SUCCESSFULLY! 🎉');

    return NextResponse.json({ success: true, logs });

  } catch (error: any) {
    log(`❌ TEST FAILED: ${error.message}`);
    return NextResponse.json({ success: false, logs, error: error.message }, { status: 500 });
  }
}
