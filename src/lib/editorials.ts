import { supabase } from "@/lib/supabase/client";
import { Editorial } from "@/types/editorial.types";

export const getEditorials = async (): Promise<Editorial[]> => {
  const { data, error } = await supabase
    .from("editorials")
    .select("*")
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Unable to fetch editorials:", error);
    return [];
  }

  return data ?? [];
};

export const getEditorialBySlug = async (
  slug: string
): Promise<Editorial | null> => {
  const { data, error } = await supabase
    .from("editorials")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Unable to fetch editorial:", error);
    return null;
  }

  return data;
};