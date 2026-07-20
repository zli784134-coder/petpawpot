import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsletterSubscribeProps {
  variant?: 'default' | 'minimal';
  showTitle?: boolean;
}

/**
 * 邮件订阅表单，走 Netlify Forms（静态即可收名单，无需后端）。
 * 注意：Netlify 通过构建期扫描静态 HTML 识别表单，因此 index.html 里
 * 放置了同名隐藏表单用于检测，本组件的 form name 需与之一致。
 */
export default function NewsletterSubscribe({
  variant = 'default',
  showTitle = true,
}: NewsletterSubscribeProps) {
  const { language } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const copy = {
    title: language === 'en' ? 'Subscribe to Our Newsletter' : '订阅我们的资讯',
    subtitle:
      language === 'en'
        ? 'Get fresh tips, recipes, and insights delivered to your inbox every week'
        : '每周获取新鲜喂养技巧、食谱和洞察，直接送达您的邮箱',
    placeholder: language === 'en' ? 'Enter your email' : '输入您的邮箱',
    button: language === 'en' ? 'Subscribe' : '订阅',
    thanks: language === 'en' ? 'Thanks for subscribing!' : '感谢订阅！',
  };

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value ?? '';
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'newsletter', email }),
    })
      .then(() => setSubmitted(true))
      .catch(() => setSubmitted(true));
  };

  return (
    <div className={variant === 'minimal' ? '' : 'text-center max-w-2xl mx-auto'}>
      {showTitle && (
        <>
          <h3 className="text-2xl font-bold text-primary mb-2">{copy.title}</h3>
          <p className="text-muted-foreground mb-6">{copy.subtitle}</p>
        </>
      )}
      {variant === 'minimal' && (
        <p className="font-semibold text-foreground mb-3">{copy.subtitle}</p>
      )}

      {submitted ? (
        <p className="text-success font-semibold">{copy.thanks}</p>
      ) : (
        <form
          name="newsletter"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md"
        >
          <input type="hidden" name="form-name" value="newsletter" />
          <p className="hidden">
            <label>
              Don't fill this out: <input name="bot-field" />
            </label>
          </p>
          <input
            type="email"
            name="email"
            required
            placeholder={copy.placeholder}
            className="flex-1 h-11 px-4 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button
            type="submit"
            className="h-11 px-6 rounded-lg bg-secondary hover:bg-secondary/90 text-white font-semibold transition-all whitespace-nowrap"
          >
            {copy.button}
          </button>
        </form>
      )}
    </div>
  );
}
