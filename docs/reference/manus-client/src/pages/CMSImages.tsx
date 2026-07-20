import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CMSLayout from "@/components/CMSLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { useState, useRef, useCallback } from "react";
import { toast } from "sonner";
import { Loader2, Upload, Trash2, Copy, Check, Edit2, X } from "lucide-react";

interface ImageItem {
  id: number;
  key: string;
  url: string;
  fileName: string;
  category: string;
  page: string;
  alt: string | null;
  description: string | null;
  fileSize: number | null;
  mimeType: string | null;
  uploadedBy: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function CMSImages() {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [selectedPage, setSelectedPage] = useState('home');
  const [isUploading, setIsUploading] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [editingImage, setEditingImage] = useState<ImageItem | null>(null);
  const [editFormData, setEditFormData] = useState({ alt: '', description: '' });
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFileUpload(file);
    } else {
      toast.error(language === 'en' ? 'Please drop an image file' : '请拖放图片文件');
    }
  }, [language]);

  // Fetch images
  const { data: imageList = [], isLoading, refetch } = trpc.cms.getImagesByPage.useQuery(
    { page: selectedPage },
    { enabled: !!user }
  );

  // Upload image mutation
  const uploadImageMutation = trpc.cms.uploadImage.useMutation({
    onSuccess: () => {
      toast.success(language === 'en' ? 'Image uploaded successfully!' : '图片上传成功！');
      setIsUploading(false);
      refetch();
    },
    onError: (error) => {
      toast.error(language === 'en' ? 'Failed to upload image' : '上传图片失败');
      console.error(error);
      setIsUploading(false);
    },
  });

  // Update image mutation
  const updateImageMutation = trpc.cms.updateImage.useMutation({
    onSuccess: () => {
      toast.success(language === 'en' ? 'Image updated successfully!' : '图片更新成功！');
      setEditingImage(null);
      refetch();
    },
    onError: (error) => {
      toast.error(language === 'en' ? 'Failed to update image' : '更新图片失败');
      console.error(error);
    },
  });

  // Delete image mutation
  const deleteImageMutation = trpc.cms.deleteImage.useMutation({
    onSuccess: () => {
      toast.success(language === 'en' ? 'Image deleted successfully!' : '图片删除成功！');
      refetch();
    },
    onError: (error) => {
      toast.error(language === 'en' ? 'Failed to delete image' : '删除图片失败');
      console.error(error);
    },
  });

  const pages = [
    { id: 'home', label: language === 'en' ? 'Home Page' : '首页' },
    { id: 'product', label: language === 'en' ? 'Product' : '产品' },
    { id: 'about', label: language === 'en' ? 'About Us' : '关于我们' },
    { id: 'blog', label: language === 'en' ? 'Blog' : '博客' },
  ];

  const processFileUpload = (file: File) => {
    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast.error(language === 'en' ? 'File size must be less than 10MB' : '文件大小必须小于 10MB');
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const base64Data = (event.target?.result as string).split(',')[1];
        
        await uploadImageMutation.mutateAsync({
          key: `${selectedPage}.${Date.now()}.${file.name.split('.').pop()}`,
          base64Data: base64Data,
          fileName: file.name,
          category: selectedPage,
          page: selectedPage,
          fileSize: file.size,
          mimeType: file.type,
          alt: `Image for ${selectedPage}`,
          description: `Uploaded on ${new Date().toLocaleDateString()}`,
        });
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(language === 'en' ? 'Upload failed' : '上传失败');
      setIsUploading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFileUpload(file);
  };

  const copyToClipboard = (url: string, id: number) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleEditImage = (image: ImageItem) => {
    setEditingImage(image);
    setEditFormData({
      alt: image.alt || '',
      description: image.description || '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingImage) return;

    await updateImageMutation.mutateAsync({
      id: editingImage.id,
      alt: editFormData.alt,
      description: editFormData.description,
    });
  };

  // CMSLayout handles the unauthenticated state with "Access Denied" UI
  return (
    <CMSLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            {language === 'en' ? 'Image Manager' : '图片管理'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {language === 'en' 
              ? 'Upload, manage and organize your website images'
              : '上传、管理和组织您网站的图片'}
          </p>
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
          {/* Page Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-6">
              <h2 className="font-semibold mb-4">
                {language === 'en' ? 'Pages' : '页面'}
              </h2>
              <div className="space-y-2">
                {pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setSelectedPage(page.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedPage === page.id
                        ? 'bg-primary text-white'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {page.label}
                  </button>
                ))}
              </div>

              {/* Upload Button */}
              <div className="mt-6 pt-4 border-t">
                <label className="block">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={isUploading}
                    className="hidden"
                  />
                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 cursor-pointer"
                    disabled={isUploading}
                  >
                    <span>
                      {isUploading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {language === 'en' ? 'Uploading...' : '上传中...'}
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4 mr-2" />
                          {language === 'en' ? 'Upload Image' : '上传图片'}
                        </>
                      )}
                    </span>
                  </Button>
                </label>
              </div>

              {/* Upload Info */}
              <div className="mt-4 p-3 bg-muted rounded text-xs text-muted-foreground">
                {language === 'en' 
                  ? '• Max file size: 10MB\n• Formats: JPG, PNG, GIF, WebP'
                  : '• 最大文件大小：10MB\n• 格式：JPG、PNG、GIF、WebP'}
              </div>
            </Card>
          </div>

          {/* Images Grid */}
          <div
            className={`lg:col-span-3 transition-colors rounded-xl ${isDragOver ? 'bg-primary/5 ring-2 ring-primary ring-dashed' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {isLoading ? (
              <Card className="p-8 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </Card>
            ) : imageList.length === 0 ? (
              <Card className="p-12 text-center border-2 border-dashed border-muted-foreground/20">
                <Upload className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
                <p className="text-muted-foreground font-medium mb-2">
                  {language === 'en' 
                    ? 'No images found for this page'
                    : '此页面没有找到图片'}
                </p>
                <p className="text-sm text-muted-foreground/70 mb-4">
                  {language === 'en' 
                    ? 'Drag and drop an image here, or click the Upload button'
                    : '拖放图片到此处，或点击上传按钮'}
                </p>
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {language === 'en' ? 'Upload First Image' : '上传第一张图片'}
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {imageList.map((image) => (
                  <Card key={image.id} className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                    {/* Image Preview */}
                    <div className="aspect-video bg-muted overflow-hidden relative group">
                      <img
                        src={image.url}
                        alt={image.alt || image.fileName}
                        className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="14" fill="%23999"%3EImage not available%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button
                          onClick={() => window.open(image.url, '_blank')}
                          className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                          title={language === 'en' ? 'View full size' : '查看完整尺寸'}
                        >
                          <span className="text-white text-sm">{language === 'en' ? 'View' : '查看'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Image Info */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col">
                      <div>
                        <h3 className="font-semibold text-foreground line-clamp-1 text-sm">
                          {image.fileName}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1">{image.key}</p>
                      </div>

                      {image.description && (
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {image.description}
                        </p>
                      )}

                      {/* File Info */}
                      <div className="text-xs text-muted-foreground space-y-1">
                        {image.fileSize && (
                          <p>{(image.fileSize / 1024).toFixed(1)} KB</p>
                        )}
                        {image.mimeType && (
                          <p>{image.mimeType}</p>
                        )}
                      </div>

                      {/* URL Copy */}
                      <div className="flex items-center gap-2 bg-muted p-2 rounded text-xs">
                        <code className="flex-1 truncate text-foreground/70 text-[10px]">
                          {image.url.substring(0, 25)}...
                        </code>
                        <button
                          onClick={() => copyToClipboard(image.url, image.id)}
                          className="p-1 hover:bg-muted-foreground/20 rounded transition-colors flex-shrink-0"
                          title={language === 'en' ? 'Copy URL' : '复制 URL'}
                        >
                          {copiedId === image.id ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2 border-t mt-auto">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => handleEditImage(image)}
                        >
                          <Edit2 className="w-3 h-3 mr-1" />
                          {language === 'en' ? 'Edit' : '编辑'}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            if (confirm(language === 'en' ? 'Delete this image?' : '删除此图片？')) {
                              deleteImageMutation.mutate({ id: image.id });
                            }
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Edit Modal */}
        {editingImage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{editingImage.fileName}</h2>
                    <p className="text-sm text-muted-foreground mt-1">{editingImage.key}</p>
                  </div>
                  <button
                    onClick={() => setEditingImage(null)}
                    className="p-1 hover:bg-muted rounded transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Image Preview */}
                <div className="aspect-video bg-muted rounded overflow-hidden">
                  <img
                    src={editingImage.url}
                    alt={editingImage.alt || editingImage.fileName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Alt Text */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Alt Text (for accessibility)' : '替代文本（用于可访问性）'}
                  </label>
                  <input
                    type="text"
                    value={editFormData.alt}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, alt: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={language === 'en' ? 'Describe the image...' : '描述图片...'}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    {language === 'en' ? 'Description' : '描述'}
                  </label>
                  <textarea
                    value={editFormData.description}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, description: e.target.value })
                    }
                    className="w-full h-24 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder={language === 'en' ? 'Add notes about this image...' : '添加关于此图片的备注...'}
                  />
                </div>

                {/* File Info */}
                <div className="grid grid-cols-2 gap-4 p-3 bg-muted rounded text-sm">
                  <div>
                    <p className="text-muted-foreground">{language === 'en' ? 'File Size' : '文件大小'}</p>
                    <p className="font-semibold">
                      {editingImage.fileSize ? (editingImage.fileSize / 1024).toFixed(1) + ' KB' : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">{language === 'en' ? 'Format' : '格式'}</p>
                    <p className="font-semibold">{editingImage.mimeType || 'N/A'}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 justify-end pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setEditingImage(null)}
                  >
                    {language === 'en' ? 'Cancel' : '取消'}
                  </Button>
                  <Button
                    onClick={handleSaveEdit}
                    disabled={updateImageMutation.isPending}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {updateImageMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {language === 'en' ? 'Saving...' : '保存中...'}
                      </>
                    ) : (
                      language === 'en' ? 'Save Changes' : '保存更改'
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
