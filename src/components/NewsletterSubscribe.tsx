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
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const copy = {
    title: language === 'en' ? 'Subscribe to Our Newsletter' : '订阅我们的资讯',
    subtitle:
      language === 'en'
        ? 'Get fresh tips, recipes, and insights delivered to your inbox every week'
        : '每周获取新鲜喂养技巧、食谱和洞察，直接送达您的邮箱',
    placeholder: language === 'en' ? 'Enter your email' : '输入您的邮箱',
    button: language === 'en' ? 'Subscribe' : '订阅',
    thanks: language === 'en' ? 'Thanks for subscribing!' : '感谢订阅！',
    sending: language === 'en' ? 'Sending…' : '提交中…',
    failed:
      language === 'en'
        ? 'Something went wrong — your email was NOT saved. Please try again, or write to hello@petpawpot.com.'
        : '提交失败,你的邮箱未被保存。请重试,或发邮件至 hello@petpawpot.com。',
  };

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(data[k]))
      .join('&');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return; // 防重复提交
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value ?? '';
    setSending(true);
    setFailed(false);
    // 超时保护:15s 未响应按失败处理,绝不静默吞掉
    const ctrl = new AbortController();
    const timer = window.setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: encode({ 'form-name': 'newsletter', email }),
        signal: ctrl.signal,
      });
      // 只有服务端确认成功才显示成功——失败必须让用户看见
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSubmitted(true);
    } catch {
      setFailed(true);
    } finally {
      window.clearTimeout(timer);
      setSending(false);
    }
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
            disabled={sending}
            className="h-11 px-6 rounded-lg bg-secondary hover:bg-secondary/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all whitespace-nowrap"
          >
            {sending ? copy.sending : copy.button}
          </button>
        </form>
      )}
      {failed && !submitted && (
        <p className="mt-3 text-sm font-medium text-destructive">{copy.failed}</p>
      )}
    </div>
  );
}
