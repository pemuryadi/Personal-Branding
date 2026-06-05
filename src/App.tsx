import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { Motivation } from '@/src/components/Motivation';
import { About } from '@/src/components/About';
import { Ecosystem } from '@/src/components/Ecosystem';
import { Portfolio } from '@/src/components/Portfolio';
import { Footer } from '@/src/components/Footer';
import { ImpactStats } from '@/src/components/ImpactStats';
import { Testimonials } from '@/src/components/Testimonials';
import { ResourceHub } from '@/src/components/ResourceHub';
import { SpeakerBooking } from '@/src/components/SpeakerBooking';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Motivation />
        <ImpactStats />
        <About />
        <Ecosystem />
        <ResourceHub />
        <Portfolio />
        <Testimonials />
        <SpeakerBooking />
      </main>
      <Footer />
    </div>
  );
}
