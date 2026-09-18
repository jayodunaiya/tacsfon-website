import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface SendConfirmationEmailProps {
  email: string;
  confirmationToken: string;
}

export const sendConfirmationEmail = async ({
  email,
  confirmationToken,
}: SendConfirmationEmailProps) => {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "http://localhost:3000";

  const confirmationUrl =
    `${siteUrl}/api/newsletter/confirm?token=${confirmationToken}`;

  const { data, error } = await resend.emails.send({
    from: "TACSFON LAUTECH <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your TACSFON updates",

    html: `
      <!DOCTYPE html>
      <html>
        <body style="
          margin:0;
          padding:0;
          background:#f7f7f3;
          font-family:Arial,Helvetica,sans-serif;
          color:#0a0a0a;
        ">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
            style="padding:40px 16px;"
          >
            <tr>
              <td align="center">

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                  style="
                    max-width:600px;
                    background:#ffffff;
                  "
                >

                  <tr>
                    <td
                      style="
                        background:#15803d;
                        padding:18px 32px;
                      "
                    >
                      <p style="
                        margin:0;
                        color:#ffffff;
                        font-size:11px;
                        font-weight:bold;
                        letter-spacing:2px;
                      ">
                        TACSFON LAUTECH
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding:48px 32px;">

                      <p style="
                        margin:0 0 16px;
                        color:#15803d;
                        font-size:11px;
                        font-weight:bold;
                        letter-spacing:2px;
                        text-transform:uppercase;
                      ">
                        Stay Connected
                      </p>

                      <h1 style="
                        margin:0;
                        font-size:36px;
                        line-height:1.05;
                        letter-spacing:-1.5px;
                      ">
                        One more step.
                      </h1>

                      <p style="
                        margin:22px 0 0;
                        color:#666666;
                        font-size:15px;
                        line-height:1.7;
                      ">
                        Confirm your email address to receive
                        important TACSFON LAUTECH updates,
                        special programmes and fellowship
                        announcements.
                      </p>

                      <table
                        cellpadding="0"
                        cellspacing="0"
                        role="presentation"
                        style="margin-top:30px;"
                      >
                        <tr>
                          <td
                            style="
                              background:#15803d;
                              padding:15px 24px;
                            "
                          >
                            <a
                              href="${confirmationUrl}"
                              style="
                                color:#ffffff;
                                text-decoration:none;
                                font-size:12px;
                                font-weight:bold;
                                letter-spacing:1px;
                                text-transform:uppercase;
                              "
                            >
                              Confirm Subscription →
                            </a>
                          </td>
                        </tr>
                      </table>

                      <p style="
                        margin:30px 0 0;
                        color:#999999;
                        font-size:11px;
                        line-height:1.6;
                      ">
                        If you didn't request these updates,
                        you can safely ignore this email.
                      </p>

                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        border-top:1px solid #eeeeee;
                        padding:22px 32px;
                      "
                    >
                      <p style="
                        margin:0;
                        color:#aaaaaa;
                        font-size:10px;
                      ">
                        The Apostolic Church Students'
                        Fellowship of Nigeria · LAUTECH
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

  if (error) {
    throw new Error(
      `Unable to send confirmation email: ${error.message}`
    );
  }

  return data;
};