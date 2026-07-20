import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link, useLocation } from "wouter";
import { FileText, Image, LogOut, Home as HomeIcon, Menu, Settings, X } from "lucide-react";
import { useState } from "react";

interface CMSLayoutProps {
  children: React.ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    {
      label: language === 'en' ? 'Content Editor' : '文案编辑',
      href: '/cms/content',
      icon: FileText,
    },
    {
      label: language === 'en' ? 'Image Manager' : '图片管理',
      href: '/cms/images',
      icon: Image,
    },
    {
      label: language === 'en' ? 'Settings' : '设置',
      href: '/cms/settings',
      icon: Settings,
    },
  ];

  const isActive = (href: string) => location === href;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">{language === 'en' ? 'Access Denied' : '访问被拒绝'}</h1>
          <p className="text-muted-foreground mb-6">
            {language === 'en' ? 'You need to be logged in to access the CMS.' : '您需要登录才能访问 CMS。'}
          </p>
          <Link href="/" asChild>
            <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium h-9 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all">
              {language === 'en' ? 'Go Home' : '返回首页'}
            </a>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-primary text-white transition-all duration-300 overflow-hidden flex flex-col`}
      >
        <div className="p-6 border-b border-primary/20">
          <h1 className="text-xl font-bold">{language === 'en' ? 'CMS Admin' : 'CMS 管理'}</h1>
          <p className="text-sm text-primary/80 mt-1">{user.name || user.email}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-white/20 text-white'
                    : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-primary/20 space-y-3">
          {/* Language Switcher */}
          <div className="flex gap-2">
            <Button
              variant={language === 'en' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('en')}
              className={language === 'en' ? 'bg-white text-primary hover:bg-white/90' : 'text-white border-white/30 hover:bg-white/10'}
            >
              EN
            </Button>
            <Button
              variant={language === 'zh' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setLanguage('zh')}
              className={language === 'zh' ? 'bg-white text-primary hover:bg-white/90' : 'text-white border-white/30 hover:bg-white/10'}
            >
              中文
            </Button>
          </div>

          {/* Logout Button */}
          <Button
            onClick={() => {
              logout();
              window.location.href = '/';
            }}
            className="w-full bg-white text-primary hover:bg-white/90"
          >
            <LogOut className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Logout' : '登出'}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div className="text-sm text-muted-foreground">
            {language === 'en' ? 'PetPawPot CMS Dashboard' : 'PetPawPot CMS 仪表板'}
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
