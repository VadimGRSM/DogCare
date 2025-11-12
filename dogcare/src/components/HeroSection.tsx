import { useState } from 'react';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { DogMatcherModal } from './DogMatcherModal';
import { Button } from './ui/button';

export function HeroSection() {
  const [matcherOpen, setMatcherOpen] = useState(false);

  return (
    <>
      <section id="home" className="relative bg-gradient-to-b from-amber-50/50 to-white py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Content */}
          <div className="space-y-8 max-w-xl">
            <div className="space-y-6">
              <h1 className="text-stone-900">
                Твій помічник у догляді за собакою
              </h1>
              <p className="text-stone-600 max-w-lg">
                Дізнайся як вибрати породу та забезпечити правильний догляд для твого чотирилапого друга
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setMatcherOpen(true)}
                className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 h-12 shadow-sm"
              >
                Підібрати породу
              </Button>
              <Button
                variant="outline"
                className="border-2 border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 rounded-full px-8 h-12"
              >
                Каталог порід
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-stone-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NjI2MzY3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Happy Golden Retriever"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          </div>
        </div>
      </section>

      <DogMatcherModal open={matcherOpen} onOpenChange={setMatcherOpen} />
    </>
  );
}
