import { createServerFn } from '@tanstack/react-start';
import nodemailer, { type Transport } from 'nodemailer';

let transporter: Transport | undefined;
let etherealUrl: string | undefined;

async function getTransporter() {
  if (transporter) return transporter;

  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
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

  const testAccount = await nodemailer.createTestAccount();
  transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  const url = nodemailer.getTestMessageUrl(
    await transporter.sendMail({
      from: testAccount.user,
      to: testAccount.user,
      subject: 'Ethereal test',
      text: '',
      html: '',
    }),
  );

  etherealUrl = url ?? undefined;
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

      await transport.sendMail({
        from,
        to: 'supriyaa@iyojana.com',
        subject: `New Contact Form Submission - ${purpose || 'General Inquiry'}`,
        html: `
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
        `,
      });

      if (etherealUrl) {
        console.log('Dev preview (Ethereal):', etherealUrl);
      }

      return { success: true, message: 'Thank you! Your message has been sent to supriyaa@iyojana.com.' };
    } catch (error) {
      console.error('Failed to send email:', error);
      return { success: false, message: 'Something went wrong. Please try again later.' };
    }
  });
