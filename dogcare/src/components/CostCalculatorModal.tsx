import { useEffect, useState } from 'react';
import { Loader2, PiggyBank } from 'lucide-react';
import { toast } from 'sonner';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from './ui/sheet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { cn } from './ui/utils';

interface CostCalculatorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CostCalculatorModal({ open, onOpenChange }: CostCalculatorModalProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [weight, setWeight] = useState([15]);
  const [foodType, setFoodType] = useState('');
  const [grooming, setGrooming] = useState('');
  const [vetCare, setVetCare] = useState('');
  const [includeReserve, setIncludeReserve] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Results
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [breakdown, setBreakdown] = useState({
    food: 0,
    grooming: 0,
    vet: 0,
    other: 0,
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!foodType) newErrors.foodType = 'Оберіть тип корму';
    if (!grooming) newErrors.grooming = 'Оберіть частоту грумінгу';
    if (!vetCare) newErrors.vetCare = 'Оберіть рівень ветеринарних витрат';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateCosts = async () => {
    if (!validateForm()) {
      toast.error('Заповніть всі обов\'язкові поля');
      return;
    }

    setIsCalculating(true);
    setErrors({});

    // Simulate calculation
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate food costs based on weight and type
    const foodCostPerKg = {
      dry: 120,
      wet: 180,
      natural: 100,
    }[foodType] || 120;

    const monthlyFood = Math.round((weight[0] * 0.03 * 30 * foodCostPerKg) / 10) * 10;

    // Grooming costs
    const groomingCost = {
      rare: 200,
      monthly: 500,
      bimonthly: 900,
    }[grooming] || 200;

    // Vet costs
    const vetCost = {
      basic: 300,
      medium: 600,
      high: 1000,
    }[vetCare] || 300;

    // Reserve
    const reserve = includeReserve ? 500 : 0;

    const monthly = monthlyFood + groomingCost + vetCost + reserve;
    const yearly = monthly * 12;

    setMonthlyTotal(monthly);
    setYearlyTotal(yearly);
    setBreakdown({
      food: monthlyFood,
      grooming: groomingCost,
      vet: vetCost,
      other: reserve,
    });

    setIsCalculating(false);
    setHasCalculated(true);
    toast.success('Розрахунок виконано');
  };

  const handleClose = () => {
    onOpenChange(false);
    setIsCalculating(false);
    setTimeout(() => {
      setHasCalculated(false);
      setErrors({});
    }, 300);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      onOpenChange(true);
    } else {
      handleClose();
    }
  };

  const renderFields = () => (
    <div className="rounded-2xl border border-stone-200 bg-white/80 p-5 sm:p-6 shadow-sm space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <Label htmlFor="weight" className="text-sm font-medium text-stone-900">
              Вага собаки
            </Label>
            <p className="text-sm text-stone-500">Задайте орієнтовну вагу улюбленця</p>
          </div>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-700">
            {weight[0]} кг
          </span>
        </div>
        <Slider
          id="weight"
          min={5}
          max={50}
          step={1}
          value={weight}
          onValueChange={setWeight}
          className="w-full [&_[data-slot=slider-range]]:bg-amber-600 [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-amber-600 [&_[data-slot=slider-thumb]]:bg-white"
        />
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
          <span>Оптимальний раціон залежить від ваги</span>
          <span>Можна змінювати у будь-який момент</span>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="foodType" className="text-sm font-medium text-stone-900">
            Тип корму <span className="text-red-500">*</span>
          </Label>
          <Select value={foodType} onValueChange={setFoodType}>
            <SelectTrigger
              id="foodType"
              className={cn(
                'rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200',
                errors.foodType && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200',
              )}
            >
              <SelectValue placeholder="Оберіть тип" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dry">Сухий</SelectItem>
              <SelectItem value="wet">Вологий</SelectItem>
              <SelectItem value="natural">Натуральний</SelectItem>
            </SelectContent>
          </Select>
          {errors.foodType && (
            <p className="text-sm text-red-600">{errors.foodType}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="grooming" className="text-sm font-medium text-stone-900">
            Частота грумінгу <span className="text-red-500">*</span>
          </Label>
          <Select value={grooming} onValueChange={setGrooming}>
            <SelectTrigger
              id="grooming"
              className={cn(
                'rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200',
                errors.grooming && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200',
              )}
            >
              <SelectValue placeholder="Оберіть частоту" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rare">Рідко</SelectItem>
              <SelectItem value="monthly">1 раз/міс</SelectItem>
              <SelectItem value="bimonthly">2 рази/міс</SelectItem>
            </SelectContent>
          </Select>
          {errors.grooming && (
            <p className="text-sm text-red-600">{errors.grooming}</p>
          )}
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="vetCare" className="text-sm font-medium text-stone-900">
            Ветеринарні витрати <span className="text-red-500">*</span>
          </Label>
          <Select value={vetCare} onValueChange={setVetCare}>
            <SelectTrigger
              id="vetCare"
              className={cn(
                'rounded-xl border-2 border-stone-200 bg-white focus-visible:border-amber-500 focus-visible:ring-amber-200',
                errors.vetCare && 'border-red-500 focus-visible:border-red-500 focus-visible:ring-red-200',
              )}
            >
              <SelectValue placeholder="Оберіть рівень" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basic">Базові</SelectItem>
              <SelectItem value="medium">Середні</SelectItem>
              <SelectItem value="high">Підвищені</SelectItem>
            </SelectContent>
          </Select>
          {errors.vetCare && (
            <p className="text-sm text-red-600">{errors.vetCare}</p>
          )}
        </div>
      </div>

      <div className="flex items-start gap-3 rounded-2xl border border-stone-200 bg-stone-50/80 p-4">
        <Checkbox
          id="reserve"
          checked={includeReserve}
          onCheckedChange={(checked) => setIncludeReserve(checked as boolean)}
          className="mt-1"
        />
        <div>
          <Label htmlFor="reserve" className="cursor-pointer text-sm font-medium text-stone-900">
            Додати резерв на непередбачувані витрати
          </Label>
          <p className="text-sm text-stone-500">
            Рекомендуємо відкладати кошти на страхування, вакцинацію чи форс-мажори
          </p>
        </div>
      </div>
    </div>
  );

  const SummaryCard = ({ className }: { className?: string }) => (
    <div
      className={cn(
        'rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-stone-50 p-6 sm:p-7 shadow-[0_20px_45px_-20px_rgba(217,119,6,0.35)] transition-opacity duration-200',
        isCalculating && 'opacity-60',
        className,
      )}
    >
      {hasCalculated ? (
        <div className="space-y-5">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Щомісячні витрати
            </p>
            <p className="text-3xl font-semibold text-stone-900">
              {monthlyTotal.toLocaleString()} ₴
            </p>
            <p className="text-sm text-stone-600">
              Річна оцінка: {yearlyTotal.toLocaleString()} ₴
            </p>
          </div>

          <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-600">Час на догляд</span>
              <span className="font-medium text-stone-900">1-3 год/день</span>
            </div>
            <Progress value={60} className="mt-3 h-2 bg-amber-100 [&_[data-slot=progress-indicator]]:bg-amber-600" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="rounded-full border border-amber-200 bg-white/90 text-stone-700">
              Корм: {breakdown.food} ₴
            </Badge>
            <Badge variant="secondary" className="rounded-full border border-amber-200 bg-white/90 text-stone-700">
              Грумінг: {breakdown.grooming} ₴
            </Badge>
            <Badge variant="secondary" className="rounded-full border border-amber-200 bg-white/90 text-stone-700">
              Ветеринарія: {breakdown.vet} ₴
            </Badge>
            {breakdown.other > 0 && (
              <Badge variant="secondary" className="rounded-full border border-amber-200 bg-white/90 text-stone-700">
                Резерв: {breakdown.other} ₴
              </Badge>
            )}
          </div>

          <p className="text-xs leading-relaxed text-stone-500">
            Це орієнтовні показники. Фактичні витрати залежать від стану здоров’я, раціону та регіону проживання.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
              <PiggyBank className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold text-stone-900">Персональний прогноз витрат</p>
              <p className="text-sm text-stone-600">Заповніть форму, щоб побачити детальний розрахунок</p>
            </div>
          </div>
          <ul className="space-y-2 text-sm text-stone-600">
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Розбиття бюджету на корм, грумінг, ветеринарію та резерв</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Рекомендації щодо часу на догляд протягом тижня</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span>Нагадування про плановий резерв для непередбачуваних витрат</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );

  const ActionButtons = () => (
    <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row">
      <Button
        type="button"
        variant="outline"
        onClick={handleClose}
        className="flex-1 rounded-full border-2 border-stone-300 text-stone-700 transition-colors hover:bg-stone-100 sm:flex-none"
      >
        Скасувати
      </Button>
      <Button
        type="button"
        onClick={calculateCosts}
        disabled={isCalculating}
        className="flex-1 rounded-full bg-amber-600 text-white shadow-sm transition-colors hover:bg-amber-700 disabled:opacity-80 sm:flex-none"
      >
        {isCalculating ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Розраховуємо...
          </span>
        ) : (
          'Розрахувати'
        )}
      </Button>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent
          side="bottom"
          className="max-h-[90vh] overflow-y-auto rounded-t-3xl px-0 pb-10 pt-6 sm:pt-8 [&_[data-slot=sheet-close]]:right-6 [&_[data-slot=sheet-close]]:top-6 [&_[data-slot=sheet-close]]:rounded-full [&_[data-slot=sheet-close]]:bg-white [&_[data-slot=sheet-close]]:shadow-sm [&_[data-slot=sheet-close]:hover]:bg-stone-100"
        >
          <div className="px-4 sm:px-6">
            <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-stone-300" />
            <SheetHeader className="mb-6 text-left">
              <SheetTitle className="text-xl font-semibold text-stone-900">
                Калькулятор витрат
              </SheetTitle>
              <SheetDescription className="text-sm text-stone-600">
                Розрахуйте щомісячні та річні витрати на утримання собаки
              </SheetDescription>
            </SheetHeader>
            <div className="space-y-8 pb-2">
              {renderFields()}
              <SummaryCard />
              <ActionButtons />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-4xl overflow-hidden rounded-3xl border border-stone-200 p-0 shadow-xl [&_[data-slot=dialog-close]]:right-6 [&_[data-slot=dialog-close]]:top-6 [&_[data-slot=dialog-close]]:rounded-full [&_[data-slot=dialog-close]]:bg-white [&_[data-slot=dialog-close]]:shadow-sm [&_[data-slot=dialog-close]:hover]:bg-stone-100"
      >
        <div className="flex flex-col">
          <div className="border-b border-stone-100 bg-gradient-to-r from-amber-50/60 to-transparent px-6 py-6 sm:px-10">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-semibold text-stone-900">
                Калькулятор витрат
              </DialogTitle>
              <DialogDescription className="text-sm text-stone-600">
                Заповніть параметри утримання собаки та отримайте персональний прогноз витрат
              </DialogDescription>
            </DialogHeader>
          </div>
          <div className="px-6 pb-8 pt-6 sm:px-10 sm:pt-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="space-y-8">
                {renderFields()}
                <ActionButtons />
              </div>
              <div className="hidden lg:block">
                <SummaryCard className="sticky top-6" />
              </div>
            </div>
            <div className="mt-8 lg:hidden">
              <SummaryCard />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
