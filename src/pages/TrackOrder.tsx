import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Package, Truck, Check, Clock, X } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import { supabase } from "@/integrations/supabase/client";
import { usePageSEO } from "@/hooks/usePageSEO";

interface TrackedOrder {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  shipped_at: string | null;
  delivered_at: string | null;
  tracking_number: string | null;
  tracking_url: string | null;
  shipping_city: string;
  shipping_governorate: string;
  customer_name: string | null;
  items: Array<{
    name: string;
    image: string | null;
    size: string | null;
    color: string | null;
    quantity: number;
    unit_price_display: string | null;
    line_total: number;
  }>;
}

const statusFlow = ["pending", "confirmed", "processing", "shipped", "delivered"] as const;
const statusLabels: Record<string, string> = {
  pending: "قيد المراجعة",
  confirmed: "تم التأكيد",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى",
  refunded: "مسترد",
};

const TrackOrder = () => {
  usePageSEO({ title: "تتبع طلبك", description: "تابع حالة طلبك من شذايا برقم الطلب ورقم الجوال." });
  const [orderNumber, setOrderNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim() || !phone.trim()) {
      setError("الرجاء إدخال رقم الطلب ورقم الجوال");
      return;
    }
    setLoading(true);
    setError(null);
    setOrder(null);
    setSearched(true);

    const { data, error: rpcError } = await supabase.rpc("track_order_public", {
      _order_number: orderNumber.trim(),
      _phone: phone.trim(),
    });

    setLoading(false);
    if (rpcError) {
      setError("حدث خطأ أثناء البحث، حاول مرة أخرى");
      return;
    }
    if (!data || data.length === 0) {
      setError("لم نجد طلب مطابق. تأكد من رقم الطلب ورقم الجوال");
      return;
    }
    setOrder(data[0] as unknown as TrackedOrder);
  };

  const currentStepIndex = order ? statusFlow.indexOf(order.status as typeof statusFlow[number]) : -1;
  const isCancelled = order?.status === "cancelled" || order?.status === "refunded";

  return (
    <>
      <FilmGrain />
      <main className="bg-background min-h-screen">
        <Navbar />
        <section className="pt-24 md:pt-32 pb-20 px-6 md:px-12">
          <motion.nav
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-foreground">تتبع الطلب</span>
          </motion.nav>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">خدمة العملاء</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
              تتبّع <span className="italic">طلبك</span>
            </h1>
            <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-xl">
              أدخل رقم الطلب ورقم الجوال المسجّل عند الشراء لمتابعة حالة الشحن.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSearch}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl mx-auto border border-border/20 p-6 md:p-8 mb-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-[10px] tracking-wide text-muted-foreground font-body mb-2 block">رقم الطلب</label>
                <input
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="SHZ-XXXXXX-XXXX"
                  className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body outline-none transition-colors"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="text-[10px] tracking-wide text-muted-foreground font-body mb-2 block">رقم الجوال</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="01xxxxxxxxx"
                  type="tel"
                  className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body outline-none transition-colors"
                  dir="ltr"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-foreground text-background px-10 py-3.5 text-[11px] tracking-wide font-body hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50 flex items-center gap-2"
            >
              <Search size={14} strokeWidth={1.5} />
              {loading ? "جاري البحث..." : "تتبع الطلب"}
            </button>
            {error && (
              <p className="text-[11px] text-destructive font-body mt-4 flex items-center gap-2">
                <X size={12} /> {error}
              </p>
            )}
          </motion.form>

          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto border border-border/20 p-6 md:p-8"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
                <div>
                  <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">رقم الطلب</p>
                  <p className="font-display text-2xl text-foreground" dir="ltr">{order.order_number}</p>
                  <p className="text-[10px] text-muted-foreground font-body mt-1">
                    {new Date(order.created_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">المبلغ</p>
                  <p className="font-display text-xl text-foreground">{Number(order.total).toLocaleString("ar-EG")} ج.م</p>
                </div>
              </div>

              {/* Status timeline */}
              {isCancelled ? (
                <div className="border border-destructive/30 bg-destructive/5 p-5 mb-8 flex items-center gap-3">
                  <X size={18} className="text-destructive" />
                  <p className="text-sm text-destructive font-body">{statusLabels[order.status]}</p>
                </div>
              ) : (
                <div className="mb-10">
                  <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-5">حالة الطلب</p>
                  <div className="flex items-center justify-between relative">
                    <div className="absolute top-4 right-0 left-0 h-px bg-border/30" />
                    <div
                      className="absolute top-4 right-0 h-px bg-accent transition-all duration-700"
                      style={{ width: `${(currentStepIndex / (statusFlow.length - 1)) * 100}%` }}
                    />
                    {statusFlow.map((step, i) => {
                      const done = i <= currentStepIndex;
                      const Icon = step === "delivered" ? Check : step === "shipped" ? Truck : step === "processing" ? Package : Clock;
                      return (
                        <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                            done ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
                          }`}>
                            <Icon size={14} strokeWidth={1.5} />
                          </div>
                          <span className={`text-[9px] tracking-wide font-body text-center max-w-[80px] ${done ? "text-foreground" : "text-muted-foreground"}`}>
                            {statusLabels[step]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Tracking info */}
              {order.tracking_number && (
                <div className="border-t border-border/20 pt-5 mb-8">
                  <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">رقم الشحنة</p>
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="font-body text-sm text-foreground" dir="ltr">{order.tracking_number}</p>
                    {order.tracking_url && (
                      <a href={order.tracking_url} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-wide text-accent font-body hover:underline">
                        تتبع لدى شركة الشحن →
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Shipping address */}
              <div className="border-t border-border/20 pt-5 mb-8">
                <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">الشحن إلى</p>
                <p className="text-sm text-foreground font-body">
                  {order.customer_name} — {order.shipping_city}, {order.shipping_governorate}
                </p>
              </div>

              {/* Items */}
              <div className="border-t border-border/20 pt-5">
                <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-4">منتجات الطلب</p>
                <div className="space-y-3">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-4 py-3 border-b border-border/10 last:border-0">
                      {item.image && (
                        <img src={item.image} alt={item.name} className="w-14 h-16 object-cover" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-body text-foreground">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground font-body mt-1">
                          {item.size && `${item.size} • `}{item.color && `${item.color} • `}الكمية: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-body text-foreground">
                        {Number(item.line_total).toLocaleString("ar-EG")} ج.م
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {searched && !order && !loading && !error && (
            <p className="text-center text-sm text-muted-foreground font-body mt-10">لم يتم العثور على نتائج</p>
          )}
        </section>
        <Footer />
      </main>
    </>
  );
};

export default TrackOrder;
