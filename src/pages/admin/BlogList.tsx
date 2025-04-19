import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { table } from "@/utils/supabase.utils";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Eye,
  Filter,
  Calendar,
  CheckCircle,
  XCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { Tables } from '@/types/supabase';

type BlogPost = Tables<'blog_posts'>;

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [publishedFilter, setPublishedFilter] = useState<string | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPosts();
  }, [searchQuery, publishedFilter]);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let query = table('blog_posts')
        .select('*');
      
      if (publishedFilter === 'published') {
        query = query.eq('published', true);
      } else if (publishedFilter === 'draft') {
        query = query.eq('published', false);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,content.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await table('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setPosts(posts.filter(post => post.id !== id));
      
      toast.success('Blog post deleted successfully');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          </div>
          <p className="text-gray-600 mt-1">Manage your blog posts</p>
        </div>
        
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate('/admin/blog/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Blog Post
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search blog posts..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {publishedFilter === 'published' ? 'Published' : publishedFilter === 'draft' ? 'Draft' : 'All'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setPublishedFilter(null)}>
                  All Posts
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPublishedFilter('published')}>
                  Published
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setPublishedFilter('draft')}>
                  Drafts
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {posts.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Post</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Published At</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="font-medium text-gray-900">{post.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {post.published ? (
                          <Badge variant="success" className="gap-1.5">
                            <CheckCircle className="h-4 w-4" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1.5">
                            <XCircle className="h-4 w-4" />
                            Draft
                          </Badge>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {post.published_at ? (
                          <div className="flex items-center space-x-2 text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(post.published_at), 'MMM d, yyyy')}</span>
                          </div>
                        ) : (
                          <span className="text-gray-500">Not set</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/blog/${post.slug}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/blog/edit/${post.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No blog posts found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || publishedFilter 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first blog post'}
                </p>
                {searchQuery || publishedFilter ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setPublishedFilter(null);
                    }}
                  >
                    Clear filters
                  </Button>
                ) : (
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => navigate('/admin/blog/new')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Blog Post
                  </Button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogList;
