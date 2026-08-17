'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

function startOfDay(d: Date) {
  const c = new Date(d);
  c.setHours(0, 0, 0, 0);
  return c;
}

export function toISODate(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function formatLongDate(iso: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

export function Calendar({
  value,
  onChange,
}: {
  value: string;
  onChange: (iso: string) => void;
}) {
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

  const cells = useMemo(() => {
    const first = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const lead = first.getDay();
    const out: (Date | null)[] = Array.from({ length: lead }, () => null);
    for (let d = 1; d <= daysInMonth; d += 1) {
      out.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    }
    return out;
  }, [cursor]);

  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 6, 1);
  const canGoBack = cursor > new Date(today.getFullYear(), today.getMonth(), 1);
  const canGoForward = cursor < maxMonth;

  const shift = (n: number) =>
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + n, 1));

  return (
    <div className="rounded-2xl border border-navy-900/10 bg-white p-5">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={!canGoBack}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 text-navy-800/72 transition hover:border-gold-500/50 hover:text-gold-800 disabled:opacity-25 disabled:hover:border-navy-900/10 disabled:hover:text-navy-950/60"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        <p className="font-display text-lg text-navy-950">
          {MONTHS[cursor.getMonth()]} <span className="text-navy-700/60">{cursor.getFullYear()}</span>
        </p>

        <button
          type="button"
          onClick={() => shift(1)}
          disabled={!canGoForward}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 text-navy-800/72 transition hover:border-gold-500/50 hover:text-gold-800 disabled:opacity-25"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center">
        {DAYS.map((d, i) => (
          <span key={i} className="pb-2 text-[11px] uppercase tracking-[0.14em] text-navy-700/48">
            {d}
          </span>
        ))}

        {cells.map((date, i) => {
          if (!date) return <span key={`e${i}`} />;

          const iso = toISODate(date);
          const isPast = date < today;
          const isSunday = date.getDay() === 0;
          const disabled = isPast || isSunday;
          const selected = value === iso;
          const isToday = iso === toISODate(today);

          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              onClick={() => onChange(iso)}
              className={[
                'relative aspect-square rounded-lg text-[14.5px] transition-all duration-200',
                disabled
                  ? 'cursor-not-allowed text-navy-700/28'
                  : 'text-navy-800/80 hover:bg-sand hover:text-navy-950',
                selected ? 'bg-gold-sheen font-semibold text-navy-950 hover:bg-gold-sheen' : '',
              ].join(' ')}
            >
              {date.getDate()}
              {isToday && !selected ? (
                <motion.span
                  layoutId="today-dot"
                  className="absolute inset-x-0 bottom-1.5 mx-auto h-1 w-1 rounded-full bg-gold-400"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <p className="mt-4 text-center text-[12px] text-navy-700/58">
        Sundays unavailable · Times shown in EST
      </p>
    </div>
  );
}
