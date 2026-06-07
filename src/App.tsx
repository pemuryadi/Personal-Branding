import { useState } from 'react';
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

export default function App() {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    if (activeTab === 'home') {
      return (
        <>
          <Hero />
          <Motivation />
          <ImpactStats />
          <About />
        </>
      );
    }
    if (activeTab === 'ekosistem') {
      return <Ecosystem />;
    }
    if (activeTab === 'portofolio') {
      return (
        <>
          <Portfolio />
          <Testimonials />
        </>
      );
    }
    if (activeTab.startsWith('unduhan-')) {
      const category = activeTab.replace('unduhan-', '');
      return <ResourceHub category={category} />;
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
