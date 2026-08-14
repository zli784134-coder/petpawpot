import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';

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
    window.gtag?.('event', 'page_view', {
      page_path: location,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location]);

  return null;
}
