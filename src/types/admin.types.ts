
export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
  password_hash?: string;
}

export interface PropertyFormData {
  id?: string;
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
}

export interface PropertyImage {
  id?: string;
  property_id: string;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export interface PropertyFeature {
  id?: string;
  property_id: string;
  feature_name: string;
}

export interface PropertyService {
  id?: string;
  property_id: string;
  service_name: string;
}

export interface PropertyHighlight {
  id?: string;
  property_id: string;
  highlight_text: string;
}

export interface BlogPostFormData {
  id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  published: boolean;
  author?: string;
  published_at?: string;
}
