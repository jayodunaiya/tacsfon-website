import { supabase } from "@/lib/supabase/client";
import { GalleryImage } from "@/types/gallery.types";

export const getGalleryImages = async (): Promise<GalleryImage[]> => {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Unable to fetch gallery images:", error);
    return [];
  }

  return data ?? [];
};