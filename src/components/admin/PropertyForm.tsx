import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseTable, insertInto, updateTable, deleteFrom } from "@/utils/supabase.utils";
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
    category: 'All Properties',
    description: '',
    featured: false,
    power_supply: '',
    style: '',
    video_url: '',
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
      const { data: imageData, error: imageError } = await supabaseTable('property_images')
        .select('*')
        .eq('property_id', propertyId);
      
      if (imageError) throw imageError;
      setImages(imageData || []);
      
      const { data: featureData, error: featureError } = await supabaseTable('property_features')
        .select('*')
        .eq('property_id', propertyId);
      
      if (featureError) throw featureError;
      setFeatures(featureData || []);
      
      const { data: serviceData, error: serviceError } = await supabaseTable('property_services')
        .select('*')
        .eq('property_id', propertyId);
      
      if (serviceError) throw serviceError;
      setServices(serviceData || []);
      
      const { data: highlightData, error: highlightError } = await supabaseTable('property_highlights')
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
        image_url: URL.createObjectURL(file),
        is_primary: images.length === 0 && index === 0,
        display_order: images.length + index,
        file,
        preview: URL.createObjectURL(file)
      };
    });
    
    setImages([...images, ...newImages]);
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    
    if (newImages[index].is_primary && newImages.length > 1) {
      const nextIndex = index === 0 ? 1 : 0;
      newImages[nextIndex].is_primary = true;
    }
    
    if (newImages[index].preview) {
      URL.revokeObjectURL(newImages[index].preview);
    }
    
    newImages.splice(index, 1);
    
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
    
    if (images.length === 0) {
      toast.error('Please upload at least one property image');
      return false;
    }
    
    if (!images.some(img => img.is_primary)) {
      toast.error('Please select a primary image');
      return false;
    }
    
    return true;
  };
  
  const uploadImage = async (file: File, property_id: string, index: number) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${property_id}/${fileName}`;
    
    const { error: uploadError } = await supabase.storage
      .from('property-images')
      .upload(filePath, file);
    
    if (uploadError) throw uploadError;
    
    const { data } = supabase.storage
      .from('property-images')
      .getPublicUrl(filePath);
    
    return data.publicUrl;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      let property_id = propertyId;
      
      if (propertyId) {
        const { error } = await updateTable('properties', formData)
          .eq('id', propertyId);
        
        if (error) throw error;
      } else {
        const { data, error } = await insertInto('properties', [formData])
          .select();
        
        if (error) throw error;
        if (data && data.length > 0) {
          property_id = data[0].id;
        }
      }
      
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        
        if (image.file) {
          try {
            const publicUrl = await uploadImage(image.file, property_id as string, i);
            
            const { error } = await insertInto('property_images', [{
              property_id,
              image_url: publicUrl,
              is_primary: image.is_primary,
              display_order: image.display_order
            }]);
            
            if (error) throw error;
          } catch (error) {
            console.error('Error uploading image:', error);
            // Continue with other images even if one fails
          }
        } else if (image.id) {
          const { error } = await updateTable('property_images', {
            is_primary: image.is_primary,
            display_order: image.display_order
          })
          .eq('id', image.id);
          
          if (error) throw error;
        }
      }
      
      if (propertyId) {
        const existingFeatureIds = features
          .filter(f => f.id)
          .map(f => f.id);
        
        const { error } = await deleteFrom('property_features')
          .eq('property_id', propertyId)
          .not('id', 'in', existingFeatureIds.length > 0 ? `(${existingFeatureIds.join(',')})` : '(0)');
        
        if (error) throw error;
      }
      
      for (const feature of features) {
        if (feature.id) {
          const { error } = await updateTable('property_features', { 
            feature_name: feature.feature_name 
          })
          .eq('id', feature.id);
          
          if (error) throw error;
        } else {
          const { error } = await insertInto('property_features', [{
            property_id,
            feature_name: feature.feature_name
          }]);
          
          if (error) throw error;
        }
      }
      
      if (propertyId) {
        const existingServiceIds = services
          .filter(s => s.id)
          .map(s => s.id);
        
        const { error } = await deleteFrom('property_services')
          .eq('property_id', propertyId)
          .not('id', 'in', existingServiceIds.length > 0 ? `(${existingServiceIds.join(',')})` : '(0)');
        
        if (error) throw error;
      }
      
      for (const service of services) {
        if (service.id) {
          const { error } = await updateTable('property_services', { 
            service_name: service.service_name 
          })
          .eq('id', service.id);
          
          if (error) throw error;
        } else {
          const { error } = await insertInto('property_services', [{
            property_id,
            service_name: service.service_name
          }]);
          
          if (error) throw error;
        }
      }
      
      if (propertyId) {
        const existingHighlightIds = highlights
          .filter(h => h.id)
          .map(h => h.id);
        
        const { error } = await deleteFrom('property_highlights')
          .eq('property_id', propertyId)
          .not('id', 'in', existingHighlightIds.length > 0 ? `(${existingHighlightIds.join(',')})` : '(0)');
        
        if (error) throw error;
      }
      
      for (const highlight of highlights) {
        if (highlight.id) {
          const { error } = await updateTable('property_highlights', {
            highlight_text: highlight.highlight_text
          })
          .eq('id', highlight.id);
          
          if (error) throw error;
        } else {
          const { error } = await insertInto('property_highlights', [{
            property_id,
            highlight_text: highlight.highlight_text
          }]);
          
          if (error) throw error;
        }
      }
      
      toast.success(`Property ${propertyId ? 'updated' : 'created'} successfully`);
      navigate('/admin/properties');
    } catch (error) {
      console.error('Error saving property:', error);
      toast.error(`Failed to ${propertyId ? 'update' : 'create'} property`);
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
              <Label htmlFor="title" className="text-base">Title <span className="text-red-500">*</span></Label>
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
              <Label htmlFor="subtitle" className="text-base">Subtitle</Label>
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
            <Label htmlFor="location" className="text-base">Location <span className="text-red-500">*</span></Label>
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
              <Label htmlFor="price" className="text-base">Price <span className="text-red-500">*</span></Label>
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
              <Label htmlFor="bedrooms" className="text-base">Bedrooms <span className="text-red-500">*</span></Label>
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
              <Label htmlFor="bathrooms" className="text-base">Bathrooms <span className="text-red-500">*</span></Label>
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
              <Label htmlFor="area" className="text-base">Area (sq ft)</Label>
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
              <Label htmlFor="type" className="text-base">Property Type</Label>
              <Input
                id="type"
                name="type"
                value={formData.type || ''}
                onChange={handleChange}
                placeholder="e.g. Apartment, Villa, House"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category" className="text-base">Category <span className="text-red-500">*</span></Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                required
              >
                <option value="" disabled>Select a category</option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="power_supply" className="text-base">Power Supply</Label>
              <Input
                id="power_supply"
                name="power_supply"
                value={formData.power_supply || ''}
                onChange={handleChange}
                placeholder="e.g. 24/7 Power Supply, Solar Backup"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="style" className="text-base">Style</Label>
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
            <Label htmlFor="video_url" className="text-base">Video URL</Label>
            <Input
              id="video_url"
              name="video_url"
              value={formData.video_url || ''}
              onChange={handleChange}
              placeholder="e.g. https://youtube.com/watch?v=..."
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base">Description</Label>
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
            <Label htmlFor="featured" className="text-base">Featured Property</Label>
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
                  </div>
                  <div className="p-2 bg-white border-t flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleSetPrimary(index)}
                        className={`p-1 rounded-md ${
                          image.is_primary ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'
                        }`}
                        title={image.is_primary ? 'Primary image' : 'Set as primary'}
                      >
                        <Star className={`h-5 w-5 ${image.is_primary ? 'fill-yellow-500' : ''}`} />
                      </button>
                      <span className="text-xs text-gray-500 font-medium">
                        {image.is_primary ? 'Primary' : `Image ${index + 1}`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <button
                        type="button"
                        className="p-1 text-gray-400 hover:text-gray-600 cursor-grab"
                        title="Drag to reorder"
                      >
                        <GripVertical className="h-5 w-5" />
                      </button>
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
