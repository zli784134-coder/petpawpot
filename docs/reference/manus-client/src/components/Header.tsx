import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/_core/hooks/useAuth';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { getLoginUrl } from '@/const';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  const navItems = [
    { key: 'home', label: t('nav.home'), href: '/' },
    { key: 'freshMealMaker', label: t('nav.freshMealMaker'), href: '/fresh-meal-maker' },
    { key: 'aiNutritionist', label: t('nav.aiNutritionist'), href: '/ai-nutritionist' },
    { key: 'recipes', label: t('nav.recipes'), href: '/recipes' },
    { key: 'costComparison', label: t('nav.costComparison'), href: '/cost-comparison' },
    { key: 'whyFreshFeeding', label: t('nav.whyFreshFeeding'), href: '/why-fresh-feeding' },
    { key: 'partners', label: t('nav.partners'), href: '/partners' },
    { key: 'aboutUs', label: t('nav.aboutUs'), href: '/about-us' },
    { key: 'blog', label: language === 'en' ? 'Blog' : '博客', href: '/blog' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 cursor-pointer">
            <img 
              src="/manus-storage/logo-paw-pot_afc0b759.png" 
              alt="PetPawPot" 
              className="h-8 w-8"
            />
            <span className="font-bold text-lg text-primary hidden sm:inline">
              {language === 'en' ? 'PetPawPot' : '宠鲜鲜'}
            </span>
          </Link>

          {/* Desktop Navigation - using Link with className instead of wrapping Button */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-3 py-2 hover:bg-accent hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side - CTA and Language */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <div className="flex items-center gap-1 border border-border rounded-lg p-1">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                  language === 'en'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('zh')}
                className={`px-2 py-1 rounded text-sm font-medium transition-all ${
                  language === 'zh'
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                中文
              </button>
            </div>

            {/* CTA Buttons - using <a> directly without nesting */}
            <a 
              href="https://extraordinary-moonbeam-aaffe1.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 py-2 bg-secondary hover:bg-secondary/90 text-white transition-all"
            >
              {t('cta.tryAiNutritionist')}
            </a>

            <Link
              href="/partners"
              className="hidden sm:inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 border border-primary text-primary hover:bg-primary/5 hover:border-primary/50 transition-all"
            >
              {t('cta.partnerInquiry')}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-semibold">
                    {user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-foreground">
                    {user.name || user.email}
                  </span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-border rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate('/cms/content');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {language === 'en' ? 'CMS Admin' : 'CMS 管理'}
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-muted transition-colors flex items-center gap-2 border-t border-border text-red-600"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'en' ? 'Logout' : '登出'}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href={getLoginUrl()}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold h-9 px-4 py-2 bg-primary hover:bg-primary/90 text-white transition-all"
              >
                {language === 'en' ? 'Login' : '登录'}
              </a>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation - using Link with className instead of wrapping Button */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
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
                href="https://extraordinary-moonbeam-aaffe1.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full text-sm font-medium h-9 px-4 py-2 rounded-md bg-primary hover:bg-primary/90 text-white transition-all"
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
              {!user && (
                <a
                  href={getLoginUrl()}
                  className="flex items-center justify-center w-full text-sm font-semibold h-9 px-4 py-2 rounded-md bg-primary hover:bg-primary/90 text-white transition-all"
                >
                  {language === 'en' ? 'Login' : '登录'}
                </a>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
