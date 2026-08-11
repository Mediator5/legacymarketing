'use client';

import { BrandImage } from '@/components/ui/BrandImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/motion/Reveal';
import { images } from '@/lib/images';
import { site } from '@/lib/site';

const stats = [
  { value: '400+', label: 'Women served' },
  { value: '2022', label: 'Established' },
  { value: '1:1', label: 'Always private' },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['-6%', '10%']);

  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div
        className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-gold-500/[0.07] blur-[120px]"
        aria-hidden
      />

      <div ref={ref} className="container-luxe grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <motion.div
            style={{ y: y1 }}
            className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-[1.75rem] border border-navy-900/10 shadow-luxe"
          >
            <BrandImage
              src={images.aboutPrimary}
              alt="Consultation session in progress"
              fill
              sizes="(max-width: 1024px) 70vw, 32vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: y2 }}
            className="absolute -bottom-8 right-0 aspect-square w-[52%] overflow-hidden rounded-[1.5rem] border-4 border-cream shadow-luxe"
          >
            <BrandImage
              src={images.aboutSecondary}
              alt="Beauty detail"
              fill
              sizes="(max-width: 1024px) 45vw, 22vw"
              className="object-cover"
            />
          </motion.div>

          <div className="absolute -left-3 top-6 hidden h-24 w-24 rounded-full border border-gold-500/25 sm:block" />
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold-500/60" />
              Who we are
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.85rem]">
              We do not hand you a look.
              <br />
              We hand you a{' '}
              <em className="not-italic text-gold-gradient">standard</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 text-[17px] leading-relaxed text-navy-800/72 sm:text-base">
              {site.legalName} began in {site.established} with one belief: a woman who knows how she
              looks, moves through a room differently. So we built a practice around the details most
              people rush past — undertone, proportion, the weight of a stone, the way a piece catches
              light when you talk with your hands.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-4 text-[17px] leading-relaxed text-navy-800/72 sm:text-base">
              Every session is private. Every recommendation is written down. And nothing we suggest
              depends on you spending more than you planned — good taste is not a budget, it is a
              decision.
            </p>
          </Reveal>

          <Reveal delay={0.26}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-navy-900/10 pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-3xl text-gold-gradient sm:text-4xl">{s.value}</p>
                  <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-navy-700/65">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-8 font-display text-sm italic tracking-wide text-gold-700">
              {site.tagline}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
