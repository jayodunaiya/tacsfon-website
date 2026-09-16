export interface GalleryImage {
  id: string;
  title: string | null;
  category: string;
  image_url: string;
  image_path: string;
  event_date: string | null;
  featured: boolean;
  created_at: string;
}