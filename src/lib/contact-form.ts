import { createServerFn } from '@tanstack/react-start';
import emailjs from '@emailjs/nodejs';
import fs from 'node:fs';
import path from 'node:path';

function getFreshEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, 'utf8');
      for (const line of content.split(/\r?\n/)) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          const val = trimmed.slice(eqIdx + 1).trim().replace(/^['"]|['"]$/g, '');
          if (key && val) {
            env[key] = val;
          }
        }
      }
    }
  } catch {}
  return env;
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
      const freshEnv = getFreshEnv();

      const serviceId =
        process.env.EMAILJS_SERVICE_ID?.trim() ||
        freshEnv.EMAILJS_SERVICE_ID ||
        'service_g42qfar';

      const templateId =
        process.env.EMAILJS_TEMPLATE_ID?.trim() ||
        freshEnv.EMAILJS_TEMPLATE_ID;

      const publicKey =
        process.env.EMAILJS_PUBLIC_KEY?.trim() ||
        freshEnv.EMAILJS_PUBLIC_KEY;

      const privateKey =
        process.env.EMAILJS_PRIVATE_KEY?.trim() ||
        freshEnv.EMAILJS_PRIVATE_KEY;

      const toEmail =
        process.env.EMAIL_TO?.trim() ||
        freshEnv.EMAIL_TO ||
        'amansg710@gmail.com';

      if (!templateId || !publicKey) {
        console.error('Missing EmailJS configuration:', {
          hasServiceId: Boolean(serviceId),
          hasTemplateId: Boolean(templateId),
          hasPublicKey: Boolean(publicKey),
        });
        throw new Error(
          'EmailJS is not fully configured. Please set EMAILJS_TEMPLATE_ID and EMAILJS_PUBLIC_KEY in your .env file.'
        );
      }

      const now = new Date();
      const time = now.toLocaleString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      });

      const fullName = `${firstName} ${lastName}`.trim();
      const formattedMessage = [
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Purpose: ${purpose || 'General Inquiry'}`,
        '',
        `Message:`,
        message || 'No message provided',
      ].join('\n');

      const templateParams = {
        name: fullName,
        from_name: fullName,
        firstName,
        lastName,
        email,
        from_email: email,
        reply_to: email,
        phone,
        phone_number: phone,
        contact_number: phone,
        purpose: purpose || 'General Inquiry',
        service: purpose || 'General Inquiry',
        user_message: message || 'No message provided',
        raw_message: message || 'No message provided',
        message: formattedMessage,
        to_email: toEmail,
        time,
      };

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        {
          publicKey,
          ...(privateKey ? { privateKey } : {}),
        }
      );

      console.log('EmailJS sent successfully:', response.status, response.text);

      return {
        success: true,
        message: 'Thank you! Your message has been sent. We will be in touch within one business day.',
      };
    } catch (error: any) {
      const errorMessage = error?.text || (error instanceof Error ? error.message : String(error));
      console.error('Failed to send contact notification via EmailJS:', errorMessage);

      if (errorMessage.includes('non-browser')) {
        return {
          success: false,
          message:
            'EmailJS requires one toggle: Go to EmailJS Dashboard > Account > Security, enable "Allow EmailJS API for non-browser applications" and click Save.',
        };
      }

      return {
        success: false,
        message:
          errorMessage.includes('not fully configured')
            ? errorMessage
            : 'Something went wrong while sending your message. Please try again later.',
      };
    }
  });
