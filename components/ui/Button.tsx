'use client';

import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';
import { cn } from '@/lib/utils';

const base =
  'group relative inline-flex items-center justify-center gap-2.5 rounded-full text-[14.5px] font-medium uppercase tracking-[0.18em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:cursor-not-allowed disabled:opacity-55';

const sizes = {
  sm: 'px-5 py-2.5 text-[12px]',
  md: 'px-7 py-3.5',
  lg: 'px-9 py-4',
};

const variants = {
  gold: 'bg-gold-sheen bg-[length:200%_auto] text-navy-950 shadow-gold-glow hover:bg-[position:100%_50%] hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'border border-gold-500/45 text-gold-700 hover:border-gold-400 hover:bg-gold-500/10 hover:-translate-y-0.5',
  ghost: 'text-navy-800/78 hover:text-navy-950',
  navy: 'bg-navy-900 text-white border border-navy-900/10 hover:bg-navy-700 hover:-translate-y-0.5',
};

type Common = {
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function Button({
  children,
  variant = 'gold',
  size = 'md',
  className,
  ...props
}: Common & ComponentProps<'button'>) {
  return (
    <button className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  href,
  variant = 'gold',
  size = 'md',
  className,
  ...props
}: Common & { href: string } & Omit<ComponentProps<typeof Link>, 'href'>) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {children}
    </Link>
  );
}
