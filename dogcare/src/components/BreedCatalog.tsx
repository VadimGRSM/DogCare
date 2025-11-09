import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function BreedCatalog() {
  const breeds = [
    {
      name: 'Німецька вівчарка',
      image: 'https://images.unsplash.com/photo-1605725657590-b2cf0d31b1a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZXJtYW4lMjBzaGVwaGVyZCUyMGRvZ3xlbnwxfHx8fDE3NjI2NTY1OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      character: 'Розумна, відважна, відданна',
      size: 'Велика',
    },
    {
      name: 'Лабрадор ретрівер',
      image: 'https://images.unsplash.com/photo-1672838564909-4ddfd78c7e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWJyYWRvciUyMHJldHJpZXZlciUyMHB1cHB5fGVufDF8fHx8MTc2MjY4ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      character: 'Дружелюбна, активна, ігрива',
      size: 'Велика',
    },
    {
      name: 'Французький бульдог',
      image: 'https://images.unsplash.com/photo-1561754050-9a1ee0470c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVuY2glMjBidWxsZG9nfGVufDF8fHx8MTc2MjY4ODU1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      character: 'Ласкава, спокійна, компанейська',
      size: 'Маленька',
    },
    {
      name: 'Хаскі',
      image: 'https://images.unsplash.com/photo-1590419690008-905895e8fe0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxodXNreSUyMGRvZ3xlbnwxfHx8fDE3NjI1ODgwMjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      character: 'Енергійна, незалежна, товариська',
      size: 'Велика',
    },
    {
      name: 'Біль',
      image: 'https://images.unsplash.com/photo-1631048905843-88f82fba8fd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFnbGUlMjBkb2d8ZW58MXx8fHwxNzYyNjE5MTkyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      character: 'Весела, допитлива, дружня',
      size: 'Середня',
    },
    {
      name: 'Голден ретрівер',
      image: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NjI2MzY3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      character: 'Ніжна, розумна, надійна',
      size: 'Велика',
    },
  ];

  return (
    <section id="breeds" className="py-24 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-stone-900 mb-4">Каталог порід</h2>
          <p className="text-stone-600">
            Обирайте породу, яка найкраще підходить вашому способу життя та характеру
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {breeds.map((breed, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-2xl border-stone-200 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
                <ImageWithFallback
                  src={breed.image}
                  alt={breed.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col">
                <h3 className="text-stone-900">{breed.name}</h3>
                <p className="text-stone-600 flex-1">{breed.character}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-amber-100 text-amber-700 rounded-full">
                    {breed.size}
                  </span>
                  <Button 
                    variant="ghost" 
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full -mr-2"
                  >
                    Детальніше →
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            className="border-2 border-stone-300 text-stone-700 hover:bg-stone-50 hover:border-stone-400 rounded-full px-8 h-12"
          >
            Всі породи
          </Button>
        </div>
      </div>
    </section>
  );
}
