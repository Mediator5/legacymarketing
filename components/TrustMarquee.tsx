'use client';

import { Gem, HeartHandshake, ShieldCheck, Sparkles, Crown, Award } from 'lucide-react';

const items = [
  { icon: Crown, label: 'Established 2022' },
  { icon: Gem, label: 'Certified Jewelry Guidance' },
  { icon: ShieldCheck, label: 'Confidential One-on-One Sessions' },
  { icon: Sparkles, label: 'Beauty · Image · Presence' },
  { icon: HeartHandshake, label: 'Woman-Owned & Operated' },
  { icon: Award, label: '400+ Clients Served' },
];

export function TrustMarquee() {
  const loop = [...items, ...items];

  return (
    <section className="relative border-y border-navy-900/8 bg-sand py-5">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee gap-12 pr-12">
          {loop.map((item, i) => (
            <div key={i} className="flex shrink-0 items-center gap-2.5">
              <item.icon className="h-4 w-4 text-gold-700" />
              <span className="whitespace-nowrap text-[12px] uppercase tracking-[0.2em] text-navy-700/65">
                {item.label}
              </span>
              <span className="ml-12 h-1 w-1 rounded-full bg-gold-500/40" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
