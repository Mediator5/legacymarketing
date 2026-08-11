'use client';

import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { Reveal } from '@/components/motion/Reveal';
import { site } from '@/lib/site';

export function BookingSection() {
  return (
    <section id="booking" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-sand-depth" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-gold-500/[0.08] blur-[140px]"
        aria-hidden
      />

      <div className="container-luxe relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-40 lg:self-start">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold-600/70" />
              Book your seat
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl leading-[1.13] sm:text-5xl lg:text-[3.05rem]">
              Four questions and you are{' '}
              <em className="not-italic text-gold-gradient">on the calendar</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-navy-800/75">
              Every booking starts with a real human reading it. You will hear back within one
              business day with confirmation and anything you should bring.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 space-y-4 border-t border-navy-900/10 pt-8 text-base">
              <li className="flex items-center gap-3.5 text-navy-800/75">
                <Mail className="h-4 w-4 shrink-0 text-gold-600" />
                <a href={`mailto:${site.email}`} className="transition hover:text-gold-800">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-navy-800/75">
                <Phone className="h-4 w-4 shrink-0 text-gold-600" />
                <a href={site.phoneHref} className="transition hover:text-gold-800">
                  {site.phone}
                </a>
              </li>
              <li className="flex items-center gap-3.5 text-navy-800/75">
                <MapPin className="h-4 w-4 shrink-0 text-gold-600" />
                {site.address.city}, {site.address.region} · Virtual worldwide
              </li>
              <li className="flex items-center gap-3.5 text-navy-800/75">
                <Clock className="h-4 w-4 shrink-0 text-gold-600" />
                {site.hours}
              </li>
            </ul>
          </Reveal>
        </div>

        <BookingForm />
      </div>
    </section>
  );
}
