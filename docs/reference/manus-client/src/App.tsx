import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import FreshMealMaker from "./pages/FreshMealMaker";
import AiNutritionist from "./pages/AiNutritionist";
import Recipes from "./pages/Recipes";
import RecipeDetail from "./pages/RecipeDetail";
import CostComparison from "./pages/CostComparison";
import WhyFreshFeeding from "./pages/WhyFreshFeeding";
import Partners from "./pages/Partners";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import CMSContent from "./pages/CMSContent";
import CMSImages from "./pages/CMSImages";
import CMSSettings from "./pages/CMSSettings";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function Router() {
  const [location] = useLocation();
  const isCmsRoute = location.startsWith('/cms');

  // CMS routes have their own layout (CMSLayout) - don't wrap with Header/Footer
  if (isCmsRoute) {
    return (
      <Switch>
        <Route path="/cms/content" component={CMSContent} />
        <Route path="/cms/images" component={CMSImages} />
        <Route path="/cms/settings" component={CMSSettings} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  // Public routes use Header + Footer
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/fresh-meal-maker" component={FreshMealMaker} />
        <Route path="/ai-nutritionist" component={AiNutritionist} />
        <Route path="/recipes" component={Recipes} />
        <Route path="/recipe-detail" component={RecipeDetail} />
        <Route path="/cost-comparison" component={CostComparison} />
        <Route path="/why-fresh-feeding" component={WhyFreshFeeding} />
        <Route path="/partners" component={Partners} />
        <Route path="/about-us" component={AboutUs} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogArticle} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </PublicLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
