import { Route, Switch } from 'wouter';
import { LanguageProvider } from '@/contexts/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import NotFound from '@/pages/NotFound';

function App() {
  return (
    <LanguageProvider>
      <Header />
      <Switch>
        <Route path="/" component={Home} />
        {/* Phase 2-4 页面尚未构建，统一落到占位页，避免死链 */}
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </LanguageProvider>
  );
}

export default App;
