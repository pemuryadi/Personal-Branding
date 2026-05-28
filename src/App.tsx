import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { Ecosystem } from '@/src/components/Ecosystem';
import { Portfolio } from '@/src/components/Portfolio';
import { Contact } from '@/src/components/Contact';
import { Footer } from '@/src/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Ecosystem />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
