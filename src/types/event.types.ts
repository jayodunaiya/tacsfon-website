export interface Event {
  id: string;

  title: string;
  category: string;

  event_date: string;
  start_time: string | null;

  location: string;
  description: string | null;

  image_url: string | null;
  image_path: string | null;

  registration_url: string | null;

  featured: boolean;

  created_at: string;
}