import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';
import {
  Leaf,
  Sparkles,
  Zap,
  Clock,
  Check,
  ArrowRight,
  X,
  ShoppingCart,
  ChefHat,
  Utensils,
  ClipboardList,
} from 'lucide-react';

// 首页食谱卡片数据（Phase 1 走本地静态数据；食谱详情页留待 Phase 3）
const RECIPES = [
  { img: IMAGES.recipeChickenRice, en: 'Chicken, Rice & Carrot Daily Meal', zh: '鸡肉米饭胡萝卜日常餐' },
  { img: IMAGES.recipeChickenRice, en: 'Salmon, Pumpkin & Broccoli Fresh Meal', zh: '三文鱼南瓜西兰花鲜食餐' },
  { img: IMAGES.recipeChickenRice, en: 'Egg, Rice & Vegetable Simple Meal', zh: '鸡蛋米饭蔬菜简易餐' },
  { img: IMAGES.recipeChickenRice, en: 'Beef & Sweet Potato High-Protein Meal', zh: '牛肉红薯高蛋白餐' },
  { img: IMAGES.recipeChickenRice, en: 'Low-Cost Chicken Thigh Fresh Meal', zh: '经济鸡腿肉鲜食餐' },
  { img: IMAGES.recipeChickenRice, en: 'Senior Dog Soft Fresh Meal', zh: '老年犬软质鲜食餐' },
];

export default function Home() {
  const { language, t } = useLanguage();

  const highlights = [
    { icon: Leaf, title: t('home.realIngredients'), desc: t('home.realIngredientsDesc'), color: 'text-success' },
    { icon: Sparkles, title: t('home.aiMealPlanning'), desc: t('home.aiMealPlanningDesc'), color: 'text-secondary' },
    { icon: Zap, title: t('home.oneTouchCooking'), desc: t('home.oneTouchCookingDesc'), color: 'text-primary' },
  ];

  const steps = [
    { icon: ClipboardList, title: t('home.step1'), desc: t('home.step1Desc') },
    { icon: Sparkles, title: t('home.step2'), desc: t('home.step2Desc') },
    { icon: ShoppingCart, title: t('home.step3'), desc: t('home.step3Desc') },
    { icon: ChefHat, title: t('home.step4'), desc: t('home.step4Desc') },
    { icon: Utensils, title: t('home.step5'), desc: t('home.step5Desc') },
  ];

  const feedingOptions = [
    {
      title: t('home.kibble'),
      desc: t('home.kibbleDesc'),
      features: [t('home.kibbleFeature1'), t('home.kibbleFeature2')],
      highlighted: false,
    },
    {
      title: t('home.freshFoodSubscription'),
      desc: t('home.freshFoodSubscriptionDesc'),
      features: [t('home.freshFoodSubscriptionFeature1'), t('home.freshFoodSubscriptionFeature2')],
      highlighted: false,
    },
    {
      title: t('home.petpawpotFeeding'),
      desc: t('home.petpawpotFeedingDesc'),
      features: [t('home.petpawpotFeedingFeature1'), t('home.petpawpotFeedingFeature2')],
      highlighted: true,
    },
  ];

  const results = [t('home.result1'), t('home.result2'), t('home.result3'), t('home.result4')];

  return (
    <main>
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-primary">
                {t('hero.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t('hero.subtitle')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/fresh-meal-maker"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-soft"
                >
                  {t('cta.exploreFreshMealMaker')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={AI_NUTRITIONIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
                >
                  {t('cta.tryAiNutritionist')}
                </a>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-border bg-white hover:bg-muted text-foreground font-medium transition-all"
                >
                  {t('cta.becomePartner')}
                </Link>
              </div>
            </div>
            <div>
              <img
                src={IMAGES.heroKitchen}
                alt="Fresh Meal Maker in a modern kitchen"
                className="w-full rounded-2xl shadow-soft object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 1: The Problem + highlight cards ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section1Title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.section1Text')}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border border-border bg-white p-8 shadow-card">
              <div className={`w-12 h-12 rounded-xl bg-muted flex items-center justify-center ${h.color}`}>
                <h.icon className="w-6 h-6" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-primary">{h.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Section 2: How it works (5 steps) ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section2Title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.section2Text')}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl bg-white border border-border p-6 shadow-card text-center">
                <div className="mx-auto w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <s.icon className="mx-auto mt-4 w-7 h-7 text-secondary" />
                <h3 className="mt-3 text-base font-bold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.tryAiNutritionist')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== Section 3: Real-Life Scenario + feeding comparison ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={IMAGES.productLifestyle}
            alt="PetPawPot fresh feeding lifestyle"
            className="w-full rounded-2xl shadow-soft object-cover"
          />
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section3Title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.section3Text')}</p>
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {feedingOptions.map((o) => (
            <div
              key={o.title}
              className={`rounded-2xl p-8 border shadow-card ${
                o.highlighted ? 'border-secondary bg-secondary/5 ring-1 ring-secondary/30' : 'border-border bg-white'
              }`}
            >
              <h3 className="text-xl font-bold text-primary">{o.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">{o.desc}</p>
              <ul className="mt-5 space-y-2">
                {o.features.map((f, idx) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                    {o.highlighted || idx === 0 ? (
                      <Check className="w-4 h-4 text-success shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Section 4: Results ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section4Title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t('home.section4Text')}</p>
          </div>
          <div className="mt-10 max-w-2xl mx-auto grid gap-4">
            {results.map((r) => (
              <div key={r} className="flex items-start gap-3 rounded-xl bg-white border border-border p-5 shadow-card">
                <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <span className="text-foreground">{r}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/cost-comparison"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.compareCosts')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 5: B2B value ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section5Title')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.section5Text')}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {[1, 2, 3, 4].map((n) => (
                <div key={n}>
                  <h3 className="text-lg font-bold text-primary">{t(`home.b2bValue${n}`)}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{t(`home.b2bValue${n}Desc`)}</p>
                </div>
              ))}
            </div>
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.tryAiNutritionist')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <img
            src={IMAGES.aiNutritionistMockup}
            alt="AI Nutritionist app"
            className="w-full max-w-sm mx-auto rounded-2xl shadow-soft object-cover"
          />
        </div>
      </section>

      {/* ===== Section 6: Cost reality ===== */}
      <section className="bg-primary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('home.section6Title')}</h2>
          <p className="mt-4 text-lg text-white/80">{t('home.section6Text')}</p>
          <div className="mt-10 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[t('home.costKibble'), t('home.costFreshSubscription'), t('home.costPetpawpot')].map((c, i) => (
              <div
                key={c}
                className={`rounded-2xl p-6 ${i === 2 ? 'bg-secondary' : 'bg-white/10'} backdrop-blur-sm`}
              >
                <p className="font-semibold text-white">{c}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-white/70 max-w-2xl mx-auto">{t('home.costNote')}</p>
          <div className="mt-10">
            <Link
              href="/fresh-meal-maker"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-primary hover:bg-white/90 font-semibold transition-all"
            >
              {t('cta.viewFreshMealMaker')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 7: Recipes grid ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section7Title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t('home.section7Text')}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RECIPES.map((r) => (
            <div key={r.en} className="rounded-2xl overflow-hidden border border-border bg-white shadow-card">
              <img src={r.img} alt={language === 'en' ? r.en : r.zh} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className="text-lg font-bold text-primary">{language === 'en' ? r.en : r.zh}</h3>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Utensils className="w-4 h-4" /> {t('home.recipeDifficulty')}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-4 h-4" /> {t('home.recipeCookTime')}
                  </span>
                </div>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link
                    href="/recipes"
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
        <div className="mt-10 text-center">
          <Link
            href="/recipes"
            className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-primary text-primary hover:bg-primary/5 font-semibold transition-all"
          >
            {t('cta.viewAllRecipes')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ===== Section 8: Partner CTA banner ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.section8Title')}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t('home.section8Text')}</p>
          <div className="mt-8">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.becomePartner')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== Section 9: Final CTA banner ===== */}
      <section className="bg-secondary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('home.section9Title')}</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">{t('home.section9Text')}</p>
          <p className="mt-2 text-white/80">{t('home.section9Subtitle')}</p>
          <div className="mt-8">
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-secondary hover:bg-white/90 font-semibold transition-all shadow-soft"
            >
              {t('cta.tryAiNutritionist')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
