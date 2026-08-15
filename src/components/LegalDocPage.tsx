import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import type { LegalDoc } from '@/lib/legal';

interface LegalDocPageProps {
  /** 中英两版整份文档，按当前语言取用 */
  doc: { en: LegalDoc; zh: LegalDoc };
  /** SEO description：法务文案的 intro 往往过长，允许单独给一句 */
  seoDescription: string;
}

// 法务页统一排版（隐私政策、服务条款共用），避免两份几乎相同的页面组件。
export default function LegalDocPage({ doc, seoDescription }: LegalDocPageProps) {
  const { language } = useLanguage();
  const d = language === 'zh' ? doc.zh : doc.en;

  return (
    <main className="bg-cream">
      <Seo title={`${d.title} | PetPawPot`} description={seoDescription} />
      <div className="container py-16 lg:py-24 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">{d.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{d.updated}</p>
        <p className="mt-6 text-lg text-foreground leading-relaxed">{d.intro}</p>

        <div className="mt-10 space-y-10">
          {d.sections.map((section) => (
            <section key={section.h}>
              <h2 className="text-xl font-semibold text-primary">{section.h}</h2>
              <div className="mt-3 space-y-3">
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
