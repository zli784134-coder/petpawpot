# PetPawPot 官网（Netlify 静态版 v1）

宠鲜鲜 / PetPawPot 官方网站。技术栈：Vite + React + TypeScript + wouter + Tailwind。
纯静态 SPA，部署到 Netlify，无服务端。详细蓝本见 [`BUILD-SPEC.md`](./BUILD-SPEC.md)。

## 启动（本地开发）

```bash
npm install
npm run dev        # 默认 http://localhost:5173
```

## 构建

```bash
npm run build      # 先 tsc 类型检查，再 vite build，产物输出到 dist/
npm run preview    # 本地预览 dist/
```

## 部署（Netlify）

- 构建命令：`npm run build`，发布目录：`dist`（已写入 `netlify.toml`）
- SPA 重定向 `/* → /index.html 200` 已配置，前端路由由 wouter 接管
- 邮件订阅走 Netlify Forms（`index.html` 内含构建期检测用的隐藏表单）
- GitHub 仓库连接 Netlify 后自动部署；自定义域名待用户完成注册后配置

## 目录说明

- `src/pages/` — 页面（Phase 1 仅 `Home`，其余路由暂落 `NotFound` 占位页）
- `src/components/` — `Header` / `Footer` / `NewsletterSubscribe`
- `src/contexts/LanguageContext.tsx` — 自定义 i18n（中英双语，默认英文）
- `src/lib/translations.ts` — 全站文案（核心资产，内容维护改这里）
- `public/images/` — 已本地化的图片（原 Manus S3 图）
- `docs/reference/` — Manus 版后端耦合文件存档（server/drizzle/shared/原 client），仅备查，不参与构建

## 阶段进度

- **Phase 1（已完成）**：仓库清理、脚手架、设计 token、i18n（补全首页缺键）、Header/Footer、Home 页、netlify.toml
- Phase 2：产品页、AI 营养师页、成本对比、鲜食优势
- Phase 3：食谱列表+详情、Partners（含 Netlify Forms 表单）、About
- Phase 4：博客、404、SEO meta/OG、全站 QA
