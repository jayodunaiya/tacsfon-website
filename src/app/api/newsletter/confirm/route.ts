import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceRoleKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceRoleKey,
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
        `${siteUrl}/newsletter?status=invalid`
      );
    }

    const { data: subscriber, error: lookupError } =
      await supabaseAdmin
        .from("newsletter_subscribers")
        .select("id, status")
        .eq("confirmation_token", token)
        .maybeSingle();

    if (lookupError) {
      console.error(
        "Newsletter confirmation lookup failed:",
        lookupError
      );

      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=error`
      );
    }

    if (!subscriber) {
      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=invalid`
      );
    }

    if (subscriber.status === "active") {
      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=already-confirmed`
      );
    }

    if (subscriber.status !== "pending") {
      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=invalid`
      );
    }

    const { error: updateError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .update({
        status: "active",
        confirmed_at: new Date().toISOString(),
      })
      .eq("id", subscriber.id);

    if (updateError) {
      console.error(
        "Newsletter confirmation update failed:",
        updateError
      );

      return NextResponse.redirect(
        `${siteUrl}/newsletter?status=error`
      );
    }

    return NextResponse.redirect(
      `${siteUrl}/newsletter?status=confirmed`
    );
  } catch (error) {
    console.error(
      "Newsletter confirmation error:",
      error
    );

    return NextResponse.redirect(
      `${siteUrl}/newsletter?status=error`
    );
  }
}