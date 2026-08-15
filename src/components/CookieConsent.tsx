import { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';

/**
 * Cookie 同意横幅（Consent Mode v2 的用户界面部分）。
 *
 * 默认值在 index.html 里就已按地区设好（欧盟/英国/瑞士拒绝、其余允许），
 * 本组件只负责：把用户的显式选择写进 localStorage 并 `consent update`。
 * 这样即使 React 加载失败，合规默认值也已生效。
 *
 * 横幅对所有地区可见：欧盟用户需要主动同意才开启统计，其他地区用户则得到
 * 一个随时可用的退出入口（CCPA 的"选择退出"要求）。
 */

export const CONSENT_KEY = 'ppp_analytics_consent';

declare global {
  interface Window {
    /** Footer 的「Cookie 设置」按钮用它重新打开横幅 */
    __openCookiePrefs?: () => void;
  }
}

function readStored(): 'granted' | 'denied' | null {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === 'granted' || v === 'denied' ? v : null;
  } catch {
    return null;
  }
}

export default function CookieConsent() {
  const { language } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 首屏：没做过选择才弹。SSR 阶段不执行，预渲染产物里不含横幅。
    if (readStored() === null) setVisible(true);
    window.__openCookiePrefs = () => setVisible(true);
    return () => {
      delete window.__openCookiePrefs;
    };
  }, []);

  function choose(value: 'granted' | 'denied') {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* 隐私模式写不进去也不阻断：本次会话内 update 依然生效 */
    }
    window.gtag?.('consent', 'update', { analytics_storage: value });
    setVisible(false);
  }

  if (!visible) return null;

  const zh = language === 'zh';

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={zh ? 'Cookie 同意' : 'Cookie consent'}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-white/95 backdrop-blur shadow-soft"
    >
      <div className="container py-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground leading-relaxed md:pr-6">
          {zh ? (
            <>
              我们使用 Google Analytics 的 cookie 统计访问量,以了解哪些内容有用。不含广告追踪。
              详见
              <Link href="/privacy" className="ml-1 underline hover:text-primary">
                隐私政策
              </Link>
              。
            </>
          ) : (
            <>
              We use Google Analytics cookies to measure traffic and understand what’s useful. No
              advertising trackers. See our
              <Link href="/privacy" className="ml-1 underline hover:text-primary">
                Privacy Policy
              </Link>
              .
            </>
          )}
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="h-10 px-5 rounded-lg border border-border text-sm font-semibold text-foreground hover:border-primary/40 hover:text-primary transition-all"
          >
            {zh ? '拒绝' : 'Decline'}
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="h-10 px-5 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-semibold transition-all"
          >
            {zh ? '接受' : 'Accept'}
          </button>
        </div>
      </div>
    </div>
  );
}
