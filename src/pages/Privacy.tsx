import LegalDocPage from '@/components/LegalDocPage';
import { privacy } from '@/lib/legal';

// 隐私政策页。GA4 的服务条款要求站点披露分析 cookie，页面上线前 footer 的
// Privacy Policy 链接一直是空的 `#`，本页把它接上。
export default function Privacy() {
  return (
    <LegalDocPage
      doc={privacy}
      seoDescription="What PetPawPot collects through this website, why, and the choices you have — including Google Analytics and how to opt out."
    />
  );
}
