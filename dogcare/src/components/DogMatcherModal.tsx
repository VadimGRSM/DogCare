import { useCallback, useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Home, Sparkles, Users } from 'lucide-react';

type BreedSize = 'small' | 'medium' | 'large';
type ActivityLevel = 'low' | 'medium' | 'high';
type GroomingLevel = 'low' | 'medium' | 'high';
type ExperienceLevel = 'beginner' | 'experienced' | 'all';

interface BreedProfile {
  name: string;
  description: string;
  highlight: string;
  image: string;
  size: BreedSize;
  activity: ActivityLevel;
  experience: ExperienceLevel;
  home: Array<'apartment' | 'house'>;
  goodWithKids: boolean;
  grooming: GroomingLevel;
  hypoallergenic: boolean;
}

interface DogMatcherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BreedMatch extends BreedProfile {
  match: number;
}

const breedLibrary: BreedProfile[] = [
  {
    name: 'Кавалер кінг-чарльз спанієль',
    description: 'Лагідний компаньйон, який легко адаптується до квартир і чудово ладнає з дітьми.',
    highlight: 'Ніжний друг для міського життя',
    image:
      'https://images.unsplash.com/photo-1610986603166-1fc3fe1e3ea1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'small',
    activity: 'medium',
    experience: 'beginner',
    home: ['apartment', 'house'],
    goodWithKids: true,
    grooming: 'medium',
    hypoallergenic: false,
  },
  {
    name: 'Пудель',
    description: 'Розумна та гіпоалергенна порода, що любить тренування та швидко навчається.',
    highlight: 'Ідеальний вибір для активних родин',
    image:
      'https://images.unsplash.com/photo-1504826023241-529ef3000bce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'medium',
    activity: 'high',
    experience: 'all',
    home: ['apartment', 'house'],
    goodWithKids: true,
    grooming: 'high',
    hypoallergenic: true,
  },
  {
    name: 'Французький бульдог',
    description: 'Спокійний та товариський улюбленець, який цінує короткі прогулянки і компанію людини.',
    highlight: 'Невибагливий товариш для зайнятих людей',
    image:
      'https://images.unsplash.com/photo-1561754050-9a1ee0470c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'small',
    activity: 'low',
    experience: 'beginner',
    home: ['apartment'],
    goodWithKids: true,
    grooming: 'low',
    hypoallergenic: false,
  },
  {
    name: 'Лабрадор ретрівер',
    description: 'Надзвичайно дружня та енергійна порода, яка потребує активності та простору.',
    highlight: 'Чудовий напарник для подорожей і прогулянок',
    image:
      'https://images.unsplash.com/photo-1672838564909-4ddfd78c7e5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'large',
    activity: 'high',
    experience: 'experienced',
    home: ['house'],
    goodWithKids: true,
    grooming: 'medium',
    hypoallergenic: false,
  },
  {
    name: 'Бішон фрізе',
    description: 'Компактна гіпоалергенна собака з життєрадісним характером, що любить увагу.',
    highlight: 'Компактний артист для квартир',
    image:
      'https://images.unsplash.com/photo-1529926449396-0b6d4fca48eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'small',
    activity: 'medium',
    experience: 'beginner',
    home: ['apartment', 'house'],
    goodWithKids: true,
    grooming: 'high',
    hypoallergenic: true,
  },
  {
    name: 'Австралійська вівчарка',
    description: 'Робоча порода з високим рівнем енергії та потребою у регулярних тренуваннях.',
    highlight: 'Невтомний партнер для активного відпочинку',
    image:
      'https://images.unsplash.com/photo-1557979619-445218f32638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'medium',
    activity: 'high',
    experience: 'experienced',
    home: ['house'],
    goodWithKids: true,
    grooming: 'medium',
    hypoallergenic: false,
  },
  {
    name: 'Шиба-іну',
    description: 'Незалежна та акуратна собака, що цінує активність і потребує послідовного виховання.',
    highlight: 'Стильний вибір для досвідчених власників',
    image:
      'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=960',
    size: 'medium',
    activity: 'medium',
    experience: 'experienced',
    home: ['apartment', 'house'],
    goodWithKids: false,
    grooming: 'medium',
    hypoallergenic: false,
  },
];

const sizeLabels: Record<BreedSize, string> = {
  small: 'Маленька',
  medium: 'Середня',
  large: 'Велика',
};

const activityLabels: Record<ActivityLevel, string> = {
  low: 'Спокійна',
  medium: 'Помірна',
  high: 'Активна',
};

const groomingLabels: Record<GroomingLevel, string> = {
  low: 'Легкий догляд',
  medium: 'Помірний догляд',
  high: 'Потрібен грумінг',
};

const MAX_SCORE = 12;

export function DogMatcherModal({ open, onOpenChange }: DogMatcherModalProps) {
  const [homeType, setHomeType] = useState<'apartment' | 'house'>('apartment');
  const [size, setSize] = useState<'any' | BreedSize>('any');
  const [activity, setActivity] = useState<number[]>([5]);
  const [hasKids, setHasKids] = useState(true);
  const [experience, setExperience] = useState<'beginner' | 'experienced'>('beginner');
  const [grooming, setGrooming] = useState<GroomingLevel>('medium');
  const [hypoallergenic, setHypoallergenic] = useState(false);
  const [matches, setMatches] = useState<BreedMatch[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const activityValue = activity[0];
  const activityLabel = activityValue <= 3 ? 'Спокійний ритм' : activityValue <= 7 ? 'Помірна активність' : 'Дуже активний';
  const activityHint =
    activityValue <= 3
      ? '30-40 хв прогулянок на день'
      : activityValue <= 7
        ? '1-2 активні прогулянки та ігри'
        : 'Спортивні тренування та довгі прогулянки';

  const resetForm = () => {
    setHomeType('apartment');
    setSize('any');
    setActivity([5]);
    setHasKids(true);
    setExperience('beginner');
    setGrooming('medium');
    setHypoallergenic(false);
    setMatches([]);
    setHasSubmitted(false);
  };

  const computeMatches = useCallback((): BreedMatch[] => {
    const targetActivity: ActivityLevel = activityValue <= 3 ? 'low' : activityValue <= 7 ? 'medium' : 'high';

    return breedLibrary
      .map((breed) => {
        let score = 0;

        if (size === 'any') {
          score += 2;
        } else if (breed.size === size) {
          score += 3;
        }

        if (breed.home.includes(homeType)) {
          score += 2;
        }

        if (targetActivity === breed.activity) {
          score += 2;
        } else if (
          (targetActivity === 'medium' && breed.activity !== 'low') ||
          (targetActivity === 'low' && breed.activity === 'medium')
        ) {
          score += 1;
        }

        if (hasKids) {
          score += breed.goodWithKids ? 1.5 : -1;
        } else {
          score += 0.5;
        }

        if (experience === 'beginner') {
          if (breed.experience === 'beginner' || breed.experience === 'all') {
            score += 1.5;
          }
        } else if (breed.experience !== 'beginner') {
          score += 1.5;
        } else {
          score += 0.5;
        }

        if (grooming === breed.grooming) {
          score += 1.5;
        } else if (grooming === 'low' && breed.grooming === 'medium') {
          score += 0.5;
        }

        if (hypoallergenic) {
          score += breed.hypoallergenic ? 2 : -2;
        }

        return {
          breed,
          score,
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(({ breed, score }) => ({
        ...breed,
        match: Math.max(0, Math.min(100, Math.round((Math.min(score, MAX_SCORE) / MAX_SCORE) * 100))),
      }));
  }, [activityValue, experience, grooming, hasKids, homeType, hypoallergenic, size]);

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(() => {
      resetForm();
    }, 250);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
    } else {
      handleClose();
    }
  };

  const handleMatch = () => {
    setMatches(computeMatches());
    setHasSubmitted(true);
  };

  useEffect(() => {
    if (hasSubmitted) {
      setMatches(computeMatches());
    }
  }, [computeMatches, hasSubmitted]);

  const renderMatches = () => {
    if (!hasSubmitted) {
      return (
        <div className="rounded-3xl border border-dashed border-amber-200 bg-amber-50/60 p-6 text-sm text-amber-800 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-600 shadow-inner">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-semibold text-amber-900">Почніть підбір</p>
              <p>
                Оберіть параметри, і ми запропонуємо до трьох порід, які найкраще підійдуть до вашого ритму життя.
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (matches.length === 0) {
      return (
        <div className="rounded-3xl border border-stone-200 bg-white/80 p-6 text-sm text-stone-600 shadow-sm">
          <p className="font-medium text-stone-900">Не знайшли ідеальну пару?</p>
          <p className="mt-2">
            Спробуйте розширити параметри або обрати інший рівень активності. Ми підберемо більше варіантів для вас.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.name}
            className="flex flex-col gap-4 rounded-3xl border border-stone-200 bg-white/90 p-5 shadow-sm sm:flex-row"
          >
            <div className="h-28 w-full overflow-hidden rounded-2xl bg-stone-100 sm:h-24 sm:w-24">
              <ImageWithFallback src={match.image} alt={match.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-lg font-semibold text-stone-900">{match.name}</p>
                  <p className="text-sm text-stone-600">{match.highlight}</p>
                </div>
                <Badge className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-700">
                  {match.match}%
                </Badge>
              </div>
              <p className="text-sm text-stone-600">{match.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="rounded-full border border-stone-200 bg-white/80 text-stone-700">
                  {sizeLabels[match.size]}
                </Badge>
                <Badge variant="secondary" className="rounded-full border border-stone-200 bg-white/80 text-stone-700">
                  {activityLabels[match.activity]}
                </Badge>
                <Badge variant="secondary" className="rounded-full border border-stone-200 bg-white/80 text-stone-700">
                  {groomingLabels[match.grooming]}
                </Badge>
                {match.hypoallergenic && (
                  <Badge variant="secondary" className="rounded-full border border-stone-200 bg-white/80 text-stone-700">
                    Гіпоалергенна
                  </Badge>
                )}
                {match.goodWithKids && (
                  <Badge variant="secondary" className="rounded-full border border-stone-200 bg-white/80 text-stone-700">
                    Дружня до дітей
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-5xl overflow-hidden rounded-3xl border border-stone-200 p-0 shadow-xl [&_[data-slot=dialog-close]]:right-6 [&_[data-slot=dialog-close]]:top-6 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-white [&_[data-slot=dialog-close]]:shadow-sm [&_[data-slot=dialog-close]:hover]:bg-stone-100"
      >
        <div className="flex flex-col">
          <div className="border-b border-stone-100 bg-gradient-to-r from-amber-50/70 to-transparent px-6 py-6 sm:px-10">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-semibold text-stone-900">Підбір ідеальної породи</DialogTitle>
              <DialogDescription className="text-sm text-stone-600">
                Вкажіть умови проживання та побажання — і ми порадимо породи, які найкраще підійдуть саме вам.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="px-6 pb-8 pt-6 sm:px-10 sm:pt-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-8">
                <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 sm:p-6 shadow-sm space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <Label htmlFor="activity" className="text-sm font-medium text-stone-900">
                          Рівень активності
                        </Label>
                        <p className="text-sm text-stone-500">Наскільки енергійного друга ви шукаєте</p>
                      </div>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
                        {activityLabel}
                      </span>
                    </div>
                    <Slider
                      id="activity"
                      min={1}
                      max={10}
                      step={1}
                      value={activity}
                      onValueChange={setActivity}
                      className="w-full [&_[data-slot=slider-range]]:bg-amber-600 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-amber-600 [&_[data-slot=slider-thumb]]:bg-white"
                    />
                    <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
                      <span>1 — спокійні прогулянки, 10 — активний спорт</span>
                      <span>{activityHint}</span>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="home" className="text-sm font-medium text-stone-900">
                        Тип житла
                      </Label>
                      <Select value={homeType} onValueChange={(value: 'apartment' | 'house') => setHomeType(value)}>
                        <SelectTrigger
                          id="home"
                          className="rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        >
                          <SelectValue placeholder="Обрати" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="apartment">Квартира</SelectItem>
                          <SelectItem value="house">Будинок з подвір’ям</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experience" className="text-sm font-medium text-stone-900">
                        Ваш досвід
                      </Label>
                      <Select value={experience} onValueChange={(value: 'beginner' | 'experienced') => setExperience(value)}>
                        <SelectTrigger
                          id="experience"
                          className="rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        >
                          <SelectValue placeholder="Обрати" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">Перший пес</SelectItem>
                          <SelectItem value="experienced">Маю досвід</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="size" className="text-sm font-medium text-stone-900">
                        Бажаний розмір
                      </Label>
                      <Select value={size} onValueChange={(value: 'any' | BreedSize) => setSize(value)}>
                        <SelectTrigger
                          id="size"
                          className="rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        >
                          <SelectValue placeholder="Обрати" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Будь-який</SelectItem>
                          <SelectItem value="small">Маленькі</SelectItem>
                          <SelectItem value="medium">Середні</SelectItem>
                          <SelectItem value="large">Великі</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grooming" className="text-sm font-medium text-stone-900">
                        Догляд за шерстю
                      </Label>
                      <Select value={grooming} onValueChange={(value: GroomingLevel) => setGrooming(value)}>
                        <SelectTrigger
                          id="grooming"
                          className="rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200"
                        >
                          <SelectValue placeholder="Обрати" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Мінімальний</SelectItem>
                          <SelectItem value="medium">Помірний</SelectItem>
                          <SelectItem value="high">Потрібен регулярний грумінг</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
                    <p className="flex items-center gap-2 text-sm font-medium text-stone-900">
                      <Home className="h-4 w-4 text-amber-600" /> Додаткові побажання
                    </p>
                    <div className="flex flex-col gap-4 lg:flex-row">
                      <div className="flex flex-1 items-start gap-3">
                        <Checkbox
                          id="kids"
                          checked={hasKids}
                          onCheckedChange={(checked) => setHasKids(Boolean(checked))}
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor="kids" className="cursor-pointer text-sm font-medium text-stone-900">
                            Є діти або часті гості
                          </Label>
                          <p className="text-sm text-stone-500">Покажемо породи з м’яким і дружнім характером</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-start gap-3">
                        <Checkbox
                          id="hypoallergenic"
                          checked={hypoallergenic}
                          onCheckedChange={(checked) => setHypoallergenic(Boolean(checked))}
                          className="mt-1"
                        />
                        <div>
                          <Label htmlFor="hypoallergenic" className="cursor-pointer text-sm font-medium text-stone-900">
                            Важлива гіпоалергенність
                          </Label>
                          <p className="text-sm text-stone-500">Пріоритетні породи з мінімальним линянням</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={resetForm}
                    className="rounded-full text-stone-600 hover:bg-stone-100"
                  >
                    Скинути параметри
                  </Button>
                  <div className="flex flex-col-reverse gap-3 sm:flex-row">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleClose}
                      className="rounded-full border-2 border-stone-300 text-stone-700 hover:bg-stone-100"
                    >
                      Закрити
                    </Button>
                    <Button
                      type="button"
                      onClick={handleMatch}
                      className="rounded-full bg-amber-600 px-6 text-white shadow-sm hover:bg-amber-700"
                    >
                      Підібрати породу
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-stone-50 p-5 shadow-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-amber-600 shadow-inner">
                      <Users className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-stone-900">Особистий профіль</p>
                      <p className="text-sm text-stone-600">
                        Ми врахуємо ваш стиль життя, досвід та умови проживання, щоб запропонувати породи, з якими вам буде
                        комфортно щодня.
                      </p>
                    </div>
                  </div>
                </div>
                {renderMatches()}
                {hasSubmitted && matches.length > 0 && (
                  <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 text-sm text-stone-600 shadow-sm">
                    <p className="flex items-center gap-2 font-medium text-stone-900">
                      <Heart className="h-4 w-4 text-amber-600" /> Як обрати між варіантами?
                    </p>
                    <ul className="mt-3 space-y-2">
                      <li>Зустріньтеся з заводчиком або волонтерами для живого знайомства.</li>
                      <li>Оцініть, скільки часу та бюджету ви готові інвестувати в улюбленця.</li>
                      <li>Зверніть увагу на темперамент — він важливіший за зовнішність.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
