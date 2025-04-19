
import { useState, useEffect } from 'react';
import { 
  Clock,
  Star,
  Building,
  Users,
  BarChart,
  ArrowUpRight,
  DollarSign
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { table, supabase } from "@/utils/supabase.utils";
import type { Tables } from '@/types/supabase';

type Property = Tables<'properties'>;
type BlogPost = Tables<'blog_posts'>;

const Dashboard = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [featuredProperties, setFeaturedProperties] = useState<number>(0);
  const [totalViews, setTotalViews] = useState<number>(0);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Fetch properties
      const { data: propertiesData, error: propertiesError } = await table('properties')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false });
      
      if (propertiesError) throw propertiesError;
      setProperties(propertiesData || []);
      
      // Fetch blog posts
      const { data: blogData, error: blogError } = await table('blog_posts')
        .select('*')
        .limit(5)
        .order('created_at', { ascending: false });
      
      if (blogError) throw blogError;
      setBlogPosts(blogData || []);
      
      // Count featured properties
      const { data: featuredData, error: featuredError } = await table('properties')
        .select('id')
        .eq('featured', true);
      
      if (featuredError) throw featuredError;
      setFeaturedProperties(featuredData?.length || 0);
      
      // For views and leads, we're using placeholder data
      // In a real application, these would come from analytics
      setTotalViews(1240);
      setTotalLeads(156);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Calculate sample conversion rate
  const conversionRate = totalLeads > 0 && totalViews > 0 
    ? ((totalLeads / totalViews) * 100).toFixed(1) 
    : 0;
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back to your dashboard</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Properties
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">
              {featuredProperties} featured
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Views
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLeads}</div>
            <p className="text-xs text-muted-foreground">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conversion Rate
            </CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Properties */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Properties</h2>
        <div className="space-y-4">
          {properties.length > 0 ? (
            properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <Building className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{property.title}</p>
                    <p className="text-sm text-gray-500">{property.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium">{property.price}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(property.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  {property.featured && (
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No properties found.</p>
          )}
          
          {properties.length > 0 && (
            <Button 
              variant="ghost" 
              className="mt-2 w-full justify-center border border-gray-200 hover:bg-gray-50"
              onClick={() => window.location.href = '/admin/properties'}
            >
              View All Properties
            </Button>
          )}
        </div>
      </div>
      
      {/* Recent Blog Posts */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Blog Posts</h2>
        <div className="space-y-4">
          {blogPosts.length > 0 ? (
            blogPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-sm text-gray-500">
                      {post.published ? 'Published' : 'Draft'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No blog posts found.</p>
          )}
          
          {blogPosts.length > 0 && (
            <Button 
              variant="ghost" 
              className="mt-2 w-full justify-center border border-gray-200 hover:bg-gray-50"
              onClick={() => window.location.href = '/admin/blog'}
            >
              View All Blog Posts
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
