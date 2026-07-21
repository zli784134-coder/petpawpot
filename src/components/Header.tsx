import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'wouter';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { key: 'home', label: t('nav.home'), href: '/' },
    { key: 'freshMealMaker', label: t('nav.freshMealMaker'), href: '/fresh-meal-maker' },
    { key: 'aiNutritionist', label: t('nav.aiNutritionist'), href: '/ai-nutritionist' },
    { key: 'recipes', label: t('nav.recipes'), href: '/recipes' },
    { key: 'costComparison', label: t('nav.costComparison'), href: '/cost-comparison' },
    { key: 'whyFreshFeeding', label: t('nav.whyFreshFeeding'), href: '/why-fresh-feeding' },
    { key: 'partners', label: t('nav.partners'), href: '/partners' },
    { key: 'aboutUs', label: t('nav.aboutUs'), href: '/about-us' },
    { key: 'blog', label: t('nav.blog'), href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer shrink-0 mr-2">
            <img src={IMAGES.logo} alt="PetPawPot" className="h-8 w-8" />
            <span className="font-bold text-lg text-primary hidden sm:inline">
              {language === 'en' ? 'PetPawPot' : '宠鲜鲜'}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-2 py-2 hover:bg-accent hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - Language + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                  language === 'en' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                  language === 'zh' ? 'bg-primary text-white' : 'text-foreground hover:bg-muted'
                }`}
              >
                中文
              </button>
            </div>

            {/* CTA: Try AI Nutritionist */}
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-3 py-2 bg-secondary hover:bg-secondary/90 text-white transition-all"
            >
              {t('cta.tryAiNutritionist')}
            </a>

            {/* Secondary CTA: Partner Inquiry（仅超宽屏显示，避免中等桌面宽度拥挤） */}
            <Link
              href="/partners"
              className="hidden 2xl:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 border border-primary text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
            >
              {t('cta.partnerInquiry')}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="xl:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="flex items-center w-full justify-start text-sm font-medium h-9 px-3 py-2 rounded-md hover:bg-accent transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border space-y-2">
              <a
                href={AI_NUTRITIONIST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full text-sm font-semibold h-9 px-4 py-2 rounded-md bg-secondary hover:bg-secondary/90 text-white transition-all"
              >
                {t('cta.tryAiNutritionist')}
              </a>
              <Link
                href="/partners"
                className="flex items-center justify-center w-full text-sm font-medium h-9 px-4 py-2 rounded-md border border-primary text-primary hover:bg-primary/5 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('cta.partnerInquiry')}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
