'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { BrandImage } from '@/components/ui/BrandImage';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { images } from '@/lib/images';

export function CtaBanner() {
  const { open: openBooking } = useBooking();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['-12%', '12%']);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 sm:py-28">
      <div className="container-luxe">
        <div className="relative overflow-hidden rounded-[2rem] border border-gold-500/25">
          <motion.div style={{ y }} className="absolute inset-0 scale-125">
            <BrandImage
              src={images.ctaBackdrop}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-ink/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />

          <div className="relative px-7 py-16 sm:px-14 sm:py-20 lg:px-20 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-2xl"
            >
              <span className="eyebrow text-gold-300">
                <span className="h-px w-8 bg-gold-400/70" />
                Your next chapter
              </span>

              <h2 className="mt-5 text-4xl leading-[1.12] text-white sm:text-5xl lg:text-[3.1rem]">
                The version of you that turns heads is{' '}
                <em className="not-italic text-gold-gradient-dark">one appointment away</em>.
              </h2>

              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-white/60 sm:text-base">
                Start with a complimentary twenty-minute call. No obligation, no pressure — just an
                honest read on what would actually make the biggest difference for you.
              </p>

              <div className="mt-9 flex flex-col gap-3.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => openBooking('discovery')}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%] hover:-translate-y-0.5"
                >
                  Claim Your Free Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white/75 transition-all duration-300 hover:border-gold-500/50 hover:text-white"
                >
                  See All Services
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
