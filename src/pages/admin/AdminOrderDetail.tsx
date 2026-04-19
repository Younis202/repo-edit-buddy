import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, MapPin, Phone, Mail, Gift, Truck, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { getBottleByName } from "@/data/bottleTypes";

const STATUS_OPTIONS = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"] as const;

const statusLabel = (s: string) => ({
  pending: "قيد الانتظار", confirmed: "مؤكد", processing: "قيد التجهيز",
  shipped: "تم الشحن", delivered: "تم التسليم", cancelled: "ملغي", refunded: "مسترد",
}[s] || s);

const AdminOrderDetail = () => {
  const { id } = useParams();
  const qc = useQueryClient();
  const [tracking, setTracking] = useState({ number: "", url: "" });
  const [cancelReason, setCancelReason] = useState("");
  const [showCancel, setShowCancel] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-order", id],
    queryFn: async () => {
      const [order, items] = await Promise.all([
        supabase.from("orders").select("*").eq("id", id!).maybeSingle(),
        supabase.from("order_items").select("*").eq("order_id", id!),
      ]);
      return { order: order.data, items: items.data || [] };
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (data?.order) {
      setTracking({ number: data.order.tracking_number || "", url: data.order.tracking_url || "" });
    }
  }, [data?.order]);

  const updateStatus = async (status: string) => {
    const patch: any = { status };
    if (status === "shipped") patch.shipped_at = new Date().toISOString();
    if (status === "delivered") patch.delivered_at = new Date().toISOString();
    const { error } = await supabase.from("orders").update(patch).eq("id", id!);
    if (error) toast.error("فشل التحديث");
    else {
      toast.success("تم تحديث الحالة");
      qc.invalidateQueries({ queryKey: ["admin-order", id] });
    }
  };

  const saveTracking = async () => {
    const { error } = await supabase
      .from("orders")
      .update({ tracking_number: tracking.number || null, tracking_url: tracking.url || null })
      .eq("id", id!);
    if (error) toast.error("فشل الحفظ");
    else {
      toast.success("تم حفظ بيانات الشحن");
      qc.invalidateQueries({ queryKey: ["admin-order", id] });
    }
  };

  const cancelOrder = async () => {
    if (!cancelReason.trim()) return toast.error("اكتب سبب الإلغاء");
    const { error } = await supabase
      .from("orders")
      .update({ status: "cancelled", cancellation_reason: cancelReason })
      .eq("id", id!);
    if (error) toast.error("فشل الإلغاء");
    else {
      toast.success("تم إلغاء الطلب");
      setShowCancel(false);
      qc.invalidateQueries({ queryKey: ["admin-order", id] });
    }
  };

  if (isLoading) return <div className="p-10 text-sm text-muted-foreground font-body">جاري التحميل...</div>;
  if (!data?.order) return <div className="p-10 text-sm text-muted-foreground font-body">الطلب غير موجود</div>;

  const o = data.order;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <Link to="/admin/orders" className="flex items-center gap-2 text-[10px] tracking-wide text-muted-foreground hover:text-foreground mb-6 font-body">
        <ArrowRight size={12} />
        العودة للطلبات
      </Link>

      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">رقم الطلب</p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">{o.order_number}</h1>
          <p className="text-xs text-muted-foreground mt-2 font-body">
            {new Date(o.created_at).toLocaleString("ar-EG")}
          </p>
        </div>
        <select
          value={o.status}
          onChange={(e) => updateStatus(e.target.value)}
          className="bg-transparent border border-border/30 px-4 py-2 text-sm font-body text-foreground outline-none focus:border-accent"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>{statusLabel(s)}</option>
          ))}
        </select>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="border border-border/20 p-6">
            <h3 className="font-display text-lg text-foreground mb-5">المنتجات</h3>
            <div className="space-y-4">
              {data.items.map((item: any) => {
                const bottle = getBottleByName(item.color);
                return (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-border/15 last:border-0 last:pb-0">
                    {item.product_image && (
                      <div className="w-16 h-20 flex-shrink-0 overflow-hidden bg-muted">
                        <img src={item.product_image} alt={item.product_name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-display text-sm text-foreground">{item.product_name}</p>
                      <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        {bottle && (
                          <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground font-body bg-secondary/30 px-2 py-0.5">
                            <img src={bottle.image} alt={bottle.name} className="w-4 h-5 object-contain" />
                            {bottle.name}
                          </span>
                        )}
                        <span className="text-[10px] text-muted-foreground font-body">
                          الحجم: {item.size} • الكمية: {item.quantity}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-foreground font-body">{Number(item.line_total).toLocaleString("ar-EG")} ج.م</p>
                  </div>
                );
              })}
            </div>
          </div>

          {o.notes && (
            <div className="border border-border/20 p-6">
              <h3 className="font-display text-sm text-foreground mb-3">ملاحظات العميل</h3>
              <p className="text-sm text-foreground/70 font-body">{o.notes}</p>
            </div>
          )}

          {o.gift_wrap && (
            <div className="border border-accent/30 bg-accent/5 p-6">
              <h3 className="font-display text-sm text-accent mb-3 flex items-center gap-2">
                <Gift size={14} strokeWidth={1.5} />
                طلب تغليف هدية
              </h3>
              {o.gift_message && <p className="text-sm text-foreground/80 font-body italic">"{o.gift_message}"</p>}
            </div>
          )}

          {/* Tracking */}
          <div className="border border-border/20 p-6">
            <h3 className="font-display text-sm text-foreground mb-4 flex items-center gap-2">
              <Truck size={14} strokeWidth={1.5} className="text-accent" />
              معلومات الشحن والتتبع
            </h3>
            <div className="grid md:grid-cols-2 gap-3 mb-3">
              <input
                value={tracking.number}
                onChange={(e) => setTracking({ ...tracking, number: e.target.value })}
                placeholder="رقم البوليصة"
                className="bg-transparent border border-border/30 focus:border-accent px-3 py-2 text-sm font-body outline-none"
              />
              <input
                value={tracking.url}
                onChange={(e) => setTracking({ ...tracking, url: e.target.value })}
                placeholder="رابط التتبع (اختياري)"
                dir="ltr"
                className="bg-transparent border border-border/30 focus:border-accent px-3 py-2 text-sm font-body outline-none"
              />
            </div>
            <button onClick={saveTracking} className="text-[10px] tracking-wide bg-foreground text-background px-4 py-1.5 hover:bg-accent hover:text-accent-foreground transition-all font-body">
              حفظ بيانات الشحن
            </button>
            {o.shipped_at && <p className="text-[10px] text-muted-foreground font-body mt-3">تم الشحن: {new Date(o.shipped_at).toLocaleString("ar-EG")}</p>}
            {o.delivered_at && <p className="text-[10px] text-accent font-body mt-1">تم التسليم: {new Date(o.delivered_at).toLocaleString("ar-EG")}</p>}
          </div>

          {/* Cancel */}
          {o.status !== "cancelled" && o.status !== "delivered" && (
            <div className="border border-destructive/20 p-6">
              {!showCancel ? (
                <button onClick={() => setShowCancel(true)} className="text-[11px] tracking-wide text-destructive border border-destructive/30 px-4 py-2 hover:bg-destructive/10 transition-all font-body flex items-center gap-2">
                  <AlertCircle size={12} /> إلغاء الطلب
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-xs text-foreground font-body">سبب الإلغاء:</p>
                  <textarea value={cancelReason} onChange={(e) => setCancelReason(e.target.value)} rows={2} className="w-full bg-transparent border border-border/30 focus:border-destructive px-3 py-2 text-sm font-body outline-none" />
                  <div className="flex gap-2">
                    <button onClick={cancelOrder} className="text-[10px] tracking-wide bg-destructive text-destructive-foreground px-4 py-1.5 font-body">تأكيد الإلغاء</button>
                    <button onClick={() => setShowCancel(false)} className="text-[10px] tracking-wide border border-border/30 px-4 py-1.5 font-body">تراجع</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {o.status === "cancelled" && o.cancellation_reason && (
            <div className="border border-destructive/30 bg-destructive/5 p-6">
              <h3 className="font-display text-sm text-destructive mb-2 flex items-center gap-2">
                <AlertCircle size={14} /> الطلب ملغي
              </h3>
              <p className="text-sm text-foreground/80 font-body">{o.cancellation_reason}</p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="border border-border/20 p-6">
            <h3 className="font-display text-sm text-foreground mb-4">بيانات الشحن</h3>
            <p className="text-sm text-foreground font-body mb-3">{o.shipping_full_name}</p>
            <div className="flex items-start gap-2 text-xs text-muted-foreground font-body mb-2">
              <MapPin size={12} strokeWidth={1.5} className="mt-0.5 flex-shrink-0" />
              <span>{o.shipping_street}, {o.shipping_city}, {o.shipping_governorate}, {o.shipping_country}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-body mb-2" dir="ltr">
              <Phone size={12} strokeWidth={1.5} />
              <span>{o.shipping_phone}</span>
            </div>
            {o.guest_email && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-body" dir="ltr">
                <Mail size={12} strokeWidth={1.5} />
                <span>{o.guest_email}</span>
              </div>
            )}
          </div>

          <div className="border border-border/20 p-6 space-y-2">
            <h3 className="font-display text-sm text-foreground mb-4">الملخص المالي</h3>
            <Row label="المجموع الفرعي" value={`${Number(o.subtotal).toLocaleString("ar-EG")} ج.م`} />
            <Row label="الشحن" value={`${Number(o.shipping_cost).toLocaleString("ar-EG")} ج.م`} />
            {Number(o.coupon_discount) > 0 && (
              <Row label={`خصم (${o.coupon_code})`} value={`-${Number(o.coupon_discount).toLocaleString("ar-EG")} ج.م`} accent />
            )}
            <div className="border-t border-border/20 pt-2 mt-2 flex justify-between">
              <span className="text-[10px] tracking-wide text-foreground font-body">الإجمالي</span>
              <span className="font-display text-xl text-foreground">{Number(o.total).toLocaleString("ar-EG")} ج.م</span>
            </div>
            <p className="text-[10px] text-muted-foreground font-body pt-3">
              طريقة الدفع: {o.payment_method === "cash_on_delivery" ? "الدفع عند الاستلام" : o.payment_method}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex justify-between text-[10px] tracking-wide font-body">
    <span className="text-muted-foreground">{label}</span>
    <span className={accent ? "text-accent" : "text-foreground"}>{value}</span>
  </div>
);

export default AdminOrderDetail;
