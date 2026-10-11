// Supabase Edge Function: verify-razorpay-payment
// Verifies the HMAC-SHA256 signature Razorpay returns after a successful
// checkout, so the frontend can never fake a "payment succeeded" order.
// Deploy: supabase functions deploy verify-razorpay-payment
// Key secret comes from the site_settings table (set via /admin/settings),
// falling back to the RAZORPAY_KEY_SECRET env secret if the table is empty.

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

async function getRazorpayKeySecret() {
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("value")
    .eq("key", "razorpay_key_secret")
    .maybeSingle()

  return data?.value || Deno.env.get("RAZORPAY_KEY_SECRET") || ""
}

async function hmacSha256Hex(secret: string, message: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  )
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(message))
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json()

    const keySecret = await getRazorpayKeySecret()
    if (!keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay is not configured yet.", verified: false }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const expectedSignature = await hmacSha256Hex(
      keySecret,
      `${razorpay_order_id}|${razorpay_payment_id}`
    )

    const verified = expectedSignature === razorpay_signature

    return new Response(JSON.stringify({ verified }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, verified: false }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
