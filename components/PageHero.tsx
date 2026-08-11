import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/motion/Reveal';

export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  breadcrumb,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  intro: string;
  breadcrumb: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-depth pb-20 pt-44 sm:pb-24 sm:pt-48 lg:pt-52">
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />
      <div
        className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-gold-500/12 blur-[130px]"
        aria-hidden
      />

      <div className="container-luxe relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[12px] text-white/45">
            <Link href="/" className="transition hover:text-gold-300">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gold-500/60" aria-hidden />
            <span className="text-white/70">{breadcrumb}</span>
          </nav>
        </Reveal>

        <Reveal delay={0.06}>
          <span className="eyebrow mt-7 text-gold-300">
            <span className="h-px w-8 bg-gold-400/70" aria-hidden />
            {eyebrow}
          </span>
        </Reveal>

        <Reveal delay={0.12}>
          <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] text-white sm:text-5xl lg:text-[3.6rem]">
            {title}{' '}
            {accent ? (
              <em className="not-italic text-gold-gradient-dark">{accent}</em>
            ) : null}
          </h1>
        </Reveal>

        <Reveal delay={0.18}>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/65">{intro}</p>
        </Reveal>
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent"
        aria-hidden
      />
    </section>
  );
}
