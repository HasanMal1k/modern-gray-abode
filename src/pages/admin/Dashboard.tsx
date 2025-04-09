import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, CustomDatabase } from "@/integrations/supabase/client";
import {
  Building,
  FileText,
  StarIcon,
  BarChart3,
  Clock,
  PlusCircle
} from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

interface DashboardStats {
  totalProperties: number;
  featuredProperties: number;
  totalBlogPosts: number;
  publishedBlogPosts: number;
}

interface RecentItem {
  id: string;
  title: string;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAdminAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalProperties: 0,
    featuredProperties: 0,
    totalBlogPosts: 0,
    publishedBlogPosts: 0
  });
  const [recentProperties, setRecentProperties] = useState<RecentItem[]>([]);
  const [recentBlogPosts, setRecentBlogPosts] = useState<RecentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setIsLoading(true);
    try {
      // Fetch total properties count
      const { count: totalPropertiesCount, error: totalPropertiesError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true }) as { count: number | null; error: any };

      if (totalPropertiesError) throw totalPropertiesError;

      // Fetch featured properties count
      const { count: featuredPropertiesCount, error: featuredPropertiesError } = await supabase
        .from('properties')
        .select('*', { count: 'exact', head: true })
        .eq('featured', true) as { count: number | null; error: any };

      if (featuredPropertiesError) throw featuredPropertiesError;

      // Fetch total blog posts count
      const { count: totalBlogPostsCount, error: totalBlogPostsError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true }) as { count: number | null; error: any };

      if (totalBlogPostsError) throw totalBlogPostsError;

      // Fetch published blog posts count
      const { count: publishedBlogPostsCount, error: publishedBlogPostsError } = await supabase
        .from('blog_posts')
        .select('*', { count: 'exact', head: true })
        .eq('published', true) as { count: number | null; error: any };

      if (publishedBlogPostsError) throw publishedBlogPostsError;

      // Fetch recent properties
      const { data: recentPropertiesData, error: recentPropertiesError } = await supabase
        .from('properties')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5) as {
          data: CustomDatabase['public']['Tables']['properties']['Row'][] | null;
          error: any;
        };

      if (recentPropertiesError) throw recentPropertiesError;

      // Fetch recent blog posts
      const { data: recentBlogPostsData, error: recentBlogPostsError } = await supabase
        .from('blog_posts')
        .select('id, title, created_at')
        .order('created_at', { ascending: false })
        .limit(5) as {
          data: CustomDatabase['public']['Tables']['blog_posts']['Row'][] | null;
          error: any;
        };

      if (recentBlogPostsError) throw recentBlogPostsError;

      setStats({
        totalProperties: totalPropertiesCount || 0,
        featuredProperties: featuredPropertiesCount || 0,
        totalBlogPosts: totalBlogPostsCount || 0,
        publishedBlogPosts: publishedBlogPostsCount || 0
      });

      setRecentProperties(recentPropertiesData || []);
      setRecentBlogPosts(recentBlogPostsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome, {user?.email}!</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center min-h-48">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <Building className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProperties}</div>
              <p className="text-sm text-gray-500">All listed properties</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/properties">
                <Button variant="secondary" size="sm">
                  View Properties
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Featured Properties</CardTitle>
              <StarIcon className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.featuredProperties}</div>
              <p className="text-sm text-gray-500">Properties marked as featured</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/properties">
                <Button variant="secondary" size="sm">
                  View Properties
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Blog Posts</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalBlogPosts}</div>
              <p className="text-sm text-gray-500">All blog posts</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/blog">
                <Button variant="secondary" size="sm">
                  View Blog Posts
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Published Blog Posts</CardTitle>
              <BarChart3 className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.publishedBlogPosts}</div>
              <p className="text-sm text-gray-500">Blog posts that are live</p>
            </CardContent>
            <CardFooter>
              <Link to="/admin/blog">
                <Button variant="secondary" size="sm">
                  View Blog Posts
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Properties</CardTitle>
            <CardDescription>Last 5 properties added</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : recentProperties.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No recent properties</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentProperties.map((property) => (
                  <li key={property.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/admin/properties/edit/${property.id}`} className="font-medium hover:text-blue-600">
                          {property.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                          <Clock className="inline-block w-4 h-4 mr-1 align-middle" />
                          Created on {formatDate(property.created_at)}
                        </p>
                      </div>
                      <Link to={`/admin/properties/edit/${property.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/admin/properties">
              <Button variant="secondary" size="sm">
                View All Properties
              </Button>
            </Link>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">Recent Blog Posts</CardTitle>
            <CardDescription>Last 5 blog posts added</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex items-center justify-center min-h-48">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500"></div>
              </div>
            ) : recentBlogPosts.length === 0 ? (
              <div className="p-4 text-center text-gray-500">No recent blog posts</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentBlogPosts.map((post) => (
                  <li key={post.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Link to={`/admin/blog/edit/${post.id}`} className="font-medium hover:text-blue-600">
                          {post.title}
                        </Link>
                        <p className="text-sm text-gray-500">
                          <Clock className="inline-block w-4 h-4 mr-1 align-middle" />
                          Created on {formatDate(post.created_at)}
                        </p>
                      </div>
                      <Link to={`/admin/blog/edit/${post.id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
          <CardFooter>
            <Link to="/admin/blog">
              <Button variant="secondary" size="sm">
                View All Blog Posts
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
