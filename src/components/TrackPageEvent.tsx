import { useEffect, useRef } from 'react';
import { trackEvent, type B2BEvent } from '@/lib/analytics';

/**
 * 在页面挂载时上报一次业务级页面事件。
 *
 * 与 GA4 的通用 page_view 并存、互不替代:page_view 回答"访问了哪个 URL",
 * 这个回答"到达了漏斗的哪一步"。ref 守卫保证 React 严格模式的双次挂载
 * 也只报一次。
 */
export default function TrackPageEvent({ event, page }: { event: B2BEvent; page: string }) {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackEvent(event, { page });
  }, [event, page]);
  return null;
}
