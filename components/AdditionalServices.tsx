'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { generalServices } from '@/lib/services';

export function AdditionalServices() {
  const { open: openBooking } = useBooking();
  return (
    <section className="relative py-24 sm:py-28">
      <div className="container-luxe">
        <div className="rounded-[2rem] border border-navy-900/10 bg-white p-8 sm:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="eyebrow">
                  <span className="h-px w-8 bg-gold-500/60" />
                  Beyond beauty
                </span>
              </Reveal>

              <Reveal delay={0.08}>
                <h2 className="mt-5 text-3xl leading-[1.15] sm:text-[2.35rem]">
                  The consulting half of{' '}
                  <em className="not-italic text-gold-gradient">Legacy</em>
                </h2>
              </Reveal>

              <Reveal delay={0.14}>
                <p className="mt-5 text-[17px] leading-relaxed text-navy-800/70">
                  The name says marketing and consulting for a reason. When a client&apos;s
                  confidence problem turns out to be a business problem, we can take that on too —
                  same standard, same directness.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <button
                  type="button"
                  onClick={() => openBooking('general-consulting')}
                  className="group mt-8 inline-flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.18em] text-gold-700 transition hover:text-gold-800"
                >
                  Request a general consultation
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>

            <StaggerGroup className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {generalServices.map((s, i) => (
                <StaggerItem key={s.title}>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="border-l border-navy-900/10 pl-5 transition-colors duration-300 hover:border-gold-500/60"
                  >
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gold-600/80">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 text-[17px] font-medium text-navy-950">{s.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-navy-800/68">
                      {s.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
