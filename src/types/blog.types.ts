
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  published: boolean;
  author: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}
