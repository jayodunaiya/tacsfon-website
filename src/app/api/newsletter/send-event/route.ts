import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

const resend = new Resend(process.env.RESEND_API_KEY);

const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-NG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));

const formatTime = (time: string | null) => {
  if (!time) return "";

  const [hours, minutes] = time.split(":");

  const date = new Date();
  date.setHours(Number(hours), Number(minutes));

  return new Intl.DateTimeFormat("en-NG", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
};

export async function POST(request: Request) {
  try {
    /*
     * Verify the logged-in Supabase user first.
     */
    const authorization =
      request.headers.get("authorization");

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const {
      data: { user },
      error: authError,
    } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { message: "Unauthorized." },
        { status: 401 }
      );
    }

    const { data: adminUser, error: adminError } =
  await supabaseAdmin
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

if (adminError) {
  console.error(
    "Unable to verify administrator:",
    adminError
  );

  return NextResponse.json(
    { message: "Unable to verify administrator." },
    { status: 500 }
  );
}

if (!adminUser) {
  return NextResponse.json(
    { message: "Forbidden." },
    { status: 403 }
  );
}

    const body = await request.json();

    const eventId =
      typeof body.eventId === "string"
        ? body.eventId
        : "";

    if (!eventId) {
      return NextResponse.json(
        { message: "Event is required." },
        { status: 400 }
      );
    }

    /*
     * Fetch the programme.
     */
    const { data: event, error: eventError } =
      await supabaseAdmin
        .from("events")
        .select("*")
        .eq("id", eventId)
        .single();

    if (eventError || !event) {
      return NextResponse.json(
        { message: "Event not found." },
        { status: 404 }
      );
    }

    /*
     * Only ACTIVE subscribers receive mail.
     */
    const { data: subscribers, error: subscribersError } =
      await supabaseAdmin
        .from("newsletter_subscribers")
        .select("email, unsubscribe_token")
        .eq("status", "active");

    if (subscribersError) {
      throw subscribersError;
    }

    if (!subscribers?.length) {
      return NextResponse.json(
        { message: "There are no active subscribers." },
        { status: 400 }
      );
    }

    /*
     * Create campaign history.
     */
    const { data: campaign, error: campaignError } =
      await supabaseAdmin
        .from("newsletter_campaigns")
        .insert({
          event_id: event.id,
          subject: event.title,
          recipient_count: subscribers.length,
          status: "sending",
        })
        .select("id")
        .single();

    if (campaignError) {
      throw campaignError;
    }

    const siteUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      "http://localhost:3000";

    const eventDate = formatDate(event.event_date);
    const eventTime = formatTime(event.start_time);

    try {
      /*
       * Send individually so every member gets their own
       * unsubscribe link and email addresses aren't exposed.
       */
      for (const subscriber of subscribers) {
        const unsubscribeUrl =
          `${siteUrl}/api/newsletter/unsubscribe?token=${subscriber.unsubscribe_token}`;
        //   console.log("EMAIL FLYER URL:", event.image_url);

          let flyerAttachment:
  | {
      filename: string;
      content: Buffer;
    }
  | undefined;

if (event.image_url) {
  const flyerResponse = await fetch(event.image_url);

  if (flyerResponse.ok) {
    const arrayBuffer =
      await flyerResponse.arrayBuffer();

    const contentType =
      flyerResponse.headers.get("content-type") || "";

    let extension = "jpg";

    if (contentType.includes("png")) {
      extension = "png";
    } else if (contentType.includes("webp")) {
      extension = "webp";
    }

    flyerAttachment = {
      filename: `${event.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")}-flyer.${extension}`,

      content: Buffer.from(arrayBuffer),
    };
  } else {
    console.error(
      "Unable to fetch event flyer:",
      flyerResponse.status
    );
  }
}

        await resend.emails.send({
          from:
            process.env.NEWSLETTER_FROM_EMAIL ||
            "TACSFON LAUTECH <onboarding@resend.dev>",

          to: subscriber.email,

          subject: `${event.title} — TACSFON LAUTECH`,

          attachments: flyerAttachment
            ? [flyerAttachment]
            : [],

          html: `
<!DOCTYPE html>
<html>
<body style="margin:0;background:#f7f7f3;font-family:Arial,Helvetica,sans-serif;color:#0a0a0a;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
<tr>
<td align="center" style="padding:40px 16px;">

<table width="100%" cellpadding="0" cellspacing="0" role="presentation"
style="max-width:620px;background:#ffffff;">

<tr>
<td style="background:#15803d;padding:20px 30px;">
<p style="margin:0;color:#ffffff;font-size:11px;font-weight:bold;letter-spacing:2px;">
TACSFON LAUTECH
</p>
</td>
</tr>

${
  event.image_url
    ? `
<tr>
  <td
    align="center"
    style="
      padding:0;
      margin:0;
      background-color:#f7f7f3;
      line-height:0;
      font-size:0;
    "
  >
    <img
      src="${event.image_url}"
      width="620"
      alt="Flyer for ${event.title}"
      border="0"
      style="
        display:block;
        width:100%;
        max-width:620px;
        height:auto;
        border:0;
        margin:0;
        padding:0;
        outline:none;
        text-decoration:none;
        -ms-interpolation-mode:bicubic;
      "
    />
  </td>
</tr>
`
    : ""
}

<tr>
<td style="padding:40px 32px;">

<p style="margin:0;color:#15803d;font-size:10px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;">
${event.category}
</p>

<h1 style="margin:14px 0 0;font-size:36px;line-height:1.05;letter-spacing:-1.5px;">
${event.title}
</h1>

<table cellpadding="0" cellspacing="0" role="presentation"
style="margin-top:26px;font-size:14px;line-height:1.8;">

<tr>
<td style="color:#777777;padding-right:20px;">DATE</td>
<td>${eventDate}</td>
</tr>

${
  eventTime
    ? `
<tr>
<td style="color:#777777;padding-right:20px;">TIME</td>
<td>${eventTime}</td>
</tr>
`
    : ""
}

<tr>
<td style="color:#777777;padding-right:20px;">VENUE</td>
<td>${event.location}</td>
</tr>

</table>

${
  event.description
    ? `
<p style="margin:26px 0 0;color:#666666;font-size:14px;line-height:1.8;">
${event.description}
</p>
`
    : ""
}

${
  event.registration_url
    ? `
<table cellpadding="0" cellspacing="0" role="presentation"
style="margin-top:30px;">
<tr>
<td style="background:#0a0a0a;padding:15px 22px;">
<a href="${event.registration_url}"
style="color:#ffffff;text-decoration:none;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase;">
Programme Details →
</a>
</td>
</tr>
</table>
`
    : ""
}

</td>
</tr>

<tr>
<td style="border-top:1px solid #eeeeee;padding:25px 32px;">
<p style="margin:0;color:#999999;font-size:10px;line-height:1.7;">
You received this because you subscribed to TACSFON LAUTECH updates.
</p>

<p style="margin:8px 0 0;">
<a href="${unsubscribeUrl}"
style="color:#777777;font-size:10px;">
Unsubscribe from these emails
</a>
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
          `,
        });
      }

      await supabaseAdmin
        .from("newsletter_campaigns")
        .update({
          status: "sent",
          sent_at: new Date().toISOString(),
        })
        .eq("id", campaign.id);

      return NextResponse.json({
        success: true,
        recipientCount: subscribers.length,
        message: `Announcement sent to ${subscribers.length} subscriber${
          subscribers.length === 1 ? "" : "s"
        }.`,
      });
    } catch (sendError) {
      await supabaseAdmin
        .from("newsletter_campaigns")
        .update({
          status: "failed",
        })
        .eq("id", campaign.id);

      throw sendError;
    }
  } catch (error) {
    console.error(
      "Newsletter announcement error:",
      error
    );

    return NextResponse.json(
      {
        message:
          "Unable to send the announcement right now.",
      },
      { status: 500 }
    );
  }
}