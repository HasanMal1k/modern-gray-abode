
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { 
  Building, 
  PlusCircle, 
  Search, 
  SlidersHorizontal, 
  Edit, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  MapPin,
  Eye,
  Star,
  StarOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { CATEGORIES } from '@/types/property.types';

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  category: string;
  bedrooms: number;
  bathrooms: number;
  featured: boolean;
}

const PropertiesList = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    // Apply filters
    let result = properties;
    
    // Search filter
    if (searchTerm) {
      result = result.filter(property => 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Category filter
    if (categoryFilter !== 'All Categories') {
      result = result.filter(property => property.category === categoryFilter);
    }
    
    setFilteredProperties(result);
    setTotalPages(Math.ceil(result.length / itemsPerPage));
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, categoryFilter, properties]);

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setProperties(data || []);
      setFilteredProperties(data || []);
      setTotalPages(Math.ceil((data?.length || 0) / itemsPerPage));
    } catch (error) {
      console.error('Error fetching properties:', error);
      toast.error('Failed to load properties');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFeatured = async (id: string, featured: boolean) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ featured: !featured })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setProperties(properties.map(property => 
        property.id === id ? { ...property, featured: !featured } : property
      ));
      
      toast.success(`Property ${featured ? 'removed from' : 'marked as'} featured`);
    } catch (error) {
      console.error('Error updating property:', error);
      toast.error('Failed to update property');
    }
  };

  const confirmDelete = (id: string) => {
    setPropertyToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!propertyToDelete) return;
    
    setIsDeleting(true);
    try {
      // Delete property images first
      const { error: imagesError } = await supabase
        .from('property_images')
        .delete()
        .eq('property_id', propertyToDelete);
      
      if (imagesError) throw imagesError;
      
      // Delete property features
      const { error: featuresError } = await supabase
        .from('property_features')
        .delete()
        .eq('property_id', propertyToDelete);
      
      if (featuresError) throw featuresError;
      
      // Delete property services
      const { error: servicesError } = await supabase
        .from('property_services')
        .delete()
        .eq('property_id', propertyToDelete);
      
      if (servicesError) throw servicesError;
      
      // Delete property highlights
      const { error: highlightsError } = await supabase
        .from('property_highlights')
        .delete()
        .eq('property_id', propertyToDelete);
      
      if (highlightsError) throw highlightsError;
      
      // Finally delete the property
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', propertyToDelete);
      
      if (error) throw error;
      
      // Update local state
      setProperties(properties.filter(property => property.id !== propertyToDelete));
      toast.success('Property deleted successfully');
    } catch (error) {
      console.error('Error deleting property:', error);
      toast.error('Failed to delete property');
    } finally {
      setIsDeleting(false);
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  // Pagination
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-1">Manage your property listings</p>
        </div>
        <Link to="/admin/properties/add">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Property
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <SlidersHorizontal className="mr-2 text-gray-400" size={18} />
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All Categories">All Categories</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setCategoryFilter('All Categories');
                }}
              >
                Reset Filters
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-orange-500 mb-4"></div>
              <p className="text-gray-500">Loading properties...</p>
            </div>
          ) : paginatedProperties.length === 0 ? (
            <div className="p-8 text-center">
              <Building className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No properties found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || categoryFilter !== 'All Categories'
                  ? 'Try adjusting your filters'
                  : 'Add your first property to get started'}
              </p>
              {searchTerm || categoryFilter !== 'All Categories' ? (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('All Categories');
                  }}
                >
                  Reset Filters
                </Button>
              ) : (
                <Link to="/admin/properties/add">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Property
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Property</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Beds</TableHead>
                  <TableHead>Baths</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedProperties.map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{property.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {property.location}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{property.category}</TableCell>
                    <TableCell>{property.bedrooms}</TableCell>
                    <TableCell>{property.bathrooms}</TableCell>
                    <TableCell>{property.price}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={property.featured ? "text-yellow-500" : "text-gray-400"}
                        onClick={() => toggleFeatured(property.id, property.featured)}
                      >
                        {property.featured ? (
                          <Star className="h-5 w-5 fill-yellow-500" />
                        ) : (
                          <StarOff className="h-5 w-5" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        <Link 
                          to={`/properties/${property.id}`} 
                          target="_blank"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link to={`/admin/properties/edit/${property.id}`}>
                          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-red-600 hover:text-red-800"
                          onClick={() => confirmDelete(property.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Pagination */}
        {filteredProperties.length > 0 && (
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProperties.length)} of {filteredProperties.length} properties
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
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
              onClick={handleDelete}
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

export default PropertiesList;
