import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';
import {
  ArrowRight,
  Clock,
  Thermometer,
  Scale,
  Wallet,
  ChefHat,
  ShieldCheck,
  Sparkles,
  Check,
} from 'lucide-react';

export default function FreshMealMaker() {
  const { t } = useLanguage();

  const problems = [t('freshMealMaker.problem1'), t('freshMealMaker.problem2'), t('freshMealMaker.problem3')];
  const steps = [t('freshMealMaker.step1'), t('freshMealMaker.step2'), t('freshMealMaker.step3')];

  const benefits = [
    { icon: Clock, title: t('freshMealMaker.benefit1'), desc: t('freshMealMaker.benefit1Desc') },
    { icon: Thermometer, title: t('freshMealMaker.benefit2'), desc: t('freshMealMaker.benefit2Desc') },
    { icon: Scale, title: t('freshMealMaker.benefit3'), desc: t('freshMealMaker.benefit3Desc') },
    { icon: Wallet, title: t('freshMealMaker.benefit4'), desc: t('freshMealMaker.benefit4Desc') },
  ];

  const lifestyleSteps = [
    t('freshMealMaker.lifestyleStep1'),
    t('freshMealMaker.lifestyleStep2'),
    t('freshMealMaker.lifestyleStep3'),
  ];

  const features = [
    t('freshMealMaker.feature1'),
    t('freshMealMaker.feature2'),
    t('freshMealMaker.feature3'),
    t('freshMealMaker.feature4'),
    t('freshMealMaker.feature5'),
  ];

  const faqs = [
    { q: t('freshMealMaker.faq1Q'), a: t('freshMealMaker.faq1A') },
    { q: t('freshMealMaker.faq2Q'), a: t('freshMealMaker.faq2A') },
    { q: t('freshMealMaker.faq3Q'), a: t('freshMealMaker.faq3A') },
    { q: t('freshMealMaker.faq4Q'), a: t('freshMealMaker.faq4A') },
    { q: t('freshMealMaker.faq5Q'), a: t('freshMealMaker.faq5A') },
  ];

  return (
    <main>
      <Seo titleKey="seo.freshMealMaker.title" descKey="seo.freshMealMaker.description" />
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-1.5 text-sm font-semibold">
                <ChefHat className="w-4 h-4" />
                {t('nav.freshMealMaker')}
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary">
                {t('freshMealMaker.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {t('freshMealMaker.subtitle')}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={AI_NUTRITIONIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
                >
                  {t('cta.tryAiNutritionist')}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <Link
                  href="/cost-comparison"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-border bg-white hover:bg-muted text-foreground font-medium transition-all"
                >
                  {t('cta.compareCosts')}
                </Link>
              </div>
            </div>
            <div>
              <img
                src={IMAGES.b2b.productHeroIngredients}
                alt={t('freshMealMaker.title')}
                className="w-full rounded-2xl shadow-soft object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Problem ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('freshMealMaker.problemTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('freshMealMaker.problemText')}</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {problems.map((p, i) => (
            <div key={p} className="rounded-2xl border border-border bg-white p-8 shadow-card">
              <div className="w-10 h-10 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <p className="mt-4 text-foreground leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Solution / How it works ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('freshMealMaker.solutionTitle')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('freshMealMaker.solutionText')}</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s} className="rounded-2xl bg-white border border-border p-8 shadow-card text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  {i + 1}
                </div>
                <p className="mt-5 text-foreground leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Key Benefits ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('freshMealMaker.keyBenefits')}</h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {benefits.map((b) => (
            <div key={b.title} className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-card">
              <div className="shrink-0 w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                <b.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary">{b.title}</h3>
                <p className="mt-1 text-muted-foreground leading-relaxed">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Lifestyle Integration ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={IMAGES.b2b.productCatEating}
              alt={t('freshMealMaker.lifestyleTitle')}
              className="w-full rounded-2xl shadow-soft object-cover"
            />
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('freshMealMaker.lifestyleTitle')}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('freshMealMaker.lifestyleText')}</p>
              <ul className="mt-6 space-y-3">
                {lifestyleSteps.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                    <span className="text-foreground leading-relaxed">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Product Features ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('freshMealMaker.productDetails')}</h2>
        </div>
        <div className="mt-12 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={IMAGES.b2b.productExploded}
            alt={t('freshMealMaker.productDetails')}
            className="w-full rounded-2xl shadow-soft object-cover"
          />
          <div className="grid gap-4">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-xl bg-white border border-border p-5 shadow-card">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-foreground leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>
        {/* 细节实拍:控温/搅拌/不粘内胆/可进洗碗机 */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: IMAGES.b2b.detailHeating, label: t('freshMealMaker.detailHeating') },
            { img: IMAGES.b2b.detailStirring, label: t('freshMealMaker.detailStirring') },
            { img: IMAGES.b2b.detailNonstick, label: t('freshMealMaker.detailNonstick') },
            { img: IMAGES.b2b.detailDishwasher, label: t('freshMealMaker.detailDishwasher') },
          ].map((d) => (
            <figure key={d.label} className="rounded-2xl bg-white border border-border overflow-hidden shadow-card">
              <img src={d.img} alt={d.label} className="w-full aspect-square object-cover" loading="lazy" />
              <figcaption className="p-3 text-sm font-semibold text-primary text-center">{d.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('freshMealMaker.faq')}</h2>
          </div>
          <div className="mt-10 max-w-3xl mx-auto space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white border border-border p-6 shadow-card">
                <summary className="flex cursor-pointer items-center justify-between gap-4 font-semibold text-primary list-none">
                  {f.q}
                  <ArrowRight className="w-4 h-4 shrink-0 text-secondary transition-transform group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-secondary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <div className="mx-auto w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h2 className="mt-5 text-3xl lg:text-4xl font-bold text-white">{t('freshMealMaker.solutionTitle')}</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">{t('freshMealMaker.subtitle')}</p>
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
              href="/why-fresh-feeding"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-white/60 text-white hover:bg-white/10 font-semibold transition-all"
            >
              {t('cta.learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
