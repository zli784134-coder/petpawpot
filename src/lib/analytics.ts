/**
 * PetPawPot B2B 漏斗埋点 —— GA4 事件的唯一出口。
 *
 * 设计要点:
 * - **参数白名单**。漏报一个维度只是少一格数据,漏出一条个人数据是事故。
 *   姓名、邮箱、电话、公司联系人、表单正文一律不进 GA4;新增参数必须显式加入。
 * - **成功事件只在确认成功后发**。两个表单都是 `res.ok -> setSubmitted` /
 *   `catch -> setFailed` 的干净分支,generate_lead 挂在成功那一支;点击提交
 *   按钮本身不算成功。
 * - Consent Mode v2 由 gtag 自行处理:用户拒绝时事件降级为无 cookie 匿名 ping,
 *   这里不需要(也不该)再判断一次同意状态。
 * - gtag 缺席时(本地开发按 hostname 关掉)全部退化为无操作。
 */

/** 本站上报的业务事件。GA4 推荐事件用官方名(generate_lead / form_start)。 */
export type B2BEvent =
  | 'product_page_view'
  | 'partners_page_view'
  | 'cta_click'
  | 'form_start'
  | 'generate_lead';

/** 允许发往 GA4 的参数键。不在表内的一律丢弃。 */
const ALLOWED_PARAMS = new Set([
  'page', // 哪个产品页/合作页,枚举值
  'cta', // CTA 位置标识,如 'hero' / 'footer'
  'destination', // CTA 去向,如 'verabowl' / 'partners'
  'form', // 表单标识:'partner-inquiry' / 'newsletter'
  'partnership_type', // 合作类型枚举(retailer/distributor/...),非自由文本
]);

function safeParams(params?: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  if (!params) return out;
  for (const [k, v] of Object.entries(params)) {
    if (!ALLOWED_PARAMS.has(k)) continue;
    const t = typeof v;
    if (t === 'string' || t === 'number' || t === 'boolean') {
      out[k] = t === 'string' ? (v as string).slice(0, 100) : v;
    }
  }
  return out;
}

/** 上报一个业务事件。永不抛错,永不阻塞 UI。 */
export function trackEvent(event: B2BEvent, params?: Record<string, unknown>): void {
  try {
    window.gtag?.('event', event, safeParams(params));
  } catch {
    /* 埋点不该影响页面 */
  }
}
