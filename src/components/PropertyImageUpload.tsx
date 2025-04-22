import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { uploadPropertyImage } from '@/utils/image-upload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface PropertyImageUploadProps {
  propertyId?: string;
  onImagesUploaded?: (imageUrls: string[]) => void;
  maxImages?: number;
}

const PropertyImageUpload: React.FC<PropertyImageUploadProps> = ({
  propertyId,
  onImagesUploaded,
  maxImages = 5
}) => {
  const [images, setImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    // Check if we've reached max image limit
    if (images.length + files.length > maxImages) {
      toast.error(`You can upload a maximum of ${maxImages} images`);
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < files.length; i++) {
        const imageUrl = await uploadPropertyImage(supabase, files[i], propertyId);
        if (imageUrl) {
          uploadedUrls.push(imageUrl);
        }
      }

      // Update local state
      const newImageUrls = [...images, ...uploadedUrls];
      setImages(newImageUrls);

      // Call callback if provided
      if (onImagesUploaded) {
        onImagesUploaded(newImageUrls);
      }

      if (uploadedUrls.length > 0) {
        toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
      }
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload images');
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (urlToRemove: string) => {
    const updatedImages = images.filter(url => url !== urlToRemove);
    setImages(updatedImages);

    if (onImagesUploaded) {
      onImagesUploaded(updatedImages);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/svg+xml"
          multiple
          onChange={handleImageUpload}
          disabled={isUploading || images.length >= maxImages}
        />
        {isUploading && (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-blue-500"></div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img 
                src={imageUrl} 
                alt={`Property image ${index + 1}`} 
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => removeImage(imageUrl)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm text-gray-500">
        Maximum {maxImages} images. Accepted formats: JPG, PNG, WebP, SVG
      </p>
    </div>
  );
};

export default PropertyImageUpload;