// 构建期预渲染（SSG）入口：仅在 `vite build --ssr` 时使用，不参与浏览器包。
// 通过 wouter 的 <Router ssrPath> 注入目标路径，直接复用现有 App 与全部页面组件，
// 因此不需要修改任何业务组件的渲染逻辑或文案。
import { renderToString } from 'react-dom/server';
import { Router } from 'wouter';
import App from './App';
import { translations } from './lib/translations';
import { IMAGES } from './lib/constants';
import blogData from './data/blog.json';
import recipesData from './data/recipes.json';

export function render(url: string): string {
  return renderToString(
    <Router ssrPath={url}>
      <App />
    </Router>,
  );
}

// 供预渲染脚本读取 SEO 文案与路由数据，保持与运行时同一份数据源
export { translations, IMAGES, blogData, recipesData };
