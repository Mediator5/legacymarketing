'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { BrandImage } from '@/components/ui/BrandImage';
import { motion } from 'framer-motion';
import { ArrowUpRight, Check, Clock } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { services } from '@/lib/services';

export function Services() {
  const { open: openBooking } = useBooking();

  return (
    <section id="services" className="relative overflow-hidden bg-navy-depth py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
        aria-hidden
      />

      <div className="container-luxe relative">
        <SectionHeading
          tone="dark"
          eyebrow="What we do"
          title="Six ways we make women"
          accent="unmistakable"
          description="Choose one, or let us build a path across all of them. Every session ends with something written — not just a nice conversation."
        />

        <StaggerGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.id}>
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] transition-colors duration-500 hover:border-gold-500/45"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <BrandImage
                    src={service.image}
                    alt={service.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

                  {service.featured ? (
                    <span className="absolute left-4 top-4 rounded-full border border-gold-400/45 bg-ink/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-gold-200 backdrop-blur">
                      Most requested
                    </span>
                  ) : null}

                  <span className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-ink/60 text-white/70 backdrop-blur transition group-hover:border-gold-400/60 group-hover:text-gold-300">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.16em] text-white/45">
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {service.duration}
                    </span>
                    {service.investment ? (
                      <>
                        <span className="h-1 w-1 rounded-full bg-gold-500/60" />
                        <span className="text-gold-300">{service.investment}</span>
                      </>
                    ) : null}
                  </div>

                  <h3 className="mt-3 text-2xl leading-snug text-white">{service.name}</h3>

                  <p className="mt-3 text-base leading-relaxed text-white/60">{service.summary}</p>

                  <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                    {service.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5 text-[15px] leading-snug text-white/65">
                        <Check className="mt-1 h-4 w-4 shrink-0 text-gold-400" />
                        {b}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => openBooking(service.id)}
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-300 transition hover:gap-3.5 hover:text-gold-200"
                  >
                    Book this session
                    <span aria-hidden>→</span>
                  </button>
                </div>
              </motion.article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
