import { createServerFn } from '@tanstack/react-start';
import nodemailer, { type Transport } from 'nodemailer';

let transporter: Transport | undefined;

async function getTransporter() {
  if (transporter) return transporter;

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error(
      'SMTP configuration is missing. Please set SMTP_HOST, SMTP_USER, and SMTP_PASS environment variables.'
    );
  }

  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  return transporter;
}

export const submitContactForm = createServerFn({ method: 'POST' })
  .handler(async ({ data }) => {
    const payload = data as {
      firstName?: string;
      lastName?: string;
      email?: string;
      phone?: string;
      purpose?: string;
      message?: string;
    };

    const firstName = payload.firstName ?? '';
    const lastName = payload.lastName ?? '';
    const email = payload.email ?? '';
    const phone = payload.phone ?? '';
    const purpose = payload.purpose ?? '';
    const message = payload.message ?? '';

    try {
      const transport = await getTransporter();
      const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'iYojana <no-reply@iyojana.com>';
      const notificationRecipients = [process.env.EMAIL_TO || 'supriyaa@iyojana.com'];
      if (process.env.GMAIL_TO) notificationRecipients.push(process.env.GMAIL_TO);

      const htmlMessage = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #0F4C81;">New Contact Form Submission</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${phone}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Purpose:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${purpose || 'Not specified'}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Message:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${message || 'No message'}</td>
              </tr>
            </table>
          </div>
        `;

      await transport.sendMail({
        from,
        to: notificationRecipients.join(', '),
        subject: `New Contact Form Submission - ${purpose || 'General Inquiry'}`,
        html: htmlMessage,
      });

      return {
        success: true,
        message: 'Thank you! Your message has been sent. We will be in touch within one business day.',
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Failed to send contact notification:', errorMessage);
      console.error('Stack:', error instanceof Error ? error.stack : 'N/A');
      
      // Log environment check for debugging
      if (!process.env.SMTP_HOST) console.error('Missing: SMTP_HOST');
      if (!process.env.SMTP_USER) console.error('Missing: SMTP_USER');
      if (!process.env.SMTP_PASS) console.error('Missing: SMTP_PASS');
      if (!process.env.EMAIL_TO) console.warn('EMAIL_TO not set, using default: supriyaa@iyojana.com');
      
      return {
        success: false,
        message: 'Something went wrong while sending your message. Please try again later.',
      };
    }
  });
