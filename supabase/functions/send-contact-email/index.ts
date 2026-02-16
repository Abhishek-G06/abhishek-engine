import { corsHeaders } from "../_shared/cors.ts";

const BREVO_API_KEY = Deno.env.get("BREVO_API_KEY")!;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, subject, message } = await req.json();

    // Validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (name.length > 100 || email.length > 255 || subject.length > 200 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: "Input exceeds maximum length" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: "Invalid email address" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const brevoHeaders = {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    };

    // Send notification to you
    const notifyRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: brevoHeaders,
      body: JSON.stringify({
        sender: { name: "Portfolio Contact", email: "abhi2002gupta@gmail.com" },
        to: [{ email: "abhi2002gupta@gmail.com", name: "Abhishek Gupta" }],
        replyTo: { email, name },
        subject: `Portfolio Contact: ${subject}`,
        htmlContent: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      }),
    });

    if (!notifyRes.ok) {
      const errData = await notifyRes.json();
      console.error("Brevo notify error:", errData);
      return new Response(
        JSON.stringify({ error: "Failed to send email" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send auto-reply to the sender
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin:0;padding:0;background-color:#f4f4f5;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f4f5;padding:40px 20px;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
                <tr>
                  <td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px 40px 32px;text-align:center;">
                    <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">Thank You, ${name}! ✨</h1>
                    <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:15px;">Your message has been received</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:36px 40px;">
                    <p style="margin:0 0 20px;color:#27272a;font-size:15px;line-height:1.7;">
                      Hi <strong>${name}</strong>,
                    </p>
                    <p style="margin:0 0 20px;color:#3f3f46;font-size:15px;line-height:1.7;">
                      Thanks for reaching out! I've received your message and truly appreciate you taking the time to connect. I'll review your inquiry and get back to you as soon as possible — typically within <strong>24–48 hours</strong>.
                    </p>
                    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9fafb;border-radius:12px;border:1px solid #e4e4e7;margin:24px 0;">
                      <tr>
                        <td style="padding:24px;">
                          <p style="margin:0 0 8px;color:#71717a;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Your Message Summary</p>
                          <p style="margin:0 0 6px;color:#27272a;font-size:14px;"><strong>Subject:</strong> ${subject}</p>
                          <p style="margin:0;color:#52525b;font-size:14px;line-height:1.6;">${message.replace(/\n/g, "<br>")}</p>
                        </td>
                      </tr>
                    </table>
                    <p style="margin:24px 0 0;color:#3f3f46;font-size:15px;line-height:1.7;">
                      In the meantime, feel free to explore my portfolio or connect with me on social media. Looking forward to our conversation!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 40px;">
                    <hr style="border:none;border-top:1px solid #e4e4e7;margin:0;">
                  </td>
                </tr>
                <tr>
                  <td style="padding:24px 40px 32px;text-align:center;">
                    <p style="margin:0 0 12px;color:#71717a;font-size:13px;">Connect with me</p>
                    <table cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td style="padding:0 8px;"><a href="https://github.com/Abhishek-G06" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:600;">GitHub</a></td>
                        <td style="color:#d4d4d8;">•</td>
                        <td style="padding:0 8px;"><a href="https://www.linkedin.com/in/abhishek-gupta-667229189/" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:600;">LinkedIn</a></td>
                        <td style="color:#d4d4d8;">•</td>
                        <td style="padding:0 8px;"><a href="https://x.com/23Abhishek06" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:600;">Twitter</a></td>
                      </tr>
                    </table>
                    <p style="margin:20px 0 0;color:#a1a1aa;font-size:12px;">
                      Abhishek Gupta · <a href="https://abhishek-engine.lovable.app" style="color:#6366f1;text-decoration:none;">abhishek-engine.lovable.app</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `;

    const autoReplyRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: brevoHeaders,
      body: JSON.stringify({
        sender: { name: "Abhishek Gupta", email: "abhi2002gupta@gmail.com" },
        to: [{ email, name }],
        replyTo: { email: "abhi2002gupta@gmail.com", name: "Abhishek Gupta" },
        subject: `Thanks for reaching out, ${name}! 🙌`,
        htmlContent: autoReplyHtml,
      }),
    });

    if (!autoReplyRes.ok) {
      const errData = await autoReplyRes.json();
      console.error("Brevo auto-reply error:", errData);
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
