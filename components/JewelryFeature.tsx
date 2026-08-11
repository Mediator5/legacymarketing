'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { BrandImage } from '@/components/ui/BrandImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Gem, Scale, Sparkles, ShieldCheck } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';
import { images } from '@/lib/images';

const pillars = [
  {
    icon: Gem,
    title: 'Stone & Metal Literacy',
    body: 'Cut, clarity, carat, colour — plus the questions jewellers hope you never ask.',
  },
  {
    icon: Scale,
    title: 'Value That Holds',
    body: 'What appreciates, what depreciates the second you leave the store, and how to tell.',
  },
  {
    icon: ShieldCheck,
    title: 'Buy Without Regret',
    body: 'Certification, appraisal, return terms, insurance. We read the fine print with you.',
  },
  {
    icon: Sparkles,
    title: 'Styled, Not Stacked',
    body: 'Pieces chosen for your skin tone, neckline, and the life you actually live.',
  },
];

export function JewelryFeature() {
  const { open: openBooking } = useBooking();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '12%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  return (
    <section id="jewelry" ref={ref} className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-sand-depth" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />

      <div className="container-luxe relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-8 bg-gold-500/60" />
              Fine jewelry consultation
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2 className="mt-5 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.85rem]">
              Nobody should spend four figures on a{' '}
              <em className="not-italic text-gold-gradient">guess</em>.
            </h2>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-navy-800/72 sm:text-base">
              Jewelry is the one purchase women are expected to make emotionally and defend
              financially. We sit on your side of the counter — before you buy, before you inherit,
              before you insure. You leave knowing exactly what you own and exactly what it is worth.
            </p>
          </Reveal>

          <div className="mt-11 grid gap-6 sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={0.18 + i * 0.07}>
                <div className="group">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/[0.07] text-gold-700 transition-colors duration-300 group-hover:border-gold-400/60 group-hover:bg-gold-500/15">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-base font-medium">{p.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-navy-800/68">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <button
              type="button"
              onClick={() => openBooking('jewelry-consultation')}
              className="mt-11 inline-flex items-center gap-2.5 rounded-full border border-gold-500/45 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/10"
            >
              Book a Jewelry Consultation
              <span aria-hidden>→</span>
            </button>
          </Reveal>
        </div>

        <div className="relative">
          <motion.div
            style={{ y }}
            className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-gold-500/20 shadow-luxe"
          >
            <motion.div style={{ scale }} className="absolute inset-0">
              <BrandImage
                src={images.jewelryHero}
                alt="Fine jewelry consultation"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/45 via-transparent to-transparent" />

            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/60 bg-white/92 p-5 shadow-card backdrop-blur-xl">
              <p className="text-[11px] uppercase tracking-[0.2em] text-gold-700">
                What clients say most
              </p>
              <p className="mt-2.5 font-display text-lg leading-snug text-navy-950">
                &ldquo;I walked into the store knowing more than the person selling to me.&rdquo;
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="absolute -left-5 top-12 hidden aspect-square w-36 overflow-hidden rounded-2xl border-4 border-cream shadow-luxe sm:block"
          >
            <BrandImage
              src={images.jewelryRings}
              alt="Ring selection"
              fill
              sizes="150px"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
