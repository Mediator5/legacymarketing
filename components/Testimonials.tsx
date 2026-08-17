'use client';

import { BrandImage } from '@/components/ui/BrandImage';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { images } from '@/lib/images';

const testimonials = [
  {
    quote:
      'I had been buying the same three colours for a decade because I was scared of getting it wrong. One session and I finally understand my own face. My husband asked what I did differently — I said everything.',
    name: 'Danielle R.',
    role: 'Attorney · Wilmington',
    avatar: images.avatars[0],
  },
  {
    quote:
      'I brought my grandmother’s ring in expecting sentiment. I left with an appraisal, an insurance plan, and a setting that lets me actually wear it. That is not a consultation, that is stewardship.',
    name: 'Maribel A.',
    role: 'Nurse Practitioner',
    avatar: images.avatars[1],
  },
  {
    quote:
      'The blueprint is the part nobody else does. I did not have to remember anything — it was all written out, in the order I could afford it. I finished the whole list in five months.',
    name: 'Keisha T.',
    role: 'Founder, retail brand',
    avatar: images.avatars[2],
  },
  {
    quote:
      'I came for beauty and stayed for the business consulting. Same eye, same honesty. She told me what was not working with my brand before she told me what was.',
    name: 'Angela V.',
    role: 'Real estate broker',
    avatar: images.avatars[3],
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((next: number) => {
    setDir(next > 0 ? 1 : -1);
    setIndex((i) => (i + next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 8000);
    return () => clearInterval(t);
  }, [go]);

  const active = testimonials[index];

  return (
    <section id="results" className="relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 bg-sand-depth" aria-hidden />

      <div className="container-luxe relative">
        <SectionHeading eyebrow="Client words" title="What changes after" accent="one session" />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote
            className="mx-auto h-9 w-9 text-gold-500/70"
            aria-hidden
          />

          <div className="relative mt-6 min-h-[290px] sm:min-h-[250px]">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.blockquote
                key={index}
                custom={dir}
                initial={{ opacity: 0, x: dir * 50, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: dir * -50, filter: 'blur(6px)' }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="font-display text-xl leading-relaxed text-navy-900 sm:text-2xl sm:leading-relaxed">
                  &ldquo;{active.quote}&rdquo;
                </p>

                <footer className="mt-8 flex items-center justify-center gap-3.5">
                  <span className="relative h-12 w-12 overflow-hidden rounded-full ring-1 ring-gold-500/40">
                    <BrandImage src={active.avatar} alt="" fill sizes="48px" className="object-cover" />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-medium text-navy-950">{active.name}</p>
                    <p className="text-[13px] text-navy-700/65">{active.role}</p>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/11 text-navy-800/72 transition hover:border-gold-500/50 hover:text-gold-800"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  onClick={() => {
                    setDir(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === index ? 'w-8 bg-gold-sheen' : 'w-1.5 bg-navy-900/18 hover:bg-navy-900/28'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-900/11 text-navy-800/72 transition hover:border-gold-500/50 hover:text-gold-800"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
