'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { BookingModal } from './BookingModal';

type BookingContextValue = {
  /** Open the booking modal, optionally pre-selecting a service id from lib/services.ts */
  open: (serviceId?: string) => void;
  close: () => void;
  isOpen: boolean;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [service, setService] = useState<string | undefined>(undefined);

  const open = useCallback((serviceId?: string) => {
    setService(serviceId);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close, isOpen }), [open, close, isOpen]);

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal open={isOpen} onClose={close} service={service} />
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) {
    throw new Error('useBooking must be used inside <BookingProvider>');
  }
  return ctx;
}
