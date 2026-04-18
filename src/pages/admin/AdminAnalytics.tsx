import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TrendingUp, ShoppingBag, Users, Package, DollarSign } from "lucide-react";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const RANGES = [
  { label: "آخر ٧ أيام", days: 7 },
  { label: "آخر ٣٠ يوم", days: 30 },
  { label: "آخر ٩٠ يوم", days: 90 },
  { label: "هذا العام", days: 365 },
];

const COLORS = ["hsl(var(--accent))", "hsl(var(--foreground))", "hsl(var(--muted-foreground))", "hsl(var(--accent) / 0.6)", "hsl(var(--foreground) / 0.4)"];

const AdminAnalytics = () => {
  const [range, setRange] = useState(30);
  const since = new Date(Date.now() - range * 86400_000).toISOString();

  const { data, isLoading } = useQuery({
    queryKey: ["admin-analytics", range],
    queryFn: async () => {
      const [orders, items] = await Promise.all([
        supabase.from("orders").select("total, status, created_at, shipping_governorate, payment_method, user_id, guest_email").gte("created_at", since),
        supabase.from("order_items").select("product_name, product_slug, quantity, line_total, orders!inner(created_at)").gte("orders.created_at", since),
      ]);
      const o = orders.data || [];
      const validOrders = o.filter((x) => x.status !== "cancelled" && x.status !== "refunded");
      const revenue = validOrders.reduce((s, x) => s + Number(x.total), 0);
      const aov = validOrders.length ? revenue / validOrders.length : 0;

      // مبيعات حسب اليوم
      const byDay: Record<string, { date: string; orders: number; revenue: number }> = {};
      validOrders.forEach((x) => {
        const d = new Date(x.created_at).toISOString().slice(0, 10);
        byDay[d] = byDay[d] || { date: d, orders: 0, revenue: 0 };
        byDay[d].orders += 1;
        byDay[d].revenue += Number(x.total);
      });
      const timeline = Object.values(byDay).sort((a, b) => a.date.localeCompare(b.date));

      // أكثر المنتجات مبيعاً
      const byProduct: Record<string, { name: string; qty: number; revenue: number }> = {};
      (items.data || []).forEach((it: any) => {
        const k = it.product_slug;
        byProduct[k] = byProduct[k] || { name: it.product_name, qty: 0, revenue: 0 };
        byProduct[k].qty += Number(it.quantity);
        byProduct[k].revenue += Number(it.line_total);
      });
      const topProducts = Object.values(byProduct).sort((a, b) => b.revenue - a.revenue).slice(0, 5);

      // المحافظات
      const byGov: Record<string, number> = {};
      validOrders.forEach((x) => {
        byGov[x.shipping_governorate] = (byGov[x.shipping_governorate] || 0) + 1;
      });
      const topGov = Object.entries(byGov).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([name, value]) => ({ name, value }));

      // حالات الطلبات
      const byStatus: Record<string, number> = {};
      o.forEach((x) => { byStatus[x.status] = (byStatus[x.status] || 0) + 1; });
      const statusData = Object.entries(byStatus).map(([name, value]) => ({ name: statusLabel(name), value }));

      return {
        revenue, aov, totalOrders: o.length, validOrders: validOrders.length,
        uniqueCustomers: new Set(validOrders.map((x) => x.user_id || x.guest_email)).size,
        timeline, topProducts, topGov, statusData,
      };
    },
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8 flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">إحصاءات وتحليلات</p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
            <span className="italic">التحليلات</span>
          </h1>
        </div>
        <div className="flex gap-1 border border-border/20 p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setRange(r.days)}
              className={`text-[10px] tracking-wide font-body px-3 py-1.5 transition-colors ${range === r.days ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading || !data ? (
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      ) : (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <Stat label="الإيرادات" value={`${data.revenue.toLocaleString("ar-EG")} ج.م`} icon={DollarSign} accent />
            <Stat label="الطلبات" value={data.totalOrders} icon={ShoppingBag} />
            <Stat label="طلبات صالحة" value={data.validOrders} icon={TrendingUp} />
            <Stat label="متوسط الطلب" value={`${Math.round(data.aov).toLocaleString("ar-EG")} ج.م`} icon={Package} />
            <Stat label="عملاء فريدون" value={data.uniqueCustomers} icon={Users} />
          </div>

          {/* Timeline */}
          <div className="border border-border/20 p-5">
            <h3 className="font-display text-lg mb-5">الإيرادات يومياً</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={data.timeline}>
                <CartesianGrid stroke="hsl(var(--border) / 0.2)" strokeDasharray="3 3" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={10} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* Top products */}
            <div className="border border-border/20 p-5">
              <h3 className="font-display text-lg mb-5">أكثر ٥ منتجات مبيعاً</h3>
              {data.topProducts.length === 0 ? (
                <p className="text-xs text-muted-foreground font-body">لا توجد بيانات</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.topProducts} layout="vertical">
                    <CartesianGrid stroke="hsl(var(--border) / 0.2)" />
                    <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={10} />
                    <YAxis dataKey="name" type="category" stroke="hsl(var(--muted-foreground))" fontSize={10} width={120} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                    <Bar dataKey="revenue" fill="hsl(var(--accent))" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Status pie */}
            <div className="border border-border/20 p-5">
              <h3 className="font-display text-lg mb-5">توزيع حالات الطلبات</h3>
              {data.statusData.length === 0 ? (
                <p className="text-xs text-muted-foreground font-body">لا توجد بيانات</p>
              ) : (
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={data.statusData} dataKey="value" nameKey="name" outerRadius={80} label={{ fontSize: 10 }}>
                      {data.statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top governorates */}
          <div className="border border-border/20 p-5">
            <h3 className="font-display text-lg mb-5">أكثر المحافظات طلباً</h3>
            <div className="space-y-2">
              {data.topGov.map((g) => (
                <div key={g.name} className="flex items-center gap-3">
                  <span className="text-xs text-foreground font-body w-32">{g.name}</span>
                  <div className="flex-1 h-2 bg-muted">
                    <div className="h-full bg-accent" style={{ width: `${(g.value / data.topGov[0].value) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground font-body w-12 text-left">{g.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Stat = ({ label, value, icon: Icon, accent }: any) => (
  <div className={`p-5 border ${accent ? "border-accent/40 bg-accent/5" : "border-border/20"}`}>
    <Icon size={18} strokeWidth={1.5} className={accent ? "text-accent mb-3" : "text-foreground/40 mb-3"} />
    <p className="text-[10px] tracking-wide text-muted-foreground font-body mb-1">{label}</p>
    <p className="font-display text-xl text-foreground">{value}</p>
  </div>
);

const statusLabel = (s: string) => ({
  pending: "قيد الانتظار", confirmed: "مؤكد", processing: "قيد التجهيز",
  shipped: "تم الشحن", delivered: "تم التسليم", cancelled: "ملغي", refunded: "مسترد",
}[s] || s);

export default AdminAnalytics;
