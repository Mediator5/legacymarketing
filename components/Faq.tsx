'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { faqs } from '@/lib/faqs';


export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Questions"
          title="The things everyone"
          accent="asks first"
        />

        <div className="mx-auto mt-14 max-w-3xl divide-y divide-navy-900/8 border-y border-navy-900/8">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04}>
                <div>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-navy-950"
                  >
                    <span
                      className={`font-display text-lg leading-snug transition-colors sm:text-xl ${
                        isOpen ? 'text-gold-700' : 'text-navy-900'
                      }`}
                    >
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 135 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold-500/35 text-gold-700"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-7 pr-12 text-[16px] leading-relaxed text-navy-800/70">
                          {item.a}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
