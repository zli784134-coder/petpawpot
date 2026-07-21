import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { IMAGES } from '@/lib/constants';
import {
  Handshake,
  TrendingUp,
  Package,
  FileText,
  Wrench,
  Megaphone,
  LifeBuoy,
  Store,
  Truck,
  Stethoscope,
  Check,
  CheckCircle2,
} from 'lucide-react';

const PROVIDE_ICONS = [Package, FileText, Wrench, Megaphone, LifeBuoy];

export default function Partners() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const provides = [1, 2, 3, 4, 5].map((n, i) => ({
    icon: PROVIDE_ICONS[i],
    text: t(`partners.provide${n}`),
  }));

  const benefits = [1, 2, 3, 4, 5].map((n) => t(`partners.benefit${n}`));

  const partnerTypes = [
    { icon: Store, title: t('partners.retailer'), desc: t('partners.retailerDesc') },
    { icon: Truck, title: t('partners.distributor'), desc: t('partners.distributorDesc') },
    { icon: Stethoscope, title: t('partners.veterinary'), desc: t('partners.veterinaryDesc') },
  ];

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const data: Record<string, string> = { 'form-name': 'partner-inquiry' };
    fd.forEach((v, k) => {
      data[k] = String(v);
    });
    setSubmitting(true);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true))
      .finally(() => setSubmitting(false));
  };

  return (
    <main>
      <Seo titleKey="seo.partners.title" descKey="seo.partners.description" />
      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
            <Handshake className="w-4 h-4" />
            {t('nav.partners')}
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary max-w-4xl mx-auto">
            {t('partners.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('partners.subtitle')}
          </p>
        </div>
      </section>

      {/* ===== Market opportunity ===== */}
      <section className="container py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-success font-semibold">
              <TrendingUp className="w-5 h-5" />
              {t('partners.opportunityTitle')}
            </div>
            <h2 className="mt-3 text-3xl lg:text-4xl font-bold text-primary">
              {t('partners.opportunityTitle')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {t('partners.opportunityText')}
            </p>
          </div>
          <img
            src={IMAGES.productLifestyle}
            alt={t('partners.opportunityTitle')}
            className="w-full rounded-2xl shadow-soft object-cover"
          />
        </div>
      </section>

      {/* ===== What we provide ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center">
            {t('partners.provideTitle')}
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {provides.map((p) => (
              <div key={p.text} className="rounded-2xl border border-border bg-white p-8 shadow-card">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <p.icon className="w-6 h-6" />
                </div>
                <p className="mt-5 text-foreground leading-relaxed font-medium">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Partner benefits ===== */}
      <section className="container py-16 lg:py-24">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center">
          {t('partners.benefitsTitle')}
        </h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
          {benefits.map((b) => (
            <li
              key={b}
              className="flex items-start gap-3 rounded-xl border border-border bg-white p-5 shadow-card"
            >
              <Check className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <span className="text-foreground leading-relaxed">{b}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ===== Partner types ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary text-center">
            {t('partners.partnerTypesTitle')}
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {partnerTypes.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-white p-8 shadow-card text-center"
              >
                <div className="w-14 h-14 mx-auto rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <p.icon className="w-7 h-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-primary">{p.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Inquiry form (Netlify Forms) ===== */}
      <section id="inquiry" className="container py-16 lg:py-24">
        <div className="max-w-2xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary">{t('partners.partnerForm')}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{t('partners.formIntro')}</p>
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-white p-6 sm:p-10 shadow-soft">
            {submitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-14 h-14 text-success mx-auto" />
                <h3 className="mt-4 text-2xl font-bold text-primary">{t('partners.formSuccessTitle')}</h3>
                <p className="mt-2 text-muted-foreground">{t('partners.formSuccessText')}</p>
              </div>
            ) : (
              <form
                name="partner-inquiry"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Netlify 隐藏字段：表单名 + 蜜罐 */}
                <input type="hidden" name="form-name" value="partner-inquiry" />
                <p className="hidden">
                  <label>
                    Don't fill this out if you're human: <input name="bot-field" />
                  </label>
                </p>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-foreground mb-1.5">
                      {t('partners.formCompany')}
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-semibold text-foreground mb-1.5">
                      {t('partners.formContact')}
                    </label>
                    <input
                      id="contact"
                      name="contact"
                      type="text"
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-1.5">
                      {t('partners.formEmail')}
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="block text-sm font-semibold text-foreground mb-1.5">
                      {t('partners.formCountry')}
                    </label>
                    <input
                      id="country"
                      name="country"
                      type="text"
                      required
                      className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-semibold text-foreground mb-1.5">
                    {t('partners.formType')}
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    defaultValue=""
                    className="w-full h-11 px-4 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                  >
                    <option value="" disabled>
                      {t('partners.formSelect')}
                    </option>
                    <option value="retailer">{t('partners.typeRetailer')}</option>
                    <option value="distributor">{t('partners.typeDistributor')}</option>
                    <option value="veterinary">{t('partners.typeVeterinary')}</option>
                    <option value="other">{t('partners.typeOther')}</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-1.5">
                    {t('partners.formMessage')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all disabled:opacity-60"
                >
                  {submitting ? t('partners.formSubmitting') : t('partners.formSubmit')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
