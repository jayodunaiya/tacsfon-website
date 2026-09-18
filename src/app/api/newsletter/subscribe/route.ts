import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendConfirmationEmail } from "@/lib/newsletter-email";

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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email || !emailPattern.test(email)) {
      return NextResponse.json(
        {
          message: "Enter a valid email address.",
        },
        { status: 400 }
      );
    }

    /*
     * Check whether this email already exists.
     * Service-role access is intentional here because public
     * visitors must never receive SELECT permission on the table.
     */
    const { data: existingSubscriber, error: lookupError } =
      await supabaseAdmin
        .from("newsletter_subscribers")
        .select("id, status")
        .eq("email", email)
        .maybeSingle();

    if (lookupError) {
      console.error(
        "Newsletter subscriber lookup failed:",
        lookupError
      );

      return NextResponse.json(
        {
          message:
            "We couldn't process your subscription right now.",
        },
        { status: 500 }
      );
    }

    /*
     * Already subscribed.
     *
     * We intentionally return a generic success response rather
     * than revealing whether an email exists in our database.
     */
    if (existingSubscriber?.status === "active") {
      return NextResponse.json({
        success: true,
        message:
          "Check your inbox for the next fellowship update.",
      });
    }

    /*
     * Existing pending subscriber:
     * generate a fresh confirmation token.
     */
    if (existingSubscriber?.status === "pending") {
      const confirmationToken = crypto.randomUUID();

      const { error: updateError } = await supabaseAdmin
        .from("newsletter_subscribers")
        .update({
          confirmation_token: confirmationToken,
        })
        .eq("id", existingSubscriber.id);

      if (updateError) {
        console.error(
          "Unable to refresh newsletter subscription:",
          updateError
        );

        return NextResponse.json(
          {
            message:
              "We couldn't process your subscription right now.",
          },
          { status: 500 }
        );
      }

      await sendConfirmationEmail({
  email,
  confirmationToken,
});

      return NextResponse.json({
        success: true,
        message:
          "Check your inbox to confirm your subscription.",
      });
    }

    /*
     * Previously unsubscribed.
     *
     * Move them back to pending and require confirmation again.
     */
    if (existingSubscriber?.status === "unsubscribed") {
      const confirmationToken = crypto.randomUUID();
      const unsubscribeToken = crypto.randomUUID();

      const { error: updateError } = await supabaseAdmin
        .from("newsletter_subscribers")
        .update({
          status: "pending",
          confirmation_token: confirmationToken,
          unsubscribe_token: unsubscribeToken,
          confirmed_at: null,
          unsubscribed_at: null,
        })
        .eq("id", existingSubscriber.id);

      if (updateError) {
        console.error(
          "Unable to resubscribe newsletter member:",
          updateError
        );

        return NextResponse.json(
          {
            message:
              "We couldn't process your subscription right now.",
          },
          { status: 500 }
        );
      }

      await sendConfirmationEmail({
  email,
  confirmationToken,
});

      return NextResponse.json({
        success: true,
        message:
          "Check your inbox to confirm your subscription.",
      });
    }

    /*
     * Completely new subscriber.
     */
    const confirmationToken = crypto.randomUUID();
    const unsubscribeToken = crypto.randomUUID();

    const { error: insertError } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert([
        {
          email,
          status: "pending",
          confirmation_token: confirmationToken,
          unsubscribe_token: unsubscribeToken,
        },
      ]);

    if (insertError) {
      console.error(
        "Unable to create newsletter subscriber:",
        insertError
      );

      return NextResponse.json(
        {
          message:
            "We couldn't process your subscription right now.",
        },
        { status: 500 }
      );
    }

    await sendConfirmationEmail({
  email,
  confirmationToken,
});

    return NextResponse.json({
      success: true,
      message:
        "Check your inbox to confirm your subscription.",
    });
  } catch (error) {
    console.error("Newsletter API error:", error);

    return NextResponse.json(
      {
        message:
          "Something went wrong. Please try again.",
      },
      { status: 500 }
    );
  }
}