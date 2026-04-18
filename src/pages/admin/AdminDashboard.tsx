import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingBag, Package, TrendingUp, Clock, AlertTriangle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [orders, products, recentOrders, lowStock] = await Promise.all([
        supabase.from("orders").select("total, status, created_at"),
        supabase.from("products").select("id, in_stock"),
        supabase.from("orders").select("id, order_number, shipping_full_name, total, status, created_at").order("created_at", { ascending: false }).limit(8),
        supabase.from("products").select("id, name, slug, stock_count, low_stock_threshold, images").eq("is_published", true).order("stock_count", { ascending: true }).limit(20),
      ]);
      const ordersData = orders.data || [];
      const totalRevenue = ordersData
        .filter((o) => o.status !== "cancelled" && o.status !== "refunded")
        .reduce((sum, o) => sum + Number(o.total), 0);
      const pending = ordersData.filter((o) => o.status === "pending").length;
      const lowStockItems = (lowStock.data || []).filter((p: any) => p.stock_count <= p.low_stock_threshold);
      return {
        totalRevenue,
        totalOrders: ordersData.length,
        pendingOrders: pending,
        totalProducts: (products.data || []).length,
        outOfStock: (products.data || []).filter((p) => !p.in_stock).length,
        recent: recentOrders.data || [],
        lowStockItems,
      };
    },
  });

  const cards = [
    { label: "إجمالي المبيعات", value: stats ? `${stats.totalRevenue.toLocaleString("ar-EG")} ج.م` : "...", icon: TrendingUp, accent: true },
    { label: "إجمالي الطلبات", value: stats?.totalOrders ?? "...", icon: ShoppingBag },
    { label: "قيد الانتظار", value: stats?.pendingOrders ?? "...", icon: Clock, urgent: !!stats?.pendingOrders },
    { label: "المنتجات", value: stats ? `${stats.totalProducts} (${stats.outOfStock} نافذ)` : "...", icon: Package },
  ];

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-10">
        <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">لوحة التحكم</p>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
          نظرة <span className="italic">عامة</span>
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <div
            key={c.label}
            className={`p-6 border ${c.accent ? "border-accent/40 bg-accent/5" : c.urgent ? "border-destructive/40 bg-destructive/5" : "border-border/20"}`}
          >
            <c.icon size={20} strokeWidth={1.5} className={`mb-4 ${c.accent ? "text-accent" : c.urgent ? "text-destructive" : "text-foreground/40"}`} />
            <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-2">{c.label}</p>
            <p className="font-display text-2xl text-foreground">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {stats && stats.lowStockItems.length > 0 && (
        <div className="border border-destructive/30 bg-destructive/5 mb-10">
          <div className="p-5 border-b border-destructive/20 flex items-center justify-between">
            <h3 className="font-display text-lg text-destructive flex items-center gap-2">
              <AlertTriangle size={16} strokeWidth={1.5} />
              تنبيه: مخزون منخفض ({stats.lowStockItems.length})
            </h3>
            <Link to="/admin/products" className="text-[10px] tracking-wide text-destructive hover:underline font-body">
              عرض المنتجات
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 divide-x divide-y divide-border/15">
            {stats.lowStockItems.slice(0, 6).map((p: any) => {
              const imgs = Array.isArray(p.images) ? p.images : [];
              return (
                <Link key={p.id} to={`/admin/products/${p.id}`} className="flex items-center gap-3 p-4 hover:bg-card/30 transition-colors">
                  <div className="w-10 h-12 bg-muted overflow-hidden flex-shrink-0">
                    {imgs[0] && <img src={imgs[0]} alt={p.name} className="w-full h-full object-cover" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-xs text-foreground truncate">{p.name}</p>
                    <p className="text-[10px] text-destructive font-body mt-0.5">باقي {p.stock_count}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div className="border border-border/20">
        <div className="p-5 border-b border-border/20 flex items-center justify-between">
          <h3 className="font-display text-lg text-foreground">آخر الطلبات</h3>
          <Link to="/admin/orders" className="text-[10px] tracking-wide text-accent hover:underline font-body flex items-center gap-1">
            عرض الكل <ArrowLeft size={11} />
          </Link>
        </div>
        <div className="divide-y divide-border/15">
          {stats?.recent.length === 0 && (
            <p className="p-8 text-center text-sm text-muted-foreground font-body">لا توجد طلبات بعد</p>
          )}
          {stats?.recent.map((o: any) => (
            <Link
              key={o.id}
              to={`/admin/orders/${o.id}`}
              className="flex items-center justify-between p-5 hover:bg-card/30 transition-colors"
            >
              <div>
                <p className="font-display text-sm text-foreground">{o.order_number}</p>
                <p className="text-[10px] text-muted-foreground font-body mt-0.5">{o.shipping_full_name}</p>
              </div>
              <div className="text-left">
                <p className="text-sm text-foreground font-body">{Number(o.total).toLocaleString("ar-EG")} ج.م</p>
                <p className="text-[10px] text-muted-foreground font-body mt-0.5">{statusLabel(o.status)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const statusLabel = (s: string) => {
  const map: Record<string, string> = {
    pending: "قيد الانتظار",
    confirmed: "مؤكد",
    processing: "قيد التجهيز",
    shipped: "تم الشحن",
    delivered: "تم التسليم",
    cancelled: "ملغي",
    refunded: "مسترد",
  };
  return map[s] || s;
};

export default AdminDashboard;
