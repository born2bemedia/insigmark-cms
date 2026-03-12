import type { CollectionConfig, PayloadRequest } from "payload";

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: {
    forgotPassword: {
      generateEmailHTML: (args?: { token?: string; user?: { firstName?: string; lastName?: string } }) => {
        const resetLink = `${process.env.WEB_FRONT_URL}/set-password?token=${args?.token}`;
        const safeFirstName = args?.user?.firstName || "there";

        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your password - Insigmark</title>
</head>
<body style="margin: 0; padding: 0; background-color: #160b11; color: #ffffff; font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background-color: #160b11;">
    <tr>
      <td align="center" style="padding: 24px 12px;">
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 593px; border-collapse: collapse; background-color: #2b1018; background-image: linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.55)), url('https://theinsigmark.com/images/emails/register/bg.png'); background-position: center center; background-size: cover; background-repeat: no-repeat;">
          <tr>
            <td style="padding: 24px 40px 22px 40px;">
              <img src="https://theinsigmark.com/images/emails/logo-mark-header.png" alt="Insigmark" style="display: inline-block; width: 140px; height: 38px; vertical-align: middle; margin-right: 10px;">
            </td>
          </tr>
          <tr>
            <td style="padding: 0 20px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse; background: #e4e4e4;">
                <tr>
                  <td style="padding: 40px;">
                    <h1 style="margin: 0 0 24px 0; color: #0f0f19; font-size: 40px; font-weight: 600; line-height: 1.1; letter-spacing: -2.5px;">
                      Hello ${safeFirstName},
                    </h1>
                    <p style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      We received a request to reset the password for your Insigmark account. You can reset your password by clicking the button below:
                    </p>
                    <p style="margin: 0 0 24px 0;">
                      <a href="${resetLink}" style="display: inline-block; padding: 12px 18px; background-color: #d2ff37; color: #060606; text-decoration: none; font-size: 20px; font-weight: 600; border-radius: 50px; letter-spacing: -1px;">
                        Reset your password
                      </a>
                    </p>
                    <p style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      If you didn't request a password reset, you can safely ignore this email — your account is secure.
                    </p>
                    <p style="margin: 0 0 20px 0; color: #0f0f19; font-size: 14px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      For any issues or assistance, contact us at <a href="mailto:info@theinsigmark.com" style="color: #0f0f19; text-decoration: none;">info@theinsigmark.com</a>.
                    </p>
                    <p style="margin: 0 0 26px 0; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px;">
                      Stay secure,
                    </p>
                    <p style="margin: 0; color: #0f0f19; font-size: 18px; font-weight: 600; line-height: 1.2; letter-spacing: -1px; text-align: right;">
                      The Insigmark Team
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 26px 40px 28px 40px;">
              <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="vertical-align: middle;">
                    <p style="margin: 0 0 8px 0; color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      Email: <a href="mailto:info@theinsigmark.com" style="color: #ffffff; text-decoration: none;">info@theinsigmark.com</a>
                    </p>
                    <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 500; line-height: 1.3; letter-spacing: -0.5px;">
                      Phone: <a href="tel:+48732143158" style="color: #ffffff; text-decoration: none;">+48 732 143 158</a>
                    </p>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <img src="https://theinsigmark.com/images/emails/logo-mark-footer.png" alt="" style="display: block; width: 33px; height: 38px;">
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
      },
    },
  },
  access: {
    /*read: function (args: { req: PayloadRequest }) {
      return args.req.user?.role === 'admin'
    },*/
    read: () => true,
    create: () => true,
    update: () => true,
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      label: "First Name",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      label: "Last Name",
      required: true,
    },
    {
      name: "username",
      type: "text",
      label: "Username",
      required: false,
    },
    {
      name: "phone",
      type: "text",
      label: "Phone",
      required: false,
    },
    {
      name: "address1",
      type: "text",
      label: "Address line 1",
      required: false,
    },
    {
      name: "address2",
      type: "textarea",
      label: "Address line 2",
      required: false,
    },
    {
      name: "city",
      type: "text",
      label: "City",
      required: false,
    },
    {
      name: "state",
      type: "text",
      label: "State",
      required: false,
    },
    {
      name: "zip",
      type: "text",
      label: "Zip Code",
      required: false,
    },
    {
      name: "country",
      type: "text",
      label: "Country",
      required: false,
    },
    {
      name: "role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Customer", value: "customer" },
      ],
      defaultValue: "customer",
      required: true,
    },
  ],
};
