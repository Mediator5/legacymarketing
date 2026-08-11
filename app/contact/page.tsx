import type { Metadata } from 'next';
import Link from 'next/link';
import {
  CalendarCheck,
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { BreadcrumbSchema } from '@/components/Breadcrumbs';
import { ContactForm } from '@/components/pages/ContactForm';
import { BookNowLink } from '@/components/booking/BookNowLink';
import { Reveal } from '@/components/motion/Reveal';
import { faqs } from '@/lib/faqs';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Get in touch with ${site.legalName} — book a consultation, ask a question, or request a quote. Based in ${site.address.city}, ${site.address.region}, working virtually worldwide.`,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `Contact · ${site.name}`,
    description: 'Book a consultation or send us a question. We reply within one business day.',
    url: `${site.url}/contact`,
  },
};

const channels = [
  {
    icon: CalendarCheck,
    label: 'Book a consultation',
    value: 'The fastest way in',
    note: 'Pick a service, date, and time. Confirmed by email within one business day.',
  },
  {
    icon: Mail,
    label: 'Email',
    value: site.email,
    note: 'Best for detailed questions, quotes, and anything with attachments.',
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: site.phone,
    note: 'Reach us during business hours. Leave a message and we return calls same day.',
    href: site.phoneHref,
  },
  {
    icon: MessageCircle,
    label: 'Social',
    value: 'Instagram & Facebook',
    note: 'Direct messages are answered, though slower than email.',
  },
];

export default function ContactPage() {
  const shortlist = faqs.slice(0, 4);

  return (
    <main>
      <BreadcrumbSchema name="Contact" path="/contact" />
      <PageHero
        breadcrumb="Contact"
        eyebrow="We answer our own messages"
        title="Start the conversation. We reply within"
        accent="one business day."
        intro={`Based in ${site.address.city}, ${site.address.region}, working with clients in person locally and virtually anywhere. Whether you know exactly what you want or have no idea where to begin, this is the right place to start.`}
      />

      {/* ── Channels ──────────────────────────────────── */}
      <section className="relative py-20 sm:py-24">
        <div className="container-luxe">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {channels.map((c, i) => (
              <Reveal key={c.label} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl border border-navy-900/10 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/[0.08] text-gold-700">
                    <c.icon className="h-5 w-5" />
                  </span>

                  <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700/60">
                    {c.label}
                  </p>

                  {c.href ? (
                    <a
                      href={c.href}
                      className="mt-2 break-words font-display text-xl text-navy-950 transition hover:text-gold-700"
                    >
                      {c.value}
                    </a>
                  ) : c.label === 'Book a consultation' ? (
                    <BookNowLink className="mt-2 text-left font-display text-xl text-navy-950 transition hover:text-gold-700">
                      {c.value}
                    </BookNowLink>
                  ) : (
                    <p className="mt-2 font-display text-xl text-navy-950">
                      Instagram &amp; Facebook
                    </p>
                  )}

                  <p className="mt-3 text-[15px] leading-relaxed text-navy-800/70">{c.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + details ────────────────────────────── */}
      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="absolute inset-0 bg-sand-depth" aria-hidden />

        <div className="container-luxe relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal direction="right">
            <ContactForm />
          </Reveal>

          <div className="lg:sticky lg:top-40 lg:self-start">
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-navy-900/10 bg-white p-7 shadow-card">
                <h2 className="text-2xl">Practical details</h2>

                <ul className="mt-6 space-y-5">
                  <li className="flex gap-3.5">
                    <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
                    <div>
                      <p className="text-navy-950">
                        {site.address.city}, {site.address.region}
                      </p>
                      <p className="text-[15px] text-navy-800/65">
                        In-person sessions by appointment. Virtual sessions worldwide.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3.5">
                    <Clock className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
                    <div>
                      <p className="text-navy-950">{site.hours}</p>
                      <p className="text-[15px] text-navy-800/65">
                        Evening and Saturday slots available for bridal and event work.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3.5">
                    <Mail className="mt-1 h-4 w-4 shrink-0 text-gold-600" />
                    <div>
                      <a
                        href={`mailto:${site.email}`}
                        className="break-all text-navy-950 transition hover:text-gold-700"
                      >
                        {site.email}
                      </a>
                      <p className="text-[15px] text-navy-800/65">
                        Replies within one business day, usually sooner.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-7 border-t border-navy-900/10 pt-6">
                  <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-700/60">
                    Follow along
                  </p>
                  <div className="mt-4 flex gap-3">
                    {[
                      { href: site.socials.instagram, icon: Instagram, label: 'Instagram' },
                      { href: site.socials.facebook, icon: Facebook, label: 'Facebook' },
                      { href: site.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="flex h-11 w-11 items-center justify-center rounded-full border border-navy-900/12 text-navy-800/70 transition hover:border-gold-500/60 hover:text-gold-700"
                      >
                        <s.icon className="h-4 w-4" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-6 rounded-2xl border border-gold-500/30 bg-gold-500/[0.07] p-7">
                <h3 className="text-xl">Ready to book instead?</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-navy-800/75">
                  Skip the message. Pick your service and time directly, and we will confirm by
                  email.
                </p>
                <BookNowLink className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%]">
                  Book a Consultation
                </BookNowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Quick answers ─────────────────────────────── */}
      <section className="relative py-20 sm:py-24">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold-600/70" aria-hidden />
                Before you write
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.13] sm:text-5xl">
                We may have already{' '}
                <em className="not-italic text-gold-gradient">answered it</em>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
            {shortlist.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 shadow-card">
                  <h3 className="text-lg leading-snug">{f.q}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-800/72">{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-10 text-center">
              <Link
                href="/#faq"
                className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/45 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/10"
              >
                Read all questions
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
