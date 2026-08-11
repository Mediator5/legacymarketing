'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { BookingForm } from './BookingForm';
import { site } from '@/lib/site';

export function BookingModal({
  open,
  onClose,
  service,
}: {
  open: boolean;
  onClose: () => void;
  service?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape, lock body scroll, and keep focus inside the dialog.
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const previous = document.activeElement as HTMLElement | null;
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    if (scrollBarGap > 0) document.body.style.paddingRight = `${scrollBarGap}px`;

    const t = window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>('button, input')?.focus();
    }, 220);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      window.clearTimeout(t);
      previous?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto p-4 sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/70 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            ref={panelRef}
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative my-auto w-full max-w-3xl overflow-hidden rounded-3xl border border-navy-900/10 bg-cream shadow-luxe"
          >
            {/* Header */}
            <div className="relative border-b border-navy-900/8 bg-ink px-6 py-5 sm:px-8">
              <p className="text-[11px] uppercase tracking-luxe text-gold-300">
                {site.shortName} · Private consultation
              </p>
              <h2
                id="booking-modal-title"
                className="mt-1.5 font-display text-2xl text-white sm:text-3xl"
              >
                Book your session
              </h2>

              <button
                onClick={onClose}
                aria-label="Close booking form"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-gold-400/60 hover:text-gold-300 sm:right-6 sm:top-6"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <div className="max-h-[calc(100svh-13rem)] overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <BookingForm compact initialService={service} onClose={onClose} />
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
