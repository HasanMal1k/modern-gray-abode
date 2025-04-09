
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from "@/integrations/supabase/client";
import { Building } from 'lucide-react';
import PropertyForm from '@/components/admin/PropertyForm';
import { PropertyFormData } from '@/types/admin.types';
import { toast } from 'sonner';

const EditProperty = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyFormData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('properties')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        if (!data) throw new Error('Property not found');

        setProperty(data as PropertyFormData);
      } catch (err: any) {
        console.error('Error fetching property:', err);
        setError(err.message);
        toast.error('Failed to load property');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-full p-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mb-4"></div>
          <p className="text-gray-500">Loading property...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="flex items-center justify-center min-h-full p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Property Not Found</h2>
          <p className="text-gray-500 mb-6">{error || 'The property you are looking for does not exist or has been removed.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <Building className="h-6 w-6 text-orange-500" />
          <h1 className="text-2xl font-bold text-gray-900">Edit Property</h1>
        </div>
        <p className="text-gray-600 mt-1">Update property: {property.title}</p>
      </div>
      
      <PropertyForm propertyId={id} initialData={property} />
    </div>
  );
};

export default EditProperty;
