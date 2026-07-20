import { Link } from 'wouter';
import { useLanguage } from '@/contexts/LanguageContext';

// Phase 1 占位页：尚未构建的路由（产品页 / 食谱 / Partners 等）先落到这里，
// 后续 Phase 2-4 逐页替换为真实页面。
export default function NotFound() {
  const { language } = useLanguage();
  return (
    <main className="container py-24 lg:py-32 text-center min-h-[50vh]">
      <p className="text-6xl font-extrabold text-secondary">🐾</p>
      <h1 className="mt-6 text-3xl font-bold text-primary">
        {language === 'en' ? 'Page Coming Soon' : '页面建设中'}
      </h1>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        {language === 'en'
          ? "We're still cooking up this page. Check back soon."
          : '这个页面还在筹备中，敬请期待。'}
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 h-12 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold transition-all"
      >
        {language === 'en' ? 'Back to Home' : '返回首页'}
      </Link>
    </main>
  );
}
