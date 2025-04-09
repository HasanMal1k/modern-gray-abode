
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Building, FileText, BarChart2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const StatCard = ({ title, value, icon, color, footer, footerLink }: { 
  title: string; 
  value: string | number; 
  icon: React.ReactNode; 
  color: string;
  footer: string;
  footerLink: string;
}) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className={`text-white ${color} py-5`}>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="p-2 bg-white/20 rounded-md">{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-3xl font-bold">{value}</p>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link to={footerLink} className="text-sm text-blue-600 hover:underline">
          {footer}
        </Link>
      </CardFooter>
    </Card>
  );
};

const RecentActivityCard = ({ title, activities }: {
  title: string;
  activities: { id: string; name: string; date: string; type: string; link: string }[];
}) => {
  return (
    <Card className="col-span-1 md:col-span-2">
      <CardHeader>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>Recent activity on the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className={`p-2 rounded-md ${
                activity.type === 'property' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                {activity.type === 'property' ? (
                  <Building className={`w-5 h-5 ${
                    activity.type === 'property' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                ) : (
                  <FileText className={`w-5 h-5 ${
                    activity.type === 'property' ? 'text-green-600' : 'text-purple-600'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <Link to={activity.link} className="font-medium hover:underline">
                  {activity.name}
                </Link>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <Clock className="w-3 h-3 mr-1" />
                  {activity.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t p-4">
        <Link to="/admin/activity" className="text-sm text-blue-600 hover:underline">
          View all activity
        </Link>
      </CardFooter>
    </Card>
  );
};

const Dashboard = () => {
  const [propertiesCount, setPropertiesCount] = useState<number>(0);
  const [blogPostsCount, setBlogPostsCount] = useState<number>(0);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);

      try {
        // Get properties count
        const { count: propCount } = await supabase
          .from('properties')
          .select('*', { count: 'exact', head: true });

        // Get blog posts count
        const { count: blogCount } = await supabase
          .from('blog_posts')
          .select('*', { count: 'exact', head: true });

        // Get recent properties
        const { data: recentProperties } = await supabase
          .from('properties')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        // Get recent blog posts
        const { data: recentBlogPosts } = await supabase
          .from('blog_posts')
          .select('id, title, created_at')
          .order('created_at', { ascending: false })
          .limit(3);

        setPropertiesCount(propCount || 0);
        setBlogPostsCount(blogCount || 0);
        
        // Format the activity feed
        const activities = [
          ...(recentProperties?.map(prop => ({
            id: prop.id,
            name: prop.title,
            date: new Date(prop.created_at).toLocaleDateString(),
            type: 'property',
            link: `/admin/properties/edit/${prop.id}`
          })) || []),
          ...(recentBlogPosts?.map(post => ({
            id: post.id,
            name: post.title,
            date: new Date(post.created_at).toLocaleDateString(),
            type: 'blog',
            link: `/admin/blog/edit/${post.id}`
          })) || [])
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
         .slice(0, 5);
        
        setRecentActivity(activities);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to the GrayScale admin panel</p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-gray-100 animate-pulse rounded-lg h-40"></div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <StatCard
              title="Properties"
              value={propertiesCount}
              icon={<Building className="w-5 h-5 text-white" />}
              color="bg-orange-500"
              footer="View all properties"
              footerLink="/admin/properties"
            />
            <StatCard
              title="Blog Posts"
              value={blogPostsCount}
              icon={<FileText className="w-5 h-5 text-white" />}
              color="bg-purple-500"
              footer="View all posts"
              footerLink="/admin/blog"
            />
            <StatCard
              title="Total Views"
              value="3,542"
              icon={<BarChart2 className="w-5 h-5 text-white" />}
              color="bg-blue-500"
              footer="View analytics"
              footerLink="/admin/analytics"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RecentActivityCard
              title="Recent Activity"
              activities={recentActivity}
            />
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link 
                  to="/admin/properties/add" 
                  className="flex items-center p-3 bg-orange-50 rounded-md text-orange-800 hover:bg-orange-100 transition"
                >
                  <Building className="w-5 h-5 mr-3 text-orange-500" />
                  <span>Add New Property</span>
                </Link>
                <Link 
                  to="/admin/blog/add" 
                  className="flex items-center p-3 bg-purple-50 rounded-md text-purple-800 hover:bg-purple-100 transition"
                >
                  <FileText className="w-5 h-5 mr-3 text-purple-500" />
                  <span>Create Blog Post</span>
                </Link>
                <Link 
                  to="/" 
                  target="_blank"
                  className="flex items-center p-3 bg-blue-50 rounded-md text-blue-800 hover:bg-blue-100 transition"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="w-5 h-5 mr-3 text-blue-500"
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M6 13.87A4 4 0 0 1 7.41 6a5.11 5.11 0 0 1 1.05-1.54 5 5 0 0 1 7.08 0A5.11 5.11 0 0 1 16.59 6 4 4 0 0 1 18 13.87V21H6Z"></path>
                    <line x1="6" x2="18" y1="17" y2="17"></line>
                  </svg>
                  <span>View Website</span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
