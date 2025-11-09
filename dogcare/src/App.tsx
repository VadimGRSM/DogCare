import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ForWhomSection } from './components/ForWhomSection';
import { BreedCatalog } from './components/BreedCatalog';
import { CareSection } from './components/CareSection';
import { CostCalculator } from './components/CostCalculator';
import { VetAdvice } from './components/VetAdvice';
import { Footer } from './components/Footer';
import { Toaster } from './components/ui/sonner';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <ForWhomSection />
        <BreedCatalog />
        <CareSection />
        <CostCalculator />
        <VetAdvice />
      </main>
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
