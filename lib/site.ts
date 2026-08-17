export const site = {
  name: 'Legacy Marketing & Consulting LLC',
  shortName: 'Legacy',
  legalName: 'Legacy Marketing and Consulting LLC',
  domain: 'legacymarketingandconsultingllc.com',
  url: 'https://legacymarketingandconsultingllc.com',
  established: 2022,
  tagline: 'Strategize · Elevate · Build · Leave a Legacy',
  headline: 'Making women beautiful',
  description:
    'Luxury beauty, image, and fine jewelry consultation for women who are ready to be seen. Private one-on-one sessions, curated jewelry guidance, and consulting that builds a legacy.',
  // ── Edit these before launch ─────────────────────────────
  email: 'legacyconsultingllc2022@gmail.com',
  phone: '(302) 287-0092',
  phoneHref: 'tel:+13022870092',
  address: {
    street: '',
    city: 'Wilmington',
    region: 'DE',
    postalCode: '',
    country: 'US',
  },
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM EST',
  socials: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    linkedin: 'https://linkedin.com/',
    tiktok: 'https://tiktok.com/',
  },
} as const;

/** Top-level pages. Anchor links now live under the page they belong to. */
export const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Jewelry', href: '/services#jewelry' },
  { label: 'Process', href: '/#process' },
  { label: 'Results', href: '/#results' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerLinks = {
  explore: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Process', href: '/#process' },
    { label: 'Client Results', href: '/#results' },
    { label: 'FAQ', href: '/#faq' },
  ],
} as const;
