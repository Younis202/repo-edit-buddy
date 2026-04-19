import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { customer, items, total } = await req.json();
    const ownerEmail = Deno.env.get("STORE_OWNER_EMAIL");

    if (!ownerEmail) {
      return new Response(JSON.stringify({ error: "Store email not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Build order email content
    const itemsList = items
      .map(
        (i: any) =>
          `• ${i.name} — Bottle: ${i.bottle || i.color || "—"}, Size: ${i.size}, Qty: ${i.quantity} — ${i.price}`
      )
      .join("\n");

    const emailBody = `
🛍️ NEW ORDER — MAISON

━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS
Name: ${customer.firstName} ${customer.lastName}
Email: ${customer.email}
Phone: ${customer.phone}
Address: ${customer.address}, ${customer.city}, ${customer.country} ${customer.postalCode}
${customer.notes ? `Notes: ${customer.notes}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━

ORDER ITEMS
${itemsList}

━━━━━━━━━━━━━━━━━━━━━━━━

TOTAL: ${total}
Shipping: Complimentary

━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim();

    // Send email via Resend (if configured) or log for now
    const resendKey = Deno.env.get("RESEND_API_KEY");

    if (resendKey) {
      const emailRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "MAISON <onboarding@resend.dev>",
          to: [ownerEmail],
          subject: `New Order — ${customer.firstName} ${customer.lastName} — ${total}`,
          text: emailBody,
        }),
      });
      const emailData = await emailRes.json();
      console.log("Email sent:", emailData);
    } else {
      // Log the order if Resend is not configured
      console.log("━━━ ORDER RECEIVED ━━━");
      console.log(emailBody);
      console.log("To enable email delivery, add RESEND_API_KEY secret");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Order error:", error);
    return new Response(JSON.stringify({ error: "Failed to process order" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
