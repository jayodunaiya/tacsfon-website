import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function GET() {
  const { data, error } = await supabase
    .from("sermons")
    .select("*")
    .order("sermon_date", { ascending: false });

  if (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch sermons" },
      { status: 500 }
    );
  }

  return NextResponse.json(data);
}