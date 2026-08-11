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
  email: 'hello@legacymarketingandconsultingllc.com',
  phone: '+1 (000) 000-0000',
  phoneHref: 'tel:+10000000000',
  address: {
    street: '',
    city: 'Houston',
    region: 'TX',
    postalCode: '',
    country: 'US',
  },
  hours: 'Mon – Sat · 9:00 AM – 7:00 PM CST',
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
