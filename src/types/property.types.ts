
export const CATEGORIES = [
  'All Properties',
  'Residential',
  'Commercial',
  'Industrial',
  'Land',
  'Investment'
];

export interface Property {
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
  panorama?: string;
  created_at: string;
  updated_at: string;
  image?: string;
  images?: string[];
  maps_embed?: string;
  property_images?: { image_url: string; is_primary: boolean; display_order: number }[];
}

export interface GrayListedPropertyType {
  id: string | number;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  priceNumeric: number;
  powerSupply?: string;
  style?: string;
  highlights?: string[];
  rating?: number;
  bedrooms: number;
  bathrooms: number;
  services?: string[];
  images: string[];
  video?: string;
  panorama?: string;
  category: string;
  description?: string;
}
