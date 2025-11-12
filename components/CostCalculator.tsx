import { useState } from 'react';
import { Calculator, Clock, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CostCalculatorModal } from './CostCalculatorModal';

export function CostCalculator() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section id="costs" className="py-24 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="rounded-2xl overflow-hidden border-stone-200 shadow-sm">
            <div className="grid md:grid-cols-2">
              {/* Left side - Content */}
              <div className="p-10 lg:p-12 bg-white">
                <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center mb-6">
                  <Calculator className="w-7 h-7 text-amber-700" />
                </div>
                
                <h2 className="text-stone-900 mb-4">
                  Калькулятор витрат
                </h2>
                
                <p className="text-stone-600 mb-8 max-w-md">
                  Розрахуйте витрати на корм, ветеринарні послуги, аксесуари та визначте скільки часу потрібно для догляду
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <DollarSign className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="text-stone-900 mb-1">Фінансові витрати</h4>
                      <p className="text-stone-600">Щомісячні та річні витрати</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="text-stone-900 mb-1">Часові витрати</h4>
                      <p className="text-stone-600">Прогулянки, догляд та тренування</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={() => setModalOpen(true)}
                  className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-8 h-12 shadow-sm"
                >
                  Розпочати розрахунок
                </Button>
              </div>

            {/* Right side - Visual */}
            <div className="bg-gradient-to-br from-amber-50 to-stone-100 p-10 lg:p-12 flex items-center justify-center">
              <div className="space-y-4 w-full max-w-sm">
                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-stone-700">Щомісячні витрати</span>
                    <span className="text-amber-700">~2500 ₴</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-amber-600 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-stone-700">Час на догляд</span>
                    <span className="text-amber-700">2-3 год/день</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-amber-600 rounded-full"></div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-stone-700">Ветеринарні візити</span>
                    <span className="text-amber-700">2-4 рази/рік</span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div className="h-full w-1/2 bg-amber-600 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>

    <CostCalculatorModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  );
}
