import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `How ${site.legalName} collects, uses, and protects your information.`,
  robots: { index: true, follow: true },
};

const sections = [
  {
    h: 'What we collect',
    p: `When you book a consultation we collect your name, email address, phone number, the service you selected, your preferred date and time, and anything you choose to write in the notes field. We do not collect payment information through this website.`,
  },
  {
    h: 'How we use it',
    p: `We use your information to confirm and prepare for your consultation, to reply to you, and to keep a record of our work together. If you opt in, we may occasionally send you updates about services and availability. You can unsubscribe at any time.`,
  },
  {
    h: 'Who we share it with',
    p: `We do not sell, rent, or trade client information. We share information only with service providers who help us operate this site and our email — for example our hosting provider and email service — and only to the extent required to deliver the service.`,
  },
  {
    h: 'How long we keep it',
    p: `Booking records are retained for as long as needed to serve you and to meet our legal and accounting obligations. You may request deletion of your information at any time by emailing us.`,
  },
  {
    h: 'Cookies and analytics',
    p: `This site uses only the cookies required for it to function. If analytics are added in future, this policy will be updated to describe what is measured.`,
  },
  {
    h: 'Your choices',
    p: `You may request a copy of the information we hold about you, ask us to correct it, or ask us to delete it. Write to us and we will respond within a reasonable period.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-light-depth">
      <div className="container-luxe max-w-3xl pb-24 pt-44 sm:pb-32 sm:pt-48">
        <Link
          href="/"
          className="text-[12px] uppercase tracking-[0.18em] text-gold-700 transition hover:text-gold-800"
        >
          ← Back to home
        </Link>

        <h1 className="mt-8 text-4xl sm:text-5xl">Privacy Policy</h1>
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
              Questions about this policy? Email{' '}
              <a href={`mailto:${site.email}`} className="text-gold-700 hover:text-gold-800">
                {site.email}
              </a>{' '}
              or call {site.phone}.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
