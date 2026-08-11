import { faqs } from '@/lib/faqs';
import { services } from '@/lib/services';
import { site } from '@/lib/site';

export function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService', 'HealthAndBeautyBusiness'],
        '@id': `${site.url}/#business`,
        name: site.legalName,
        alternateName: site.name,
        url: site.url,
        description: site.description,
        logo: `${site.url}/icon.png`,
        image: `${site.url}/og.png`,
        email: site.email,
        telephone: site.phone,
        foundingDate: String(site.established),
        slogan: site.tagline,
        priceRange: '$$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: site.address.city,
          addressRegion: site.address.region,
          addressCountry: site.address.country,
        },
        areaServed: [
          { '@type': 'Country', name: 'United States' },
          { '@type': 'City', name: site.address.city },
        ],
        sameAs: Object.values(site.socials),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
            ],
            opens: '09:00',
            closes: '19:00',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Consultation Services',
          itemListElement: services.map((s) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: s.name,
              description: s.summary,
              serviceType: s.category,
              provider: { '@id': `${site.url}/#business` },
            },
          })),
        },
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${site.url}/#booking`,
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          result: { '@type': 'Reservation', name: 'Consultation booking' },
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${site.url}/#website`,
        url: site.url,
        name: site.name,
        publisher: { '@id': `${site.url}/#business` },
        inLanguage: 'en-US',
      },
      {
        '@type': 'FAQPage',
        '@id': `${site.url}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
