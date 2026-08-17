import nodemailer from 'nodemailer';
import { site } from './site';

export type BookingPayload = {
  serviceName: string;
  format: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget?: string;
  referral?: string;
  notes?: string;
};

let cached: nodemailer.Transporter | null = null;

/**
 * Gmail SMTP transport.
 * Requires a Google account with 2-Step Verification enabled and an
 * App Password (Google Account → Security → App passwords).
 */
export function getTransport() {
  if (cached) return cached;

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    throw new Error('Email is not configured. Set GMAIL_USER and GMAIL_APP_PASSWORD.');
  }

  cached = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user, pass },
  });

  return cached;
}

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const prettyDate = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return new Date(y, m - 1, d).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

const shell = (title: string, inner: string) => `
<!doctype html>
<html><body style="margin:0;padding:0;background:#060d1c;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#060d1c;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#0b1730;border:1px solid rgba(212,175,55,.28);border-radius:16px;overflow:hidden;">
        <tr><td style="padding:28px 32px;border-bottom:1px solid rgba(255,255,255,.08);">
          <p style="margin:0;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#d4af37;">${esc(site.name)}</p>
          <h1 style="margin:10px 0 0;font-family:Georgia,serif;font-size:24px;font-weight:400;color:#ffffff;">${esc(title)}</h1>
        </td></tr>
        <tr><td style="padding:28px 32px;color:rgba(255,255,255,.72);font-size:15px;line-height:1.65;">
          ${inner}
        </td></tr>
        <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,.08);color:rgba(255,255,255,.38);font-size:12px;">
          ${esc(site.tagline)}<br/>
          <a href="${site.url}" style="color:#d4af37;text-decoration:none;">${esc(site.domain)}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

const detailRows = (b: BookingPayload) =>
  [
    ['Service', b.serviceName],
    ['Format', b.format],
    ['Date', prettyDate(b.date)],
    ['Time', `${b.time} EST`],
    ['Name', `${b.firstName} ${b.lastName}`],
    ['Email', b.email],
    ['Phone', b.phone],
    ['Investment range', b.budget || '—'],
    ['Found us via', b.referral || '—'],
  ]
    .map(
      ([k, v]) => `<tr>
        <td style="padding:9px 0;color:rgba(255,255,255,.42);font-size:13px;width:42%;">${esc(k)}</td>
        <td style="padding:9px 0;color:#ffffff;font-size:14px;">${esc(v)}</td>
      </tr>`,
    )
    .join('');

export function ownerEmail(b: BookingPayload) {
  return shell(
    'New consultation request',
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      ${detailRows(b)}
    </table>
    ${
      b.notes
        ? `<div style="margin-top:22px;padding:16px;background:rgba(212,175,55,.07);border-left:2px solid #d4af37;border-radius:6px;">
            <p style="margin:0 0 6px;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:#d4af37;">Client notes</p>
            <p style="margin:0;color:rgba(255,255,255,.8);font-size:14px;line-height:1.6;">${esc(b.notes).replace(/\n/g, '<br/>')}</p>
          </div>`
        : ''
    }
    <p style="margin:24px 0 0;">
      <a href="mailto:${esc(b.email)}" style="display:inline-block;padding:12px 24px;background:#d4af37;color:#0b1730;font-size:12px;letter-spacing:.16em;text-transform:uppercase;text-decoration:none;border-radius:999px;font-weight:bold;">Reply to ${esc(b.firstName)}</a>
    </p>`,
  );
}

export function clientEmail(b: BookingPayload) {
  return shell(
    `We have your request, ${b.firstName}`,
    `<p style="margin:0 0 18px;">Thank you for booking with ${esc(site.name)}. Here is what we have on file:</p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tr><td style="padding:9px 0;color:rgba(255,255,255,.42);font-size:13px;width:42%;">Service</td><td style="padding:9px 0;color:#fff;font-size:14px;">${esc(b.serviceName)}</td></tr>
      <tr><td style="padding:9px 0;color:rgba(255,255,255,.42);font-size:13px;">Format</td><td style="padding:9px 0;color:#fff;font-size:14px;">${esc(b.format)}</td></tr>
      <tr><td style="padding:9px 0;color:rgba(255,255,255,.42);font-size:13px;">Requested date</td><td style="padding:9px 0;color:#fff;font-size:14px;">${esc(prettyDate(b.date))}</td></tr>
      <tr><td style="padding:9px 0;color:rgba(255,255,255,.42);font-size:13px;">Requested time</td><td style="padding:9px 0;color:#fff;font-size:14px;">${esc(b.time)} EST</td></tr>
    </table>
    <p style="margin:22px 0 0;">A member of our team will confirm this time within one business day. If you need to reach us sooner, reply to this email or call ${esc(site.phone)}.</p>
    <p style="margin:18px 0 0;font-family:Georgia,serif;font-style:italic;color:#d4af37;">Strategize. Elevate. Build. Leave a legacy.</p>`,
  );
}
