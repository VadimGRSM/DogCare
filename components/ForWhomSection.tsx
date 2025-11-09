import { Users, Heart, Star } from 'lucide-react';
import { Card } from './ui/card';

export function ForWhomSection() {
  const cards = [
    {
      icon: Users,
      title: 'Планую завести собаку',
      description: 'Допоможемо обрати породу, яка ідеально підійде для вашого способу життя',
      color: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      icon: Heart,
      title: 'Новий власник',
      description: 'Всі необхідні знання для перших днів з вашим новим другом',
      color: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
    {
      icon: Star,
      title: 'Досвідчений любитель',
      description: 'Поглиблені поради та рекомендації для професійного догляду',
      color: 'bg-amber-100',
      iconColor: 'text-amber-700',
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-stone-900 mb-4">Для кого цей сайт?</h2>
          <p className="text-stone-600">
            Незалежно від вашого досвіду, ми допоможемо стати найкращим другом для вашого улюбленця
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-lg transition-all duration-300 border-stone-200 rounded-2xl"
              >
                <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${card.iconColor}`} />
                </div>
                <h3 className="text-stone-900 mb-3">{card.title}</h3>
                <p className="text-stone-600">{card.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
