import { Hero } from '@/components/Hero';
import { TrustMarquee } from '@/components/TrustMarquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { JewelryFeature } from '@/components/JewelryFeature';
import { Process } from '@/components/Process';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { AdditionalServices } from '@/components/AdditionalServices';
import { CtaBanner } from '@/components/CtaBanner';
import { Faq } from '@/components/Faq';
import { BookingSection } from '@/components/booking/BookingSection';
import { StructuredData } from '@/components/StructuredData';

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <main>
        <Hero />
        <TrustMarquee />
        <About />
        <Services />
        <JewelryFeature />
        <Process />
        <Gallery />
        <Testimonials />
        <AdditionalServices />
        <CtaBanner />
        <Faq />
        <BookingSection />
      </main>
    </>
  );
}
