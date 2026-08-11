import { NextResponse } from 'next/server';
import { getTransport } from '@/lib/mail';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

const hits = new Map<string, { count: number; reset: number }>();
const LIMIT = 5;
const WINDOW = 10 * 60 * 1000;

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > LIMIT;
}

const esc = (s = '') =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, message: 'Too many messages. Please try again shortly.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as {
      name?: string;
      email?: string;
      phone?: string;
      topic?: string;
      message?: string;
      website?: string;
    };

    if (body.website) return NextResponse.json({ ok: true }); // honeypot

    const name = String(body.name ?? '').trim().slice(0, 120);
    const email = String(body.email ?? '').trim().slice(0, 160);
    const phone = String(body.phone ?? '').trim().slice(0, 40);
    const topic = String(body.topic ?? 'General enquiry').slice(0, 80);
    const message = String(body.message ?? '').trim().slice(0, 4000);

    if (!name || !message) {
      return NextResponse.json(
        { ok: false, message: 'Please include your name and a message.' },
        { status: 400 },
      );
    }

    if (!emailRe.test(email)) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const user = process.env.GMAIL_USER;
    const to = process.env.BOOKING_RECIPIENT || user;

    if (!user || !process.env.GMAIL_APP_PASSWORD) {
      console.warn('[contact] Email not configured. Payload:', { name, email, topic });
      return NextResponse.json(
        { ok: false, message: 'Message could not be delivered right now.' },
        { status: 503 },
      );
    }

    await getTransport().sendMail({
      from: `"${site.name}" <${user}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject: `Website enquiry · ${topic} · ${name}`,
      html: `
        <div style="font-family:Arial,sans-serif;font-size:15px;color:#0b1730;">
          <h2 style="font-family:Georgia,serif;font-weight:400;">New website enquiry</h2>
          <p><strong>Name:</strong> ${esc(name)}<br/>
             <strong>Email:</strong> ${esc(email)}<br/>
             <strong>Phone:</strong> ${esc(phone) || '—'}<br/>
             <strong>Topic:</strong> ${esc(topic)}</p>
          <p style="padding:14px;background:#f4efe6;border-left:3px solid #d4af37;white-space:pre-wrap;">${esc(
            message,
          )}</p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[contact] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'We could not send your message. Please try again.' },
      { status: 500 },
    );
  }
}
