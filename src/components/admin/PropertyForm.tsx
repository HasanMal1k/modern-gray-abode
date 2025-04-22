import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, table } from "@/utils/supabase.utils";
import { 
  Building, 
  Save, 
  XCircle, 
  Upload, 
  Trash2, 
  Plus, 
  X,
  ImagePlus,
  Star,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CATEGORIES } from '@/types/property.types';
import { PropertyFormData } from '@/types/admin.types';
import { v4 as uuidv4 } from 'uuid';
import type { Tables } from '@/types/supabase';

interface PropertyFormProps {
  propertyId?: string;
  initialData?: PropertyFormData;
}

interface PropertyImage {
  id?: string;
  property_id?: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  file?: File;
  preview?: string;
}

interface Feature {
  id?: string;
  property_id?: string;
  feature_name: string;
  isNew?: boolean;
}

interface Service {
  id?: string;
  property_id?: string;
  service_name: string;
  isNew?: boolean;
}

interface Highlight {
  id?: string;
  property_id?: string;
  highlight_text: string;
  isNew?: boolean;
}

interface PropertyImage {
  id?: string;
  property_id?: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
  file?: File;
  preview?: string;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ propertyId, initialData }) => {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    subtitle: '',
    location: '',
    price: '',
    price_numeric: 0,
    bedrooms: 1,
    bathrooms: 1,
    area: undefined,
    type: '',
    category: 'Residential',
    description: '',
    featured: false,
    power_supply: '',
    style: '',
    video_url: '',
    maps_embed: '',
    ...initialData
  });
  
  const [images, setImages] = useState<PropertyImage[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(propertyId ? true : false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    if (propertyId) {
      fetchPropertyData();
    }
  }, [propertyId]);
  
  const fetchPropertyData = async () => {
    try {
      if (!propertyId) return;
      
      const { data: imageData, error: imageError } = await table('property_images')
        .select('*')
        .eq('property_id', propertyId)
        .order('display_order', { ascending: true });
      
      if (imageError) throw imageError;
      setImages(imageData || []);
      
      const { data: featureData, error: featureError } = await table('property_features')
        .select('*')
        .eq('property_id', propertyId);
      
      if (featureError) throw featureError;
      setFeatures(featureData || []);
      
      const { data: serviceData, error: serviceError } = await table('property_services')
        .select('*')
        .eq('property_id', propertyId);
      
      if (serviceError) throw serviceError;
      setServices(serviceData || []);
      
      const { data: highlightData, error: highlightError } = await table('property_highlights')
        .select('*')
        .eq('property_id', propertyId);
      
      if (highlightError) throw highlightError;
      setHighlights(highlightData || []);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching property data:', error);
      toast.error('Failed to load property data');
      setIsLoading(false);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'price') {
      // Extract only numeric values for price_numeric
      const numericValue = value.replace(/[^0-9]/g, '');
      setFormData({
        ...formData,
        [name]: value,
        price_numeric: numericValue ? parseInt(numericValue) : 0
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };
  
  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      featured: checked
    });
  };
  
  const handleNumericChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value === '' ? undefined : Number(value)
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newImages = Array.from(files).map((file, index) => {
      return {
        image_url: '', // This will be filled when uploaded
        is_primary: images.length === 0 && index === 0,
        display_order: images.length + index,
        file: file,
        preview: URL.createObjectURL(file)
      };
    });
    
    setImages([...images, ...newImages]);
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    
    // Check if the image has a preview URL to revoke it
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview!);
    }
    
    // If removing the primary image and there are other images
    if (newImages[index].is_primary && newImages.length > 1) {
      const nextIndex = index === 0 ? 1 : 0;
      newImages[nextIndex].is_primary = true;
    }
    
    newImages.splice(index, 1);
    
    // Reorder display order
    newImages.forEach((img, i) => {
      img.display_order = i;
    });
    
    setImages(newImages);
  };
  
  const handleSetPrimary = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      is_primary: i === index
    }));
    
    setImages(newImages);
  };
  
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  
  const handleDragEnter = (index: number) => {
    setHoveredIndex(index);
  };
  
  const handleDragEnd = () => {
    if (draggedIndex !== null && hoveredIndex !== null && draggedIndex !== hoveredIndex) {
      const newImages = [...images];
      const draggedItem = newImages[draggedIndex];
      
      newImages.splice(draggedIndex, 1);
      newImages.splice(hoveredIndex, 0, draggedItem);
      
      // Update display order
      newImages.forEach((img, i) => {
        img.display_order = i;
      });
      
      setImages(newImages);
    }
    
    setDraggedIndex(null);
    setHoveredIndex(null);
  };
  
  const addFeature = () => {
    setFeatures([...features, { feature_name: '', isNew: true }]);
  };
  
  const removeFeature = (index: number) => {
    const newFeatures = [...features];
    newFeatures.splice(index, 1);
    setFeatures(newFeatures);
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index].feature_name = value;
    setFeatures(newFeatures);
  };
  
  const addService = () => {
    setServices([...services, { service_name: '', isNew: true }]);
  };
  
  const removeService = (index: number) => {
    const newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };
  
  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...services];
    newServices[index].service_name = value;
    setServices(newServices);
  };
  
  const addHighlight = () => {
    setHighlights([...highlights, { highlight_text: '', isNew: true }]);
  };
  
  const removeHighlight = (index: number) => {
    const newHighlights = [...highlights];
    newHighlights.splice(index, 1);
    setHighlights(newHighlights);
  };
  
  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...highlights];
    newHighlights[index].highlight_text = value;
    setHighlights(newHighlights);
  };
  
  const validateForm = () => {
    if (!formData.title) {
      toast.error('Please enter a property title');
      return false;
    }
    
    if (!formData.location) {
      toast.error('Please enter a property location');
      return false;
    }
    
    if (!formData.price) {
      toast.error('Please enter a property price');
      return false;
    }
    
    if (formData.bedrooms < 1) {
      toast.error('Please enter a valid number of bedrooms');
      return false;
    }
    
    if (formData.bathrooms < 1) {
      toast.error('Please enter a valid number of bathrooms');
      return false;
    }
    
    if (!formData.category || formData.category === 'All Properties') {
      toast.error('Please select a property category');
      return false;
    }
    
    // Only require images for new properties
    if (!propertyId && images.length === 0) {
      toast.error('Please upload at least one property image');
      return false;
    }
    
    // Ensure at least one image is marked as primary if there are images
    if (images.length > 0 && !images.some(img => img.is_primary)) {
      toast.error('Please select a primary image');
      return false;
    }
    
    return true;
  };
  
  const uploadImage = async (file: File, property_id: string, index: number) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${uuidv4()}_${Date.now()}.${fileExt}`;
      const filePath = `${property_id}/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);
      
      if (uploadError) throw uploadError;
      
      const { data } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);
      
      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Make sure price_numeric is a number
      let updatedFormData = {
        ...formData,
        price_numeric: typeof formData.price_numeric === 'string' 
          ? parseInt(formData.price_numeric) 
          : formData.price_numeric
      };
      
      // Handle null/undefined values that should be empty strings
      ['subtitle', 'description', 'type', 'power_supply', 'style', 'video_url', 'maps_embed'].forEach(field => {
        if (updatedFormData[field] === null || updatedFormData[field] === undefined) {
          updatedFormData[field] = '';
        }
      });
      
      const now = new Date().toISOString();
      
      // Handle creating a new property
      if (!propertyId) {
        // Generate a reliable UUID
        const newPropertyId = uuidv4();
        
        // Step 1: Insert the property record first
        const { data: propertyData, error: propertyError } = await table('properties')
          .insert({
            ...updatedFormData,
            id: newPropertyId,
            created_at: now,
            updated_at: now
          })
          .select();
        
        if (propertyError) {
          console.error('Error creating property:', propertyError);
          toast.error(`Failed to create property: ${propertyError.message}`);
          setIsSubmitting(false);
          return;
        }
        
        // Inside your handleSubmit function, when dealing with files:
        // Step 2: Upload and save images
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          
          if (image.file) {
            try {
              // Upload image to storage
              const fileExt = image.file.name.split('.').pop();
              const fileName = `${uuidv4()}.${fileExt}`;
              const filePath = `${newPropertyId}/${fileName}`;
              
              const { error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(filePath, image.file);
              
              if (uploadError) {
                console.error('Error uploading image:', uploadError);
                continue; // Continue with other images if one fails
              }
              
              // Get public URL
              const { data: urlData } = supabase.storage
                .from('property-images')
                .getPublicUrl(filePath);
              
              // Save image record
              await table('property_images').insert({
                property_id: newPropertyId,
                image_url: urlData.publicUrl,
                is_primary: image.is_primary,
                display_order: image.display_order
              });
            } catch (imageError) {
              console.error('Error processing image:', imageError);
              // Continue with other images
            }
          } else if (image.id) {
            // This is an existing image that wasn't changed
            await table('property_images')
              .update({
                is_primary: image.is_primary,
                display_order: image.display_order
              })
              .eq('id', image.id);
          }
        }

        // If we got here, we successfully created the property
        const createdProperty = propertyData?.[0];
        if (!createdProperty) {
          throw new Error('Property was created but no data was returned');
        }
        
        // Step 2: Upload and save images
        for (let i = 0; i < images.length; i++) {
          const image = images[i];
          
          if (image.file) {
            try {
              // Upload image to storage
              const fileExt = image.file.name.split('.').pop();
              const fileName = `${uuidv4()}.${fileExt}`;
              const filePath = `${newPropertyId}/${fileName}`;
              
              const { error: uploadError } = await supabase.storage
                .from('property-images')
                .upload(filePath, image.file);
              
              if (uploadError) {
                console.error('Error uploading image:', uploadError);
                continue; // Continue with other images if one fails
              }
              
              // Get public URL
              const { data: urlData } = supabase.storage
                .from('property-images')
                .getPublicUrl(filePath);
              
              // Save image record
              await table('property_images').insert({
                property_id: newPropertyId,
                image_url: urlData.publicUrl,
                is_primary: image.is_primary,
                display_order: image.display_order
              });
            } catch (imageError) {
              console.error('Error processing image:', imageError);
              // Continue with other images
            }
          }
        }
        
        // Step 3: Save features
        for (const feature of features) {
          if (feature.feature_name.trim() === '') continue;
          
          try {
            await table('property_features').insert({
              property_id: newPropertyId,
              feature_name: feature.feature_name
            });
          } catch (featureError) {
            console.error('Error saving feature:', featureError);
            // Continue with other features
          }
        }
        
        // Step 4: Save services
        for (const service of services) {
          if (service.service_name.trim() === '') continue;
          
          try {
            await table('property_services').insert({
              property_id: newPropertyId,
              service_name: service.service_name
            });
          } catch (serviceError) {
            console.error('Error saving service:', serviceError);
            // Continue with other services
          }
        }
        
        // Step 5: Save highlights
        for (const highlight of highlights) {
          if (highlight.highlight_text.trim() === '') continue;
          
          try {
            await table('property_highlights').insert({
              property_id: newPropertyId,
              highlight_text: highlight.highlight_text
            });
          } catch (highlightError) {
            console.error('Error saving highlight:', highlightError);
            // Continue with other highlights
          }
        }
        
        toast.success('Property created successfully');
        navigate('/admin/properties');
      } 
      // Handle updating an existing property
      else {
        // Step 1: Update the property record
        const { error: updateError } = await table('properties')
          .update({
            ...updatedFormData,
            updated_at: now
          })
          .eq('id', propertyId);
        
        if (updateError) {
          console.error('Error updating property:', updateError);
          toast.error(`Failed to update property: ${updateError.message}`);
          setIsSubmitting(false);
          return;
        }
        
        // Step 2: Handle existing images
        const existingImageIds = images
          .filter(img => img.id)
          .map(img => img.id);
        
        try {
          // Delete images that have been removed
          if (existingImageIds.length > 0) {
            await table('property_images')
              .delete()
              .eq('property_id', propertyId)
              .not('id', 'in', `(${existingImageIds.join(',')})`);
          } else {
            // If all images have been removed or replaced
            await table('property_images')
              .delete()
              .eq('property_id', propertyId);
          }
          
          // Update existing images
          for (const image of images.filter(img => img.id)) {
            await table('property_images')
              .update({
                is_primary: image.is_primary,
                display_order: image.display_order
              })
              .eq('id', image.id);
          }
        } catch (imageError) {
          console.error('Error handling existing images:', imageError);
        }
        
        // Step 3: Upload and save new images
        for (const image of images.filter(img => img.file)) {
          try {
            // Upload image to storage
            const fileExt = image.file.name.split('.').pop();
            const fileName = `${uuidv4()}.${fileExt}`;
            const filePath = `${propertyId}/${fileName}`;
            
            const { error: uploadError } = await supabase.storage
              .from('property-images')
              .upload(filePath, image.file);
            
            if (uploadError) {
              console.error('Error uploading new image:', uploadError);
              continue;
            }
            
            // Get public URL
            const { data: urlData } = supabase.storage
              .from('property-images')
              .getPublicUrl(filePath);
            
            // Save image record
            await table('property_images').insert({
              property_id: propertyId,
              image_url: urlData.publicUrl,
              is_primary: image.is_primary,
              display_order: image.display_order
            });
          } catch (newImageError) {
            console.error('Error processing new image:', newImageError);
          }
        }
        
        // Step 4: Handle features
        try {
          // Get existing feature IDs
          const existingFeatureIds = features
            .filter(f => f.id)
            .map(f => f.id);
          
          // Delete features that have been removed
          if (existingFeatureIds.length > 0) {
            await table('property_features')
              .delete()
              .eq('property_id', propertyId)
              .not('id', 'in', `(${existingFeatureIds.join(',')})`);
          } else {
            await table('property_features')
              .delete()
              .eq('property_id', propertyId);
          }
          
          // Update existing features
          for (const feature of features.filter(f => f.id)) {
            if (feature.feature_name.trim() === '') continue;
            
            await table('property_features')
              .update({ feature_name: feature.feature_name })
              .eq('id', feature.id);
          }
          
          // Add new features
          for (const feature of features.filter(f => !f.id)) {
            if (feature.feature_name.trim() === '') continue;
            
            await table('property_features').insert({
              property_id: propertyId,
              feature_name: feature.feature_name
            });
          }
        } catch (featureError) {
          console.error('Error handling features:', featureError);
        }
        
        // Step 5: Handle services
        try {
          // Get existing service IDs
          const existingServiceIds = services
            .filter(s => s.id)
            .map(s => s.id);
          
          // Delete services that have been removed
          if (existingServiceIds.length > 0) {
            await table('property_services')
              .delete()
              .eq('property_id', propertyId)
              .not('id', 'in', `(${existingServiceIds.join(',')})`);
          } else {
            await table('property_services')
              .delete()
              .eq('property_id', propertyId);
          }
          
          // Update existing services
          for (const service of services.filter(s => s.id)) {
            if (service.service_name.trim() === '') continue;
            
            await table('property_services')
              .update({ service_name: service.service_name })
              .eq('id', service.id);
          }
          
          // Add new services
          for (const service of services.filter(s => !s.id)) {
            if (service.service_name.trim() === '') continue;
            
            await table('property_services').insert({
              property_id: propertyId,
              service_name: service.service_name
            });
          }
        } catch (serviceError) {
          console.error('Error handling services:', serviceError);
        }
        
        // Step 6: Handle highlights
        try {
          // Get existing highlight IDs
          const existingHighlightIds = highlights
            .filter(h => h.id)
            .map(h => h.id);
          
          // Delete highlights that have been removed
          if (existingHighlightIds.length > 0) {
            await table('property_highlights')
              .delete()
              .eq('property_id', propertyId)
              .not('id', 'in', `(${existingHighlightIds.join(',')})`);
          } else {
            await table('property_highlights')
              .delete()
              .eq('property_id', propertyId);
          }
          
          // Update existing highlights
          for (const highlight of highlights.filter(h => h.id)) {
            if (highlight.highlight_text.trim() === '') continue;
            
            await table('property_highlights')
              .update({ highlight_text: highlight.highlight_text })
              .eq('id', highlight.id);
          }
          
          // Add new highlights
          for (const highlight of highlights.filter(h => !h.id)) {
            if (highlight.highlight_text.trim() === '') continue;
            
            await table('property_highlights').insert({
              property_id: propertyId,
              highlight_text: highlight.highlight_text
            });
          }
        } catch (highlightError) {
          console.error('Error handling highlights:', highlightError);
        }
        
        toast.success('Property updated successfully');
        navigate('/admin/properties');
      }
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error(`Failed to ${propertyId ? 'update' : 'create'} property: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Property Information</h2>
          <p className="text-gray-500 text-sm mt-1">Basic information about the property</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base text-black">Title <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Luxury 3 Bedroom Apartment"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle" className="text-base text-black">Subtitle</Label>
              <Input
                id="subtitle"
                name="subtitle"
                value={formData.subtitle || ''}
                onChange={handleChange}
                placeholder="e.g. With Ocean View"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location" className="text-base text-black">Location <span className="text-red-500">*</span></Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Victoria Island, Lagos"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-base text-black">Price <span className="text-red-500">*</span></Label>
              <Input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. ₦120,000,000"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bedrooms" className="text-base text-black">Bedrooms <span className="text-red-500">*</span></Label>
              <Input
                id="bedrooms"
                name="bedrooms"
                type="number"
                min={0}
                value={formData.bedrooms}
                onChange={handleNumericChange}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bathrooms" className="text-base text-black">Bathrooms <span className="text-red-500">*</span></Label>
              <Input
                id="bathrooms"
                name="bathrooms"
                type="number"
                min={0}
                step={0.5}
                value={formData.bathrooms}
                onChange={handleNumericChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="area" className="text-base text-black">Area (sq ft)</Label>
              <Input
                id="area"
                name="area"
                type="number"
                min={0}
                value={formData.area || ''}
                onChange={handleNumericChange}
                placeholder="e.g. 1500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="type" className="text-base text-black">Property Type</Label>
              <Input
                id="type"
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                placeholder="e.g. Apartment, Villa, House"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base text-black">Category <span className="text-red-500">*</span></Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.filter(cat => cat !== 'All Properties').map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="power_supply" className="text-base text-black">Power Supply</Label>
              <Input
                id="power_supply"
                name="power_supply"
                value={formData.power_supply || ''}
                onChange={handleChange}
                placeholder="e.g. 24/7 Power Supply, Solar Backup"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="style" className="text-base text-black">Style</Label>
              <Input
                id="style"
                name="style"
                value={formData.style || ''}
                onChange={handleChange}
                placeholder="e.g. Modern, Contemporary, Traditional"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="video_url" className="text-base text-black">Video URL</Label>
            <Input
              id="video_url"
              name="video_url"
              value={formData.video_url || ''}
              onChange={handleChange}
              placeholder="e.g. https://youtube.com/watch?v=..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="maps_embed" className="text-base text-black">Google Maps Embed Code</Label>
            <Textarea
              id="maps_embed"
              name="maps_embed"
              value={formData.maps_embed || ''}
              onChange={handleChange}
              placeholder='Paste the Google Maps embed code here (e.g. <iframe src="https://www.google.com/maps/embed?..." ...></iframe>)'
              rows={4}
            />
            <p className="text-sm text-muted-foreground">
              Go to Google Maps, click "Share", select "Embed a map" and copy the iframe code
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base text-black">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              placeholder="Detailed description of the property..."
              rows={6}
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured}
              onCheckedChange={handleSwitchChange}
            />
            <Label htmlFor="featured" className="text-base text-black">Featured Property</Label>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Property Images</h2>
          <p className="text-gray-500 text-sm mt-1">Upload images of the property (drag to reorder)</p>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <Label htmlFor="image-upload" className="block">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-orange-500 transition cursor-pointer">
                <ImagePlus className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-1">Drag and drop images or click to browse</p>
                <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10MB</p>
              </div>
            </Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          
          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {images.map((image, index) => (
  <div
    key={index}
    className={`border rounded-lg overflow-hidden relative ${
      draggedIndex === index ? 'opacity-50' : ''
    } ${
      hoveredIndex === index && draggedIndex !== null ? 'border-orange-500' : ''
    }`}
    draggable
    onDragStart={() => handleDragStart(index)}
    onDragEnter={() => handleDragEnter(index)}
    onDragOver={(e) => e.preventDefault()}
    onDragEnd={handleDragEnd}
  >
    <div className="relative pt-[70%]">
      <img
        src={image.preview || image.image_url}
        alt={`Property image ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
      />
      {image.is_primary && (
        <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded-md text-xs flex items-center">
          <Star className="h-3 w-3 mr-1" />
          Primary
        </div>
      )}
    </div>
    <div className="p-2 bg-white border-t flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={() => handleSetPrimary(index)}
          className={`p-1 rounded-full ${image.is_primary ? 'text-orange-500' : 'text-gray-400 hover:text-orange-500'}`}
          title={image.is_primary ? 'Primary image' : 'Set as primary'}
          disabled={image.is_primary}
        >
          <Star className="h-5 w-5" />
        </button>
        <div className="flex items-center text-xs text-gray-500 p-1">
          <GripVertical className="h-4 w-4 mr-1" />
          {image.display_order + 1}
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleRemoveImage(index)}
        className="p-1 text-gray-400 hover:text-red-500"
        title="Remove image"
      >
        <Trash2 className="h-5 w-5" />
      </button>
    </div>
  </div>
))}
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Property Features</h2>
          <p className="text-gray-500 text-sm mt-1">Add key features of the property</p>
        </div>
        
        <div className="p-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={feature.feature_name}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                placeholder="e.g. Swimming Pool, Garden, Security"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeFeature(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addFeature}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Property Services</h2>
          <p className="text-gray-500 text-sm mt-1">Add services provided with the property</p>
        </div>
        
        <div className="p-6">
          {services.map((service, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={service.service_name}
                onChange={(e) => handleServiceChange(index, e.target.value)}
                placeholder="e.g. Cleaning, Laundry, Concierge"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeService(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addService}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Property Highlights</h2>
          <p className="text-gray-500 text-sm mt-1">Add key selling points of the property</p>
        </div>
        
        <div className="p-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <Input
                value={highlight.highlight_text}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                placeholder="e.g. Beautiful ocean view, Recently renovated"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeHighlight(index)}
                className="text-red-500 hover:text-red-700 hover:bg-red-50"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addHighlight}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Highlight
          </Button>
        </div>
      </div>
      
      <div className="flex items-center justify-end space-x-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/admin/properties')}
          disabled={isSubmitting}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {propertyId ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              {propertyId ? 'Update Property' : 'Create Property'}
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default PropertyForm;
                