import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { BookNowLink } from '@/components/booking/BookNowLink';
import { footerLinks, site } from '@/lib/site';
import { services } from '@/lib/services';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/10 bg-ink">
      <div className="container-luxe py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Image
              src="/logo-web.png"
              alt={`${site.name} logo`}
              width={520}
              height={347}
              className="h-24 w-auto"
            />
            <p className="mt-6 max-w-sm text-[15.5px] leading-relaxed text-white/50">
              Luxury beauty, image, and fine jewelry consultation for women — plus the marketing and
              business consulting that builds something worth passing down.
            </p>

            <div className="mt-7 flex gap-3">
              {[
                { href: site.socials.instagram, icon: Instagram, label: 'Instagram' },
                { href: site.socials.facebook, icon: Facebook, label: 'Facebook' },
                { href: site.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/55 transition hover:border-gold-500/50 hover:text-gold-300"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-[0.2em] text-gold-300">Explore</h3>
            <ul className="mt-5 space-y-3">
              {footerLinks.explore.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[15.5px] text-white/55 transition hover:text-gold-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <BookNowLink className="text-[15.5px] text-white/55 transition hover:text-gold-200">
                  Book Now
                </BookNowLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-[0.2em] text-gold-300">Services</h3>
            <ul className="mt-5 space-y-3">
              {services.slice(0, 5).map((s) => (
                <li key={s.id}>
                  <Link
                    href={`/services#${s.id}`}
                    className="text-[15.5px] leading-snug text-white/55 transition hover:text-gold-200"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[12px] uppercase tracking-[0.2em] text-gold-300">Contact</h3>
            <ul className="mt-5 space-y-4 text-[15.5px] text-white/55">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" />
                <a href={`mailto:${site.email}`} className="break-all transition hover:text-gold-200">
                  {site.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" />
                <a href={site.phoneHref} className="transition hover:text-gold-200">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-500/70" />
                <span>
                  {site.address.city}, {site.address.region}
                  <br />
                  <span className="text-white/35">{site.hours}</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 hairline" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
          <p className="text-[13.5px] text-white/35">
            © {year} {site.legalName}. All rights reserved.
          </p>
          <p className="font-display text-[14.5px] italic tracking-wide text-gold-500/70">
            {site.tagline}
          </p>
          <div className="flex gap-6 text-[13.5px] text-white/35">
            <Link href="/privacy" className="transition hover:text-gold-200">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-gold-200">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
