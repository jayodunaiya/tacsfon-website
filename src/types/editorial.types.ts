export interface Editorial {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string | null;
  content: string;
  image_url: string | null;
  image_path: string | null;
  published_at: string;
  featured: boolean;
  created_at: string;
}