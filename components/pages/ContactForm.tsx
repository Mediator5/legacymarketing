'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Check, Loader2, Send } from 'lucide-react';
import { site } from '@/lib/site';

const topics = [
  'General enquiry',
  'Beauty or image consultation',
  'Fine jewelry consultation',
  'Bridal or event',
  'Business or marketing consulting',
  'Press or partnership',
];

const emailRe = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

type Fields = {
  name: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  website: string;
};

const empty: Fields = {
  name: '',
  email: '',
  phone: '',
  topic: topics[0],
  message: '',
  website: '',
};

export function ContactForm() {
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Partial<Record<keyof Fields, string>> = {};
    if (!form.name.trim()) next.name = 'Please tell us your name.';
    if (!emailRe.test(form.email)) next.email = 'Enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'A sentence or two is plenty.';

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus('sending');
    setServerError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Something went wrong.');
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setServerError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (status === 'done') {
    return (
      <div className="flex min-h-[440px] flex-col items-center justify-center rounded-2xl border border-navy-900/10 bg-white p-10 text-center shadow-card">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          className="flex h-20 w-20 items-center justify-center rounded-full bg-gold-sheen text-navy-950"
        >
          <Check className="h-9 w-9" strokeWidth={3} />
        </motion.span>

        <h3 className="mt-8 text-3xl">Message sent</h3>
        <p className="mt-4 max-w-sm leading-relaxed text-navy-800/72">
          Thank you, {form.name.split(' ')[0]}. We read every message ourselves and reply within one
          business day.
        </p>

        <button
          onClick={() => {
            setForm(empty);
            setStatus('idle');
          }}
          className="mt-8 rounded-full border border-gold-500/45 px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-gold-700 transition hover:bg-gold-500/10"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-navy-900/10 bg-white p-6 shadow-card sm:p-9"
      noValidate
    >
      <h2 className="text-2xl">Send us a message</h2>
      <p className="mt-2 text-navy-800/70">
        For anything that is not a booking — questions, quotes, partnerships, or press.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="c-name">
            Your name
          </label>
          <input
            id="c-name"
            className="field"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Jane Doe"
            autoComplete="name"
          />
          {errors.name ? <p className="mt-1.5 text-[13px] text-red-600">{errors.name}</p> : null}
        </div>

        <div>
          <label className="label" htmlFor="c-email">
            Email
          </label>
          <input
            id="c-email"
            type="email"
            inputMode="email"
            className="field"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="jane@email.com"
            autoComplete="email"
          />
          {errors.email ? <p className="mt-1.5 text-[13px] text-red-600">{errors.email}</p> : null}
        </div>

        <div>
          <label className="label" htmlFor="c-phone">
            Phone <span className="normal-case tracking-normal text-navy-700/50">(optional)</span>
          </label>
          <input
            id="c-phone"
            type="tel"
            inputMode="tel"
            className="field"
            value={form.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder="(555) 123-4567"
            autoComplete="tel"
          />
        </div>

        <div>
          <label className="label" htmlFor="c-topic">
            What is this about?
          </label>
          <select
            id="c-topic"
            className="field"
            value={form.topic}
            onChange={(e) => set('topic', e.target.value)}
          >
            {topics.map((t) => (
              <option key={t} value={t} className="bg-white text-navy-950">
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="label" htmlFor="c-message">
            Message
          </label>
          <textarea
            id="c-message"
            rows={6}
            className="field resize-none"
            value={form.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="Tell us what you are working on and what you would like help with."
          />
          {errors.message ? (
            <p className="mt-1.5 text-[13px] text-red-600">{errors.message}</p>
          ) : null}
        </div>

        {/* Honeypot */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          value={form.website}
          onChange={(e) => set('website', e.target.value)}
          className="hidden"
        />
      </div>

      {status === 'error' ? (
        <p className="mt-5 rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-[15px] text-red-700">
          {serverError} You can also email us directly at {site.email}.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="group mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gold-sheen bg-[length:200%_auto] px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-950 shadow-gold-glow transition-all duration-300 hover:bg-[position:100%_50%] disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending
          </>
        ) : (
          <>
            Send Message
            <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>

      <p className="mt-4 text-[14px] text-navy-700/60">
        We reply within one business day. Your details stay private — see our{' '}
        <a href="/privacy" className="text-gold-700 underline-offset-2 hover:underline">
          privacy policy
        </a>
        .
      </p>
    </form>
  );
}
