import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import NewsletterSubscribe from './NewsletterSubscribe';
import { AI_NUTRITIONIST_URL, IMAGES } from '@/lib/constants';

export default function Footer() {
  const { language, t } = useLanguage();

  return (
    <footer className="bg-primary/5 border-t border-border mt-20">
      <div className="container py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-8 border-b border-border">
          <NewsletterSubscribe variant="minimal" showTitle={false} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={IMAGES.logo} alt="PetPawPot" className="h-6 w-6" />
              <span className="font-bold text-primary">
                {language === 'en' ? 'PetPawPot' : '宠鲜鲜'}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{t('hero.subtitle')}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('nav.freshMealMaker')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/fresh-meal-maker" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.freshMealMaker')}
                </Link>
              </li>
              <li>
                <a href={AI_NUTRITIONIST_URL} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.aiNutritionist')}
                </a>
              </li>
              <li>
                <Link href="/recipes" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.recipes')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">
              {language === 'en' ? 'Resources' : '资源'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/why-fresh-feeding" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.whyFreshFeeding')}
                </Link>
              </li>
              <li>
                <Link href="/cost-comparison" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.costComparison')}
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.aboutUs')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">
              {language === 'en' ? 'Company' : '公司'}
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/partners" className="text-muted-foreground hover:text-primary transition-colors">
                  {t('nav.partners')}
                </Link>
              </li>
              {/* Contact 链接已并入 Partners 页的询盘表单，Phase 4 如需独立 /contact 页再启用 */}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} PetPawPot. {language === 'en' ? 'All rights reserved.' : '版权所有。'}
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                {language === 'en' ? 'Privacy Policy' : '隐私政策'}
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                {language === 'en' ? 'Terms of Service' : '服务条款'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
