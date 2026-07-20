import { Route, Switch } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import FreshMealMaker from '@/pages/FreshMealMaker';
import AiNutritionist from '@/pages/AiNutritionist';
import CostComparison from '@/pages/CostComparison';
import WhyFreshFeeding from '@/pages/WhyFreshFeeding';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/fresh-meal-maker" component={FreshMealMaker} />
        <Route path="/ai-nutritionist" component={AiNutritionist} />
        <Route path="/cost-comparison" component={CostComparison} />
        <Route path="/why-fresh-feeding" component={WhyFreshFeeding} />
        {/* Phase 3-4 页面（recipes/partners/about/blog）尚未构建，统一落到占位页，避免死链 */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
