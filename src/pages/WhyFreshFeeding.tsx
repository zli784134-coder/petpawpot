import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';
import { ArrowRight, Eye, Leaf, HeartPulse, Check, X, Sprout } from 'lucide-react';

export default function WhyFreshFeeding() {
  const { t } = useLanguage();

  const reasons = [
    { icon: Eye, title: t('whyFreshFeeding.reason1Title'), text: t('whyFreshFeeding.reason1Text') },
    { icon: Leaf, title: t('whyFreshFeeding.reason2Title'), text: t('whyFreshFeeding.reason2Text') },
    { icon: HeartPulse, title: t('whyFreshFeeding.reason3Title'), text: t('whyFreshFeeding.reason3Text') },
  ];

  const barriers = [
    t('whyFreshFeeding.barrier1'),
    t('whyFreshFeeding.barrier2'),
    t('whyFreshFeeding.barrier3'),
    t('whyFreshFeeding.barrier4'),
  ];

  const solutions = [
    t('whyFreshFeeding.solution1'),
    t('whyFreshFeeding.solution2'),
    t('whyFreshFeeding.solution3'),
    t('whyFreshFeeding.solution4'),
  ];

  return (
    <main>
      <Seo titleKey="seo.whyFreshFeeding.title" descKey="seo.whyFreshFeeding.description" />
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-success/10 text-success px-4 py-1.5 text-sm font-semibold">
            <Sprout className="w-4 h-4" />
            {t('nav.whyFreshFeeding')}
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary max-w-4xl mx-auto">
            {t('whyFreshFeeding.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('whyFreshFeeding.subtitle')}
          </p>
        </div>
      </section>

      {/* ===== Market shift ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={IMAGES.freshIngredients}
            alt={t('whyFreshFeeding.shiftTitle')}
            className="w-full rounded-2xl shadow-soft object-cover"
          />
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('whyFreshFeeding.shiftTitle')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('whyFreshFeeding.shiftText')}</p>
          </div>
        </div>
      </section>

      {/* ===== Three reasons ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-white p-8 shadow-card">
                <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
                  <r.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-primary">{r.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Barriers vs Solutions ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Barriers */}
          <div className="rounded-2xl border border-border bg-white p-8 shadow-card">
            <h2 className="text-2xl font-bold text-primary">{t('whyFreshFeeding.barriersTitle')}</h2>
            <ul className="mt-6 space-y-4">
              {barriers.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </div>
          {/* Solutions */}
          <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8 shadow-card ring-1 ring-secondary/20">
            <h2 className="text-2xl font-bold text-primary">{t('whyFreshFeeding.solutionsTitle')}</h2>
            <ul className="mt-6 space-y-4">
              {solutions.map((s) => (
                <li key={s} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
                  <span className="text-foreground leading-relaxed">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Lifestyle band ===== */}
      <section className="bg-cream">
        <div className="container py-10 lg:py-14">
          <img
            src={IMAGES.freshFamilyFeeding}
            alt={t('whyFreshFeeding.subtitle')}
            className="w-full max-h-[420px] rounded-2xl shadow-soft object-cover"
          />
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-secondary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('whyFreshFeeding.title')}</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">{t('whyFreshFeeding.subtitle')}</p>
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
              href="/cost-comparison"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-white/60 text-white hover:bg-white/10 font-semibold transition-all"
            >
              {t('cta.compareCosts')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
