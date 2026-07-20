import { useLanguage } from '@/contexts/LanguageContext';
import { Link } from 'wouter';
import NewsletterSubscribe from './NewsletterSubscribe';

export default function Footer() {
  const { t } = useLanguage();

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
              <img 
                src="/manus-storage/logo-paw-pot_afc0b759.png" 
                alt="PetPawPot" 
                className="h-6 w-6"
              />
              <span className="font-bold text-primary">PetPawPot</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t('hero.subtitle')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">{t('nav.freshMealMaker')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/fresh-meal-maker" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.freshMealMaker')}</Link></li>
              <li><a href="https://extraordinary-moonbeam-aaffe1.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.aiNutritionist')}</a></li>
              <li><Link href="/recipes" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.recipes')}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/why-fresh-feeding" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.whyFreshFeeding')}</Link></li>
              <li><Link href="/cost-comparison" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.costComparison')}</Link></li>
              <li><Link href="/about-us" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.aboutUs')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partners" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.partners')}</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">{t('nav.contact')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © 2024 PetPawPot. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
