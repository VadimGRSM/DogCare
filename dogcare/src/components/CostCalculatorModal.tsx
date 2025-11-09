import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { X, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

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
    // Reset after animation
    setTimeout(() => {
      setHasCalculated(false);
      setErrors({});
    }, 300);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [open]);

  const FormContent = () => (
    <div className="space-y-6">
      {/* Form Fields Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="md:col-span-2 space-y-3">
          <Label htmlFor="weight">Вага собаки</Label>
          <div className="space-y-4">
            <Slider
              id="weight"
              min={5}
              max={50}
              step={1}
              value={weight}
              onValueChange={setWeight}
              className="w-full [&_[data-slot=slider-range]]:bg-amber-600 [&_[data-slot=slider-thumb]]:border-amber-600"
            />
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="text-stone-900">{weight[0]} кг</span>
              <span className="text-stone-500">≈ споживання корму залежить від ваги</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="foodType">
            Тип корму <span className="text-red-500">*</span>
          </Label>
          <Select value={foodType} onValueChange={setFoodType}>
            <SelectTrigger 
              id="foodType"
              className={`rounded-xl ${errors.foodType ? 'border-red-500' : ''}`}
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
            <p className="text-red-600">{errors.foodType}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="grooming">
            Частота грумінгу <span className="text-red-500">*</span>
          </Label>
          <Select value={grooming} onValueChange={setGrooming}>
            <SelectTrigger 
              id="grooming"
              className={`rounded-xl ${errors.grooming ? 'border-red-500' : ''}`}
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
            <p className="text-red-600">{errors.grooming}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label htmlFor="vetCare">
            Ветеринарні витрати <span className="text-red-500">*</span>
          </Label>
          <Select value={vetCare} onValueChange={setVetCare}>
            <SelectTrigger 
              id="vetCare"
              className={`rounded-xl ${errors.vetCare ? 'border-red-500' : ''}`}
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
            <p className="text-red-600">{errors.vetCare}</p>
          )}
        </div>

        <div className="md:col-span-2 flex items-start space-x-3 p-4 rounded-xl bg-stone-50 border border-stone-200">
          <Checkbox 
            id="reserve" 
            checked={includeReserve}
            onCheckedChange={(checked) => setIncludeReserve(checked as boolean)}
            className="mt-1"
          />
          <div>
            <Label htmlFor="reserve" className="cursor-pointer">
              Додати резерв
            </Label>
            <p className="text-stone-500 mt-1">Страхування та непередбачувані витрати</p>
          </div>
        </div>
      </div>

      {/* Results Card */}
      {hasCalculated && (
        <div className={`rounded-2xl bg-gradient-to-br from-amber-50 to-stone-50 p-6 border border-amber-200 space-y-4 ${isCalculating ? 'opacity-50' : ''}`}>
          <div className="space-y-3">
            <div>
              <p className="text-stone-600 mb-1">Щомісячно:</p>
              <p className="text-stone-900">{monthlyTotal.toLocaleString()} ₴</p>
            </div>
            <div>
              <p className="text-stone-600">Річна оцінка: {yearlyTotal.toLocaleString()} ₴</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-stone-700">Час на догляд</span>
              <span className="text-stone-900">1-3 год/день</span>
            </div>
            <Progress value={60} className="h-2 bg-amber-100 [&_[data-slot=progress-indicator]]:bg-amber-600" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-white border-amber-200">
              Корм: {breakdown.food} ₴
            </Badge>
            <Badge variant="secondary" className="bg-white border-amber-200">
              Грумінг: {breakdown.grooming} ₴
            </Badge>
            <Badge variant="secondary" className="bg-white border-amber-200">
              Вет-резерв: {breakdown.vet} ₴
            </Badge>
            {breakdown.other > 0 && (
              <Badge variant="secondary" className="bg-white border-amber-200">
                Інше: {breakdown.other} ₴
              </Badge>
            )}
          </div>

          <p className="text-stone-500 pt-2 border-t border-amber-200">
            Це орієнтовні витрати. Реальні суми можуть відрізнятися.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={handleClose}
          className="flex-1 sm:flex-none rounded-full border-2 border-stone-300 hover:bg-stone-50"
        >
          Скасувати
        </Button>
        <Button
          type="button"
          onClick={calculateCosts}
          disabled={isCalculating}
          className="flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 text-white rounded-full shadow-sm"
        >
          {isCalculating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Розраховуємо...
            </>
          ) : (
            'Розрахувати'
          )}
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={handleClose}>
        <SheetContent 
          side="bottom" 
          className="rounded-t-3xl px-4 sm:px-6 max-h-[90vh] overflow-y-auto"
        >
          <div className="w-12 h-1.5 bg-stone-300 rounded-full mx-auto mb-6 mt-2" />
          <SheetHeader className="text-left mb-6">
            <SheetTitle className="text-stone-900">Калькулятор витрат</SheetTitle>
            <SheetDescription className="text-stone-600">
              Розрахуйте щомісячні та річні витрати на утримання собаки
            </SheetDescription>
          </SheetHeader>
          <FormContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-full p-2 hover:bg-stone-100 transition-colors"
        >
          <X className="h-4 w-4 text-stone-500" />
          <span className="sr-only">Закрити</span>
        </button>
        <DialogHeader className="mb-6">
          <DialogTitle className="text-stone-900">Калькулятор витрат</DialogTitle>
          <DialogDescription className="text-stone-600">
            Розрахуйте щомісячні та річні витрати на утримання собаки
          </DialogDescription>
        </DialogHeader>
        <FormContent />
      </DialogContent>
    </Dialog>
  );
}
