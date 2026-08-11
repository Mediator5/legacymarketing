'use client';

import type { ReactNode } from 'react';
import { useBooking } from './BookingProvider';

/** Text-style trigger for the booking modal, usable inside server components. */
export function BookNowLink({
  children,
  className,
  service,
}: {
  children: ReactNode;
  className?: string;
  service?: string;
}) {
  const { open } = useBooking();

  return (
    <button type="button" onClick={() => open(service)} className={className}>
      {children}
    </button>
  );
}
