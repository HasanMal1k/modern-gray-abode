import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/utils/supabase.utils";
import { 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  ChevronLeft,
  ChevronRight,
  Filter,
  X, 
  Check,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  published: boolean;
  featured_image?: string;
  author?: string;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

const ITEMS_PER_PAGE = 10;

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchQuery]);
  
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Calculate pagination
      const from = (currentPage - 1) * ITEMS_PER_PAGE;
      const to = from + ITEMS_PER_PAGE - 1;
      
      let query = supabase
        .from('blog_posts' as any)
        .select('*', { count: 'exact' });
      
      // Apply search filter if search query exists
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,slug.ilike.%${searchQuery}%,excerpt.ilike.%${searchQuery}%`);
      }
      
      // Fetch paginated data
      const { data, count, error } = await query
        .order('created_at', { ascending: false })
        .range(from, to);
      
      if (error) throw error;
      
      setPosts(data as BlogPost[]);
      
      if (count !== null) {
        setTotalPosts(count);
        setTotalPages(Math.ceil(count / ITEMS_PER_PAGE));
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };
  
  const handleDeleteClick = (post: BlogPost) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (!postToDelete) return;
    
    setIsDeleting(true);
    
    try {
      const { error } = await supabase
        .from('blog_posts' as any)
        .delete()
        .eq('id', postToDelete.id);
      
      if (error) throw error;
      
      // Remove deleted post from state
      setPosts(posts.filter(post => post.id !== postToDelete.id));
      setTotalPosts(prev => prev - 1);
      
      // Update total pages
      const newTotalPages = Math.ceil((totalPosts - 1) / ITEMS_PER_PAGE);
      setTotalPages(newTotalPages);
      
      // If current page is now empty and not the first page, go to previous page
      if (
        currentPage > 1 &&
        (currentPage - 1) * ITEMS_PER_PAGE >= totalPosts - 1
      ) {
        setCurrentPage(currentPage - 1);
      }
      
      toast.success('Blog post deleted successfully');
    } catch (error) {
      console.error('Error deleting blog post:', error);
      toast.error('Failed to delete blog post');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPostToDelete(null);
    }
  };
  
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          New Post
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search blog posts..."
              className="pl-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.length > 0 ? (
                    posts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            {post.featured_image && (
                              <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
                                <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                              </div>
                            )}
                            <span>{post.title}</span>
                          </div>
                        </TableCell>
                        <TableCell>{post.slug}</TableCell>
                        <TableCell>
                          {post.published ? (
                            <Badge variant="success">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="warning">
                              Draft
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {post.created_at ? format(new Date(post.created_at), 'PP') : '-'}
                        </TableCell>
                        <TableCell>
                          {post.updated_at ? format(new Date(post.updated_at), 'PP') : '-'}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
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
                              onClick={() => handleDeleteClick(post)}
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                        {searchQuery ? (
                          <>
                            No blog posts found matching "{searchQuery}"
                            <Button
                              variant="link"
                              className="ml-2 text-orange-500"
                              onClick={() => setSearchQuery('')}
                            >
                              Clear search
                            </Button>
                          </>
                        ) : (
                          <>
                            No blog posts found. 
                            <Button
                              variant="link"
                              className="ml-2 text-orange-500"
                              onClick={() => navigate('/admin/blog/new')}
                            >
                              Create your first post
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            
            {totalPages > 1 && (
              <div className="p-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                  {Math.min(currentPage * ITEMS_PER_PAGE, totalPosts)} of {totalPosts} posts
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Previous Page</span>
                  </Button>
                  <div className="text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                    <span className="sr-only">Next Page</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {postToDelete && (
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium">{postToDelete.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{postToDelete.slug}</p>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogList;
