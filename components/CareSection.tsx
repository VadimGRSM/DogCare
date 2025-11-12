import { UtensilsCrossed, Sparkles, Footprints, GraduationCap, Moon } from 'lucide-react';
import { Card } from './ui/card';

export function CareSection() {
  const careItems = [
    {
      icon: UtensilsCrossed,
      title: 'Харчування',
      description: 'Збалансований раціон для здоров\'я та енергії',
    },
    {
      icon: Sparkles,
      title: 'Гігієна',
      description: 'Регулярний догляд за шерстю, зубами та нігтями',
    },
    {
      icon: Footprints,
      title: 'Прогулянки',
      description: 'Фізичні навантаження для здоров\'я',
    },
    {
      icon: GraduationCap,
      title: 'Дресирування',
      description: 'Навчання командам та поведінці',
    },
    {
      icon: Moon,
      title: 'Відпочинок',
      description: 'Створення затишного простору',
    },
  ];

  return (
    <section id="care" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-stone-900 mb-4">Догляд за собакою</h2>
          <p className="text-stone-600">
            Комплексний підхід до здоров'я та щастя вашого чотирилапого друга
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {careItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card
                key={index}
                className="p-6 border-stone-200 rounded-2xl hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-amber-700" />
                </div>
                <h3 className="text-stone-900 mb-2">{item.title}</h3>
                <p className="text-stone-600">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
