'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { navLinks, site } from '@/lib/site';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { open: openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gold-sheen"
        aria-hidden
      />

      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 bg-ink transition-all duration-500',
          scrolled
            ? 'border-b border-gold-500/25 bg-ink/94 py-3 shadow-luxe backdrop-blur-xl'
            : 'border-b border-white/8 py-5',
        )}
      >
        <nav className="container-luxe flex items-center justify-between gap-4 xl:gap-8">
          <Link href="/" className="relative z-10 flex items-center" aria-label={site.name}>
            <Image
              src="/logo-web.png"
              alt={`${site.name} logo`}
              width={520}
              height={347}
              priority
              className={cn(
                'w-auto shrink-0 transition-all duration-500',
                scrolled ? 'h-12 sm:h-14 lg:h-[4.25rem]' : 'h-14 sm:h-16 lg:h-[5.25rem]',
              )}
            />
          </Link>

          <ul className="hidden shrink-0 items-center gap-5 lg:flex xl:gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group relative whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.12em] text-white/70 transition hover:text-white xl:text-[14px]"
                >
                  {link.label}
                  <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gold-500 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden shrink-0 items-center gap-4 lg:flex">
            <a
              href={site.phoneHref}
              className="hidden shrink-0 items-center gap-2 whitespace-nowrap text-[14px] tracking-wide text-white/65 transition hover:text-gold-300 xl:flex"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" />
              {site.phone}
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="shrink-0 whitespace-nowrap rounded-full bg-gold-sheen bg-[length:200%_auto] px-6 py-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%]"
            >
              Book a Consultation
            </button>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 rounded-full border border-white/15 p-2.5 text-white lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-navy-depth lg:hidden"
          >
            <div className="flex h-full flex-col justify-center px-8">
              <ul className="space-y-2">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.5 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border-b border-white/8 py-4 font-display text-3xl text-white/90 transition hover:text-gold-300"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5 }}
                className="mt-10 space-y-4"
              >
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openBooking();
                  }}
                  className="block rounded-full bg-gold-sheen py-4 text-center text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-950"
                >
                  Book a Consultation
                </button>
                <a
                  href={site.phoneHref}
                  className="block text-center text-sm tracking-wide text-white/55"
                >
                  {site.phone}
                </a>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
