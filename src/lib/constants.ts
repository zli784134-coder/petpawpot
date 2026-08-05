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
  // 2026-08 B2B 网站图片包(设计稿同源摄影;VeraBowl 带标截图与虚构App/补剂盒按方案A弃用)
  b2b: {
    hero: '/images/b2b/hero-machine-pets.webp', // 机器+金毛+布偶 厨房主视觉
    thenKibble: '/images/b2b/then-kibble.webp',
    nowFresh: '/images/b2b/now-fresh-machine.webp',
    whyFamily: '/images/b2b/why-pets-family.webp',
    whyIngredients: '/images/b2b/why-real-ingredients.webp',
    whySmart: '/images/b2b/why-smart-nutrition.webp',
    whyHealth: '/images/b2b/why-longterm-health.webp',
    painIntro: '/images/b2b/pain-intro-prep.webp',
    painTime: '/images/b2b/pain-time-effort.webp',
    painComplex: '/images/b2b/pain-nutrition-complex.webp',
    painTemp: '/images/b2b/pain-temperature.webp',
    painStorage: '/images/b2b/pain-storage.webp',
    painSustain: '/images/b2b/pain-sustain.webp',
    solutionTopdown: '/images/b2b/solution-machine-topdown.webp', // 机器俯视+食材
    costKibble: '/images/b2b/cost-kibble.webp',
    costSubscription: '/images/b2b/cost-subscription.webp',
    costPetPawPot: '/images/b2b/cost-petpawpot.webp',
    b2bMachine: '/images/b2b/b2b-machine-clean.webp',
    // 2026-08 补充包:产品页主视觉/结构/细节(手机App特写图按方案A继续弃用)
    productHeroIngredients: '/images/b2b/product-hero-ingredients.webp', // 机器内胆装料+食材环
    productCatEating: '/images/b2b/product-cat-eating.webp', // 猫从内胆进食(真实使用)
    productExploded: '/images/b2b/product-exploded.webp', // 爆炸结构图(盖/搅拌/内胆/主体)
    detailHeating: '/images/b2b/detail-heating.webp', // 控温加热
    detailStirring: '/images/b2b/detail-stirring.webp', // 自动搅拌
    detailNonstick: '/images/b2b/detail-nonstick.webp', // 不粘内胆
    detailDishwasher: '/images/b2b/detail-dishwasher.webp', // 内胆可进洗碗机
    bannerMachineKitchen: '/images/b2b/banner-machine-kitchen.webp', // 厨房横幅(机器+食材,带logo)
    cleaningDishwasherLg: '/images/b2b/cleaning-dishwasher-lg.webp', // 清洁区大图(内胆进洗碗机)
  },
} as const;
