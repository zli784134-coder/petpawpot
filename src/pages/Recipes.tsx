import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { AI_NUTRITIONIST_URL } from '@/lib/constants';
import recipesData from '@/data/recipes.json';
import { ArrowRight, Clock, Utensils, DollarSign, ChefHat, Check } from 'lucide-react';

// 食谱分类（对应 recipes.* 翻译键与 recipes.json 的 category 字段）
const CATEGORIES = [
  'dailyMeals',
  'puppyMeals',
  'seniorMeals',
  'healthyWeight',
  'sensitiveDiet',
  'budgetFriendly',
] as const;

export default function Recipes() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState<string>('all');

  const lang = language as 'en' | 'zh';

  const filtered =
    active === 'all'
      ? recipesData
      : recipesData.filter((r) => r.category === active);

  const includes = [
    t('recipes.include1'),
    t('recipes.include2'),
    t('recipes.include3'),
    t('recipes.include4'),
    t('recipes.include5'),
    t('recipes.include6'),
  ];

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-1.5 text-sm font-semibold">
            <ChefHat className="w-4 h-4" />
            {t('nav.recipes')}
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary max-w-4xl mx-auto">
            {t('recipes.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('recipes.subtitle')}
          </p>
        </div>
      </section>

      {/* ===== What each recipe includes ===== */}
      <section className="container py-14 lg:py-20">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary text-center">
          {t('recipes.recipeIncludes')}
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {includes.map((item) => (
            <div key={item} className="flex items-start gap-3 rounded-xl border border-border bg-white p-4 shadow-card">
              <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span className="text-foreground leading-relaxed">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Category filter + grid ===== */}
      <section className="bg-cream">
        <div className="container py-14 lg:py-20">
          {/* Filter chips */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setActive('all')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-foreground border border-border hover:border-primary/40'
              }`}
            >
              {t('recipes.allCategories')}
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  active === cat
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground border border-border hover:border-primary/40'
                }`}
              >
                {t(`recipes.${cat}`)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((r) => (
              <div
                key={r.slug}
                className="flex flex-col rounded-2xl overflow-hidden border border-border bg-white shadow-card"
              >
                <img
                  src={r.image}
                  alt={r.name[lang]}
                  className="w-full h-48 object-cover"
                />
                <div className="flex flex-col flex-1 p-6">
                  <span className="inline-flex self-start items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-semibold">
                    {t(`recipes.${r.category}`)}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-primary">{r.name[lang]}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                    {r.summary[lang]}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-4 h-4" /> {r.prepTime[lang]}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Utensils className="w-4 h-4" /> {t(`recipes.${r.difficulty}`)}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <DollarSign className="w-4 h-4" /> {r.cost[lang]}
                    </span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/recipe-detail/${r.slug}`}
                      className="inline-flex items-center gap-1 h-10 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all"
                    >
                      {t('cta.viewRecipe')}
                    </Link>
                    <a
                      href={AI_NUTRITIONIST_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 h-10 px-4 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted transition-all"
                    >
                      {t('cta.customizeWithAi')}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-secondary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('recipes.title')}</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">{t('recipes.subtitle')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-secondary hover:bg-white/90 font-semibold transition-all shadow-soft"
            >
              {t('cta.tryAiNutritionist')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/fresh-meal-maker"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-white/60 text-white hover:bg-white/10 font-semibold transition-all"
            >
              {t('cta.viewFreshMealMaker')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
