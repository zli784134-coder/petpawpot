import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';
import { Target, Eye, Lightbulb, Heart, ShieldCheck, Sparkles, Repeat, PiggyBank, ArrowRight } from 'lucide-react';

const VALUE_ICONS = [ShieldCheck, Sparkles, Repeat, PiggyBank];

export default function AboutUs() {
  const { t } = useLanguage();

  const values = [1, 2, 3, 4].map((n, i) => ({
    icon: VALUE_ICONS[i],
    text: t(`aboutUs.value${n}`),
  }));

  return (
    <main>
      <Seo titleKey="seo.aboutUs.title" descKey="seo.aboutUs.description" />
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
            <Heart className="w-4 h-4" />
            {t('nav.aboutUs')}
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary max-w-4xl mx-auto">
            {t('aboutUs.title')}
          </h1>
        </div>
      </section>

      {/* ===== Mission & Vision ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-border bg-white p-8 lg:p-10 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-primary">{t('aboutUs.missionTitle')}</h2>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t('aboutUs.missionText')}</p>
          </div>
          <div className="rounded-2xl border border-border bg-white p-8 lg:p-10 shadow-card">
            <div className="w-12 h-12 rounded-xl bg-success/10 text-success flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="mt-5 text-2xl font-bold text-primary">{t('aboutUs.visionTitle')}</h2>
            <p className="mt-3 text-lg text-muted-foreground leading-relaxed">{t('aboutUs.visionText')}</p>
          </div>
        </div>
      </section>

      {/* ===== Why we started ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={IMAGES.b2b.bannerMachineKitchen}
              alt={t('aboutUs.whyWeStarted')}
              className="w-full rounded-2xl shadow-soft object-cover"
            />
            <div>
              <div className="inline-flex items-center gap-2 text-secondary font-semibold">
                <Lightbulb className="w-5 h-5" />
                {t('aboutUs.whyWeStarted')}
              </div>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-primary">{t('aboutUs.whyWeStarted')}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('aboutUs.whyText')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core values ===== */}
      <section className="container py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center">{t('aboutUs.coreValues')}</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
          {values.map((v) => (
            <div key={v.text} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-6 shadow-card">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <v.icon className="w-6 h-6" />
              </div>
              <p className="text-foreground leading-relaxed pt-1.5">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-secondary text-white">
        <div className="container py-16 lg:py-24 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('aboutUs.missionText')}</h2>
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
              href="/partners"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg border border-white/60 text-white hover:bg-white/10 font-semibold transition-all"
            >
              {t('cta.becomePartner')}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
