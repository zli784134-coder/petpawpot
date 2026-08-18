import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackEvent } from '@/lib/analytics';
import { AI_NUTRITIONIST_URL } from '@/lib/constants';

/**
 * GA4 单页路由补发。
 *
 * gtag 本身在 index.html 里静态加载（预渲染页也带，且不依赖水合）；那段脚本只在
 * 首屏发一次 page_view。wouter 的客户端跳转不触发整页加载，所以这里在 location
 * 变化时补发，否则 GA4 只会看到落地页。
 *
 * 首次执行跳过：index.html 的 gtag('config') 已经算过一次，重复发会让落地页翻倍。
 * 若 gtag 不存在（本地开发已按 hostname 关掉），全部退化为无操作。
 */
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  const [location] = useLocation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    // 延后一个宏任务再发：Seo 组件在自己的 useEffect 里写 document.title，
    // 而本组件位于 Switch 之前，effect 先于页面执行。直接发会把**上一页**的
    // 标题记到新路径上（实测确认）。setTimeout 0 排在同批 effect 之后。
    const timer = window.setTimeout(() => {
      window.gtag?.('event', 'page_view', {
        page_path: location,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
    return () => window.clearTimeout(timer);
  }, [location]);

  // CTA 点击：用**事件委托**而不是给十几个链接逐个加 onClick。
  // 站内跳 VeraBowl 的入口分散在 6 个页面、跳 /partners 的又是另几处；
  // 集中在这里既少改十几个文件，也保证以后新增的 CTA 自动被覆盖。
  // 用捕获阶段：即使某个链接自己 stopPropagation，也仍然记得到。
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href') ?? '';
      let destination: string | null = null;
      if (href.startsWith(AI_NUTRITIONIST_URL) || href.startsWith('https://verabowl.com')) {
        destination = 'verabowl';
      } else if (href === '/partners') {
        destination = 'partners';
      }
      if (!destination) return;

      trackEvent('cta_click', {
        destination,
        page: window.location.pathname,
      });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  return null;
}
