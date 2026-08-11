'use client';

import { useBooking } from '@/components/booking/BookingProvider';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CalendarCheck, Phone } from 'lucide-react';
import { site } from '@/lib/site';

export function MobileCta() {
  const { open: openBooking } = useBooking();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const booking = document.getElementById('booking');
      const inBooking = booking
        ? booking.getBoundingClientRect().top < window.innerHeight * 0.75
        : false;
      setShow(window.scrollY > 700 && !inBooking);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          initial={{ y: 90, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 90, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-cream/95 px-4 py-3 backdrop-blur-xl lg:hidden"
          style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
        >
          <div className="flex items-center gap-3">
            <a
              href={site.phoneHref}
              aria-label="Call us"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-navy-900/12 text-navy-800/78"
            >
              <Phone className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={() => openBooking()}
              className="flex flex-1 items-center justify-center gap-2.5 rounded-full bg-gold-sheen py-3.5 text-[13px] font-semibold uppercase tracking-[0.16em] text-navy-950"
            >
              <CalendarCheck className="h-4 w-4" />
              Book a Consultation
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
