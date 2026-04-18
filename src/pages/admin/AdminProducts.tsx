import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { Plus, Edit2, Eye, EyeOff, Package, Search } from "lucide-react";
import { toast } from "sonner";

const AdminProducts = () => {
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "published" | "hidden" | "out">("all");
  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data } = await supabase
        .from("products")
        .select("id, slug, name, category, price_display, in_stock, is_published, display_order, images")
        .order("display_order", { ascending: true });
      return data || [];
    },
  });

  const filtered = (products || []).filter((p: any) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase()) && !p.slug.toLowerCase().includes(q.toLowerCase())) return false;
    if (filter === "published" && !p.is_published) return false;
    if (filter === "hidden" && p.is_published) return false;
    if (filter === "out" && p.in_stock) return false;
    return true;
  });

  const togglePublished = async (id: string, current: boolean) => {
    const { error } = await supabase.from("products").update({ is_published: !current }).eq("id", id);
    if (error) toast.error("فشل التحديث");
    else {
      toast.success(current ? "تم إخفاء المنتج" : "تم نشر المنتج");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      qc.invalidateQueries({ queryKey: ["products"] });
    }
  };

  const toggleStock = async (id: string, current: boolean) => {
    const { error } = await supabase.from("products").update({ in_stock: !current }).eq("id", id);
    if (error) toast.error("فشل التحديث");
    else {
      toast.success("تم التحديث");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">إدارة المخزون</p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
            <span className="italic">المنتجات</span>
          </h1>
        </div>
        <Link
          to="/admin/products/new"
          className="flex items-center gap-2 text-[11px] tracking-wide font-body bg-foreground text-background px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Plus size={14} strokeWidth={1.5} />
          منتج جديد
        </Link>
      </div>

      <div className="mb-6 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم أو الكود..." className="w-full bg-transparent border border-border/30 focus:border-accent pr-9 pl-3 py-2.5 text-sm font-body outline-none" />
        </div>
        <div className="flex gap-1 border border-border/20 p-1">
          {[
            { k: "all", l: "الكل" },
            { k: "published", l: "منشور" },
            { k: "hidden", l: "مخفي" },
            { k: "out", l: "نافذ" },
          ].map((f) => (
            <button key={f.k} onClick={() => setFilter(f.k as any)} className={`text-[10px] tracking-wide font-body px-3 py-1.5 transition-colors ${filter === f.k ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
              {f.l}
            </button>
          ))}
        </div>
        <span className="text-[10px] text-muted-foreground font-body mr-auto">{filtered.length} منتج</span>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      ) : filtered.length > 0 ? (
        <div className="border border-border/20">
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 border-b border-border/20 text-[10px] tracking-wide text-muted-foreground font-body">
            <span className="col-span-1"></span>
            <span className="col-span-4">المنتج</span>
            <span className="col-span-2">الفئة</span>
            <span className="col-span-2">السعر</span>
            <span className="col-span-1">المخزون</span>
            <span className="col-span-1">منشور</span>
            <span className="col-span-1">إجراء</span>
          </div>
          <div className="divide-y divide-border/15">
            {filtered.map((p: any) => {
              const imgs = Array.isArray(p.images) ? p.images : [];
              return (
                <div key={p.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-card/30 transition-colors">
                  <div className="col-span-2 md:col-span-1">
                    <div className="w-12 h-14 bg-muted overflow-hidden">
                      {imgs[0] && <img src={imgs[0]} alt={p.name} className="w-full h-full object-cover" />}
                    </div>
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <p className="font-display text-sm text-foreground">{p.name}</p>
                    <p className="text-[10px] text-muted-foreground font-body mt-0.5">{p.slug}</p>
                  </div>
                  <p className="col-span-6 md:col-span-2 text-xs text-foreground/60 font-body">{p.category}</p>
                  <p className="col-span-6 md:col-span-2 text-xs text-foreground font-body">{p.price_display}</p>
                  <button
                    onClick={() => toggleStock(p.id, p.in_stock)}
                    className={`col-span-4 md:col-span-1 text-[10px] tracking-wide font-body px-2 py-1 ${
                      p.in_stock ? "text-accent" : "text-destructive"
                    }`}
                  >
                    {p.in_stock ? "متوفر" : "نافذ"}
                  </button>
                  <button
                    onClick={() => togglePublished(p.id, p.is_published)}
                    className="col-span-4 md:col-span-1 flex items-center justify-center text-foreground/60 hover:text-accent transition-colors"
                  >
                    {p.is_published ? <Eye size={14} strokeWidth={1.5} /> : <EyeOff size={14} strokeWidth={1.5} />}
                  </button>
                  <Link
                    to={`/admin/products/${p.id}`}
                    className="col-span-4 md:col-span-1 flex items-center justify-center text-foreground/60 hover:text-accent transition-colors"
                  >
                    <Edit2 size={14} strokeWidth={1.5} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/30">
          <Package size={32} strokeWidth={1} className="text-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">لا توجد منتجات بعد</p>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
