# PetPawPot Project TODO

## Bug Fixes
- [x] Fixed React 'insertBefore' DOM error caused by nested anchor tags in CMSLayout
- [x] Fixed nested anchor tags in BlogArticle.tsx (3 instances)
- [x] Verified CMS pages load without errors
- [x] Fixed CMS image upload flow (replaced invalid base64-as-URL with proper S3 storage upload)

## CMS Enhancements
- [x] Added "Add Content" button to CMS Content Editor
- [x] Added drag-and-drop upload support to CMS Image Manager
- [x] Improved empty state UI with upload hints and icons
- [x] Seeded initial CMS content data for team editing (home, product, about, footer)
- [x] Added tRPC cache invalidation after content saves
- [x] Content cards now show monospace key names and "Click to edit" hints

## Tests
- [x] Written vitest tests for CMS upload and content endpoints (9 tests passing)

## Current Status
- Full-stack website with React 19, tRPC, Drizzle, MySQL
- Multi-language support (English/Chinese)
- Complete brand pages (Home, Fresh Meal Maker, AI Nutritionist, Recipes, Cost Comparison, etc.)
- Blog system with comments and newsletter subscription
- Custom CMS for content and image management (with S3 storage)
- Modern kitchen tech aesthetic (Deep Blue-Gray, Vibrant Orange, Warm Cream)
- Database schema with content, images, and audit logging
- User authentication and role-based access control

## Next Steps (Awaiting External Input)
- [x] Monitor team feedback from ke@power-cs.com regarding CMS usage (first feedback received and addressed)
- [x] Test CMS content and image uploads with team members (user confirmed save works, bug fixed)
- [ ] Prepare for future video integration (lazy-loading/sliding screen) - pending user request
- [ ] Refine V02 content strategy based on user feedback - pending more feedback
- [ ] Consider additional CMS features (scheduling, versioning, etc.) - pending user request

## Known Limitations
- Stripe integration configured (test mode)
- Shopify integration not available (mutually exclusive with Stripe)
- Video features not yet implemented

## Content Strategy
- V01: Brand Story (archived)
- V02: Problem-Solution-Action framework (current)
  - Focus on customer pain points: Time, Knowledge, Cost, Consistency
  - Clear CTAs for B2B and B2C conversions

## Bug Reports (User Feedback)
- [x] CMS Content Editor: 保存成功后跳转到错误页面（刷新后内容已正确保存）
  - 修复: 添加 try-catch 防止未捕获异常触发全局重定向
  - 修复: 全局 mutation 错误处理器不再对有本地 onError 的 mutation 触发重定向
  - 修复: 创建缺失的 /cms/settings 路由页面
  - 修复: auth 过期时显示友好提示而非跳转
- [x] CMS Content Editor: 保存后仍然出现 insertBefore DOM 错误（生产环境）
  - 修复: 全项目移除所有 <a><Button> 和 <Link><Button> 嵌套模式
  - 修复: CMS 路由与 Header/Footer 分离，避免复杂条件渲染冲突
  - 修复: 保存后延迟 invalidate，避免同时 DOM 变更
  - 涉及文件: Home, FreshMealMaker, Recipes, RecipeDetail, CostComparison, AiNutritionist, Header, CMSLayout
