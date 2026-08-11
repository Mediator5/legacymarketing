import { NextResponse } from 'next/server';
import { clientEmail, getTransport, ownerEmail, type BookingPayload } from '@/lib/mail';
import { site } from '@/lib/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

// Lightweight in-memory rate limit (per warm instance).
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

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    if (rateLimited(ip)) {
      return NextResponse.json(
        { ok: false, message: 'Too many requests. Please try again shortly.' },
        { status: 429 },
      );
    }

    const body = (await request.json()) as Partial<BookingPayload> & { website?: string };

    // Honeypot
    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    const required: (keyof BookingPayload)[] = [
      'serviceName',
      'date',
      'time',
      'firstName',
      'lastName',
      'email',
      'phone',
    ];

    for (const field of required) {
      if (!String(body[field] ?? '').trim()) {
        return NextResponse.json(
          { ok: false, message: `Missing required field: ${field}` },
          { status: 400 },
        );
      }
    }

    if (!emailRe.test(String(body.email))) {
      return NextResponse.json(
        { ok: false, message: 'Please enter a valid email address.' },
        { status: 400 },
      );
    }

    const payload: BookingPayload = {
      serviceName: String(body.serviceName).slice(0, 160),
      format: String(body.format ?? 'virtual').slice(0, 40),
      date: String(body.date).slice(0, 20),
      time: String(body.time).slice(0, 20),
      firstName: String(body.firstName).slice(0, 80),
      lastName: String(body.lastName).slice(0, 80),
      email: String(body.email).slice(0, 160),
      phone: String(body.phone).slice(0, 40),
      budget: body.budget ? String(body.budget).slice(0, 60) : '',
      referral: body.referral ? String(body.referral).slice(0, 80) : '',
      notes: body.notes ? String(body.notes).slice(0, 2000) : '',
    };

    const user = process.env.GMAIL_USER;
    const to = process.env.BOOKING_RECIPIENT || user;

    if (!user || !process.env.GMAIL_APP_PASSWORD) {
      // Do not lose the lead if email is not wired up yet.
      console.warn('[booking] Email not configured. Payload:', payload);
      return NextResponse.json(
        {
          ok: false,
          message: 'Booking could not be delivered right now.',
        },
        { status: 503 },
      );
    }

    const transport = getTransport();

    await transport.sendMail({
      from: `"${site.name}" <${user}>`,
      to,
      replyTo: `"${payload.firstName} ${payload.lastName}" <${payload.email}>`,
      subject: `New booking · ${payload.serviceName} · ${payload.firstName} ${payload.lastName}`,
      html: ownerEmail(payload),
    });

    // Client confirmation — never block the booking if this fails.
    try {
      await transport.sendMail({
        from: `"${site.name}" <${user}>`,
        to: payload.email,
        subject: `Your consultation request · ${site.name}`,
        html: clientEmail(payload),
      });
    } catch (err) {
      console.error('[booking] Client confirmation failed:', err);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('[booking] Error:', error);
    return NextResponse.json(
      { ok: false, message: 'We could not submit your booking. Please try again.' },
      { status: 500 },
    );
  }
}
