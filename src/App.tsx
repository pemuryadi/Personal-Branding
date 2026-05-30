import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { Motivation } from '@/src/components/Motivation';
import { About } from '@/src/components/About';
import { Ecosystem } from '@/src/components/Ecosystem';
import { Portfolio } from '@/src/components/Portfolio';
import { Footer } from '@/src/components/Footer';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Motivation />
        <About />
        <Ecosystem />
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
}
