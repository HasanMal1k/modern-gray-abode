import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, insertInto, updateTable } from "@/utils/supabase.utils";
import { 
  Save, 
  XCircle, 
  Upload, 
  Trash2, 
  ImagePlus,
  LinkIcon,
  Globe,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { toast } from 'sonner';
import { BlogPostFormData } from '@/types/admin.types';
import { format } from 'date-fns';

interface BlogFormProps {
  postId?: string;
  initialData?: BlogPostFormData;
}

const BlogForm: React.FC<BlogFormProps> = ({ postId, initialData }) => {
  const [formData, setFormData] = useState<BlogPostFormData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image: '',
    published: false,
    author: '',
    published_at: undefined,
    ...initialData
  });
  
  const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
  const [featuredImagePreview, setFeaturedImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(postId ? true : false);
  const [publishDate, setPublishDate] = useState<Date | undefined>(
    formData.published_at ? new Date(formData.published_at) : undefined
  );
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (postId) {
      fetchPostData();
    }
  }, [postId]);
  
  useEffect(() => {
    if (publishDate) {
      setFormData(prev => ({
        ...prev,
        published_at: publishDate.toISOString()
      }));
    }
  }, [publishDate]);
  
  const fetchPostData = async () => {
    setIsLoading(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (name === 'title' && (!postId || !formData.slug)) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
        
      setFormData(prev => ({
        ...prev,
        slug
      }));
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      published: checked,
      published_at: checked && !formData.published_at ? new Date().toISOString() : formData.published_at
    });
    
    if (checked && !publishDate) {
      setPublishDate(new Date());
    }
  };
  
  const handleFeaturedImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    setFeaturedImageFile(file);
    
    const objectUrl = URL.createObjectURL(file);
    setFeaturedImagePreview(objectUrl);
  };
  
  const handleRemoveFeaturedImage = () => {
    if (featuredImagePreview) {
      URL.revokeObjectURL(featuredImagePreview);
    }
    
    setFeaturedImageFile(null);
    setFeaturedImagePreview(null);
    
    setFormData({
      ...formData,
      featured_image: ''
    });
  };
  
  const validateForm = () => {
    if (!formData.title) {
      toast.error('Please enter a blog post title');
      return false;
    }
    
    if (!formData.slug) {
      toast.error('Please enter a blog post slug');
      return false;
    }
    
    if (!formData.content) {
      toast.error('Please enter blog post content');
      return false;
    }
    
    return true;
  };
  
  const uploadFeaturedImage = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `blog/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      if (featuredImageFile) {
        const imageUrl = await uploadFeaturedImage(featuredImageFile);
        formData.featured_image = imageUrl;
      }
      
      if (postId) {
        const { error } = await updateTable('blog_posts', formData)
          .eq('id', postId);
        
        if (error) throw error;
      } else {
        const { error } = await insertInto('blog_posts', [formData]);
        
        if (error) throw error;
      }
      
      toast.success(`Blog post ${postId ? 'updated' : 'created'} successfully`);
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving blog post:', error);
      toast.error(`Failed to ${postId ? 'update' : 'create'} blog post`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Blog Post Information</h2>
          <p className="text-gray-500 text-sm mt-1">Basic information about the blog post</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base">Title <span className="text-red-500">*</span></Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 10 Tips for First-Time Home Buyers"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-base flex items-center justify-between">
              <span>Slug <span className="text-red-500">*</span></span>
              <span className="text-xs text-gray-500 flex items-center">
                <Globe className="h-3 w-3 mr-1" />
                URL: /blog/{formData.slug}
              </span>
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="e.g. 10-tips-for-first-time-home-buyers"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="excerpt" className="text-base">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              value={formData.excerpt || ''}
              onChange={handleChange}
              placeholder="A brief summary of the blog post"
              rows={2}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content" className="text-base">Content <span className="text-red-500">*</span></Label>
            <Textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post content here..."
              rows={12}
              required
            />
            <p className="text-xs text-gray-500">
              You can use Markdown for formatting. HTML tags are also supported.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="author" className="text-base">Author</Label>
            <Input
              id="author"
              name="author"
              value={formData.author || ''}
              onChange={handleChange}
              placeholder="e.g. John Doe"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex flex-col space-y-2 min-w-[200px]">
              <Label className="text-base">Publish Status</Label>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="published" className="cursor-pointer">
                  {formData.published ? 'Published' : 'Draft'}
                </Label>
              </div>
            </div>
            
            <div className="flex flex-col space-y-2 min-w-[200px]">
              <Label className="text-base">Publish Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${
                      !publishDate && 'text-muted-foreground'
                    }`}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {publishDate ? format(publishDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={publishDate}
                    onSelect={setPublishDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Featured Image</h2>
          <p className="text-gray-500 text-sm mt-1">Upload a featured image for the blog post</p>
        </div>
        
        <div className="p-6">
          {!formData.featured_image && !featuredImagePreview ? (
            <div className="mb-6">
              <Label htmlFor="image-upload" className="block">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition cursor-pointer">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 mb-1">Drag and drop an image or click to browse</p>
                  <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 5MB</p>
                </div>
              </Label>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleFeaturedImageUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={featuredImagePreview || formData.featured_image}
                alt="Featured image preview"
                className="w-full h-auto max-h-[300px] object-cover"
              />
              <div className="absolute top-0 right-0 p-2">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={handleRemoveFeaturedImage}
                  className="bg-black/50 hover:bg-black/70 text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/blog')}
          disabled={isSubmitting}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {postId ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {postId ? 'Update Post' : 'Create Post'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default BlogForm;
