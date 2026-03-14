import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("SENDGRID_API_KEY");
    const toEmail = Deno.env.get("CONTACT_EMAIL") || "dannysantos.photos@gmail.com";
    const fromEmail = Deno.env.get("FROM_EMAIL") || "no-reply@yourdomain.com";

    if (!apiKey) {
      throw new Error("SENDGRID_API_KEY is not configured");
    }

    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      throw new Error("Missing required fields: name, email, message");
    }

    const payload = {
      personalizations: [
        {
          to: [{ email: toEmail }],
          subject: `Contact form from ${name}`,
        },
      ],
      from: { email: fromEmail },
      reply_to: { email },
      content: [
        {
          type: "text/plain",
          value: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        },
      ],
    };

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`SendGrid error (${response.status}): ${errorText}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Send contact email error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
