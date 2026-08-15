// 构建期静态化（SSG）脚本
// ------------------------------------------------------------------
// 在 `vite build`（客户端产物）之后运行：
//   1. 用 `vite build --ssr src/entry-server.tsx` 产出的 Node 包逐条渲染路由
//   2. 把渲染结果 + 每页独立的 title/description/canonical/og/twitter 注入 dist/index.html 模板
//   3. 输出 dist/<route>/index.html、dist/404.html、dist/sitemap.xml
// 不修改任何业务组件；客户端仍走原有 createRoot 渲染，交互零变化。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SSR_ENTRY = path.join(ROOT, 'dist-ssr', 'entry-server.js');
const SITE = 'https://petpawpot.com';

const { render, translations, IMAGES, blogData, recipesData } = await import(
  pathToFileURL(SSR_ENTRY).href
);

// 静态化以 EN 为准（站点默认语言即 en，不引入 i18n 路由）
const LANG = 'en';
const seo = translations[LANG].seo;
const DEFAULT_IMAGE = IMAGES.b2b.hero; // 与 Seo.tsx 运行时默认图保持一致

/** @type {{path:string,title:string,description:string,image:string,changefreq:string,priority:string}[]} */
const routes = [
  {
    path: '/',
    ...seo.home,
    image: DEFAULT_IMAGE,
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/fresh-meal-maker',
    ...seo.freshMealMaker,
    image: DEFAULT_IMAGE,
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/ai-nutritionist',
    ...seo.aiNutritionist,
    image: DEFAULT_IMAGE,
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/recipes',
    ...seo.recipes,
    image: DEFAULT_IMAGE,
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '/cost-comparison',
    ...seo.costComparison,
    image: DEFAULT_IMAGE,
    changefreq: 'monthly',
    priority: '0.8',
  },
  {
    path: '/why-fresh-feeding',
    ...seo.whyFreshFeeding,
    image: DEFAULT_IMAGE,
    changefreq: 'monthly',
    priority: '0.7',
  },
  {
    path: '/partners',
    ...seo.partners,
    image: DEFAULT_IMAGE,
    changefreq: 'monthly',
    priority: '0.9',
  },
  {
    path: '/about-us',
    ...seo.aboutUs,
    image: DEFAULT_IMAGE,
    changefreq: 'monthly',
    priority: '0.5',
  },
  {
    // 法务页：文案在 src/lib/legal.ts，不走 translations.seo，故此处直接给标题描述
    path: '/privacy',
    title: 'Privacy Policy | PetPawPot',
    description:
      'What PetPawPot collects through this website, why, and the choices you have — including Google Analytics and how to opt out.',
    image: DEFAULT_IMAGE,
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/terms',
    title: 'Terms of Service | PetPawPot',
    description:
      'Terms of use for the PetPawPot website — what the site is, what it is not, acceptable use, intellectual property, and limitation of liability.',
    image: DEFAULT_IMAGE,
    changefreq: 'yearly',
    priority: '0.3',
  },
  {
    path: '/blog',
    ...seo.blog,
    image: DEFAULT_IMAGE,
    changefreq: 'weekly',
    priority: '0.7',
  },
  // 博客详情：title/excerpt 直接取自 blog.json，与 BlogPost.tsx 中 <Seo> 的取值一致
  ...blogData.map((post) => ({
    path: `/blog/${post.slug}`,
    title: `${post.title[LANG]} | PetPawPot`,
    description: post.excerpt[LANG],
    image: post.image,
    changefreq: 'monthly',
    priority: '0.6',
    lastmod: post.date,
  })),
  // 食谱详情：name/summary 直接取自 recipes.json，与 RecipeDetail.tsx 中 <Seo> 的取值一致
  ...recipesData.map((recipe) => ({
    path: `/recipe-detail/${recipe.slug}`,
    title: `${recipe.name[LANG]} | PetPawPot`,
    description: recipe.summary[LANG],
    image: recipe.image,
    changefreq: 'monthly',
    priority: '0.6',
  })),
];

// ---------- HTML 模板处理 ----------

const templatePath = path.join(DIST, 'index.html');
if (!fs.existsSync(templatePath)) {
  console.error('[prerender] 未找到 dist/index.html，请先运行 vite build');
  process.exit(1);
}
const rawTemplate = fs.readFileSync(templatePath, 'utf8');

// 移除基线 SEO 标签（title / description / og:* / twitter:*），避免与逐页注入的标签重复
const template = rawTemplate
  .replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/gi, '')
  .replace(/[ \t]*<meta\s+name="description"[\s\S]*?\/?>\r?\n?/gi, '')
  .replace(/[ \t]*<meta\s+property="og:[\s\S]*?\/?>\r?\n?/gi, '')
  .replace(/[ \t]*<meta\s+name="twitter:[\s\S]*?\/?>\r?\n?/gi, '')
  .replace(/[ \t]*<!--[\s\S]*?基线 OG 标签[\s\S]*?-->\r?\n?/g, '');

if (!template.includes('<div id="root"></div>')) {
  console.error('[prerender] dist/index.html 中未找到 <div id="root"></div> 挂载点');
  process.exit(1);
}

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function buildHead({ title, description, image, path: routePath, noindex }) {
  const url = SITE + (routePath === '/' ? '/' : routePath);
  const absImage = SITE + image;
  const lines = [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeAttr(description)}" />`,
  ];
  // 404 页没有稳定 URL，不输出 canonical / og:url，改为 noindex
  if (!noindex) lines.push(`<link rel="canonical" href="${escapeAttr(url)}" />`);
  lines.push(
    `<meta property="og:site_name" content="PetPawPot" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:title" content="${escapeAttr(title)}" />`,
    `<meta property="og:description" content="${escapeAttr(description)}" />`,
    `<meta property="og:image" content="${escapeAttr(absImage)}" />`,
  );
  if (!noindex) lines.push(`<meta property="og:url" content="${escapeAttr(url)}" />`);
  lines.push(
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(description)}" />`,
    `<meta name="twitter:image" content="${escapeAttr(absImage)}" />`,
  );
  if (noindex) lines.push(`<meta name="robots" content="noindex" />`);
  return lines.map((l) => `    ${l}`).join('\n');
}

function buildPage(route) {
  const appHtml = render(route.path);
  return template
    .replace('</head>', `${buildHead(route)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

function outFileFor(routePath) {
  if (routePath === '/') return path.join(DIST, 'index.html');
  return path.join(DIST, routePath.replace(/^\//, ''), 'index.html');
}

// ---------- 逐条路由输出 ----------

const stripTags = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const report = [];
for (const route of routes) {
  const html = buildPage(route);
  const out = outFileFor(route.path);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html, 'utf8');
  const bodyText = stripTags(html.split('<div id="root">')[1] ?? '');
  report.push({
    route: route.path,
    file: path.relative(ROOT, out),
    titleChars: route.title.length,
    textChars: bodyText.length,
  });
}

// ---------- 404 页 ----------
// Netlify 对未匹配到静态文件的请求会自动返回发布根目录下的 404.html，并带 404 状态码。
const notFoundHtml = buildPage({
  path: '/__not-found__',
  title: seo.notFound.title,
  description: seo.notFound.description,
  image: DEFAULT_IMAGE,
  noindex: true,
});
fs.writeFileSync(path.join(DIST, '404.html'), notFoundHtml, 'utf8');

// ---------- sitemap ----------
const urls = routes
  .map((r) => {
    const loc = SITE + (r.path === '/' ? '/' : r.path);
    const lastmod = r.lastmod ? `<lastmod>${r.lastmod}</lastmod>` : '';
    return `  <url><loc>${loc}</loc>${lastmod}<changefreq>${r.changefreq}</changefreq><priority>${r.priority}</priority></url>`;
  })
  .join('\n');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

// ---------- 摘要 ----------
console.log(`\n[prerender] 已生成 ${report.length} 条路由 + 404.html + sitemap.xml（${routes.length} 条 URL）`);
for (const r of report) {
  console.log(`  ${r.route.padEnd(42)} -> ${r.file.padEnd(48)} text=${r.textChars}`);
}
