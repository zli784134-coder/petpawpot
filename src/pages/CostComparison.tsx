import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { AI_NUTRITIONIST_URL } from '@/lib/constants';
import { ArrowRight, Calculator, PiggyBank, Check } from 'lucide-react';

// 各食谱类型的每公斤体重每日成本（美元基准，纯前端估算模型）
const RECIPE_RATES = [
  { key: 'recipes.budgetFriendly', rate: 0.08 },
  { key: 'recipes.dailyMeals', rate: 0.12 },
  { key: 'recipes.seniorMeals', rate: 0.13 },
  { key: 'recipes.healthyWeight', rate: 0.14 },
  { key: 'recipes.puppyMeals', rate: 0.16 },
];

export default function CostComparison() {
  const { t, language } = useLanguage();

  const [weight, setWeight] = useState(25);
  const [recipeIdx, setRecipeIdx] = useState(1);

  // 货币按语言本地化展示（美元基准）。中文倍率与本页对比卡片的示例定价（约 15×）保持一致，
  // 而非真实汇率——translations 里的中文价格本就是本地化示意价，计算器需与其自洽。
  const currency = language === 'en' ? { symbol: '$', factor: 1 } : { symbol: '¥', factor: 15 };
  const dailyUsd = weight * RECIPE_RATES[recipeIdx].rate;
  const fmt = (usd: number) => `${currency.symbol}${Math.round(usd * currency.factor).toLocaleString()}`;

  const comparisons = [
    { label: t('costComparison.basicKibble'), highlighted: false },
    { label: t('costComparison.premiumKibble'), highlighted: false },
    { label: t('costComparison.freshSubscription'), highlighted: false },
    { label: t('costComparison.petpawpot'), highlighted: true },
  ];

  const reasons = [
    t('costComparison.reason1'),
    t('costComparison.reason2'),
    t('costComparison.reason3'),
    t('costComparison.reason4'),
  ];

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-1.5 text-sm font-semibold">
            <Calculator className="w-4 h-4" />
            {t('nav.costComparison')}
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary max-w-4xl mx-auto">
            {t('costComparison.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('costComparison.subtitle')}
          </p>
        </div>
      </section>

      {/* ===== Main comparison ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('costComparison.compareTitle')}</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {comparisons.map((c) => (
            <div
              key={c.label}
              className={`rounded-2xl p-6 border shadow-card text-center ${
                c.highlighted ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/30' : 'border-border bg-white'
              }`}
            >
              <p className={`font-semibold leading-relaxed ${c.highlighted ? 'text-secondary' : 'text-foreground'}`}>
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Why more affordable ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('costComparison.breakdownTitle')}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {reasons.map((r) => (
              <div key={r} className="flex items-start gap-3 rounded-2xl bg-white border border-border p-6 shadow-card">
                <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{r}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Interactive calculator ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('costComparison.costCalculator')}</h2>
          </div>
          <div className="mt-10 rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-card">
            {/* Weight */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="dog-weight" className="font-semibold text-primary">
                  {t('costComparison.dogWeight')}
                </label>
                <span className="font-bold text-secondary">{weight} kg</span>
              </div>
              <input
                id="dog-weight"
                type="range"
                min={2}
                max={60}
                step={1}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="mt-4 w-full accent-secondary"
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                <span>2 kg</span>
                <span>60 kg</span>
              </div>
            </div>

            {/* Recipe type */}
            <div className="mt-8">
              <label htmlFor="recipe-type" className="font-semibold text-primary">
                {t('costComparison.selectRecipe')}
              </label>
              <select
                id="recipe-type"
                value={recipeIdx}
                onChange={(e) => setRecipeIdx(Number(e.target.value))}
                className="mt-3 w-full h-12 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-secondary/40"
              >
                {RECIPE_RATES.map((r, i) => (
                  <option key={r.key} value={i}>
                    {t(r.key)}
                  </option>
                ))}
              </select>
            </div>

            {/* Results */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-muted p-5 text-center">
                <p className="text-sm text-muted-foreground">{t('costComparison.estimatedDailyCost')}</p>
                <p className="mt-1 text-2xl font-extrabold text-primary">{fmt(dailyUsd)}</p>
              </div>
              <div className="rounded-xl bg-muted p-5 text-center">
                <p className="text-sm text-muted-foreground">{t('costComparison.estimatedMonthlyCost')}</p>
                <p className="mt-1 text-2xl font-extrabold text-primary">{fmt(dailyUsd * 30)}</p>
              </div>
              <div className="rounded-xl bg-secondary/10 p-5 text-center ring-1 ring-secondary/30">
                <p className="text-sm text-muted-foreground">{t('costComparison.estimatedYearlyCost')}</p>
                <p className="mt-1 text-2xl font-extrabold text-secondary">{fmt(dailyUsd * 365)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Savings ===== */}
      <section className="bg-primary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <PiggyBank className="w-7 h-7 text-white" />
          </div>
          <h2 className="mt-5 text-3xl lg:text-4xl font-bold text-white">{t('costComparison.savingsTitle')}</h2>
          <p className="mt-4 text-lg text-white/85 max-w-2xl mx-auto leading-relaxed">
            {t('costComparison.savingsText')}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/fresh-meal-maker"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-primary hover:bg-white/90 font-semibold transition-all"
            >
              {t('cta.viewFreshMealMaker')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-white/60 text-white hover:bg-white/10 font-semibold transition-all"
            >
              {t('cta.tryAiNutritionist')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
