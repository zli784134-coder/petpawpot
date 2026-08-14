import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { privacy } from '@/lib/legal';

// 隐私政策页。GA4 的服务条款要求站点披露分析 cookie，页面上线前 footer 的
// Privacy Policy 链接一直是空的 `#`，本页把它接上。
export default function Privacy() {
  const { language } = useLanguage();
  const doc = language === 'zh' ? privacy.zh : privacy.en;

  return (
    <main className="bg-cream">
      <Seo
        title={`${doc.title} | PetPawPot`}
        description={doc.intro}
      />
      <div className="container py-16 lg:py-24 max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary">{doc.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{doc.updated}</p>
        <p className="mt-6 text-lg text-foreground leading-relaxed">{doc.intro}</p>

        <div className="mt-10 space-y-10">
          {doc.sections.map((section) => (
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
