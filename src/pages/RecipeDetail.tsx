import { Link, useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { AI_NUTRITIONIST_URL } from '@/lib/constants';
import recipesData from '@/data/recipes.json';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Utensils,
  DollarSign,
  Users,
  Leaf,
  Zap,
  ListChecks,
  Check,
} from 'lucide-react';

export default function RecipeDetail() {
  const { language, t } = useLanguage();
  const [, params] = useRoute('/recipe-detail/:slug');
  const lang = language as 'en' | 'zh';

  const recipe = recipesData.find((r) => r.slug === params?.slug);

  // 未匹配到食谱：友好回退，提供返回列表入口
  if (!recipe) {
    return (
      <main className="container py-24 text-center">
        <h1 className="text-3xl font-bold text-primary">{t('recipes.notFound')}</h1>
        <Link
          href="/recipes"
          className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-white font-semibold transition-all hover:bg-primary/90"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('recipes.backToRecipes')}
        </Link>
      </main>
    );
  }

  const facts = [
    { icon: Users, label: t('recipes.servings'), value: recipe.servings[lang] },
    { icon: DollarSign, label: t('recipes.estCost'), value: recipe.cost[lang] },
    { icon: Clock, label: t('recipes.prepTime'), value: recipe.prepTime[lang] },
    { icon: Utensils, label: t('recipes.difficulty'), value: t(`recipes.${recipe.difficulty}`) },
  ];

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-12 lg:py-16">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('recipes.backToRecipes')}
          </Link>
          <div className="mt-6 grid lg:grid-cols-2 gap-10 items-center">
            <img
              src={recipe.image}
              alt={recipe.name[lang]}
              className="w-full rounded-2xl shadow-soft object-cover aspect-[4/3]"
            />
            <div>
              <span className="inline-flex items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-semibold">
                {t(`recipes.${recipe.category}`)}
              </span>
              <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-primary">
                {recipe.name[lang]}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {recipe.summary[lang]}
              </p>
              {/* Quick facts */}
              <div className="mt-6 grid grid-cols-2 gap-3">
                {facts.map((f) => (
                  <div
                    key={f.label}
                    className="flex items-center gap-3 rounded-xl border border-border bg-white p-3 shadow-card"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <f.icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">{f.label}</p>
                      <p className="text-sm font-semibold text-foreground truncate">{f.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Ingredients + Nutrition ===== */}
      <section className="container py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Ingredients */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Utensils className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary">{t('recipes.ingredients')}</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {recipe.ingredients[lang].map((ing) => (
                <li key={ing} className="flex items-start gap-3">
                  <Leaf className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{ing}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Nutrition */}
          <div className="rounded-2xl border border-success/30 bg-success/5 p-8 shadow-card">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-success/10 text-success flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-bold text-primary">{t('recipes.nutritionHighlights')}</h2>
            </div>
            <ul className="mt-6 space-y-3">
              {recipe.nutrition[lang].map((n) => (
                <li key={n} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Preparation steps ===== */}
      <section className="bg-cream">
        <div className="container py-14 lg:py-20">
          <div className="flex items-center gap-3 justify-center">
            <ListChecks className="w-6 h-6 text-primary" />
            <h2 className="text-2xl lg:text-3xl font-bold text-primary">{t('recipes.preparationSteps')}</h2>
          </div>
          <ol className="mt-8 max-w-3xl mx-auto space-y-4">
            {recipe.steps[lang].map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-4 rounded-xl border border-border bg-white p-5 shadow-card"
              >
                <span className="w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center shrink-0">
                  {i + 1}
                </span>
                <span className="text-foreground leading-relaxed pt-1">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Fresh Meal Maker note ===== */}
      <section className="container py-14 lg:py-20">
        <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8 lg:p-10 shadow-card ring-1 ring-secondary/20 max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-primary">{t('recipes.freshMakerNote')}</h2>
          </div>
          <p className="mt-5 text-lg text-foreground leading-relaxed">{recipe.freshMakerNote[lang]}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.customizeWithAi')}
              <ArrowRight className="w-4 h-4" />
            </a>
            <Link
              href="/recipes"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-primary text-primary hover:bg-primary/5 font-semibold transition-all"
            >
              {t('cta.viewAllRecipes')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
