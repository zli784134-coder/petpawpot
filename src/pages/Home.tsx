import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';
import {
  ArrowRight,
  ArrowDown,
  BadgeCheck,
  Brain,
  Building2,
  Check,
  ChefHat,
  ClipboardList,
  Clock,
  Dog,
  Globe,
  Handshake,
  Heart,
  Leaf,
  Mail,
  PawPrint,
  Puzzle,
  Refrigerator,
  Repeat,
  Salad,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Store,
  Thermometer,
  TrendingUp,
  Users,
  Utensils,
} from 'lucide-react';

// B2B 漏斗:营养评估外链统一带 utm 来源标记
const NUTRITION_ASSESSMENT_URL = `${AI_NUTRITIONIST_URL}?utm_source=petpawpot-b2b`;

export default function Home() {
  const { t } = useLanguage();

  // ===== Section 2: 过去 vs 现在 =====
  const pastItems = [t('home.marketPastItem1'), t('home.marketPastItem2'), t('home.marketPastItem3')];
  const nowItems = [
    t('home.marketNowItem1'),
    t('home.marketNowItem2'),
    t('home.marketNowItem3'),
    t('home.marketNowItem4'),
  ];
  const whyFresh = [
    { icon: Heart, title: t('home.whyFresh1Title'), desc: t('home.whyFresh1Desc') },
    { icon: Salad, title: t('home.whyFresh2Title'), desc: t('home.whyFresh2Desc') },
    { icon: Brain, title: t('home.whyFresh3Title'), desc: t('home.whyFresh3Desc') },
    { icon: TrendingUp, title: t('home.whyFresh4Title'), desc: t('home.whyFresh4Desc') },
  ];

  // ===== Section 3: 五个执行痛点 =====
  const pains = [
    { icon: Clock, title: t('home.pain1Title'), desc: t('home.pain1Desc') },
    { icon: Scale, title: t('home.pain2Title'), desc: t('home.pain2Desc') },
    { icon: Thermometer, title: t('home.pain3Title'), desc: t('home.pain3Desc') },
    { icon: Refrigerator, title: t('home.pain4Title'), desc: t('home.pain4Desc') },
    { icon: Repeat, title: t('home.pain5Title'), desc: t('home.pain5Desc') },
  ];
  const solves = [
    t('home.solve1'),
    t('home.solve2'),
    t('home.solve3'),
    t('home.solve4'),
    t('home.solve5'),
  ];

  // ===== Section 4: 三步流程 + 四个能力点 =====
  const solutionSteps = [
    { icon: ClipboardList, title: t('home.solStep1Title'), desc: t('home.solStep1Desc') },
    { icon: Salad, title: t('home.solStep2Title'), desc: t('home.solStep2Desc') },
    { icon: Sparkles, title: t('home.solStep3Title'), desc: t('home.solStep3Desc') },
  ];
  const capabilities = [
    { icon: Dog, title: t('home.cap1Title'), desc: t('home.cap1Desc') },
    { icon: Leaf, title: t('home.cap2Title'), desc: t('home.cap2Desc') },
    { icon: ShieldCheck, title: t('home.cap3Title'), desc: t('home.cap3Desc') },
    { icon: Heart, title: t('home.cap4Title'), desc: t('home.cap4Desc') },
  ];
  const plannedItems = [t('home.planned1'), t('home.planned2'), t('home.planned3')];

  // ===== Section 5: 三种喂养方式对比 =====
  const feedingOptions = [
    {
      title: t('home.biz1Title'),
      desc: t('home.biz1Desc'),
      features: [t('home.biz1Feature1'), t('home.biz1Feature2')],
      highlighted: false,
    },
    {
      title: t('home.biz2Title'),
      desc: t('home.biz2Desc'),
      features: [t('home.biz2Feature1'), t('home.biz2Feature2')],
      highlighted: false,
    },
    {
      title: t('home.biz3Title'),
      desc: t('home.biz3Desc'),
      features: [t('home.biz3Feature1'), t('home.biz3Feature2'), t('home.biz3Feature3')],
      highlighted: true,
    },
  ];

  // ===== Section 6: 合作价值 + 生态 + 伙伴类型 =====
  const b2bValues = [
    { icon: TrendingUp, title: t('home.b2bValue1Title'), desc: t('home.b2bValue1Desc') },
    { icon: ChefHat, title: t('home.b2bValue2Title'), desc: t('home.b2bValue2Desc') },
    { icon: Puzzle, title: t('home.b2bValue3Title'), desc: t('home.b2bValue3Desc') },
    { icon: Handshake, title: t('home.b2bValue4Title'), desc: t('home.b2bValue4Desc') },
  ];
  const ecosystem = [
    { icon: Utensils, label: t('home.eco1') },
    { icon: Brain, label: t('home.eco2') },
    { icon: ChefHat, label: t('home.eco3') },
    { icon: Repeat, label: t('home.eco4') },
    { icon: PawPrint, label: t('home.eco5') },
  ];
  const partnerTypes = [
    { icon: Store, title: t('home.pt1Title'), desc: t('home.pt1Desc') },
    { icon: Globe, title: t('home.pt2Title'), desc: t('home.pt2Desc') },
    { icon: Building2, title: t('home.pt3Title'), desc: t('home.pt3Desc') },
    { icon: Stethoscope, title: t('home.pt4Title'), desc: t('home.pt4Desc') },
    { icon: Users, title: t('home.pt5Title'), desc: t('home.pt5Desc') },
    { icon: Handshake, title: t('home.pt6Title'), desc: t('home.pt6Desc') },
  ];

  return (
    <main>
      <Seo titleKey="seo.home.title" descKey="seo.home.description" />

      {/* ===== Section 1: Hero — 重新定义宠物鲜食方式 ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-sm font-semibold text-primary shadow-card">
                <PawPrint className="w-4 h-4 text-secondary" />
                {t('home.heroEyebrow')}
              </span>
              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-primary">
                {t('home.heroTitle')}
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{t('home.heroSubtitle')}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#solution"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all shadow-soft"
                >
                  {t('home.heroCta1')}
                  <ArrowDown className="w-4 h-4" />
                </a>
                <Link
                  href="/partners"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
                >
                  {t('home.heroCta2')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={NUTRITION_ASSESSMENT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-primary text-primary hover:bg-primary/5 font-semibold transition-all"
                >
                  {t('home.heroCta3')}
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={IMAGES.heroCooking}
                alt="The PetPawPot smart fresh meal maker preparing a fresh pet meal"
                className="w-full rounded-2xl shadow-soft object-cover"
              />
              {/* 营养师系统支持卡：宠物信息示例 → 营养建议 */}
              <div className="mt-6 lg:mt-0 lg:absolute lg:-bottom-8 lg:-left-8 lg:max-w-sm rounded-2xl bg-white border border-border p-5 shadow-soft">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-secondary">
                    <Brain className="w-4 h-4" />
                    {t('home.heroCardTag')}
                  </span>
                  <span className="text-xs text-muted-foreground">{t('home.heroCardExample')}</span>
                </div>
                <div className="mt-3 rounded-xl bg-muted p-3">
                  <p className="text-xs font-semibold text-muted-foreground">{t('home.heroCardPetLabel')}</p>
                  <p className="mt-0.5 text-sm font-semibold text-primary">{t('home.heroCardPetValue')}</p>
                </div>
                <div className="mt-2 rounded-xl bg-secondary/10 p-3">
                  <p className="text-xs font-semibold text-muted-foreground">{t('home.heroCardAdviceLabel')}</p>
                  <p className="mt-0.5 text-sm font-medium text-foreground leading-relaxed">
                    {t('home.heroCardAdviceValue')}
                  </p>
                </div>
                <p className="mt-3 flex items-start gap-1.5 text-xs text-muted-foreground">
                  <BadgeCheck className="w-4 h-4 text-success shrink-0" />
                  {t('home.heroCardCheck')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 2: 市场 — 宠物食品正在进入鲜食新时代 ===== */}
      <section className="container py-16 lg:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.marketTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.marketText')}</p>
        </div>
        {/* 过去 → 现在 进化对比 */}
        <div className="mt-12 grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="rounded-2xl bg-muted border border-border p-8">
            <p className="text-sm font-bold uppercase tracking-wide text-muted-foreground">
              {t('home.marketPastLabel')}
            </p>
            <h3 className="mt-2 text-xl font-bold text-primary">{t('home.marketPastTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {pastItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-white border border-secondary/40 ring-1 ring-secondary/20 p-8 shadow-card">
            <p className="text-sm font-bold uppercase tracking-wide text-secondary">{t('home.marketNowLabel')}</p>
            <h3 className="mt-2 text-xl font-bold text-primary">{t('home.marketNowTitle')}</h3>
            <ul className="mt-5 space-y-3">
              {nowItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 text-success" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* 为什么选择鲜食喂养 */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary">{t('home.whyFreshTitle')}</h3>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyFresh.map((w) => (
            <div key={w.title} className="rounded-2xl bg-white border border-border p-6 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-secondary">
                <w.icon className="w-5 h-5" />
              </div>
              <h4 className="mt-4 text-lg font-bold text-primary">{w.title}</h4>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Section 3: 痛点 — 鲜食好，但执行困难 ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={IMAGES.realLifeScenario}
              alt="A pet parent preparing a fresh pet meal in a home kitchen"
              className="w-full rounded-2xl shadow-soft object-cover"
            />
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.painTitle')}</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.painText')}</p>
            </div>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {pains.map((p) => (
              <div key={p.title} className="rounded-2xl bg-white border border-border p-6 shadow-card">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-secondary">
                  <p.icon className="w-5 h-5" />
                </div>
                <h3 className="mt-4 text-base font-bold text-primary">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          {/* “PetPawPot 解决这些问题”横条 */}
          <div className="mt-10 rounded-2xl bg-primary p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center gap-5">
              <p className="text-lg font-bold text-white shrink-0">{t('home.solveBarTitle')}</p>
              <div className="flex flex-wrap gap-2.5">
                {solves.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                  >
                    <Check className="w-4 h-4 text-secondary" />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 4: 方案 — 从智能鲜食机，到完整营养解决方案 ===== */}
      <section id="solution" className="container py-16 lg:py-24 scroll-mt-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/30 px-4 py-1.5 text-sm font-bold text-secondary">
            <Sparkles className="w-4 h-4" />
            {t('home.solutionBadge')}
          </span>
          <h2 className="mt-5 text-3xl lg:text-4xl font-bold text-primary">{t('home.solutionTitle')}</h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.solutionText')}</p>
        </div>
        {/* 三步流程 */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {solutionSteps.map((s, i) => (
            <div key={s.title} className="rounded-2xl bg-white border border-border p-8 shadow-card text-center">
              <div className="mx-auto w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                {i + 1}
              </div>
              <s.icon className="mx-auto mt-4 w-7 h-7 text-secondary" />
              <h3 className="mt-3 text-lg font-bold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
        {/* 四个能力点 + 产品图 */}
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <img
            src={IMAGES.productHero}
            alt="The PetPawPot smart fresh meal maker"
            className="w-full rounded-2xl shadow-soft object-cover"
          />
          <div>
            <div className="grid sm:grid-cols-2 gap-5">
              {capabilities.map((c) => (
                <div key={c.title} className="rounded-2xl bg-white border border-border p-6 shadow-card">
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-secondary">
                    <c.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-primary">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
            {/* 未上线能力，一律标（规划中） */}
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-muted-foreground">{t('home.plannedLabel')}</span>
              {plannedItems.map((p) => (
                <span
                  key={p}
                  className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  {p}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={NUTRITION_ASSESSMENT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
              >
                {t('home.heroCta3')}
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/fresh-meal-maker"
                className="inline-flex items-center gap-2 h-12 px-6 rounded-lg border border-primary text-primary hover:bg-primary/5 font-semibold transition-all"
              >
                {t('cta.exploreFreshMealMaker')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Section 5: 商业 — 鲜食，让健康选择更可负担 ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.bizTitle')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.bizText')}</p>
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
                <ul className="mt-5 space-y-2.5">
                  {o.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${o.highlighted ? 'text-success' : 'text-muted-foreground'}`}
                      />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            {t('home.bizDisclaimer')}
          </p>
        </div>
      </section>

      {/* ===== Section 6: B2B — 加入宠物鲜食新时代 ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('home.b2bTitle')}</h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">{t('home.b2bText')}</p>
            <div className="mt-8 grid sm:grid-cols-2 gap-5">
              {b2bValues.map((v) => (
                <div key={v.title}>
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-secondary">
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-primary">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <img
            src={IMAGES.partnersProduct}
            alt="The PetPawPot smart fresh meal maker for retail and distribution partners"
            className="w-full rounded-2xl shadow-soft object-cover"
          />
        </div>

        {/* 解决方案生态横排 */}
        <div className="mt-16 rounded-2xl bg-white border border-border p-8 shadow-card">
          <h3 className="text-xl font-bold text-primary text-center">{t('home.ecoTitle')}</h3>
          <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-center gap-3">
            {ecosystem.map((e, i) => (
              <div key={e.label} className="flex flex-col md:flex-row items-center gap-3">
                <div className="w-full md:w-auto rounded-xl bg-muted px-5 py-4 text-center">
                  <e.icon className="mx-auto w-6 h-6 text-secondary" />
                  <p className="mt-2 text-sm font-semibold text-primary whitespace-nowrap">{e.label}</p>
                </div>
                {i < ecosystem.length - 1 && (
                  <ArrowRight className="hidden md:block w-5 h-5 text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 寻找的伙伴类型 */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary">{t('home.partnerTypesTitle')}</h3>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((p) => (
            <div key={p.title} className="rounded-2xl bg-white border border-border p-6 shadow-card">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-secondary">
                <p.icon className="w-5 h-5" />
              </div>
              <h4 className="mt-4 text-lg font-bold text-primary">{p.title}</h4>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== B2B 收尾 CTA ===== */}
      <section className="bg-primary text-white">
        <div className="container py-16 lg:py-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">{t('home.b2bCtaTitle')}</h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">{t('home.b2bCtaText')}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/partners"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.becomePartner')}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:partner@petpawpot.com"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold transition-all"
            >
              <Mail className="w-4 h-4" />
              partner@petpawpot.com
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
