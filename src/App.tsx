import { useEffect, useState } from 'react';
import { Navbar } from '@/src/components/Navbar';
import { Hero } from '@/src/components/Hero';
import { Motivation } from '@/src/components/Motivation';
import { About } from '@/src/components/About';
import { Ecosystem } from '@/src/components/Ecosystem';
import { NewsUpdate } from '@/src/components/NewsUpdate';
import { Portfolio } from '@/src/components/Portfolio';
import { Footer } from '@/src/components/Footer';
import { ArticlePage } from '@/src/components/ArticlePage';

export default function App() {
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setHash(window.location.hash);
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const isDetailView = hash.startsWith('#artikel/');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {isDetailView ? (
          <ArticlePage />
        ) : (
          <>
            <Hero />
            <Motivation />
            <About />
            <Ecosystem />
            <ArticlePage />
            <NewsUpdate />
            <Portfolio />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
