import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, BookOpen, Eye, HeartHandshake, Lock, Ruler } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { BreadcrumbSchema } from '@/components/Breadcrumbs';
import { PageCta } from '@/components/pages/PageCta';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { images } from '@/lib/images';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: `How ${site.legalName} approaches beauty, image, and fine jewelry consultation for women — our standards, our process, and what we refuse to do.`,
  alternates: { canonical: '/about' },
  openGraph: {
    title: `About · ${site.name}`,
    description:
      'A private consultation practice built on undertone, proportion, and honest advice — not trends.',
    url: `${site.url}/about`,
  },
};

const principles = [
  {
    icon: Eye,
    title: 'We look before we recommend',
    body: 'Every session starts with what you already own. Half of what most women need is sitting in a drawer being worn wrong. We find that first, because free is a better answer than expensive.',
  },
  {
    icon: Lock,
    title: 'Nothing leaves the room',
    body: 'Sessions are one-to-one and confidential. We do not post client photos, share names, or use your session as content unless you ask us to and put it in writing.',
  },
  {
    icon: Ruler,
    title: 'Specific beats flattering',
    body: 'If a colour is fighting your undertone or a setting will not survive your job, you will hear it plainly. Politeness that costs you money is not kindness.',
  },
  {
    icon: BookOpen,
    title: 'You leave with it written down',
    body: 'Advice you cannot remember is advice you did not get. Every engagement ends in a written blueprint — products, palettes, pieces, and the order to buy them in.',
  },
  {
    icon: HeartHandshake,
    title: 'No commission, no pressure',
    body: 'We do not take kickbacks from jewellers or brands. When we send you somewhere, it is because we would send our own family there.',
  },
  {
    icon: Award,
    title: 'Taste is not a budget',
    body: 'We work at every price point and say so out loud. The most elegant woman in the room is rarely the one who spent the most.',
  },
];

const wedo = [
  'Tell you when a cheaper option is the better option',
  'Give you the vocabulary to negotiate for yourself',
  'Work around your actual mornings, not an ideal routine',
  'Put every recommendation in writing',
];

const wedont = [
  'Sell you products we profit from',
  'Push a trend that expires next season',
  'Make you feel small about what you did not know',
  'Publish your photos or your name without permission',
];

const timeline = [
  {
    year: '2022',
    title: 'The practice opens',
    body: `${site.legalName} is founded on a simple observation: women were being sold to, not advised. The first clients come by word of mouth and most still book today.`,
  },
  {
    year: '2023',
    title: 'Jewelry becomes its own discipline',
    body: 'After too many clients arrive holding receipts for pieces they did not understand, fine jewelry consultation becomes a standalone service with its own framework.',
  },
  {
    year: '2024',
    title: 'The written blueprint',
    body: 'We formalise what clients kept asking for — a document they keep, with priorities and price ranges, so the session survives past the session.',
  },
  {
    year: 'Today',
    title: 'Beauty, image, and the business behind it',
    body: 'The consulting side grows alongside the beauty practice, because a woman building a brand needs both to say the same thing.',
  },
];

export default function AboutPage() {
  return (
    <main>
      <BreadcrumbSchema name="About" path="/about" />
      <PageHero
        breadcrumb="About"
        eyebrow={`Established ${site.established}`}
        title="A consultation practice, not a"
        accent="sales floor."
        intro="We built this for the woman who has been told what suits her by people who had something to sell. No commissions, no trends for the sake of trends — just an honest read on what actually works on you, written down so you can act on it."
      />

      {/* ── Story ─────────────────────────────────────── */}
      <section className="relative py-24 sm:py-28">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold-600/70" aria-hidden />
                Why we started
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.14] sm:text-5xl">
                It started with a woman and a{' '}
                <em className="not-italic text-gold-gradient">receipt</em>.
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-lg leading-relaxed text-navy-800/78">
              <Reveal delay={0.1}>
                <p>
                  She had spent four figures on a ring. She could not tell us the metal, the setting,
                  or whether it had been certified. What she could tell us was that the salesperson
                  had been very kind, and that she had felt too embarrassed to ask a second question.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <p>
                  That is the gap this practice was built to close. Not because women lack taste —
                  most have more than they are given credit for — but because nobody hands them the
                  language. Undertone. Proportion. Clarity grade. Provenance. Once you have the
                  words, the intimidation goes, and what is left is a decision you can make yourself.
                </p>
              </Reveal>

              <Reveal delay={0.18}>
                <p>
                  Since {site.established} we have run that same conversation hundreds of times, in
                  living rooms, over video, and standing in front of jewellery counters. The service
                  menu grew. The principle has not moved.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.24}>
              <p className="mt-8 border-l-2 border-gold-500/60 pl-6 font-display text-2xl italic leading-snug text-navy-950">
                &ldquo;A woman who knows how she looks moves through a room differently. Everything
                we do is in service of that.&rdquo;
              </p>
            </Reveal>
          </div>

          <Reveal direction="left" delay={0.1}>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-navy-900/10 shadow-luxe">
                <BrandImage
                  src={images.aboutPrimary}
                  alt="Private consultation session"
                  fill
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover"
                />
              </div>

              <div className="absolute -bottom-7 -left-5 hidden w-56 rounded-2xl border border-navy-900/10 bg-white p-5 shadow-card sm:block">
                <p className="font-display text-4xl text-gold-gradient">400+</p>
                <p className="mt-1 text-[13px] leading-snug text-navy-800/70">
                  women advised since {site.established}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Principles ────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy-depth py-24 sm:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />

        <div className="container-luxe relative">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow text-gold-300">
                <span className="h-px w-8 bg-gold-400/70" aria-hidden />
                How we work
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.13] text-white sm:text-5xl">
                Six rules we do not{' '}
                <em className="not-italic text-gold-gradient-dark">bend</em>.
              </h2>
            </Reveal>
          </div>

          <StaggerGroup className="mt-14 grid gap-x-10 gap-y-11 sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/[0.08] text-gold-300 transition-colors duration-300 group-hover:border-gold-400/70 group-hover:bg-gold-500/15">
                    <p.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-5 text-xl text-white">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-white/60">{p.body}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── We will / we won't ────────────────────────── */}
      <section className="relative py-24 sm:py-28">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <span className="eyebrow justify-center">
                <span className="h-px w-8 bg-gold-600/70" aria-hidden />
                Plainly stated
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.13] sm:text-5xl">
                What you can and cannot{' '}
                <em className="not-italic text-gold-gradient">expect</em>
              </h2>
            </Reveal>
          </div>

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <Reveal direction="right">
              <div className="h-full rounded-2xl border border-gold-500/30 bg-white p-8 shadow-card">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-700">
                  We will
                </p>
                <ul className="mt-6 space-y-4">
                  {wedo.map((t) => (
                    <li key={t} className="flex gap-3.5 leading-relaxed text-navy-800/80">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="h-full rounded-2xl border border-navy-900/10 bg-sand p-8">
                <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-navy-700/70">
                  We will not
                </p>
                <ul className="mt-6 space-y-4">
                  {wedont.map((t) => (
                    <li key={t} className="flex gap-3.5 leading-relaxed text-navy-800/70">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900/30" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────── */}
      <section className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-sand-depth" aria-hidden />

        <div className="container-luxe relative">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold-600/70" aria-hidden />
                The road here
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.13] sm:text-5xl">
                Built slowly, on{' '}
                <em className="not-italic text-gold-gradient">repeat clients</em>.
              </h2>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <Reveal key={t.year} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 shadow-card">
                  <p className="font-display text-3xl text-gold-gradient">{t.year}</p>
                  <h3 className="mt-4 text-lg leading-snug">{t.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-navy-800/70">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Who this is for ───────────────────────────── */}
      <section className="relative py-24 sm:py-28">
        <div className="container-luxe grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal direction="right">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] border border-navy-900/10 shadow-luxe">
              <BrandImage
                src={images.serviceImage}
                alt="Client during an image consultation"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold-600/70" aria-hidden />
                Who we serve
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.14] sm:text-5xl">
                You do not need to be{' '}
                <em className="not-italic text-gold-gradient">ready</em>.
              </h2>
            </Reveal>

            <div className="mt-7 space-y-5 text-lg leading-relaxed text-navy-800/78">
              <Reveal delay={0.1}>
                <p>
                  Our clients are attorneys and nurses, founders and grandmothers. Some arrive for a
                  wedding. Some arrive after a divorce. Some arrive because they caught themselves in
                  a photograph and did not recognise the woman looking back.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p>
                  What they share is not a budget or an age. It is the point where &ldquo;good
                  enough&rdquo; stopped being good enough. If you have read this far, you are
                  probably already there.
                </p>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <Link
                href="/services"
                className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-gold-500/45 px-8 py-4 text-[13px] font-medium uppercase tracking-[0.18em] text-gold-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-500/10"
              >
                See the full service list
                <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <PageCta
        eyebrow="No obligation"
        title="Twenty minutes will tell you"
        accent="whether we fit."
        body="The discovery call is free and there is no pitch at the end of it. Some calls finish with us pointing you somewhere else entirely. That is a good outcome too."
        cta="Book the Free Call"
        service="discovery"
      />
    </main>
  );
}
