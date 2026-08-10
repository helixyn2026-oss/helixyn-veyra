import { PrismaClient } from '@prisma/client';
import { 
  createOfferDraft, 
  signAndSendOffer, 
  acceptOffer, 
  assignProjectAndProvisionGitHub 
} from '../app/actions/workflow';

const prisma = new PrismaClient();

async function runTests() {
  console.log('🧪 Starting End-to-End Workflow Test...\n');
  
  try {
    // PRE-REQUISITE: Ensure a project exists for assignment
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
      console.log('✅ Created mock project for assignment');
    }

    // STEP 1: HR Creates Draft
    console.log('⏳ 1. Testing HR Draft Creation...');
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
    console.log(`✅ Draft created successfully with OTP: ${draft.signatureOtp}`);

    // STEP 2: HR Signs and Sends Offer
    console.log('⏳ 2. Testing HR Digital Signature (OTP Verification)...');
    
    // Try with wrong OTP first
    try {
      await signAndSendOffer(draft.id, '000000');
      throw new Error('Should have failed with wrong OTP');
    } catch (e: any) {
      if (!e.message.includes('Invalid Digital Signature OTP')) {
        throw e;
      }
      console.log('✅ Correctly rejected invalid OTP');
    }

    // Try with correct OTP
    const signedDraft = await signAndSendOffer(draft.id, draft.signatureOtp);
    if (signedDraft.status !== 'APPROVED') throw new Error('Draft status should be APPROVED');
    if (signedDraft.signatureOtp !== null) throw new Error('OTP should be cleared after signing');
    console.log('✅ Offer signed and sent successfully');

    // STEP 3: Candidate Accepts Offer
    console.log('⏳ 3. Testing Candidate Offer Acceptance...');
    const employee = await acceptOffer(signedDraft.acceptanceToken);
    
    if (employee.status !== 'ONBOARDING') throw new Error('Employee status should be ONBOARDING');
    if (employee.email !== candidateEmail) throw new Error('Email mismatch');
    if (!employee.companyEmail?.includes('testcandidate@helixyn.com')) throw new Error('Company email not generated correctly');
    console.log(`✅ Candidate accepted! User created with ID: ${employee.id}`);

    // STEP 4: Tech Lead Assigns Project
    console.log('⏳ 4. Testing TL Project Assignment & GitHub Provisioning...');
    const activeEmployee = await assignProjectAndProvisionGitHub(employee.id, project.id);
    
    if (activeEmployee.status !== 'ACTIVE') throw new Error('Employee status should be ACTIVE');
    if (activeEmployee.projectId !== project.id) throw new Error('Project ID mismatch');
    console.log('✅ Project assigned and GitHub simulated successfully!');

    // STEP 5: Verify Audit Logs
    console.log('⏳ 5. Verifying Audit Trail...');
    const logs = await prisma.auditLog.findMany({
      where: { details: { contains: 'Test Candidate' } },
      orderBy: { createdAt: 'asc' }
    });
    
    // There might be generic logs too, but we should find our specific ones
    const draftLog = logs.find(l => l.action === 'DRAFT_CREATED');
    if (!draftLog) throw new Error('DRAFT_CREATED log missing');
    console.log(`✅ Audit trail verified (${logs.length} related events found)`);

    console.log('\n🎉 ALL WORKFLOW TESTS PASSED SUCCESSFULLY! 🎉');

  } catch (error) {
    console.error('\n❌ TEST FAILED:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
