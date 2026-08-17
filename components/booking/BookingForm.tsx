'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  Check,
  Clock,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  User,
} from 'lucide-react';
import { Calendar, formatLongDate } from './Calendar';
import { bookingServices, consultTypes, timeSlots } from '@/lib/services';
import { site } from '@/lib/site';
import { cn } from '@/lib/utils';

type Form = {
  service: string;
  format: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  budget: string;
  referral: string;
  notes: string;
  consent: boolean;
};

const empty: Form = {
  service: '',
  format: 'virtual',
  date: '',
  time: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  budget: '',
  referral: '',
  notes: '',
  consent: false,
};

const steps = ['Service', 'Date & Time', 'Your Details', 'Confirm'];

const budgets = [
  'Under $250',
  '$250 – $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500+',
  'Not sure yet',
];

const referrals = ['Instagram', 'Facebook', 'Google search', 'A friend or family member', 'Event or referral partner', 'Other'];

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export function BookingForm({
  initialService,
  onClose,
  compact = false,
}: {
  initialService?: string;
  onClose?: () => void;
  compact?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(() => ({ ...empty, service: initialService ?? '' }));
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const selectedService = useMemo(
    () => bookingServices.find((s) => s.id === form.service),
    [form.service],
  );

  const validate = (which: number) => {
    const next: Partial<Record<keyof Form, string>> = {};

    if (which === 0 && !form.service) next.service = 'Choose the session you want.';

    if (which === 1) {
      if (!form.date) next.date = 'Pick a date.';
      if (!form.time) next.time = 'Pick a time.';
    }

    if (which === 2) {
      if (!form.firstName.trim()) next.firstName = 'Required';
      if (!form.lastName.trim()) next.lastName = 'Required';
      if (!emailRe.test(form.email)) next.email = 'Enter a valid email.';
      if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a valid phone number.';
      if (!form.consent) next.consent = 'Please agree so we can contact you.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = async () => {
    if (!validate(2)) {
      setStep(2);
      return;
    }
    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, serviceName: selectedService?.name ?? form.service }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Something went wrong.');

      setStatus('done');
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  const reset = () => {
    setForm({ ...empty, service: initialService ?? '' });
    setStep(0);
    setStatus('idle');
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        compact
          ? 'p-0'
          : 'rounded-2xl border border-navy-900/8 bg-white p-6 shadow-luxe sm:p-9',
      )}
    >
          <AnimatePresence mode="wait">
            {status === 'done' ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex min-h-[520px] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.15 }}
                  className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-sheen text-navy-950"
                >
                  <Check className="h-9 w-9" strokeWidth={3} />
                </motion.span>

                <h3 className="mt-8 text-3xl">Request received</h3>
                <p className="mt-4 max-w-sm text-[17px] leading-relaxed text-navy-800/72">
                  Thank you, {form.firstName}. We have your request for{' '}
                  <span className="text-gold-700">{selectedService?.name}</span> on{' '}
                  <span className="text-gold-700">{formatLongDate(form.date)}</span> at{' '}
                  <span className="text-gold-700">{form.time}</span>. Confirmation is on its way to{' '}
                  {form.email}.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={reset}
                    className="rounded-full border border-gold-500/45 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-gold-700 transition hover:bg-gold-500/10"
                  >
                    Book another session
                  </button>
                  {onClose ? (
                    <button
                      onClick={onClose}
                      className="rounded-full bg-gold-sheen px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-950"
                    >
                      Done
                    </button>
                  ) : null}
                </div>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Progress */}
                <div className="mb-9">
                  <div className="flex items-center justify-between gap-2">
                    {steps.map((label, i) => (
                      <div key={label} className="flex flex-1 items-center gap-2">
                        <span
                          className={[
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold transition-all duration-500',
                            i < step
                              ? 'bg-gold-sheen text-navy-950'
                              : i === step
                                ? 'border border-gold-400 text-gold-700'
                                : 'border border-navy-900/12 text-navy-700/48',
                          ].join(' ')}
                        >
                          {i < step ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
                        </span>
                        <span
                          className={`hidden text-[11px] uppercase tracking-[0.14em] sm:block ${
                            i <= step ? 'text-navy-800/78' : 'text-navy-700/40'
                          }`}
                        >
                          {label}
                        </span>
                        {i < steps.length - 1 ? (
                          <span className="relative h-px flex-1 bg-navy-900/12">
                            <motion.span
                              initial={false}
                              animate={{ scaleX: i < step ? 1 : 0 }}
                              transition={{ duration: 0.45 }}
                              className="absolute inset-0 origin-left bg-gold-500"
                            />
                          </span>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="min-h-[430px]">
                  <AnimatePresence mode="wait">
                    {/* ── Step 1: Service ── */}
                    {step === 0 ? (
                      <motion.div
                        key="s0"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h3 className="text-xl">What are we working on?</h3>
                        <p className="mt-2 text-sm text-navy-800/68">
                          Not sure? Start with the complimentary discovery call.
                        </p>

                        <div className="mt-6 space-y-2.5">
                          {bookingServices.map((s) => {
                            const active = form.service === s.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => set('service', s.id)}
                                className={[
                                  'flex w-full items-center justify-between gap-4 rounded-xl border px-4 py-3.5 text-left transition-all duration-300',
                                  active
                                    ? 'border-gold-500/70 bg-gold-500/[0.09]'
                                    : 'border-navy-900/10 bg-white hover:border-navy-900/22 hover:bg-sand',
                                ].join(' ')}
                              >
                                <span>
                                  <span className="block text-[16px] text-navy-950">{s.name}</span>
                                  <span className="mt-0.5 block text-[13px] text-navy-700/65">
                                    {s.meta}
                                  </span>
                                </span>
                                <span
                                  className={[
                                    'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition',
                                    active
                                      ? 'border-gold-400 bg-gold-400 text-navy-950'
                                      : 'border-white/25',
                                  ].join(' ')}
                                >
                                  {active ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {errors.service ? (
                          <p className="mt-3 text-[13px] text-red-300">{errors.service}</p>
                        ) : null}

                        <div className="mt-8">
                          <p className="label">How would you like to meet?</p>
                          <div className="grid gap-2.5 sm:grid-cols-3">
                            {consultTypes.map((t) => {
                              const active = form.format === t.id;
                              return (
                                <button
                                  key={t.id}
                                  type="button"
                                  onClick={() => set('format', t.id)}
                                  className={[
                                    'rounded-xl border px-4 py-3 text-left transition-all duration-300',
                                    active
                                      ? 'border-gold-500/70 bg-gold-500/[0.09]'
                                      : 'border-navy-900/10 hover:border-navy-900/22',
                                  ].join(' ')}
                                >
                                  <span className="block text-[15px] text-navy-950">{t.label}</span>
                                  <span className="mt-0.5 block text-[12px] text-navy-700/60">
                                    {t.hint}
                                  </span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}

                    {/* ── Step 2: Date & Time ── */}
                    {step === 1 ? (
                      <motion.div
                        key="s1"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h3 className="text-xl">When works for you?</h3>
                        <p className="mt-2 text-sm text-navy-800/68">
                          Requested times are confirmed by email within one business day.
                        </p>

                        <div className="mt-6 grid gap-5 sm:grid-cols-[1.15fr_0.85fr]">
                          <Calendar value={form.date} onChange={(iso) => set('date', iso)} />

                          <div>
                            <p className="label">Available times</p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
                              {timeSlots.map((t) => {
                                const active = form.time === t;
                                return (
                                  <button
                                    key={t}
                                    type="button"
                                    onClick={() => set('time', t)}
                                    className={[
                                      'rounded-xl border px-4 py-3 text-[15px] transition-all duration-300',
                                      active
                                        ? 'border-gold-500/70 bg-gold-500/[0.09] text-navy-950'
                                        : 'border-navy-900/10 text-navy-800/72 hover:border-navy-900/22 hover:text-navy-950',
                                    ].join(' ')}
                                  >
                                    {t}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        {errors.date || errors.time ? (
                          <p className="mt-3 text-[13px] text-red-300">
                            {errors.date ?? errors.time}
                          </p>
                        ) : null}
                      </motion.div>
                    ) : null}

                    {/* ── Step 3: Details ── */}
                    {step === 2 ? (
                      <motion.div
                        key="s2"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h3 className="text-xl">Tell us who you are</h3>
                        <p className="mt-2 text-sm text-navy-800/68">
                          Everything here stays private. We never share client information.
                        </p>

                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                          <div>
                            <label className="label" htmlFor="firstName">
                              First name
                            </label>
                            <input
                              id="firstName"
                              className="field"
                              value={form.firstName}
                              onChange={(e) => set('firstName', e.target.value)}
                              placeholder="Jane"
                              autoComplete="given-name"
                            />
                            {errors.firstName ? (
                              <p className="mt-1.5 text-[12px] text-red-300">{errors.firstName}</p>
                            ) : null}
                          </div>

                          <div>
                            <label className="label" htmlFor="lastName">
                              Last name
                            </label>
                            <input
                              id="lastName"
                              className="field"
                              value={form.lastName}
                              onChange={(e) => set('lastName', e.target.value)}
                              placeholder="Doe"
                              autoComplete="family-name"
                            />
                            {errors.lastName ? (
                              <p className="mt-1.5 text-[12px] text-red-300">{errors.lastName}</p>
                            ) : null}
                          </div>

                          <div>
                            <label className="label" htmlFor="email">
                              Email
                            </label>
                            <input
                              id="email"
                              type="email"
                              inputMode="email"
                              className="field"
                              value={form.email}
                              onChange={(e) => set('email', e.target.value)}
                              placeholder="jane@email.com"
                              autoComplete="email"
                            />
                            {errors.email ? (
                              <p className="mt-1.5 text-[12px] text-red-300">{errors.email}</p>
                            ) : null}
                          </div>

                          <div>
                            <label className="label" htmlFor="phone">
                              Phone
                            </label>
                            <input
                              id="phone"
                              type="tel"
                              inputMode="tel"
                              className="field"
                              value={form.phone}
                              onChange={(e) => set('phone', e.target.value)}
                              placeholder="(555) 123-4567"
                              autoComplete="tel"
                            />
                            {errors.phone ? (
                              <p className="mt-1.5 text-[12px] text-red-300">{errors.phone}</p>
                            ) : null}
                          </div>

                          <div>
                            <label className="label" htmlFor="budget">
                              Comfortable investment
                            </label>
                            <select
                              id="budget"
                              className="field"
                              value={form.budget}
                              onChange={(e) => set('budget', e.target.value)}
                            >
                              <option value="">Select a range</option>
                              {budgets.map((b) => (
                                <option key={b} value={b} className="bg-white text-navy-950">
                                  {b}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="label" htmlFor="referral">
                              How did you find us?
                            </label>
                            <select
                              id="referral"
                              className="field"
                              value={form.referral}
                              onChange={(e) => set('referral', e.target.value)}
                            >
                              <option value="">Select one</option>
                              {referrals.map((r) => (
                                <option key={r} value={r} className="bg-white text-navy-950">
                                  {r}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="sm:col-span-2">
                            <label className="label" htmlFor="notes">
                              What do you want out of this session?
                            </label>
                            <textarea
                              id="notes"
                              rows={4}
                              className="field resize-none"
                              value={form.notes}
                              onChange={(e) => set('notes', e.target.value)}
                              placeholder="The more specific, the better we can prepare."
                            />
                          </div>

                          <div className="sm:col-span-2">
                            <label className="flex cursor-pointer items-start gap-3 text-[14.5px] leading-relaxed text-navy-800/70">
                              <input
                                type="checkbox"
                                checked={form.consent}
                                onChange={(e) => set('consent', e.target.checked)}
                                className="mt-0.5 h-4 w-4 shrink-0 accent-[#d4af37]"
                              />
                              I agree to be contacted by {site.shortName} about this request. No
                              spam, and you can opt out any time.
                            </label>
                            {errors.consent ? (
                              <p className="mt-1.5 text-[12px] text-red-300">{errors.consent}</p>
                            ) : null}
                          </div>
                        </div>
                      </motion.div>
                    ) : null}

                    {/* ── Step 4: Confirm ── */}
                    {step === 3 ? (
                      <motion.div
                        key="s3"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -30 }}
                        transition={{ duration: 0.35 }}
                      >
                        <h3 className="text-xl">One last look</h3>
                        <p className="mt-2 text-sm text-navy-800/68">
                          Confirm the details and we will take it from here.
                        </p>

                        <div className="mt-6 space-y-3 rounded-2xl border border-gold-500/25 bg-gold-500/[0.05] p-5">
                          <Row icon={Sparkles} label="Session" value={selectedService?.name ?? '—'} />
                          <Row
                            icon={MapPin}
                            label="Format"
                            value={consultTypes.find((c) => c.id === form.format)?.label ?? '—'}
                          />
                          <Row icon={CalendarIcon} label="Date" value={formatLongDate(form.date)} />
                          <Row icon={Clock} label="Time" value={`${form.time} EST`} />
                          <Row
                            icon={User}
                            label="Name"
                            value={`${form.firstName} ${form.lastName}`}
                          />
                          <Row icon={Mail} label="Email" value={form.email} />
                          <Row icon={Phone} label="Phone" value={form.phone} />
                        </div>

                        {form.notes ? (
                          <div className="mt-4 rounded-xl border border-navy-900/10 bg-white p-4">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-navy-700/60">
                              Your notes
                            </p>
                            <p className="mt-2 text-[15px] leading-relaxed text-navy-800/75">
                              {form.notes}
                            </p>
                          </div>
                        ) : null}

                        {status === 'error' ? (
                          <p className="mt-4 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[14.5px] text-red-200">
                            {serverError} You can also email us directly at {site.email}.
                          </p>
                        ) : null}
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="mt-8 flex items-center justify-between gap-4 border-t border-navy-900/10 pt-6">
                  <button
                    type="button"
                    onClick={back}
                    disabled={step === 0}
                    className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em] text-navy-800/68 transition hover:text-navy-950 disabled:opacity-0"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Back
                  </button>

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={next}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%]"
                    >
                      Continue
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={submit}
                      disabled={status === 'sending'}
                      className="inline-flex items-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%] disabled:opacity-60"
                    >
                      {status === 'sending' ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          Confirm Booking
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-[15px]">
      <span className="flex items-center gap-2.5 text-navy-700/65">
        <Icon className="h-3.5 w-3.5 text-gold-600" />
        {label}
      </span>
      <span className="text-right text-navy-900">{value || '—'}</span>
    </div>
  );
}
