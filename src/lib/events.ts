import { supabase } from "@/lib/supabase/client";
import { Event } from "@/types/event.types";

export const getEvents = async (): Promise<Event[]> => {
  const { data, error } = await supabase
    .from("events")
    .select("*")
    .order("event_date", {
      ascending: true,
    });

  if (error) {
    console.error("Unable to fetch events:", error);
    return [];
  }

  return data ?? [];
};