import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { IMAGES } from '@/lib/constants';

// 轻量 SPA SEO：在页面组件挂载/语言切换时更新 document.title 与 meta/OG 标签。
// 不引入 react-helmet 等依赖，保持技术栈精简。
interface SeoProps {
  // 二选一：给 seo.* 翻译键（常规页面），或直接给 title/description（如博客文章）
  titleKey?: string;
  descKey?: string;
  title?: string;
  description?: string;
  image?: string; // 站内图片路径，如 /images/xxx.png
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function Seo({ titleKey, descKey, title, description, image }: SeoProps) {
  const { language, t } = useLanguage();

  useEffect(() => {
    const resolvedTitle = title ?? (titleKey ? t(titleKey) : t('seo.defaultTitle'));
    const resolvedDesc = description ?? (descKey ? t(descKey) : '');
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const absImg = origin + (image ?? IMAGES.heroKitchen);
    const url = origin + window.location.pathname;

    document.title = resolvedTitle;
    document.documentElement.lang = language === 'zh' ? 'zh' : 'en';

    if (resolvedDesc) upsertMeta('name', 'description', resolvedDesc);
    upsertMeta('property', 'og:title', resolvedTitle);
    if (resolvedDesc) upsertMeta('property', 'og:description', resolvedDesc);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:image', absImg);
    upsertMeta('property', 'og:url', url);
    upsertMeta('property', 'og:site_name', 'PetPawPot');
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', resolvedTitle);
    if (resolvedDesc) upsertMeta('name', 'twitter:description', resolvedDesc);
    upsertMeta('name', 'twitter:image', absImg);
  }, [language, titleKey, descKey, title, description, image, t]);

  return null;
}
