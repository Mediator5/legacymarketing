import Link from 'next/link';
import { site } from '@/lib/site';

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-light-depth px-6 text-center">
      <div>
        <p className="eyebrow justify-center">404</p>
        <h1 className="mt-5 text-4xl sm:text-5xl">
          This page did not make the <em className="not-italic text-gold-gradient">final edit</em>.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[17px] leading-relaxed text-navy-800/70">
          The link may have moved. Everything you need — services, process, and booking — lives on
          the home page.
        </p>
        <Link
          href="/"
          className="mt-9 inline-flex rounded-full bg-gold-sheen px-8 py-4 text-[13px] font-semibold uppercase tracking-[0.18em] text-navy-950"
        >
          Return to {site.shortName}
        </Link>
      </div>
    </main>
  );
}
