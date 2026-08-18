import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';
import { ArrowRight, Sparkles, Check, Info, Link2 } from 'lucide-react';
import TrackPageEvent from '@/components/TrackPageEvent';

export default function AiNutritionist() {
  const { t } = useLanguage();

  const problems = [
    t('aiNutritionist.problem1'),
    t('aiNutritionist.problem2'),
    t('aiNutritionist.problem3'),
    t('aiNutritionist.problem4'),
  ];

  const steps = [
    t('aiNutritionist.step1'),
    t('aiNutritionist.step2'),
    t('aiNutritionist.step3'),
    t('aiNutritionist.step4'),
  ];

  const gets = [
    t('aiNutritionist.get1'),
    t('aiNutritionist.get2'),
    t('aiNutritionist.get3'),
    t('aiNutritionist.get4'),
    t('aiNutritionist.get5'),
  ];

  return (
    <main>
      <Seo titleKey="seo.aiNutritionist.title" descKey="seo.aiNutritionist.description" />
      <TrackPageEvent event="product_page_view" page="ai-nutritionist" />
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-1.5 text-sm font-semibold">
                <Sparkles className="w-4 h-4" />
                {t('nav.aiNutritionist')}
              </div>
              <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary">
                {t('aiNutritionist.title')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                {t('aiNutritionist.subtitle')}
              </p>
              <div className="mt-8">
                <a
                  href={AI_NUTRITIONIST_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
                >
                  {t('aiNutritionist.tryNow')}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
            <div>
              <img
                src={IMAGES.nutritionDogFeeding}
                alt={t('aiNutritionist.title')}
                className="w-full max-w-sm mx-auto rounded-2xl shadow-soft object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Problem ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('aiNutritionist.problemTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('aiNutritionist.problemText')}</p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {problems.map((p, i) => (
            <div key={p} className="flex gap-4 rounded-2xl border border-border bg-white p-6 shadow-card">
              <div className="shrink-0 w-9 h-9 rounded-full bg-secondary/10 text-secondary flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <p className="text-foreground leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== How it works (4 steps) ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('aiNutritionist.solutionTitle')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('aiNutritionist.solutionText')}</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s} className="rounded-2xl bg-white border border-border p-6 shadow-card text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center text-lg font-bold">
                  {i + 1}
                </div>
                <p className="mt-5 text-foreground leading-relaxed">{s}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== What you get ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('aiNutritionist.whatYouGet')}</h2>
        </div>
        <div className="mt-10 max-w-3xl mx-auto grid gap-4">
          {gets.map((g) => (
            <div key={g} className="flex items-start gap-3 rounded-xl bg-white border border-border p-5 shadow-card">
              <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span className="text-foreground leading-relaxed">{g}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Integration with Fresh Meal Maker ===== */}
      <section className="bg-primary text-white">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center">
              <Link2 className="w-7 h-7 text-white" />
            </div>
            <h2 className="mt-5 text-3xl lg:text-4xl font-bold text-white">{t('aiNutritionist.integrationTitle')}</h2>
            <p className="mt-4 text-lg text-white/85 leading-relaxed">{t('aiNutritionist.integrationText')}</p>
            <div className="mt-8">
              <Link
                href="/fresh-meal-maker"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-primary hover:bg-white/90 font-semibold transition-all"
              >
                {t('cta.viewFreshMealMaker')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Disclaimer ===== */}
      <section className="container py-14">
        <div className="max-w-3xl mx-auto flex items-start gap-3 rounded-2xl bg-muted border border-border p-6">
          <Info className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground leading-relaxed">{t('aiNutritionist.disclaimer')}</p>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="bg-secondary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('aiNutritionist.tryNow')}</h2>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">{t('aiNutritionist.subtitle')}</p>
          <div className="mt-8">
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white text-secondary hover:bg-white/90 font-semibold transition-all shadow-soft"
            >
              {t('aiNutritionist.tryNow')}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
