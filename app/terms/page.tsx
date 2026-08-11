import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `The terms that govern consultations and services provided by ${site.legalName}.`,
};

const sections = [
  {
    h: 'Bookings and confirmation',
    p: `Submitting the booking form is a request, not a confirmed appointment. Your session is confirmed once you receive written confirmation from us. We reserve the right to decline or reschedule a request.`,
  },
  {
    h: 'Payment and deposits',
    p: `Where a deposit is required, it secures your time slot and is applied to the total. Remaining balances are due on or before the session unless agreed otherwise in writing.`,
  },
  {
    h: 'Cancellations and rescheduling',
    p: `You may reschedule at no cost with at least 48 hours notice. Within 48 hours, the deposit transfers to one future session. No-shows forfeit the deposit.`,
  },
  {
    h: 'Nature of our services',
    p: `Our consultations are advisory. Beauty, image, and jewelry guidance is based on professional judgement and does not constitute medical, dermatological, appraisal, legal, or financial advice. Business and marketing consulting does not guarantee any specific commercial result.`,
  },
  {
    h: 'Jewelry guidance',
    p: `We provide education, evaluation guidance, and vendor direction. We do not issue certified appraisals and we are not a party to any purchase you make from a third-party seller. Always obtain independent certification for significant purchases.`,
  },
  {
    h: 'Intellectual property',
    p: `Written blueprints, plans, and materials we produce are for your personal use. They may not be resold, redistributed, or published without written permission.`,
  },
  {
    h: 'Limitation of liability',
    p: `To the fullest extent permitted by law, our liability arising from any service is limited to the amount you paid for that service.`,
  },
];

export default function TermsPage() {
  return (
    <main className="bg-light-depth">
      <div className="container-luxe max-w-3xl py-24 sm:py-32">
        <Link
          href="/"
          className="text-[12px] uppercase tracking-[0.18em] text-gold-700 transition hover:text-gold-800"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl sm:text-5xl">Terms of Service</h1>
        <p className="mt-4 text-sm text-navy-700/60">
          Last updated {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>

        <div className="mt-12 space-y-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="text-xl text-gold-700">{s.h}</h2>
              <p className="mt-3 text-[17px] leading-relaxed text-navy-800/72">{s.p}</p>
            </section>
          ))}

          <section>
            <h2 className="text-xl text-gold-700">Contact</h2>
            <p className="mt-3 text-[17px] leading-relaxed text-navy-800/72">
              {site.legalName} · {site.address.city}, {site.address.region} ·{' '}
              <a href={`mailto:${site.email}`} className="text-gold-700 hover:text-gold-800">
                {site.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
