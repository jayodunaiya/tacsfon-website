import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function GET(request: Request) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=unsubscribe-invalid`
      );
    }

    const { data: subscriber, error: lookupError } =
      await supabaseAdmin
        .from("newsletter_subscribers")
        .select("id, status")
        .eq("unsubscribe_token", token)
        .maybeSingle();

    if (lookupError || !subscriber) {
      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=unsubscribe-invalid`
      );
    }

    if (subscriber.status === "unsubscribed") {
      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=already-unsubscribed`
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({
        status: "unsubscribed",
        unsubscribed_at: new Date().toISOString(),
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error(
        "Newsletter unsubscribe error:",
        updateError
      );

      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=error`
      );
    }

    return NextResponse.redirect(
      `${siteUrl}/newsletter?status=unsubscribed`
    );
  } catch (error) {
    console.error("Newsletter unsubscribe error:", error);

    return NextResponse.redirect(
      `${siteUrl}/newsletter?status=error`
    );
  }
}