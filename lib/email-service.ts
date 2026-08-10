import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY || '';
// Only initialize Resend if a non-placeholder API key is set
const resend = resendApiKey && !resendApiKey.includes('placeholder') ? new Resend(resendApiKey) : null;

export async function sendWelcomeEmail(to: string, userName: string, companyEmail: string, passwordPlain: string) {
  const subject = 'Welcome to Helixyn! Onboarding & Credentials';
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; rounded: 8px;">
      <h2 style="color: #f97316;">Welcome to Helixyn, ${userName}! 🎉</h2>
      <p>We are thrilled to have you join our organization.</p>
      <p>Your workspace environment has been successfully configured, and your corporate email and platform login credentials are ready:</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #f97316;">
        <p style="margin: 5px 0;"><strong>Company Email:</strong> <span style="font-family: monospace;">${companyEmail}</span></p>
        <p style="margin: 5px 0;"><strong>Temporary Password:</strong> <span style="font-family: monospace;">${passwordPlain}</span></p>
      </div>
      <p>You can use these credentials for both corporate tools access and logging into the <strong style="color: #0f172a;">ELMS Onboarding Portal</strong>.</p>
      <p style="color: #dc2626; font-size: 14px; font-weight: bold;">Note: For security reasons, you will be forced to reset this password upon your first login.</p>
      <div style="margin-top: 30px; text-align: center;">
        <a href="http://localhost:3000/login" style="background-color: #f97316; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Launch Onboarding</a>
      </div>
      <p style="margin-top: 30px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px;">This is an automated operational transmission from the Helixyn HR platform.</p>
    </div>
  `;

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Helixyn Operations <onboarding@resend.dev>', // Resend free tier sends from onboarding@resend.dev by default
        to,
        subject,
        html
      });
      if (error) {
        console.error('[EMAIL ERROR] Resend dispatch failed:', error);
      } else {
        console.log(`[EMAIL] Successfully sent welcoming credentials to ${to} via Resend.`);
      }
    } catch (e) {
      console.error('[EMAIL ERROR] Resend dispatch exception:', e);
    }
  } else {
    // Local development mock logging
    console.log('\n================================================================');
    console.log('                    [DEVELOPMENT] SIMULATED welcome EMAIL        ');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Credentials: Email = ${companyEmail} | Pass = ${passwordPlain}`);
    console.log('================================================================\n');
  }
}

export async function sendOfferLetterEmail(to: string, userName: string, pdfUrl: string, acceptanceLink: string) {
  const subject = 'Offer of Employment from Helixyn';
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; rounded: 8px;">
      <h2 style="color: #f97316;">Hello ${userName},</h2>
      <p>We are delighted to extend this offer of employment to join Helixyn!</p>
      <p>Your official offer letter has been generated and is attached to your candidate profile.</p>
      <div style="margin-top: 30px; text-align: center;">
        <a href="${acceptanceLink}" style="background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">Review & Accept Offer</a>
      </div>
      <p style="margin-top: 30px; font-size: 14px; color: #475569;">If you have any questions, please reach out to our HR team.</p>
      <p style="margin-top: 30px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px;">This is an automated operational transmission from the Helixyn HR platform.</p>
    </div>
  `;

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Helixyn HR <onboarding@resend.dev>',
        to,
        subject,
        html
      });
      if (error) {
        console.error('[EMAIL ERROR] Resend dispatch failed:', error);
      } else {
        console.log(`[EMAIL] Successfully sent offer letter to ${to} via Resend.`);
      }
    } catch (e) {
      console.error('[EMAIL ERROR] Resend dispatch exception:', e);
    }
  } else {
    console.log('\n================================================================');
    console.log('                    [DEVELOPMENT] SIMULATED OFFER EMAIL          ');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Acceptance Link: ${acceptanceLink}`);
    console.log('================================================================\n');
  }
}

export async function sendSignatureOtpEmail(to: string, otp: string, candidateName: string) {
  const subject = `Action Required: Digital Signature OTP for ${candidateName}`;
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; color: #1e293b; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; rounded: 8px;">
      <h2 style="color: #3b82f6;">Signature Required</h2>
      <p>An offer letter for <strong>${candidateName}</strong> is waiting for your digital signature.</p>
      <p>Please enter the following One-Time Password (OTP) in the HR Dashboard to digitally sign and send the offer letter:</p>
      <div style="background-color: #f8fafc; padding: 20px; border-radius: 6px; margin: 20px 0; border: 2px dashed #cbd5e1; text-align: center;">
        <span style="font-family: monospace; font-size: 32px; letter-spacing: 8px; font-weight: bold; color: #0f172a;">${otp}</span>
      </div>
      <p style="color: #dc2626; font-size: 14px;">This code is strictly confidential. Do not share it.</p>
      <p style="margin-top: 30px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 10px;">This is an automated operational transmission from the Helixyn HR platform.</p>
    </div>
  `;

  if (resend) {
    try {
      const { data, error } = await resend.emails.send({
        from: 'Helixyn Operations <onboarding@resend.dev>',
        to,
        subject,
        html
      });
      if (error) {
        console.error('[EMAIL ERROR] Resend dispatch failed:', error);
      } else {
        console.log(`[EMAIL] Successfully sent OTP to ${to} via Resend.`);
      }
    } catch (e) {
      console.error('[EMAIL ERROR] Resend dispatch failed:', e);
    }
  } else {
    console.log('\n================================================================');
    console.log('                    [DEVELOPMENT] SIMULATED OTP EMAIL            ');
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`OTP Code: ${otp}`);
    console.log('================================================================\n');
  }
}
