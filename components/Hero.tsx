'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { BrandImage } from '@/components/ui/BrandImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Sparkles, Star } from 'lucide-react';
import { images } from '@/lib/images';
import { site } from '@/lib/site';

const words = ['Beautiful.', 'Confident.', 'Unforgettable.'];

export function Hero() {
  const { open: openBooking } = useBooking();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-light-depth pt-40 sm:pt-44 lg:pt-40"
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] noise" aria-hidden />
      <div
        className="pointer-events-none absolute -left-40 top-1/4 h-[520px] w-[520px] rounded-full bg-gold-500/18 blur-[130px] animate-float"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full bg-navy-500/12 blur-[120px]"
        aria-hidden
      />

      <div className="container-luxe relative grid items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-24">
        <motion.div style={{ y: textY, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Established {site.established} · Beauty · Image · Fine Jewelry
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.4rem]"
          >
            You already have it.
            <br />
            We make the world{' '}
            <span className="relative inline-block">
              <span className="text-gold-gradient animate-shimmer">see it.</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-gold-sheen"
              />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-lg text-navy-700/65 sm:text-xl"
          >
            {words.map((w, i) => (
              <motion.span
                key={w}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.14, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="italic">{w}</span>
                {i < words.length - 1 ? (
                  <span className="h-1 w-1 rounded-full bg-gold-500/70" />
                ) : null}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-7 max-w-xl text-[17px] leading-relaxed text-navy-800/72 sm:text-[18px]"
          >
            Private beauty, image, and fine jewelry consultation for women who are done blending in.
            One conversation, a clear plan, and a look that finally matches who you already are.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58 }}
            className="mt-10 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => openBooking()}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%] hover:-translate-y-0.5"
            >
              Book Your Consultation
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-navy-900/12 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-navy-800/80 transition-all duration-300 hover:border-gold-500/50 hover:text-navy-950"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
            className="mt-11 flex flex-wrap items-center gap-5"
          >
            <div className="flex -space-x-3">
              {images.avatars.map((src, i) => (
                <span
                  key={i}
                  className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-cream ring-1 ring-gold-500/30"
                >
                  <BrandImage src={src} alt="" fill sizes="40px" className="object-cover" />
                </span>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-gold-600">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-1 text-[14.5px] text-navy-800/68">
                <span className="text-navy-900/85">400+ women</span> styled, advised, and elevated
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: imageY }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-gold-500/25 shadow-luxe">
            <BrandImage
              src={images.heroPortrait}
              alt="Client styled by Legacy Marketing and Consulting"
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cream/85 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.9 }}
            className="glass-card absolute -left-4 bottom-10 w-52 p-4 sm:-left-8 sm:w-60"
          >
            <p className="text-[11px] uppercase tracking-[0.2em] text-gold-700">Signature Session</p>
            <p className="mt-2 font-display text-lg text-navy-950">Beauty + Jewelry</p>
            <p className="mt-1 text-xs leading-relaxed text-navy-800/70">
              Color, features, and the pieces that finish the story.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05 }}
            className="glass-card absolute -right-3 top-8 hidden items-center gap-3 px-4 py-3 sm:flex"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-500/15">
              <Sparkles className="h-4 w-4 text-gold-700" />
            </span>
            <div>
              <p className="text-sm font-medium text-navy-950">100% Private</p>
              <p className="text-[12px] text-navy-800/68">One-on-one, always</p>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute inset-x-0 bottom-7 hidden justify-center lg:flex"
      >
        <div className="flex flex-col items-center gap-2.5">
          <span className="text-[11px] uppercase tracking-luxe text-navy-700/58">Scroll</span>
          <span className="relative h-12 w-px overflow-hidden bg-navy-900/14">
            <motion.span
              animate={{ y: ['-100%', '150%'] }}
              transition={{ duration: 1.9, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-x-0 h-5 bg-gold-400"
            />
          </span>
        </div>
      </motion.div>
    </section>
  );
}
