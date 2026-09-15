// src/lib/sermons.ts

import { supabase } from "@/lib/supabase/client";
import { Sermon } from "@/types/sermon.types";

export const getSermons = async (): Promise<Sermon[]> => {
  const { data, error } = await supabase
    .from("sermons")
    .select("*")
    .order("sermon_date", {
      ascending: false,
    });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
};