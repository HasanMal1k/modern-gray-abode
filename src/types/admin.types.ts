
import { Tables } from "./supabase";

export interface PropertyFormData extends Omit<Tables<'properties'>, 'created_at' | 'updated_at'> {
  created_at?: string;
  updated_at?: string;
  images?: string[];
  maps_embed?: string;
}

export interface AdminUserData {
  id?: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface BlogPostFormData extends Omit<Tables<'blog_posts'>, 'created_at' | 'updated_at' | 'published_at'> {
  created_at?: string;
  updated_at?: string;
  published_at?: string | null;
}
