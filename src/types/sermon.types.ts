export interface Sermon {
  id: string;
  title: string;
  category: string;
  sermon_date: string;

  audio_url: string;
  audio_path: string | null;

  image_url: string | null;

  featured: boolean;
  created_at: string;
}