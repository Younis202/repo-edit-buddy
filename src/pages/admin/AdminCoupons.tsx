import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2, Tag } from "lucide-react";
import { toast } from "sonner";

const AdminCoupons = () => {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    code: "",
    description: "",
    discount_type: "percent" as "percent" | "fixed",
    discount_value: 10,
    min_order_amount: 0,
    max_uses: "" as number | "",
    expires_at: "",
    is_active: true,
  });

  const { data: coupons, isLoading } = useQuery({
    queryKey: ["admin-coupons"],
    queryFn: async () => {
      const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
      return data || [];
    },
  });

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      code: form.code.trim().toUpperCase(),
      description: form.description || null,
      discount_type: form.discount_type,
      discount_value: Number(form.discount_value),
      min_order_amount: Number(form.min_order_amount),
      max_uses: form.max_uses ? Number(form.max_uses) : null,
      expires_at: form.expires_at || null,
      is_active: form.is_active,
    };
    const { error } = await supabase.from("coupons").insert(payload);
    if (error) toast.error("فشل الإضافة: " + error.message);
    else {
      toast.success("تم إنشاء الكوبون");
      setShowForm(false);
      setForm({ code: "", description: "", discount_type: "percent", discount_value: 10, min_order_amount: 0, max_uses: "", expires_at: "", is_active: true });
      qc.invalidateQueries({ queryKey: ["admin-coupons"] });
    }
  };

  const toggle = async (id: string, current: boolean) => {
    const { error } = await supabase.from("coupons").update({ is_active: !current }).eq("id", id);
    if (!error) qc.invalidateQueries({ queryKey: ["admin-coupons"] });
  };

  const remove = async (id: string) => {
    if (!confirm("حذف الكوبون؟")) return;
    const { error } = await supabase.from("coupons").delete().eq("id", id);
    if (error) toast.error("فشل الحذف");
    else {
      toast.success("تم الحذف");
      qc.invalidateQueries({ queryKey: ["admin-coupons"] });
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">العروض الترويجية</p>
          <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
            <span className="italic">الكوبونات</span>
          </h1>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 text-[11px] tracking-wide font-body bg-foreground text-background px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all"
        >
          <Plus size={14} strokeWidth={1.5} />
          {showForm ? "إلغاء" : "كوبون جديد"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={create} className="border border-border/20 p-6 mb-8 grid md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">الكود *</label>
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} required placeholder="WELCOME10" className={inputCls} />
          </div>
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">الوصف</label>
            <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="خصم ترحيبي" className={inputCls} />
          </div>
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">نوع الخصم *</label>
            <select value={form.discount_type} onChange={(e) => setForm({ ...form, discount_type: e.target.value as any })} className={inputCls}>
              <option value="percent">نسبة مئوية %</option>
              <option value="fixed">مبلغ ثابت ج.م</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">قيمة الخصم *</label>
            <input type="number" step="0.01" value={form.discount_value} onChange={(e) => setForm({ ...form, discount_value: Number(e.target.value) })} required className={inputCls} />
          </div>
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">الحد الأدنى للطلب (ج.م)</label>
            <input type="number" value={form.min_order_amount} onChange={(e) => setForm({ ...form, min_order_amount: Number(e.target.value) })} className={inputCls} />
          </div>
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">عدد الاستخدامات الأقصى (فارغ = بدون حد)</label>
            <input type="number" value={form.max_uses} onChange={(e) => setForm({ ...form, max_uses: e.target.value ? Number(e.target.value) : "" })} className={inputCls} />
          </div>
          <div>
            <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">تاريخ الانتهاء (اختياري)</label>
            <input type="datetime-local" value={form.expires_at} onChange={(e) => setForm({ ...form, expires_at: e.target.value })} className={inputCls} />
          </div>
          <div className="flex items-end">
            <label className="flex items-center gap-2 text-sm text-foreground font-body">
              <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} />
              فعال
            </label>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="text-[11px] tracking-wide bg-foreground text-background px-6 py-3 hover:bg-accent hover:text-accent-foreground transition-all font-body">
              إنشاء الكوبون
            </button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      ) : coupons && coupons.length > 0 ? (
        <div className="border border-border/20 divide-y divide-border/15">
          {coupons.map((c: any) => (
            <div key={c.id} className="p-5 flex items-center gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <p className="font-display text-lg text-foreground">{c.code}</p>
                {c.description && <p className="text-[10px] text-muted-foreground font-body mt-0.5">{c.description}</p>}
              </div>
              <div className="text-xs text-foreground/70 font-body">
                {c.discount_type === "percent" ? `${c.discount_value}%` : `${c.discount_value} ج.م`}
              </div>
              <div className="text-[10px] text-muted-foreground font-body">
                استُخدم {c.uses_count}{c.max_uses ? `/${c.max_uses}` : ""}
              </div>
              <button
                onClick={() => toggle(c.id, c.is_active)}
                className={`text-[10px] tracking-wide font-body px-3 py-1 border ${c.is_active ? "border-accent text-accent" : "border-border/30 text-muted-foreground"}`}
              >
                {c.is_active ? "فعال" : "معطل"}
              </button>
              <button onClick={() => remove(c.id)} className="text-destructive hover:opacity-70">
                <Trash2 size={14} strokeWidth={1.5} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/30">
          <Tag size={32} strokeWidth={1} className="text-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">لا توجد كوبونات بعد</p>
        </div>
      )}
    </div>
  );
};

const inputCls = "w-full bg-transparent border border-border/30 focus:border-accent px-3 py-2 text-sm font-body text-foreground outline-none transition-colors";

export default AdminCoupons;
