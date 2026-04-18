import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { ArrowRight, MapPin, Phone, Package, Check, Truck, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import { toast } from "sonner";

const STAGES = ["pending", "confirmed", "processing", "shipped", "delivered"] as const;
const stageLabel: Record<string, string> = {
  pending: "قيد الانتظار", confirmed: "مؤكد", processing: "قيد التجهيز",
  shipped: "تم الشحن", delivered: "تم التسليم", cancelled: "ملغي", refunded: "مسترد",
};

const OrderDetail = () => {
  const { id } = useParams();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user || !id) return;
    (async () => {
      const [o, it] = await Promise.all([
        supabase.from("orders").select("*").eq("id", id).maybeSingle(),
        supabase.from("order_items").select("*").eq("order_id", id),
      ]);
      setOrder(o.data);
      setItems(it.data || []);
      setLoadingData(false);
    })();
  }, [user, id]);

  const reorder = () => {
    items.forEach((it) => {
      addItem({
        id: it.product_id || it.product_slug,
        slug: it.product_slug,
        name: it.product_name,
        price: it.unit_price_display || `${it.unit_price} ج.م`,
        images: it.product_image ? [it.product_image] : [],
      } as any, it.size, it.color, it.quantity);
    });
    toast.success("تمت إضافة المنتجات للحقيبة");
    navigate("/checkout");
  };

  if (loadingData || loading) {
    return <main className="bg-background min-h-screen flex items-center justify-center"><p className="text-sm text-muted-foreground font-body">جاري التحميل...</p></main>;
  }
  if (!order) {
    return <main className="bg-background min-h-screen flex items-center justify-center"><p className="text-sm text-muted-foreground font-body">الطلب غير موجود</p></main>;
  }

  const stageIdx = STAGES.indexOf(order.status as any);
  const isCancelled = order.status === "cancelled" || order.status === "refunded";

  return (
    <>
      <FilmGrain />
      <main className="bg-background min-h-screen">
        <Navbar />
        <section className="pt-24 md:pt-32 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
          <Link to="/account" className="flex items-center gap-2 text-[10px] tracking-wide text-muted-foreground hover:text-foreground mb-6 font-body">
            <ArrowRight size={12} /> العودة لحسابي
          </Link>

          <div className="mb-10 flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">رقم الطلب</p>
              <h1 className="font-display text-4xl font-light text-foreground">{order.order_number}</h1>
              <p className="text-xs text-muted-foreground mt-2 font-body">{new Date(order.created_at).toLocaleString("ar-EG")}</p>
            </div>
            <button onClick={reorder} className="text-[11px] tracking-wide bg-foreground text-background px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all font-body">
              إعادة الطلب
            </button>
          </div>

          {/* Timeline */}
          {!isCancelled ? (
            <div className="mb-10 border border-border/20 p-6">
              <div className="flex items-center justify-between gap-2">
                {STAGES.map((s, i) => {
                  const done = i <= stageIdx;
                  const Icon = i === 0 ? Clock : i === 1 ? Check : i === 2 ? Package : i === 3 ? Truck : Check;
                  return (
                    <div key={s} className="flex-1 flex flex-col items-center text-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${done ? "border-accent bg-accent/10 text-accent" : "border-border/30 text-foreground/30"}`}>
                        <Icon size={14} strokeWidth={1.5} />
                      </div>
                      <p className={`text-[10px] mt-2 font-body ${done ? "text-foreground" : "text-muted-foreground"}`}>{stageLabel[s]}</p>
                      {i < STAGES.length - 1 && <div className={`hidden md:block absolute h-0.5 ${done ? "bg-accent" : "bg-border/30"}`} />}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="mb-10 border border-destructive/30 bg-destructive/5 p-5 text-center">
              <p className="text-sm text-destructive font-body">{stageLabel[order.status]}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 border border-border/20 p-6">
              <h3 className="font-display text-lg mb-5">المنتجات</h3>
              <div className="space-y-4">
                {items.map((it) => (
                  <div key={it.id} className="flex gap-4 pb-4 border-b border-border/15 last:border-0">
                    {it.product_image && <div className="w-16 h-20 bg-muted overflow-hidden"><img src={it.product_image} alt={it.product_name} className="w-full h-full object-cover" /></div>}
                    <div className="flex-1">
                      <Link to={`/product/${it.product_slug}`} className="font-display text-sm hover:text-accent transition-colors">{it.product_name}</Link>
                      <p className="text-[10px] text-muted-foreground font-body mt-1">{it.size} / {it.color} / الكمية: {it.quantity}</p>
                    </div>
                    <p className="text-sm font-body">{Number(it.line_total).toLocaleString("ar-EG")} ج.م</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border/20 p-5">
                <h3 className="font-display text-sm mb-4">الشحن</h3>
                <p className="text-sm font-body mb-3">{order.shipping_full_name}</p>
                <div className="flex items-start gap-2 text-xs text-muted-foreground font-body mb-2">
                  <MapPin size={12} className="mt-0.5" /><span>{order.shipping_street}, {order.shipping_city}, {order.shipping_governorate}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground font-body" dir="ltr"><Phone size={12} /><span>{order.shipping_phone}</span></div>
              </div>
              <div className="border border-border/20 p-5 space-y-2">
                <h3 className="font-display text-sm mb-4">الملخص</h3>
                <Row label="الفرعي" value={`${Number(order.subtotal).toLocaleString("ar-EG")} ج.م`} />
                <Row label="الشحن" value={`${Number(order.shipping_cost).toLocaleString("ar-EG")} ج.م`} />
                {Number(order.coupon_discount) > 0 && <Row label={`خصم (${order.coupon_code})`} value={`-${Number(order.coupon_discount).toLocaleString("ar-EG")} ج.م`} accent />}
                <div className="border-t border-border/20 pt-2 mt-2 flex justify-between">
                  <span className="text-[10px] tracking-wide font-body">الإجمالي</span>
                  <span className="font-display text-xl">{Number(order.total).toLocaleString("ar-EG")} ج.م</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

const Row = ({ label, value, accent }: { label: string; value: string; accent?: boolean }) => (
  <div className="flex justify-between text-[10px] tracking-wide font-body">
    <span className="text-muted-foreground">{label}</span>
    <span className={accent ? "text-accent" : "text-foreground"}>{value}</span>
  </div>
);

export default OrderDetail;
