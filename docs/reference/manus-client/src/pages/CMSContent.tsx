import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CMSLayout from "@/components/CMSLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Save, Plus, X } from "lucide-react";

interface ContentItem {
  key: string;
  category: string;
  value: string;
  description?: string;
}

export default function CMSContent() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('home');
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newContent, setNewContent] = useState<ContentItem>({ key: '', category: 'home', value: '', description: '' });
  const [isSaving, setIsSaving] = useState(false);

  const utils = trpc.useUtils();

  // Fetch content
  const { data: contentList = [], isLoading } = trpc.cms.getContentByCategory.useQuery(
    { category: selectedCategory, language: language as 'en' | 'zh' },
    { enabled: !!user, retry: 1 }
  );

  // Update content mutation
  const updateContentMutation = trpc.cms.updateContent.useMutation({
    onSuccess: () => {
      toast.success(language === 'en' ? 'Content saved successfully!' : '内容保存成功！');
      setEditingContent(null);
      setIsAdding(false);
      setIsSaving(false);
      // Delay invalidate to let React finish removing the modal DOM first
      // This prevents insertBefore errors from simultaneous DOM mutations
      setTimeout(() => {
        utils.cms.getContentByCategory.invalidate();
      }, 50);
    },
    onError: (error) => {
      // Check if it's an auth error - show specific message instead of redirecting
      if (error.message?.includes('login') || error.message?.includes('10001')) {
        toast.error(language === 'en' 
          ? 'Session expired. Please refresh the page and try again.' 
          : '会话已过期。请刷新页面后重试。');
      } else {
        toast.error(language === 'en' ? 'Failed to save content' : '保存内容失败');
      }
      console.error(error);
      setIsSaving(false);
    },
  });

  const categories = [
    { id: 'home', label: language === 'en' ? 'Home Page' : '首页' },
    { id: 'product', label: language === 'en' ? 'Product' : '产品' },
    { id: 'about', label: language === 'en' ? 'About Us' : '关于我们' },
    { id: 'blog', label: language === 'en' ? 'Blog' : '博客' },
    { id: 'footer', label: language === 'en' ? 'Footer' : '页脚' },
  ];

  const handleSave = async () => {
    if (!editingContent) return;

    setIsSaving(true);
    try {
      await updateContentMutation.mutateAsync({
        key: editingContent.key,
        language: language as 'en' | 'zh',
        value: editingContent.value,
        category: editingContent.category,
        description: editingContent.description,
      });
    } catch (error) {
      // Error is already handled by onError callback
      // Catch here to prevent unhandled promise rejection and global redirect
      console.error('Save failed:', error);
    }
  };

  const handleAddNew = async () => {
    if (!newContent.key || !newContent.value) {
      toast.error(language === 'en' ? 'Key and content are required' : '键名和内容为必填项');
      return;
    }

    setIsSaving(true);
    try {
      await updateContentMutation.mutateAsync({
        key: newContent.key,
        language: language as 'en' | 'zh',
        value: newContent.value,
        category: selectedCategory,
        description: newContent.description,
      });
      setNewContent({ key: '', category: 'home', value: '', description: '' });
    } catch (error) {
      // Error is already handled by onError callback
      console.error('Add failed:', error);
    }
  };

  // CMSLayout handles the unauthenticated state with "Access Denied" UI
  return (
    <CMSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              {language === 'en' ? 'Content Editor' : '文案编辑'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'en' 
                ? 'Edit and manage your website content in multiple languages'
                : '编辑和管理您网站的多语言内容'}
            </p>
          </div>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            {language === 'en' ? 'Add Content' : '添加内容'}
          </Button>
        </div>

        {/* Language Selector */}
        <div className="flex gap-2">
          <Button
            variant={language === 'en' ? 'default' : 'outline'}
            onClick={() => setLanguage('en')}
          >
            English
          </Button>
          <Button
            variant={language === 'zh' ? 'default' : 'outline'}
            onClick={() => setLanguage('zh')}
          >
            中文
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Category Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <h2 className="font-semibold mb-4">
                {language === 'en' ? 'Categories' : '分类'}
              </h2>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-white'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Content Editor */}
          <div className="lg:col-span-3 space-y-4">
            {isLoading ? (
              <Card className="p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </Card>
            ) : contentList.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground mb-4">
                  {language === 'en' 
                    ? 'No content found in this category. Click "Add Content" to create new entries.'
                    : '此分类中没有找到内容。点击"添加内容"创建新条目。'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsAdding(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Add First Content' : '添加第一条内容'}
                </Button>
              </Card>
            ) : (
              <>
                {contentList.map((item) => (
                  <Card
                    key={item.id}
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-primary/20 hover:border-l-primary"
                    onClick={() => setEditingContent(item as ContentItem)}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-foreground font-mono text-sm bg-muted px-2 py-1 rounded">
                          {item.key}
                        </h3>
                        <span className="text-xs text-muted-foreground">
                          {language === 'en' ? 'Click to edit' : '点击编辑'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.value}
                      </p>
                    </div>
                  </Card>
                ))}
              </>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingContent && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold font-mono">{editingContent.key}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'en' ? 'Editing' : '编辑中'}: {language === 'en' ? 'English' : '中文'} | {categories.find(c => c.id === editingContent.category)?.label}
                    </p>
                  </div>
                  <button
                    onClick={() => setEditingContent(null)}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Content' : '内容'}
                  </label>
                  <textarea
                    value={editingContent.value}
                    onChange={(e) =>
                      setEditingContent({
                        ...editingContent,
                        value: e.target.value,
                      })
                    }
                    className="w-full h-64 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                    placeholder={language === 'en' ? 'Enter content here...' : '在此输入内容...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Description (Optional)' : '描述（可选）'}
                  </label>
                  <input
                    type="text"
                    value={editingContent.description || ''}
                    onChange={(e) =>
                      setEditingContent({
                        ...editingContent,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={language === 'en' ? 'Add notes for your team...' : '为团队添加备注...'}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setEditingContent(null)}
                  >
                    {language === 'en' ? 'Cancel' : '取消'}
                  </Button>
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {language === 'en' ? 'Saving...' : '保存中...'}
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Save' : '保存'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Add New Content Modal */}
        {isAdding && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold">
                      {language === 'en' ? 'Add New Content' : '添加新内容'}
                    </h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      {language === 'en' ? 'Category' : '分类'}: {categories.find(c => c.id === selectedCategory)?.label} | {language === 'en' ? 'Language' : '语言'}: {language === 'en' ? 'English' : '中文'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="p-2 hover:bg-muted rounded-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Content Key' : '内容键名'}
                  </label>
                  <input
                    type="text"
                    value={newContent.key}
                    onChange={(e) => setNewContent({ ...newContent, key: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    placeholder={language === 'en' ? 'e.g., home.section3.title' : '例如：home.section3.title'}
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    {language === 'en' 
                      ? 'Use dot notation for organization (e.g., page.section.element)'
                      : '使用点号分隔来组织（例如：page.section.element）'}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Content' : '内容'}
                  </label>
                  <textarea
                    value={newContent.value}
                    onChange={(e) => setNewContent({ ...newContent, value: e.target.value })}
                    className="w-full h-48 p-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-y"
                    placeholder={language === 'en' ? 'Enter content here...' : '在此输入内容...'}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Description (Optional)' : '描述（可选）'}
                  </label>
                  <input
                    type="text"
                    value={newContent.description || ''}
                    onChange={(e) => setNewContent({ ...newContent, description: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={language === 'en' ? 'Add notes for your team...' : '为团队添加备注...'}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setIsAdding(false)}
                  >
                    {language === 'en' ? 'Cancel' : '取消'}
                  </Button>
                  <Button
                    onClick={handleAddNew}
                    disabled={isSaving}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {language === 'en' ? 'Adding...' : '添加中...'}
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        {language === 'en' ? 'Add Content' : '添加内容'}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </CMSLayout>
  );
}
