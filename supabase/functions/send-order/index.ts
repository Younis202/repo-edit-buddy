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
    const { orderNumber, customer, items, total, giftWrap, giftMessage } = await req.json();
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
          `• ${i.name} — العبوة: ${i.bottle || i.color || "—"}، الحجم: ${i.size}، الكمية: ${i.quantity} — ${i.price}`
      )
      .join("\n");

    const emailBody = `
🛍️ طلب جديد — شذايا
${orderNumber ? `رقم الطلب: ${orderNumber}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━

بيانات العميل
الاسم: ${customer.firstName} ${customer.lastName}
البريد: ${customer.email}
الهاتف: ${customer.phone}
العنوان: ${customer.address}, ${customer.city}, ${customer.governorate || ""} ${customer.country || ""} ${customer.postalCode || ""}
${customer.notes ? `ملاحظات: ${customer.notes}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━

الطلبات
${itemsList}
${giftWrap ? `\n🎁 تغليف هدية\n${giftMessage ? `رسالة: ${giftMessage}` : ""}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━

الإجمالي: ${total}

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
          from: "شذايا <onboarding@resend.dev>",
          to: [ownerEmail],
          subject: `طلب جديد ${orderNumber ? `#${orderNumber}` : ""} — ${customer.firstName} ${customer.lastName} — ${total}`,
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
