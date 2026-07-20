// 站点级常量
// AI 营养师系统部署地址（沿用 Manus 版已上线的独立部署，后续与营养师系统对齐时再更新）
export const AI_NUTRITIONIST_URL = 'https://extraordinary-moonbeam-aaffe1.netlify.app/';

// 本地化后的图片资源（原 Manus S3 图已下载到 public/images/）
export const IMAGES = {
  logo: '/images/logo-paw-pot_afc0b759.png',
  heroKitchen: '/images/hero-kitchen-scene_35de91ab.png',
  aiNutritionistMockup: '/images/ai-nutritionist-mockup_4fbbf956.png',
  productLifestyle: '/images/product-lifestyle_07d89eb1.png',
  recipeChickenRice: '/images/recipe-chicken-rice_2a7ac832.png',
} as const;
