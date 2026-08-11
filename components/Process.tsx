'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';

const steps = [
  {
    n: '01',
    title: 'Discovery Call',
    time: '20 minutes · complimentary',
    body: 'We talk about where you are, what has not worked, and what you want people to think when you walk in. No pitch, no pressure.',
  },
  {
    n: '02',
    title: 'The Assessment',
    time: 'In session',
    body: 'Undertone, features, proportion, current collection. We look at what you already own before we suggest a single new thing.',
  },
  {
    n: '03',
    title: 'Your Blueprint',
    time: 'Within 72 hours',
    body: 'A written plan you keep: products, palettes, pieces, priorities, and a budget order so you know what to do first.',
  },
  {
    n: '04',
    title: 'The Elevation',
    time: 'Ongoing',
    body: 'We stay reachable while you execute — shopping check-ins, event prep, and adjustments as your life changes.',
  },
];

export function Process() {
  const { open: openBooking } = useBooking();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.5'] });
  const height = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="process" className="relative py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps. No"
          accent="guesswork."
          description="A process built so you never leave a session wondering what to do on Monday morning."
        />

        <div ref={ref} className="relative mx-auto mt-16 max-w-4xl">
          {/* Timeline rail */}
          <div className="absolute left-7 top-0 h-full w-px bg-navy-900/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height }}
            className="absolute left-7 top-0 w-px bg-gradient-to-b from-gold-300 via-gold-500 to-gold-700 md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-14 md:space-y-4">
            {steps.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <li key={step.n} className="relative md:grid md:grid-cols-2 md:gap-x-16">
                  {/* Node */}
                  <span className="absolute left-0 top-0 z-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold-500/35 bg-cream font-display text-base text-gold-700 md:left-1/2 md:-translate-x-1/2">
                    {step.n}
                  </span>

                  <Reveal
                    direction={left ? 'right' : 'left'}
                    className={[
                      'pl-20 md:pl-0',
                      left ? 'md:col-start-1 md:text-right' : 'md:col-start-2 md:row-start-1',
                    ].join(' ')}
                  >
                    <div className={left ? 'md:pr-12' : 'md:pl-12'}>
                      <p className="text-[12px] uppercase tracking-[0.18em] text-gold-700">
                        {step.time}
                      </p>
                      <h3 className="mt-2.5 text-2xl leading-snug">{step.title}</h3>
                      <p className="mt-3 text-[16px] leading-relaxed text-navy-800/70">{step.body}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 text-center">
            <button
              type="button"
              onClick={() => openBooking('discovery')}
              className="inline-flex items-center gap-2.5 rounded-full border border-gold-500/45 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/10"
            >
              Start With Step One
              <span aria-hidden>→</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
