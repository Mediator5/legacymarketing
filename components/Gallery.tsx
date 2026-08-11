'use client';

import { BrandImage } from '@/components/ui/BrandImage';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { images } from '@/lib/images';

const tiles = [
  { caption: 'Evening look direction', ratio: 'aspect-[3/4]' },
  { caption: 'Estate piece assessment', ratio: 'aspect-square' },
  { caption: 'Editorial styling', ratio: 'aspect-[4/5]' },
  { caption: 'Gold layering study', ratio: 'aspect-[3/4]' },
  { caption: 'Bridal trial', ratio: 'aspect-[4/5]' },
  { caption: 'Heirloom restoration guidance', ratio: 'aspect-square' },
];

export function Gallery() {
  return (
    <section className="relative overflow-hidden bg-navy-depth py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />
      <div className="container-luxe relative">
        <SectionHeading
          tone="dark"
          eyebrow="The work"
          title="A quiet kind of"
          accent="glamour"
          description="Sessions, details, and pieces from recent client work."
        />

        <div className="mt-16 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {images.gallery.map((src, i) => (
            <motion.figure
              key={src}
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.75, delay: (i % 3) * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative mb-3 block break-inside-avoid overflow-hidden rounded-xl border border-white/10 sm:mb-4 ${tiles[i].ratio}`}
            >
              <BrandImage
                src={src}
                alt={tiles[i].caption}
                fill
                sizes="(max-width: 640px) 50vw, 33vw"
                className="object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-95" />
              <figcaption className="absolute inset-x-4 bottom-4 translate-y-3 text-[12px] uppercase tracking-[0.16em] text-transparent transition-all duration-500 group-hover:translate-y-0 group-hover:text-gold-200">
                {tiles[i].caption}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
