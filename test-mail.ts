import 'dotenv/config';
import { sendSignatureOtpEmail, sendOfferLetterEmail } from './lib/email-service';

async function run() {
  console.log("Testing OTP Email to helixyn2026@gmail.com (Resend account owner)...");
  await sendSignatureOtpEmail("helixyn2026@gmail.com", "123456", "New Employee");
  
  console.log("Testing Offer Letter Email to helixyn2026@gmail.com (Resend account owner)...");
  await sendOfferLetterEmail("helixyn2026@gmail.com", "Sam Prince", "http://example.com/offer.pdf", "http://example.com/accept");
}

run().catch(console.error);
