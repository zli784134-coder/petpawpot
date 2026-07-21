import { Link, useRoute } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import { AI_NUTRITIONIST_URL } from '@/lib/constants';
import blogData from '@/data/blog.json';
import { ArrowLeft, ArrowRight, Calendar, Clock, User } from 'lucide-react';

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'ul'; items: string[] };

export default function BlogPost() {
  const { language, t } = useLanguage();
  const [, params] = useRoute('/blog/:slug');
  const lang = language as 'en' | 'zh';

  const post = blogData.find((p) => p.slug === params?.slug);

  // 未匹配到文章：友好回退，提供返回列表入口
  if (!post) {
    return (
      <main className="container py-24 text-center min-h-[50vh]">
        <Seo titleKey="seo.notFound.title" descKey="seo.notFound.description" />
        <h1 className="text-3xl font-bold text-primary">{t('blog.notFound')}</h1>
        <Link
          href="/blog"
          className="mt-6 inline-flex items-center gap-2 h-11 px-6 rounded-lg bg-primary text-white font-semibold transition-all hover:bg-primary/90"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('blog.backToBlog')}
        </Link>
      </main>
    );
  }

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  const blocks = post.content[lang] as Block[];

  // 继续阅读：同类优先，取最多 2 篇其他文章
  const others = blogData.filter((p) => p.slug !== post.slug);
  const readNext = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 2);

  return (
    <main>
      <Seo
        title={`${post.title[lang]} | PetPawPot`}
        description={post.excerpt[lang]}
        image={post.image}
      />

      {/* ===== Header ===== */}
      <section className="bg-cream">
        <div className="container py-12 lg:py-16 max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('blog.backToBlog')}
          </Link>
          <span className="mt-6 inline-flex items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-semibold">
            {t(`blog.${post.category}`)}
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-primary">
            {post.title[lang]}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-4 h-4" /> {t('blog.by')} {post.author[lang]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {post.readTime[lang]}
            </span>
          </div>
        </div>
      </section>

      {/* ===== Cover image ===== */}
      <section className="container max-w-3xl -mt-6 lg:-mt-8">
        <img
          src={post.image}
          alt={post.title[lang]}
          className="w-full rounded-2xl shadow-soft object-cover aspect-[16/9]"
        />
      </section>

      {/* ===== Body ===== */}
      <article className="container max-w-3xl py-12 lg:py-16">
        <div className="space-y-6">
          {blocks.map((block, i) => {
            if (block.type === 'h2') {
              return (
                <h2 key={i} className="text-2xl font-bold text-primary pt-2">
                  {block.text}
                </h2>
              );
            }
            if (block.type === 'quote') {
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-secondary bg-secondary/5 rounded-r-xl px-6 py-4 text-lg font-medium text-primary italic"
                >
                  {block.text}
                </blockquote>
              );
            }
            if (block.type === 'ul') {
              return (
                <ul key={i} className="space-y-2 pl-1">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-foreground leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-secondary shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-foreground leading-relaxed text-[17px]">
                {block.text}
              </p>
            );
          })}
        </div>
      </article>

      {/* ===== CTA ===== */}
      <section className="container max-w-3xl pb-4">
        <div className="rounded-2xl border border-secondary/30 bg-secondary/5 p-8 lg:p-10 shadow-card ring-1 ring-secondary/20">
          <h2 className="text-2xl font-bold text-primary">{t('blog.ctaTitle')}</h2>
          <p className="mt-3 text-foreground leading-relaxed">{t('blog.ctaText')}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={AI_NUTRITIONIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all shadow-soft"
            >
              {t('cta.tryAiNutritionist')}
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

      {/* ===== Read next ===== */}
      {readNext.length > 0 && (
        <section className="container py-14 lg:py-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-primary text-center">
            {t('blog.readNext')}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {readNext.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex gap-4 rounded-2xl overflow-hidden border border-border bg-white shadow-card p-4 transition-all hover:shadow-soft"
              >
                <img
                  src={p.image}
                  alt={p.title[lang]}
                  className="w-24 h-24 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <span className="inline-flex items-center rounded-full bg-secondary/10 text-secondary px-2.5 py-0.5 text-xs font-semibold">
                    {t(`blog.${p.category}`)}
                  </span>
                  <h3 className="mt-2 text-base font-bold text-primary leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
                    {p.title[lang]}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.excerpt[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
