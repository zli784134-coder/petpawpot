// 站点级常量
// AI 营养师系统部署地址（我方自研 v0.2.0，LP 求解器+氨基酸校验，取代 Manus 期老原型）
export const AI_NUTRITIONIST_URL = 'https://petpawpot-nutritionist.netlify.app/';

// 本地化后的图片资源（原 Manus S3 图已下载到 public/images/）
export const IMAGES = {
  logo: '/images/logo-paw-pot_afc0b759.png',
  heroKitchen: '/images/hero-kitchen-scene_35de91ab.png',
  aiNutritionistMockup: '/images/ai-nutritionist-mockup_4fbbf956.png',
  productLifestyle: '/images/product-lifestyle_07d89eb1.png',
  recipeChickenRice: '/images/recipe-chicken-rice_2a7ac832.png',
  // 真实产品实拍图（2026-07 改版新增）
  heroCooking: '/images/hero-cooking.webp',
  realLifeScenario: '/images/real-life-scenario.webp',
  petParentsAchieve: '/images/pet-parents-achieve.webp',
  costIngredients: '/images/cost-ingredients.webp',
  // 真实产品实拍图（2026-07 二期：各内页替换老占位图）
  productHero: '/images/product-hero.webp', // 干净产品主视觉
  productDailyUse: '/images/product-daily-use.webp', // 日常使用/犬互动
  productOneTouch: '/images/product-one-touch.webp', // 一键烹饪信息图
  nutritionDogFeeding: '/images/nutrition-dog-feeding.webp', // 主人喂狗（营养师页，仅犬）
  freshIngredients: '/images/fresh-ingredients.webp', // 真实食材平铺
  freshFamilyFeeding: '/images/fresh-family-feeding.webp', // 家庭多宠喂食
  partnersProduct: '/images/partners-product.webp', // B2B 干净产品
  aboutFamilyKitchen: '/images/about-family-kitchen.webp', // 品牌家庭厨房场景
} as const;
