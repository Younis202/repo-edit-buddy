import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { orderNumber, customer, items, total, subtotal, shippingCost, discount, couponCode, paymentMethod, notes } =
      await req.json();

    const ownerEmail =
      Deno.env.get("ADMIN_NOTIFICATION_EMAIL") ||
      Deno.env.get("STORE_OWNER_EMAIL") ||
      "younismohamed87643@gmail.com";

    const resendKey = Deno.env.get("RESEND_API_KEY");
    if (!resendKey) {
      console.error("RESEND_API_KEY missing");
      return new Response(JSON.stringify({ error: "Email service not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const fmt = (n: number | string) =>
      typeof n === "number" ? `${n.toLocaleString("ar-EG")} ج.م` : n;

    const itemsRows = (items || [])
      .map(
        (i: any) => `
        <tr>
          <td style="padding:12px;border-bottom:1px solid #eee;">${i.name}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:center;">${i.size || "—"}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:center;">${i.quantity}</td>
          <td style="padding:12px;border-bottom:1px solid #eee;text-align:left;">${i.price}</td>
        </tr>`
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<body style="font-family:Tahoma,Arial,sans-serif;background:#0f0d0a;color:#1a1a1a;margin:0;padding:24px;">
  <div style="max-width:640px;margin:auto;background:#ffffff;border:1px solid #e8d9b0;">
    <div style="background:linear-gradient(135deg,#1a1611,#2a2218);color:#d4af6a;padding:24px;text-align:center;">
      <h1 style="margin:0;font-size:24px;letter-spacing:4px;">شذايا — SHAZAYA</h1>
      <p style="margin:8px 0 0;font-size:14px;color:#e8d9b0;">طلب جديد على الموقع</p>
    </div>

    <div style="padding:24px;">
      <h2 style="margin:0 0 16px;color:#1a1611;">رقم الطلب: ${orderNumber || "—"}</h2>

      <h3 style="border-bottom:2px solid #d4af6a;padding-bottom:8px;color:#1a1611;">بيانات العميل</h3>
      <p style="margin:8px 0;"><strong>الاسم:</strong> ${customer.firstName || ""} ${customer.lastName || ""}</p>
      <p style="margin:8px 0;"><strong>الهاتف:</strong> ${customer.phone || "—"}</p>
      ${customer.email ? `<p style="margin:8px 0;"><strong>البريد:</strong> ${customer.email}</p>` : ""}
      <p style="margin:8px 0;"><strong>العنوان:</strong> ${customer.address || ""}, ${customer.city || ""}, ${customer.governorate || ""}</p>
      ${notes || customer.notes ? `<p style="margin:8px 0;"><strong>ملاحظات:</strong> ${notes || customer.notes}</p>` : ""}

      <h3 style="border-bottom:2px solid #d4af6a;padding-bottom:8px;color:#1a1611;margin-top:24px;">المنتجات</h3>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#faf6ec;">
            <th style="padding:12px;text-align:right;">المنتج</th>
            <th style="padding:12px;text-align:center;">الحجم</th>
            <th style="padding:12px;text-align:center;">الكمية</th>
            <th style="padding:12px;text-align:left;">السعر</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
      </table>

      <div style="margin-top:24px;padding:16px;background:#faf6ec;border:1px solid #e8d9b0;">
        ${subtotal !== undefined ? `<p style="margin:4px 0;display:flex;justify-content:space-between;"><span>الإجمالي الفرعي:</span><strong>${fmt(subtotal)}</strong></p>` : ""}
        ${shippingCost !== undefined ? `<p style="margin:4px 0;display:flex;justify-content:space-between;"><span>الشحن:</span><strong>${fmt(shippingCost)}</strong></p>` : ""}
        ${discount ? `<p style="margin:4px 0;display:flex;justify-content:space-between;color:#a04040;"><span>الخصم${couponCode ? ` (${couponCode})` : ""}:</span><strong>-${fmt(discount)}</strong></p>` : ""}
        <hr style="border:none;border-top:1px solid #d4af6a;margin:8px 0;" />
        <p style="margin:8px 0 0;display:flex;justify-content:space-between;font-size:18px;color:#1a1611;"><span>الإجمالي النهائي:</span><strong>${fmt(total)}</strong></p>
        ${paymentMethod ? `<p style="margin:8px 0 0;font-size:13px;color:#666;">طريقة الدفع: ${paymentMethod}</p>` : ""}
      </div>

      <p style="margin-top:24px;font-size:12px;color:#888;text-align:center;">شذايا — عطور تحكي حكاية</p>
    </div>
  </div>
</body>
</html>`.trim();

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Shazaya Orders <onboarding@resend.dev>",
        to: [ownerEmail],
        reply_to: customer.email || undefined,
        subject: `🛍️ طلب جديد ${orderNumber ? `#${orderNumber}` : ""} — ${customer.firstName || ""} ${customer.lastName || ""} — ${fmt(total)}`,
        html,
      }),
    });

    const emailData = await emailRes.json();
    if (!emailRes.ok) {
      console.error("Resend error:", emailData);
      return new Response(JSON.stringify({ error: "Failed to send email", details: emailData }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Email sent:", emailData.id);
    return new Response(JSON.stringify({ success: true, id: emailData.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Order email error:", error);
    return new Response(JSON.stringify({ error: String(error) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
