# PetPawPot 项目交接文档

## 项目概述

**PetPawPot** 是一款智能宠物鲜食电饭煲的品牌官网，面向全球市场（中英双语）。项目托管在 Manus WebDev 平台上，使用 React 19 + tRPC + Drizzle ORM + MySQL 全栈架构。

- **线上域名**: `petpawpot-wrpdnqrt.manus.space`
- **项目类型**: Manus WebDev fullstack (web-db-user)
- **当前版本**: `33e6fdcc`

---

## 技术栈

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端框架 | React 19 + TypeScript | SPA 单页应用 |
| 路由 | wouter | 轻量级路由 |
| 样式 | Tailwind CSS 4 + shadcn/ui | 组件库 |
| 状态管理 | tRPC + React Query | 服务端状态 |
| 后端 | Express 4 + tRPC 11 | API 层 |
| 数据库 | MySQL (TiDB) + Drizzle ORM | 数据持久化 |
| 文件存储 | S3 (Manus Storage) | 图片上传 |
| 认证 | Manus OAuth | 用户登录 |
| 支付 | Stripe (测试模式) | 支付集成 |
| 构建 | Vite + esbuild | 打包工具 |
| 测试 | Vitest | 单元测试 |

---

## 项目结构

```
petpawpot/
├── client/src/
│   ├── App.tsx                    # 路由配置（CMS 路由独立，不含 Header/Footer）
│   ├── main.tsx                   # 入口（tRPC Provider, 全局错误处理）
│   ├── index.css                  # 全局样式 + CSS 变量（OKLCH 色彩）
│   ├── const.ts                   # 前端常量（OAuth URL 等）
│   ├── pages/
│   │   ├── Home.tsx               # 首页（Problem-Solution-Action 框架）
│   │   ├── FreshMealMaker.tsx     # 产品页
│   │   ├── AiNutritionist.tsx     # AI 营养师页
│   │   ├── Recipes.tsx            # 食谱列表
│   │   ├── RecipeDetail.tsx       # 食谱详情
│   │   ├── CostComparison.tsx     # 成本对比
│   │   ├── WhyFreshFeeding.tsx    # 为什么选鲜食
│   │   ├── Partners.tsx           # 合作伙伴/B2B
│   │   ├── AboutUs.tsx            # 关于我们
│   │   ├── Blog.tsx               # 博客列表
│   │   ├── BlogArticle.tsx        # 博客文章详情
│   │   ├── CMSContent.tsx         # CMS 文案编辑器
│   │   ├── CMSImages.tsx          # CMS 图片管理器
│   │   └── CMSSettings.tsx        # CMS 设置页
│   ├── components/
│   │   ├── Header.tsx             # 公共导航头
│   │   ├── Footer.tsx             # 公共页脚
│   │   ├── CMSLayout.tsx          # CMS 侧边栏布局
│   │   ├── ErrorBoundary.tsx      # 错误边界
│   │   ├── BlogComments.tsx       # 博客评论组件
│   │   ├── NewsletterSubscribe.tsx # 邮件订阅
│   │   └── ui/                    # shadcn/ui 组件
│   ├── contexts/
│   │   ├── LanguageContext.tsx     # 多语言上下文
│   │   └── ThemeContext.tsx        # 主题上下文
│   └── lib/
│       ├── translations.ts        # 翻译字典（中英文）
│       ├── blogData.ts            # 博客静态数据
│       └── trpc.ts                # tRPC 客户端
├── server/
│   ├── routers.ts                 # tRPC 路由定义（所有 API 端点）
│   ├── db.ts                      # 数据库查询函数
│   ├── storage.ts                 # S3 存储辅助函数
│   ├── cms.test.ts                # CMS 测试
│   └── _core/                     # 框架核心（不要修改）
├── drizzle/
│   └── schema.ts                  # 数据库表定义
├── shared/
│   ├── const.ts                   # 共享常量
│   └── types.ts                   # 共享类型
└── references/                    # 集成参考文档
```

---

## 路由结构

### 公共页面（含 Header + Footer）
| 路径 | 组件 | 说明 |
|------|------|------|
| `/` | Home | 首页 |
| `/fresh-meal-maker` | FreshMealMaker | 产品介绍 |
| `/ai-nutritionist` | AiNutritionist | AI 营养师 |
| `/recipes` | Recipes | 食谱列表 |
| `/recipe-detail` | RecipeDetail | 食谱详情 |
| `/cost-comparison` | CostComparison | 成本对比 |
| `/why-fresh-feeding` | WhyFreshFeeding | 鲜食优势 |
| `/partners` | Partners | B2B 合作 |
| `/about-us` | AboutUs | 关于我们 |
| `/blog` | Blog | 博客列表 |
| `/blog/:slug` | BlogArticle | 博客文章 |

### CMS 后台（独立布局，需要 admin 权限）
| 路径 | 组件 | 说明 |
|------|------|------|
| `/cms/content` | CMSContent | 文案编辑器 |
| `/cms/images` | CMSImages | 图片管理 |
| `/cms/settings` | CMSSettings | CMS 设置 |

---

## API 端点 (tRPC)

```
auth.me              - 获取当前用户（public）
auth.logout          - 登出（public）

blog.getComments     - 获取文章评论（public）
blog.addComment      - 添加评论（public）

newsletter.subscribe   - 订阅邮件（public）
newsletter.unsubscribe - 取消订阅（public）

cms.getContent         - 获取单条内容（public）
cms.getContentByCategory - 按分类获取内容（public）
cms.getAllContent       - 获取所有内容（public）
cms.updateContent      - 更新/创建内容（protected, admin）
cms.getImage           - 获取单张图片（public）
cms.getImagesByPage    - 按页面获取图片（public）
cms.getImagesByCategory - 按分类获取图片（public）
cms.uploadImage        - 上传图片到 S3（protected, admin）
cms.updateImage        - 更新图片信息（protected, admin）
cms.deleteImage        - 删除图片（admin only）
```

---

## 数据库表

| 表名 | 说明 |
|------|------|
| `users` | 用户表（含 role: admin/user） |
| `blog_comments` | 博客评论 |
| `email_subscribers` | 邮件订阅者 |
| `cms_content` | CMS 文案内容（key + language 唯一索引） |
| `cms_images` | CMS 图片（S3 URL） |
| `cms_audit_log` | CMS 操作审计日志 |

---

## 设计系统

### 色彩方案
- **主色（深灰蓝）**: `#1F3A52` — 品牌色、导航栏、CTA 按钮
- **辅助色（暖米白）**: `#F5F1E8` — 背景色、卡片背景
- **强调色（活力橙）**: `#FF8C42` — 重要按钮、强调信息
- **主题**: Light 模式为主

### 字体
- 标题: Inter (Google Fonts CDN)
- 正文: Inter

### 设计风格
- 现代厨房科技感
- 圆角卡片 + 柔和阴影
- 响应式设计（移动端优先）

---

## 多语言系统

- 翻译文件: `client/src/lib/translations.ts`
- 上下文: `client/src/contexts/LanguageContext.tsx`
- 使用方式: `const { t, language, setLanguage } = useLanguage()`
- CMS 内容: 数据库中按 `language` 字段区分 `en`/`zh`

---

## 已知问题和注意事项

### 关键规则（已踩过的坑）
1. **绝对不要使用 `<Link><Button>` 或 `<a><Button>` 嵌套模式** — 会导致 React `insertBefore` DOM 错误。应该直接给 `<Link>` 或 `<a>` 添加按钮样式的 className。
2. **CMS 路由与公共路由分离** — CMS 页面不渲染 Header/Footer，避免条件渲染冲突。
3. **保存后延迟 invalidate** — `onSuccess` 中先关闭模态框，用 `setTimeout` 延迟 100ms 再执行 `invalidate()`，避免同时 DOM 变更。
4. **图片上传使用 S3** — 前端将文件转为 base64 传给后端，后端使用 `storagePut` 上传到 S3，返回 `/manus-storage/xxx` URL。
5. **全局错误处理器** — `main.tsx` 中的 mutation 错误处理器会在 auth 过期时重定向到登录页，CMS 页面已特殊处理（检查 `window.location.pathname.startsWith('/cms')`）。

### 外部链接
- AI Nutritionist 外部应用: `https://extraordinary-moonbeam-aaffe1.netlify.app/`

---

## 待办事项

### 待实现功能
- [ ] 视频集成（lazy-loading/sliding screen）— 产品展示视频
- [ ] V02 内容策略优化 — 基于用户反馈调整
- [ ] CMS 高级功能（内容调度、版本管理等）

### 可能的改进方向
- Header 导航项过多，在小屏幕上可能溢出，考虑添加 hamburger menu
- Blog 数据目前是静态的（`blogData.ts`），未来可迁移到数据库
- 食谱详情页目前是静态模板，可改为动态数据
- 考虑添加 SEO meta tags 和 Open Graph 支持

---

## 开发命令

```bash
pnpm dev          # 启动开发服务器
pnpm build        # 构建生产版本
pnpm test         # 运行测试
pnpm db:push      # 同步数据库 schema
```

---

## 环境变量

以下环境变量由 Manus 平台自动注入，不需要手动配置：

- `DATABASE_URL` — 数据库连接字符串
- `JWT_SECRET` — Session 签名密钥
- `VITE_APP_ID` — OAuth 应用 ID
- `OAUTH_SERVER_URL` — OAuth 后端 URL
- `VITE_OAUTH_PORTAL_URL` — OAuth 登录页 URL
- `BUILT_IN_FORGE_API_URL` — Manus 内置 API（含 LLM、存储等）
- `BUILT_IN_FORGE_API_KEY` — 内置 API 密钥
- `STRIPE_SECRET_KEY` — Stripe 密钥（测试模式）
- `STRIPE_WEBHOOK_SECRET` — Stripe Webhook 密钥

---

## 内容策略

当前采用 **V02: Problem-Solution-Action** 框架：
- **Problem**: 宠物鲜食喂养的四大痛点（时间、知识、成本、一致性）
- **Solution**: Fresh Meal Maker 智能电饭煲 + AI 营养师
- **Action**: 明确的 CTA（B2C: 购买/试用，B2B: 合作）

---

## 文件存储规则

- 所有静态资源（图片/视频）必须存放在 `/home/ubuntu/webdev-static-assets/`（项目目录外）
- 使用 `manus-upload-file --webdev` 上传后获得 `/manus-storage/xxx` URL
- 代码中直接使用返回的 URL，不要使用本地路径
- CMS 上传的图片通过 `storagePut()` 存储到 S3

---

## 测试

当前测试文件：
- `server/auth.logout.test.ts` — 认证登出测试（1 test）
- `server/cms.test.ts` — CMS 内容和图片上传测试（9 tests）

运行: `pnpm test`

---

*最后更新: 2026-07-20*
