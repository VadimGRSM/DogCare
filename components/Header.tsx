import { PawPrint, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Головна', href: '#home', id: 'home' },
    { name: 'Породи', href: '#breeds', id: 'breeds' },
    { name: 'Догляд', href: '#care', id: 'care' },
    { name: 'Витрати', href: '#costs', id: 'costs' },
    { name: 'Поради', href: '#vet', id: 'vet' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-amber-600 rounded-full flex items-center justify-center">
              <PawPrint className="w-5 h-5 text-white" />
            </div>
            <span className="text-stone-900 tracking-tight">DogCare</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeSection === item.id
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-stone-700 hover:text-amber-700 hover:bg-amber-50/50'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-full px-6 shadow-sm">
              Підібрати породу
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-stone-700" />
            ) : (
              <Menu className="w-6 h-6 text-stone-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-stone-200">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl transition-all ${
                    activeSection === item.id
                      ? 'bg-amber-50 text-amber-700'
                      : 'text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <Button className="bg-amber-600 hover:bg-amber-700 text-white rounded-full w-full mt-2">
                Підібрати породу
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
