'use client';

import { ArrowRight, Phone } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingProvider';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/lib/site';

export function PageCta({
  eyebrow = 'Ready when you are',
  title,
  accent,
  body,
  cta = 'Book a Consultation',
  service,
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  body: string;
  cta?: string;
  service?: string;
}) {
  const { open } = useBooking();

  return (
    <section className="relative overflow-hidden bg-navy-depth py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[380px] w-[760px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[130px]"
        aria-hidden
      />

      <div className="container-luxe relative text-center">
        <Reveal>
          <span className="eyebrow justify-center text-gold-300">
            <span className="h-px w-8 bg-gold-400/70" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.06}>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl leading-[1.12] text-white sm:text-5xl">
            {title} {accent ? <em className="not-italic text-gold-gradient-dark">{accent}</em> : null}
          </h2>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/65">{body}</p>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <button
              type="button"
              onClick={() => open(service)}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:-translate-y-0.5 hover:bg-[position:100%_50%]"
            >
              {cta}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-gold-500/50 hover:text-white"
            >
              <Phone className="h-4 w-4" />
              {site.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
