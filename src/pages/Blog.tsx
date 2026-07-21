import { useState } from 'react';
import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';
import Seo from '@/components/Seo';
import blogData from '@/data/blog.json';
import { ArrowRight, Newspaper, Calendar, Clock } from 'lucide-react';

// 博客分类（对应 blog.* 翻译键与 blog.json 的 category 字段）
const CATEGORIES = ['freshFeeding', 'nutrition', 'costs', 'brandStory'] as const;

// 按日期倒序（最新在前）
const posts = [...blogData].sort((a, b) => b.date.localeCompare(a.date));

export default function Blog() {
  const { language, t } = useLanguage();
  const [active, setActive] = useState<string>('all');
  const lang = language as 'en' | 'zh';

  const filtered = active === 'all' ? posts : posts.filter((p) => p.category === active);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <main>
      <Seo titleKey="seo.blog.title" descKey="seo.blog.description" />

      {/* ===== Hero ===== */}
      <section className="bg-cream">
        <div className="container py-16 lg:py-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 text-secondary px-4 py-1.5 text-sm font-semibold">
            <Newspaper className="w-4 h-4" />
            {t('nav.blog')}
          </div>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold leading-tight text-primary max-w-4xl mx-auto">
            {t('blog.title')}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            {t('blog.subtitle')}
          </p>
        </div>
      </section>

      {/* ===== Category filter + grid ===== */}
      <section className="container py-14 lg:py-20">
        {/* Filter chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setActive('all')}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              active === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-foreground border border-border hover:border-primary/40'
            }`}
          >
            {t('blog.allCategories')}
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                active === cat
                  ? 'bg-primary text-white'
                  : 'bg-white text-foreground border border-border hover:border-primary/40'
              }`}
            >
              {t(`blog.${cat}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl overflow-hidden border border-border bg-white shadow-card transition-all hover:shadow-soft hover:-translate-y-0.5"
            >
              <div className="overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title[lang]}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <span className="inline-flex self-start items-center rounded-full bg-secondary/10 text-secondary px-3 py-1 text-xs font-semibold">
                  {t(`blog.${post.category}`)}
                </span>
                <h2 className="mt-3 text-lg font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                  {post.title[lang]}
                </h2>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
                  {post.excerpt[lang]}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {formatDate(post.date)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime[lang]}
                  </span>
                </div>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  {t('blog.readMore')}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
