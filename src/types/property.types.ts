
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
  created_at: string;
  updated_at: string;
}
