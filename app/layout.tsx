import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';
import { BookingProvider } from '@/components/booking/BookingProvider';
import { site } from '@/lib/site';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#060d1c',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Beauty, Image & Fine Jewelry Consultation for Women`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    'beauty consultant for women',
    'jewelry consultation',
    'fine jewelry consultant',
    'personal image consultant',
    'color analysis',
    'personal stylist',
    'bridal beauty consultant',
    'business consulting',
    'brand strategy',
    'Legacy Marketing and Consulting LLC',
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Making Women Beautiful`,
    description: site.description,
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${site.name} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} · Making Women Beautiful`,
    description: site.description,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [{ url: '/icon.png', type: 'image/png', sizes: '512x512' }],
    apple: [{ url: '/apple-icon.png', sizes: '180x180' }],
    shortcut: '/icon.png',
  },
  category: 'beauty',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen overflow-x-hidden">
        <BookingProvider>{children}</BookingProvider>
      </body>
    </html>
  );
}
