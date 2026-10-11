// Supabase Edge Function: send-contact-email
// Sends the public Contact page enquiry form to the business email via Resend.
// Deploy: supabase functions deploy send-contact-email
// Secrets: supabase secrets set RESEND_API_KEY=xxx
// (SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY are injected automatically by Supabase.)

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  })
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { name, email, message } = await req.json()
    if (!name || !email || !message) {
      return jsonResponse({ error: "Name, email and message are all required." }, 400)
    }

    if (!RESEND_API_KEY) {
      return jsonResponse(
        { error: "Email sending isn't configured yet. Add RESEND_API_KEY as an Edge Function secret." },
        503
      )
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
    const { data: setting } = await supabaseAdmin
      .from("site_settings")
      .select("value")
      .eq("key", "contact_email")
      .maybeSingle()

    const toEmail = setting?.value?.trim()
    if (!toEmail) {
      return jsonResponse({ error: "No contact email is configured yet." }, 503)
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Menpheromones Website <onboarding@resend.dev>",
        to: [toEmail],
        reply_to: email,
        subject: `New enquiry from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Resend send failed: ${errText}`)
    }

    return jsonResponse({ success: true })
  } catch (err) {
    return jsonResponse({ error: err.message }, 500)
  }
})
