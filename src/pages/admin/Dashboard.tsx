import { useState, useEffect } from 'react';
import { 
  Clock,
  Star,
  Building,
  Users,
  BarChart,
  ArrowUpRight,
  DollarSign,
  Eye,
  Home
} from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { table, supabase } from "@/utils/supabase.utils";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  
  useEffect(() => {
    // Enable normal mouse cursor for admin pages
    document.body.style.cursor = '';
    
    // Cleanup when component unmounts
    return () => {
      document.body.style.cursor = 'none';
    };
  }, []);
  
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
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              Total Properties
            </CardTitle>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Building className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{properties.length}</div>
            <p className="text-xs text-gray-600">
              {featuredProperties} featured
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              Total Views
            </CardTitle>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <Eye className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalViews}</div>
            <p className="text-xs text-gray-600">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">Total Leads</CardTitle>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalLeads}</div>
            <p className="text-xs text-gray-600">
              +12.5% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-800">
              Conversion Rate
            </CardTitle>
            <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
              <BarChart className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{conversionRate}%</div>
            <p className="text-xs text-gray-600">
              +3.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Properties */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Properties</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/properties')}
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {properties.length > 0 ? (
            properties.slice(0, 5).map((property) => (
              <div key={property.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <Home className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{property.title}</p>
                    <p className="text-sm text-gray-500">{property.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{property.price}</p>
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
            <p className="text-gray-500 text-center py-4">No properties found. <Button variant="link" onClick={() => navigate('/admin/properties/add')} className="text-orange-500 font-medium p-0">Add your first property</Button></p>
          )}
        </div>
      </div>
      
      {/* Recent Blog Posts */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Blog Posts</h2>
          <Button 
            variant="ghost" 
            onClick={() => navigate('/admin/blog')}
            className="text-orange-500 hover:text-orange-600 hover:bg-orange-50"
          >
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {blogPosts.length > 0 ? (
            blogPosts.slice(0, 5).map((post) => (
              <div key={post.id} className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-md bg-gray-100 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium text-gray-900">{post.title}</p>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        post.published 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </div>
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
            <p className="text-gray-500 text-center py-4">No blog posts found. <Button variant="link" onClick={() => navigate('/admin/blog/add')} className="text-orange-500 font-medium p-0">Add your first blog post</Button></p>
          )}
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          className="h-auto p-4 text-left flex items-start bg-orange-50 hover:bg-orange-100 border border-orange-200 text-orange-700"
          onClick={() => navigate('/admin/properties/add')}
        >
          <div className="mr-4">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium">Add Property</h3>
            <p className="text-xs mt-1 text-orange-600">Create a new property listing</p>
          </div>
        </Button>
        
        <Button 
          className="h-auto p-4 text-left flex items-start bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700"
          onClick={() => navigate('/admin/blog/add')}
        >
          <div className="mr-4">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium">Add Blog Post</h3>
            <p className="text-xs mt-1 text-blue-600">Create a new blog post</p>
          </div>
        </Button>
        
        <Button 
          className="h-auto p-4 text-left flex items-start bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-700"
          onClick={() => navigate('/admin/settings')}
        >
          <div className="mr-4">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium">Settings</h3>
            <p className="text-xs mt-1 text-purple-600">Manage your account</p>
          </div>
        </Button>
        
        <Button 
          className="h-auto p-4 text-left flex items-start bg-green-50 hover:bg-green-100 border border-green-200 text-green-700"
          onClick={() => window.open('/', '_blank')}
        >
          <div className="mr-4">
            <Eye className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium">View Website</h3>
            <p className="text-xs mt-1 text-green-600">See your public website</p>
          </div>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;