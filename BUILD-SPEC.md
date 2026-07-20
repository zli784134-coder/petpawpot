# PetPawPot 官网重建蓝本（Netlify 静态版 v1）

> 目标：把 Manus 上的 PetPawPot 官网（https://petpawpot-wrpdnqrt.manus.space）重建为**自主可控、部署到 GitHub+Netlify 的静态站**，脱离 Manus 平台。参考线上站 1:1 复刻内容与视觉，换干净技术栈，修掉已知 bug。

## 决策（已定，勿改）

- **技术栈**：Vite + React + TypeScript + wouter（路由）+ Tailwind + shadcn/ui。与原站同栈，组件可移植。
- **部署**：GitHub 仓库 → Netlify 自动部署。纯静态（SPA），无服务端。
- **i18n**：沿用原站的自定义 `LanguageContext` + `translations.ts`（**不引入 next-intl**）。中英双语，默认英文。
- **内容维护**：走代码/内容文件，机器人改。**v1 不做**：登录、CMS 后台、数据库、S3——这些 Netlify 静态托管不适合，且用户认可机器人维护。
- **表单**：Quiz / 邮件订阅 / B2B 询盘 用 **Netlify Forms**（静态即可收名单，无需后端）。
- **图片**：线上站图片是 Manus S3 URL，**必须下载到本地 `public/images/` 并改用本地引用**——否则 Manus 一停图全裂。

## 可复用素材（仓库已有，来自 Manus 导出）

- `client/src/lib/translations.ts`（35KB 完整中英文案）——**核心资产，尽量复用**
- `client/src/components/Header.tsx`、`Footer.tsx`、`contexts/LanguageContext.tsx`——移植（去掉 Manus 依赖如 OAuth/Login 入口）
- `COLOR_DESIGN_STRATEGY.md`——设计 token 依据
- `drizzle/schema.ts`、`server/*`——**v1 不用**（Manus 后端耦合），移到 `docs/reference/` 存档备查

## 设计 token（来自 COLOR_DESIGN_STRATEGY.md）

- 主色 深灰蓝 `#1F3A52`（导航/主 CTA/品牌）、hover `#2D4A5F`
- 辅助 暖米白 `#F5F1E8`（背景/卡片底）
- 强调 活力橙 `#FF8C42`（重点按钮）、hover `#E67E2F`
- 健康绿 `#2ECC71`（营养/成功态）
- 文本 `#2C3E50` / 次要 `#7F8C8D` / 边框 `#ECF0F1`
- 字体：Inter（标题+正文）
- 风格：现代厨房科技感、圆角卡片+柔和阴影、移动端优先、WCAG AA 对比度

> 注：品牌资产 V3.5（宠鲜鲜项目 00 号）另有一套绿色体系（迷迭香绿#2E5339）。**v1 先忠实复刻线上站的蓝橙配色**保持一致，品牌色统一留到后续和设计中心对齐时再议，不在本次擅自切换。

## 页面清单（复刻线上站，共 9+1）

| 路由 | 页面 | 要点 |
|------|------|------|
| `/` | Home | Problem–Solution–Action 框架；**必须修 i18n bug**：线上首页 `home.step1`/`home.realIngredientsDesc` 等键裸露，因 translations.ts 缺键或渲染错——逐一补全，页面不得出现原始 key |
| `/fresh-meal-maker` | 产品页 | |
| `/ai-nutritionist` | AI 营养师页 | "Try AI Nutritionist" CTA 暂外链到营养师系统部署地址（待定，先留占位/指向 `/ai-nutritionist`） |
| `/recipes` `/recipe-detail` | 食谱列表+详情 | 食谱数据走本地 JSON |
| `/cost-comparison` | 成本对比 | |
| `/why-fresh-feeding` | 鲜食优势 | |
| `/partners` | B2B 合作 | 借船出海阶段重点页；含 B2B 询盘表单（Netlify Forms） |
| `/about-us` | 关于我们 | |
| `/blog` `/blog/:slug` | 博客列表+文章 | 博客走 Markdown/JSON 内容文件 |
| — | 页头/页脚 | 移植原站，**去掉 Login/CMS 入口**（v1 无登录） |

## 分阶段交付（每阶段构建须通过、可验证）

- **Phase 1（本次）**：清理仓库（Manus 后端文件移 docs/reference/）→ Vite 脚手架 → Tailwind+设计 token → i18n（LanguageContext+translations，补全缺键）→ Header/Footer → **Home 页完整** → netlify.toml → git 仓库 → `npm run build` 通过 + 本地 `npm run dev` 首页无占位符、中英切换正常。
- **Phase 2**：产品页、AI 营养师页、成本对比、鲜食优势。
- **Phase 3**：食谱列表+详情、Partners（含 Netlify Forms 表单）、About。
- **Phase 4**：博客列表+文章、404、SEO meta/OG、全站 QA。

## 维护约定

- 小步提交，简体中文提交信息；不提交 node_modules/.env
- 每阶段 `npm run build` 通过；界面改动浏览器自检
- 图片一律本地化；文案改 translations.ts / 内容文件
- 部署：用户明日完成域名注册，GitHub→Netlify 接好后配置自定义域名
