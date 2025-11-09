import { Card } from './ui/card';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Stethoscope } from 'lucide-react';

export function VetAdvice() {
  const articles = [
    {
      title: 'Щеплення для собак',
      description: 'Які вакцини необхідні вашій собаці та коли їх робити для максимального захисту здоров\'я',
      image: 'https://images.unsplash.com/photo-1644675443401-ea4c14bad0e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJpYW4lMjB3aXRoJTIwZG9nfGVufDF8fHx8MTc2MjY4ODU1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Профілактика',
      readTime: '5 хв',
    },
    {
      title: 'Догляд за зубами',
      description: 'Як правильно доглядати за зубами вашого улюбленця для запобігання захворювань',
      image: 'https://images.unsplash.com/photo-1735597403677-2029485b4547?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBncm9vbWluZyUyMGNhcmV8ZW58MXx8fHwxNzYyNTk2MzE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Гігієна',
      readTime: '4 хв',
    },
    {
      title: 'Перша допомога',
      description: 'Що робити в екстрених ситуаціях до приїзду ветеринара',
      image: 'https://images.unsplash.com/photo-1719292606971-0916fc62f5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGdvbGRlbiUyMHJldHJpZXZlciUyMGRvZ3xlbnwxfHx8fDE3NjI2MzY3NzB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Здоров\'я',
      readTime: '7 хв',
    },
  ];

  return (
    <section id="vet" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
              <Stethoscope className="w-7 h-7 text-amber-700" />
            </div>
          </div>
          <h2 className="text-stone-900 mb-4">Поради ветеринара</h2>
          <p className="text-stone-600">
            Експертні рекомендації від професійних ветеринарів для здоров'я вашої собаки
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-2xl border-stone-200 hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-stone-200">
                <ImageWithFallback
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 bg-white/95 backdrop-blur-sm text-stone-700 rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 space-y-4 flex-1 flex flex-col">
                <div className="flex-1">
                  <h3 className="text-stone-900 mb-2">{article.title}</h3>
                  <p className="text-stone-600">{article.description}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="text-stone-500">{article.readTime}</span>
                  <Button 
                    variant="ghost" 
                    className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 rounded-full -mr-2"
                  >
                    Читати →
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
            Всі статті
          </Button>
        </div>
      </div>
    </section>
  );
}
