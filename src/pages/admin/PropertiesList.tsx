import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabaseTable, assertType } from "@/utils/supabase.utils";
import { 
  Building, 
  Plus, 
  Search, 
  Pencil, 
  Trash2, 
  Filter, 
  X, 
  Check, 
  Star, 
  StarOff,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CATEGORIES } from '@/types/property.types';

interface Property {
  id: string;
  title: string;
  subtitle?: string;
  location: string;
  price: string;
  price_numeric: number;
  bedrooms: number;
  bathrooms: number;
  area?: number;
  type?: string;
  category: string;
  description?: string;
  featured: boolean;
  power_supply?: string;
  style?: string;
  video_url?: string;
  created_at: string;
  updated_at: string;
}

const PropertiesList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Properties');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchQuery, selectedCategory]);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabaseTable('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (searchQuery) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All Properties') {
      filtered = filtered.filter(property => property.category === selectedCategory);
    }

    setFilteredProperties(filtered);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleDeleteProperty = async (propertyId: string) => {
    if (!window.confirm('Are you sure you want to delete this property?')) {
      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabaseTable('properties')
        .delete()
        .eq('id', propertyId);

      if (error) throw error;

      setProperties(properties.filter(property => property.id !== propertyId));
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeaturedProperty = async (property: Property) => {
    try {
      setIsLoading(true);
      const { error } = await supabaseTable('properties')
        .update({ featured: !property.featured })
        .eq('id', property.id);

      if (error) throw error;

      setProperties(properties.map(p =>
        p.id === property.id ? { ...p, featured: !p.featured } : p
      ));
      toast.success(`Property ${property.featured ? 'unfeatured' : 'featured'} successfully`);
    } catch (error) {
      console.error('Error toggling featured property:', error);
      toast.error('Failed to update featured status');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full p-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-500">Loading properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-orange-500" />
            <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          </div>
          <Button onClick={() => navigate('/admin/properties/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Property
          </Button>
        </div>
        <p className="text-gray-600 mt-1">Manage your property listings</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center w-full md:w-auto">
          <Input
            type="search"
            placeholder="Search properties..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="md:w-80"
          />
          <Search className="h-5 w-5 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Category
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleCategoryChange('All Properties')}>
                All Properties
              </DropdownMenuItem>
              {CATEGORIES.map((category) => (
                <DropdownMenuItem key={category} onClick={() => handleCategoryChange(category)}>
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-md shadow-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Featured
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProperties.map((property) => (
              <tr key={property.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {property.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.location}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {property.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    onClick={() => toggleFeaturedProperty(property)}
                    className="flex items-center"
                  >
                    {property.featured ? (
                      <>
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        Featured
                      </>
                    ) : (
                      <>
                        <StarOff className="h-4 w-4 text-gray-400 mr-1" />
                        Not Featured
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Link to={`/properties/${property.id}`} className="text-orange-500 hover:text-orange-700">
                      <Eye className="h-4 w-4" />
                    </Link>
                    <Link to={`/admin/properties/edit/${property.id}`} className="text-blue-500 hover:text-blue-700">
                      <Pencil className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteProperty(property.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredProperties.length === 0 && (
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">No properties found.</p>
        </div>
      )}
    </div>
  );
};

export default PropertiesList;
