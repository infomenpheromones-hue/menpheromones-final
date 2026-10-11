// Supabase Edge Function: create-razorpay-order
// Creates a Razorpay order server-side (keeps RAZORPAY_KEY_SECRET off the client).
// Deploy: supabase functions deploy create-razorpay-order
// Keys come from the site_settings table (set via /admin/settings) so the
// admin can switch payments on without a redeploy. Falls back to the
// RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET env secrets if the table is empty.

import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
}

async function getRazorpayKeys() {
  const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
  const { data } = await supabaseAdmin
    .from("site_settings")
    .select("key, value")
    .in("key", ["razorpay_key_id", "razorpay_key_secret"])

  const settings = Object.fromEntries((data || []).map((row) => [row.key, row.value]))
  return {
    keyId: settings.razorpay_key_id || Deno.env.get("RAZORPAY_KEY_ID") || "",
    keySecret: settings.razorpay_key_secret || Deno.env.get("RAZORPAY_KEY_SECRET") || "",
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  try {
    const { amount } = await req.json()
    if (!amount || amount <= 0) {
      return new Response(JSON.stringify({ error: "Invalid amount" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const { keyId, keySecret } = await getRazorpayKeys()
    if (!keyId || !keySecret) {
      return new Response(JSON.stringify({ error: "Razorpay is not configured yet." }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      })
    }

    const amountInPaise = Math.round(amount * 100)

    const auth = btoa(`${keyId}:${keySecret}`)
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amountInPaise,
        currency: "INR",
        payment_capture: 1,
      }),
    })

    if (!res.ok) {
      const errText = await res.text()
      throw new Error(`Razorpay order creation failed: ${errText}`)
    }

    const order = await res.json()

    return new Response(JSON.stringify({ orderId: order.id, amount: order.amount }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    })
  }
})
