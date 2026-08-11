import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, Clock, Gem, Info, Sparkles, Users } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { BreadcrumbSchema } from '@/components/Breadcrumbs';
import { PageCta } from '@/components/pages/PageCta';
import { ServiceBookButton } from '@/components/pages/ServiceBookButton';
import { BrandImage } from '@/components/ui/BrandImage';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion/Reveal';
import { generalServices, services } from '@/lib/services';
import { serviceDetails } from '@/lib/service-details';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Beauty consultation, fine jewelry guidance, personal image and style consulting, jewelry wardrobe curation, bridal direction, and presence coaching — with full detail on what each session includes.',
  alternates: { canonical: '/services' },
  openGraph: {
    title: `Services · ${site.name}`,
    description:
      'Six consultation services for women, plus business and brand consulting. What happens in each session and what you leave with.',
    url: `${site.url}/services`,
  },
};

export default function ServicesPage() {
  const beauty = services.filter((s) => s.category === 'beauty');
  const jewelry = services.filter((s) => s.category === 'jewelry');

  return (
    <main>
      <BreadcrumbSchema name="Services" path="/services" />
      <PageHero
        breadcrumb="Services"
        eyebrow="Beauty · Image · Fine jewelry"
        title="Every session ends with something"
        accent="written down."
        intro="Six services, each built around one question: what would actually make the biggest difference for you? Below is the full detail — who each session is for, what happens in the room, and exactly what you take home."
      />

      {/* ── Index ─────────────────────────────────────── */}
      <section className="relative border-b border-navy-900/8 bg-sand py-10">
        <div className="container-luxe">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="mr-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-700">
              Jump to
            </span>
            {services.map((s) => (
              <Link
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-navy-900/12 bg-white px-4 py-2 text-[13px] text-navy-800/80 transition hover:border-gold-500/60 hover:text-navy-950"
              >
                {s.name}
              </Link>
            ))}
            <Link
              href="#consulting"
              className="rounded-full border border-navy-900/12 bg-white px-4 py-2 text-[13px] text-navy-800/80 transition hover:border-gold-500/60 hover:text-navy-950"
            >
              Business Consulting
            </Link>
          </div>
        </div>
      </section>

      {/* ── Overview cards ────────────────────────────── */}
      <section className="relative py-20 sm:py-24">
        <div className="container-luxe">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal direction="right">
              <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-8 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/[0.08] text-gold-700">
                  <Sparkles className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-2xl">Beauty &amp; image</h2>
                <p className="mt-3 leading-relaxed text-navy-800/72">
                  Skin, colour, wardrobe, and presence. Four services that work alone or stack into a
                  full reset.
                </p>
                <ul className="mt-5 space-y-2">
                  {beauty.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className="text-[15px] text-gold-700 transition hover:text-gold-800"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="left">
              <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-8 shadow-card">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/[0.08] text-gold-700">
                  <Gem className="h-5 w-5" />
                </span>
                <h2 className="mt-5 text-2xl">Fine jewelry</h2>
                <p className="mt-3 leading-relaxed text-navy-800/72">
                  Buying advice, inherited-piece assessment, and building a collection with intent.
                  We take no commission from any seller.
                </p>
                <ul className="mt-5 space-y-2">
                  {jewelry.map((s) => (
                    <li key={s.id}>
                      <Link
                        href={`#${s.id}`}
                        className="text-[15px] text-gold-700 transition hover:text-gold-800"
                      >
                        {s.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Full detail per service ───────────────────── */}
      {services.map((service, i) => {
        const detail = serviceDetails[service.id];
        const dark = i % 2 === 1;
        const flip = i % 2 === 1;

        return (
          <section
            key={service.id}
            id={service.id}
            className={`relative overflow-hidden py-20 sm:py-24 ${dark ? 'bg-navy-depth' : ''}`}
          >
            {dark ? (
              <div className="pointer-events-none absolute inset-0 opacity-[0.03] noise" aria-hidden />
            ) : null}

            <div className="container-luxe relative grid items-start gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
              {/* Image + facts */}
              <Reveal
                direction={flip ? 'left' : 'right'}
                className={flip ? 'lg:order-2' : ''}
              >
                <div className="lg:sticky lg:top-40">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-navy-900/10 shadow-luxe">
                    <BrandImage
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 1024px) 90vw, 42vw"
                      className="object-cover"
                    />
                  </div>

                  <div
                    className={`mt-6 rounded-2xl border p-6 ${
                      dark
                        ? 'border-white/10 bg-white/[0.04]'
                        : 'border-navy-900/10 bg-white shadow-card'
                    }`}
                  >
                    <dl className="space-y-4">
                      <div className="flex items-center justify-between gap-4">
                        <dt
                          className={`flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] ${
                            dark ? 'text-white/45' : 'text-navy-700/60'
                          }`}
                        >
                          <Clock className="h-3.5 w-3.5 text-gold-600" />
                          Length
                        </dt>
                        <dd className={dark ? 'text-white' : 'text-navy-950'}>{service.duration}</dd>
                      </div>

                      {service.investment ? (
                        <div className="flex items-center justify-between gap-4">
                          <dt
                            className={`flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] ${
                              dark ? 'text-white/45' : 'text-navy-700/60'
                            }`}
                          >
                            <Sparkles className="h-3.5 w-3.5 text-gold-600" />
                            Investment
                          </dt>
                          <dd className={dark ? 'text-gold-300' : 'text-gold-700'}>
                            {service.investment}
                          </dd>
                        </div>
                      ) : null}

                      <div className="flex items-center justify-between gap-4">
                        <dt
                          className={`flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] ${
                            dark ? 'text-white/45' : 'text-navy-700/60'
                          }`}
                        >
                          <Users className="h-3.5 w-3.5 text-gold-600" />
                          Format
                        </dt>
                        <dd className={dark ? 'text-white' : 'text-navy-950'}>
                          Virtual or in person
                        </dd>
                      </div>
                    </dl>

                    <ServiceBookButton serviceId={service.id} dark={dark} />
                  </div>
                </div>
              </Reveal>

              {/* Copy */}
              <div className={flip ? 'lg:order-1' : ''}>
                <Reveal>
                  <span className={`eyebrow ${dark ? 'text-gold-300' : ''}`}>
                    <span
                      className={`h-px w-8 ${dark ? 'bg-gold-400/70' : 'bg-gold-600/70'}`}
                      aria-hidden
                    />
                    {service.category === 'jewelry' ? 'Fine jewelry' : 'Beauty & image'}
                  </span>
                </Reveal>

                <Reveal delay={0.06}>
                  <h2
                    className={`mt-5 text-4xl leading-[1.13] sm:text-5xl ${dark ? 'text-white' : ''}`}
                  >
                    {service.name}
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p
                    className={`mt-5 text-lg leading-relaxed ${
                      dark ? 'text-white/65' : 'text-navy-800/78'
                    }`}
                  >
                    {service.summary}
                  </p>
                </Reveal>

                {detail ? (
                  <>
                    <Reveal delay={0.14}>
                      <div
                        className={`mt-8 rounded-xl border-l-2 border-gold-500/70 py-1 pl-6 ${
                          dark ? 'text-white/70' : 'text-navy-800/78'
                        }`}
                      >
                        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-gold-700">
                          Who it is for
                        </p>
                        <p className="mt-2.5 leading-relaxed">{detail.forWho}</p>
                      </div>
                    </Reveal>

                    <Reveal delay={0.18}>
                      <h3 className={`mt-10 text-2xl ${dark ? 'text-white' : ''}`}>
                        What happens in the session
                      </h3>
                      <ol className="mt-5 space-y-4">
                        {detail.whatHappens.map((step, n) => (
                          <li key={step} className="flex gap-4">
                            <span
                              className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[13px] ${
                                dark
                                  ? 'border-gold-500/40 text-gold-300'
                                  : 'border-gold-500/45 text-gold-700'
                              }`}
                            >
                              {n + 1}
                            </span>
                            <p
                              className={`leading-relaxed ${
                                dark ? 'text-white/65' : 'text-navy-800/75'
                              }`}
                            >
                              {step}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </Reveal>

                    <Reveal delay={0.22}>
                      <h3 className={`mt-10 text-2xl ${dark ? 'text-white' : ''}`}>
                        What you leave with
                      </h3>
                      <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                        {detail.leaveWith.map((item) => (
                          <li
                            key={item}
                            className={`flex gap-3 rounded-xl border p-4 text-[15px] leading-snug ${
                              dark
                                ? 'border-white/10 bg-white/[0.03] text-white/70'
                                : 'border-navy-900/10 bg-white text-navy-800/78 shadow-card'
                            }`}
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>

                    <Reveal delay={0.26}>
                      <div
                        className={`mt-8 flex gap-3.5 rounded-xl p-5 ${
                          dark ? 'bg-gold-500/[0.09]' : 'bg-gold-500/[0.09]'
                        }`}
                      >
                        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                        <p
                          className={`text-[15px] leading-relaxed ${
                            dark ? 'text-white/70' : 'text-navy-800/78'
                          }`}
                        >
                          <span className="font-semibold text-gold-700">Good to know · </span>
                          {detail.goodToKnow}
                        </p>
                      </div>
                    </Reveal>
                  </>
                ) : null}
              </div>
            </div>
          </section>
        );
      })}

      {/* ── Business consulting ───────────────────────── */}
      <section id="consulting" className="relative overflow-hidden py-24 sm:py-28">
        <div className="absolute inset-0 bg-sand-depth" aria-hidden />

        <div className="container-luxe relative">
          <div className="max-w-3xl">
            <Reveal>
              <span className="eyebrow">
                <span className="h-px w-8 bg-gold-600/70" aria-hidden />
                The other half of the name
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-5 text-4xl leading-[1.13] sm:text-5xl">
                Marketing and business{' '}
                <em className="not-italic text-gold-gradient">consulting</em>
              </h2>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-5 text-lg leading-relaxed text-navy-800/75">
                Same eye, same directness, applied to the business rather than the person. Scoped and
                quoted per engagement after a discovery call.
              </p>
            </Reveal>
          </div>

          <StaggerGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {generalServices.map((s, i) => (
              <StaggerItem key={s.title}>
                <div className="h-full rounded-2xl border border-navy-900/10 bg-white p-7 shadow-card transition-shadow duration-300 hover:shadow-card-hover">
                  <p className="text-[12px] uppercase tracking-[0.2em] text-gold-600/80">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="mt-3 text-xl leading-snug">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-navy-800/72">{s.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <PageCta
        title="Not sure which one you"
        accent="actually need?"
        body="That is what the discovery call is for. Twenty minutes, no charge, and we will tell you honestly which session solves your problem — or whether none of them do."
        cta="Book the Free Call"
        service="discovery"
      />
    </main>
  );
}
