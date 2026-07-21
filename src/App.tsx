import { Route, Switch } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import FreshMealMaker from '@/pages/FreshMealMaker';
import AiNutritionist from '@/pages/AiNutritionist';
import CostComparison from '@/pages/CostComparison';
import WhyFreshFeeding from '@/pages/WhyFreshFeeding';
import Recipes from '@/pages/Recipes';
import RecipeDetail from '@/pages/RecipeDetail';
import Partners from '@/pages/Partners';
import AboutUs from '@/pages/AboutUs';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
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
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe-detail/:slug" component={RecipeDetail} />
        <Route path="/partners" component={Partners} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogPost} />
        {/* 兜底 404 页 */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
