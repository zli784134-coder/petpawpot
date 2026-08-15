import LegalDocPage from '@/components/LegalDocPage';
import { terms } from '@/lib/legal';

// 服务条款页。范围限定为网站使用条款：本站无账户、无在线购买，
// 采购关系以另行签署的书面协议为准（见 src/lib/legal.ts 顶部说明）。
export default function Terms() {
  return (
    <LegalDocPage
      doc={terms}
      seoDescription="Terms of use for the PetPawPot website — what the site is, what it is not, acceptable use, intellectual property, and limitation of liability."
    />
  );
}
