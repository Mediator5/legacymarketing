'use client';

import { ArrowRight } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingProvider';

export function ServiceBookButton({
  serviceId,
  dark = false,
}: {
  serviceId: string;
  dark?: boolean;
}) {
  const { open } = useBooking();

  return (
    <button
      type="button"
      onClick={() => open(serviceId)}
      className={`group mt-6 flex w-full items-center justify-center gap-2.5 rounded-full py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${
        dark
          ? 'bg-gold-sheen bg-[length:200%_auto] text-navy-950 hover:bg-[position:100%_50%]'
          : 'bg-gold-sheen bg-[length:200%_auto] text-navy-950 shadow-gold-glow hover:bg-[position:100%_50%]'
      }`}
    >
      Book this session
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </button>
  );
}
