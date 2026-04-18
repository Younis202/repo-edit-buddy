import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ShoppingBag, Search } from "lucide-react";
import { toast } from "sonner";

const STATUS_OPTIONS = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled", "refunded"] as const;

const statusLabel = (s: string) => ({
  pending: "قيد الانتظار", confirmed: "مؤكد", processing: "قيد التجهيز",
  shipped: "تم الشحن", delivered: "تم التسليم", cancelled: "ملغي", refunded: "مسترد",
}[s] || s);

const AdminOrders = () => {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { data: orders, isLoading } = useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data } = await supabase
        .from("orders")
        .select("id, order_number, shipping_full_name, shipping_phone, total, status, payment_method, created_at")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const filtered = (orders || []).filter((o: any) => {
    if (statusFilter !== "all" && o.status !== statusFilter) return false;
    if (q) {
      const t = q.toLowerCase();
      return o.order_number.toLowerCase().includes(t)
        || (o.shipping_full_name || "").toLowerCase().includes(t)
        || (o.shipping_phone || "").includes(t);
    }
    return true;
  });

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status: status as any }).eq("id", id);
    if (error) toast.error("فشل التحديث");
    else {
      toast.success("تم تحديث حالة الطلب");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">إدارة المبيعات</p>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
          <span className="italic">الطلبات</span>
        </h1>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث برقم الطلب، الاسم، الجوال..." className="w-full bg-transparent border border-border/30 focus:border-accent pr-9 pl-3 py-2.5 text-sm font-body outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="bg-transparent border border-border/30 px-3 py-2 text-xs font-body text-foreground outline-none focus:border-accent">
          <option value="all">كل الحالات</option>
          {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
        </select>
        <span className="text-[10px] text-muted-foreground font-body mr-auto">{filtered.length} طلب</span>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      ) : filtered.length > 0 ? (
        <div className="border border-border/20 overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b border-border/20">
              <tr className="text-[10px] tracking-wide text-muted-foreground font-body">
                <th className="p-4 text-right">رقم الطلب</th>
                <th className="p-4 text-right">العميل</th>
                <th className="p-4 text-right">الجوال</th>
                <th className="p-4 text-right">المبلغ</th>
                <th className="p-4 text-right">التاريخ</th>
                <th className="p-4 text-right">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/15">
              {filtered.map((o: any) => (
                <tr key={o.id} className="hover:bg-card/30 transition-colors">
                  <td className="p-4">
                    <Link to={`/admin/orders/${o.id}`} className="font-display text-sm text-foreground hover:text-accent transition-colors">
                      {o.order_number}
                    </Link>
                  </td>
                  <td className="p-4 text-sm text-foreground/80 font-body">{o.shipping_full_name}</td>
                  <td className="p-4 text-xs text-muted-foreground font-body" dir="ltr">{o.shipping_phone}</td>
                  <td className="p-4 text-sm text-foreground font-body">{Number(o.total).toLocaleString("ar-EG")} ج.م</td>
                  <td className="p-4 text-[10px] text-muted-foreground font-body">
                    {new Date(o.created_at).toLocaleDateString("ar-EG")}
                  </td>
                  <td className="p-4">
                    <select
                      value={o.status}
                      onChange={(e) => updateStatus(o.id, e.target.value)}
                      className="bg-transparent border border-border/30 px-2 py-1 text-[10px] font-body text-foreground outline-none focus:border-accent"
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{statusLabel(s)}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/30">
          <ShoppingBag size={32} strokeWidth={1} className="text-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">لا توجد نتائج</p>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
