import { PawPrint, Instagram, Facebook, Youtube } from 'lucide-react';

export function Footer() {
  const navLinks = [
    { name: 'Головна', href: '#home' },
    { name: 'Породи', href: '#breeds' },
    { name: 'Догляд', href: '#care' },
    { name: 'Витрати', href: '#costs' },
    { name: 'Поради', href: '#vet' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-stone-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 bg-amber-600 rounded-full flex items-center justify-center">
                <PawPrint className="w-5 h-5 text-white" />
              </div>
              <span className="text-white tracking-tight">DogCare</span>
            </div>
            <p className="text-stone-400 max-w-xs">
              Ваш надійний помічник у світі догляду за собаками
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-white mb-4">Навігація</h4>
            <div className="grid grid-cols-2 gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-400 hover:text-amber-400 transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <h4 className="text-white mb-4">Соціальні мережі</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center hover:bg-amber-600 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-stone-400">
            <p>© 2025 DogCare. Всі права захищені.</p>
            <p className="text-stone-500">Сайт створено для навчального проєкту</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
