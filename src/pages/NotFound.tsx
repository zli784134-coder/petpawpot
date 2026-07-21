import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { Home, ArrowRight } from 'lucide-react';

// 正式 404 页：品牌 token、中英友好文案、返回首页 + 热门页面入口。
export default function NotFound() {
  const { t } = useLanguage();

  const popular = [
    { label: t('nav.freshMealMaker'), href: '/fresh-meal-maker' },
    { label: t('nav.aiNutritionist'), href: '/ai-nutritionist' },
    { label: t('nav.recipes'), href: '/recipes' },
    { label: t('nav.blog'), href: '/blog' },
  ];

  return (
    <main className="bg-cream">
      <Seo titleKey="seo.notFound.title" descKey="seo.notFound.description" />
      <div className="container py-24 lg:py-32 text-center min-h-[60vh] flex flex-col items-center justify-center">
        {/* 大号 404 + 爪印 */}
        <div className="relative">
          <p className="text-[7rem] sm:text-[9rem] font-extrabold leading-none text-primary/10 select-none">
            404
          </p>
          <span className="absolute inset-0 flex items-center justify-center text-5xl sm:text-6xl">
            🐾
          </span>
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-primary">{t('notFound.title')}</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          {t('notFound.subtitle')}
        </p>

        {/* 主要操作 */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-soft"
          >
            <Home className="w-4 h-4" />
            {t('notFound.backHome')}
          </Link>
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-primary text-primary hover:bg-primary/5 font-semibold transition-all"
          >
            {t('notFound.exploreRecipes')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 热门页面 */}
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {t('notFound.helpfulLinks')}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {popular.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full bg-white border border-border text-sm font-medium text-foreground hover:border-primary/40 hover:text-primary transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
