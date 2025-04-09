import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "@/utils/supabase.utils";
import { 
  Building, 
  Plus, 
  Edit, 
  Trash2, 
  Search,
  Star,
  StarOff,
  FileText,
  Eye,
  Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { CATEGORIES } from '@/types/property.types';
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  price_numeric: number;
  bedrooms: number;
  bathrooms: number;
  category: string;
  featured: boolean;
  created_at: string;
  updated_at: string;
}

const PropertiesList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All Properties');
  
  const navigate = useNavigate();
  
  useEffect(() => {
    fetchProperties();
  }, [searchQuery, categoryFilter]);
  
  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('properties' as any)
        .select('*');
      
      if (categoryFilter && categoryFilter !== 'All Properties') {
        query = query.eq('category', categoryFilter);
      }
      
      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,location.ilike.%${searchQuery}%`);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProperties(data as Property[]);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('properties' as any)
        .update({ featured: !currentStatus } as any)
        .eq('id', id);
      
      if (error) throw error;
      
      setProperties(properties.map(property => 
        property.id === id ? { ...property, featured: !currentStatus } : property
      ));
      
      toast.success(`Property ${!currentStatus ? 'marked as featured' : 'removed from featured'}`);
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    }
  };
  
  const handleDeleteProperty = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      return;
    }
    
    try {
      const { error } = await supabase
        .from('properties' as any)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setProperties(properties.filter(property => property.id !== id));
      
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
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
            <Building className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          </div>
          <p className="text-gray-600 mt-1">Manage your property listings</p>
        </div>
        
        <Button 
          className="bg-orange-500 hover:bg-orange-600"
          onClick={() => navigate('/admin/properties/new')}
        >
          <Plus className="h-4 w-4 mr-2" />
          New Property
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  {categoryFilter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setCategoryFilter('All Properties')}>
                  All Properties
                </DropdownMenuItem>
                {CATEGORIES.filter(cat => cat !== 'All Properties').map((category) => (
                  <DropdownMenuItem 
                    key={category}
                    onClick={() => setCategoryFilter(category)}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
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
            {properties.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Property</th>
                    <th className="px-6 py-3">Price</th>
                    <th className="px-6 py-3">Location</th>
                    <th className="px-6 py-3">Details</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Featured</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {properties.map((property) => (
                    <tr key={property.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="font-medium text-gray-900">{property.title}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-900 font-medium">{property.price}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-gray-500">{property.location}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <span>{property.bedrooms} bed</span>
                          <span>•</span>
                          <span>{property.bathrooms} bath</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="secondary">{property.category}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleFeatured(property.id, property.featured)}
                          className={property.featured ? "text-yellow-500" : "text-gray-400"}
                        >
                          {property.featured ? (
                            <Star className="h-5 w-5 fill-yellow-500" />
                          ) : (
                            <StarOff className="h-5 w-5" />
                          )}
                          <span className="sr-only">
                            {property.featured ? 'Remove from featured' : 'Add to featured'}
                          </span>
                        </Button>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/properties/${property.id}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">View</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/admin/properties/edit/${property.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50"
                            onClick={() => handleDeleteProperty(property.id)}
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
                <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery || categoryFilter !== 'All Properties' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Get started by creating your first property listing'}
                </p>
                {searchQuery || categoryFilter !== 'All Properties' ? (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery('');
                      setCategoryFilter('All Properties');
                    }}
                  >
                    Clear filters
                  </Button>
                ) : (
                  <Button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => navigate('/admin/properties/new')}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
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

export default PropertiesList;
