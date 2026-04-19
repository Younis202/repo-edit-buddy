import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, Save, Trash2, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ImageUploader from "@/components/admin/ImageUploader";

const empty = {
  name: "",
  name_italic: "",
  slug: "",
  category: "عود",
  tag: "",
  short_description: "",
  material: "",
  season: "",
  price: 0,
  price_display: "",
  original_price: null as number | null,
  original_price_display: "",
  in_stock: true,
  is_published: true,
  display_order: 0,
  stock_count: 100,
  low_stock_threshold: 5,
  sizes: ["50مل", "100مل"] as string[],
  colors: [{ name: "ذهبي", value: "#D4AF37" }] as { name: string; value: string }[],
  images: [] as string[],
  accordion: [
    { title: "المكونات", content: "" },
    { title: "الاستخدام", content: "" },
  ] as { title: string; content: string }[],
};

const AdminProductForm = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [form, setForm] = useState<typeof empty>(empty);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (data) {
        setForm({
          ...empty,
          ...data,
          sizes: Array.isArray(data.sizes) ? (data.sizes as string[]) : [],
          colors: Array.isArray(data.colors) ? (data.colors as any[]) : [],
          images: Array.isArray(data.images) ? (data.images as string[]) : [],
          accordion: Array.isArray(data.accordion) ? (data.accordion as any[]) : [],
        });
      }
      setLoading(false);
    })();
  }, [id, isNew]);

  const update = (k: keyof typeof empty, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name,
      name_italic: form.name_italic || null,
      slug: form.slug,
      category: form.category,
      tag: form.tag || null,
      short_description: form.short_description || null,
      material: form.material || null,
      season: form.season || null,
      price: Number(form.price),
      price_display: form.price_display,
      original_price: form.original_price ? Number(form.original_price) : null,
      original_price_display: form.original_price_display || null,
      in_stock: form.in_stock,
      is_published: form.is_published,
      display_order: Number(form.display_order),
      stock_count: Number(form.stock_count),
      low_stock_threshold: Number(form.low_stock_threshold),
      sizes: form.sizes,
      colors: form.colors,
      images: form.images,
      accordion: form.accordion,
    };

    const { error, data } = isNew
      ? await supabase.from("products").insert(payload).select().single()
      : await supabase.from("products").update(payload).eq("id", id).select().single();

    setSaving(false);
    if (error) {
      toast.error("فشل الحفظ: " + error.message);
      return;
    }
    toast.success("تم الحفظ");
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
    if (isNew && data) navigate(`/admin/products/${data.id}`);
  };

  const remove = async () => {
    if (!confirm("هل أنت متأكد من حذف هذا المنتج؟")) return;
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) toast.error("فشل الحذف");
    else {
      toast.success("تم الحذف");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      navigate("/admin/products");
    }
  };

  if (loading) return <div className="p-10 text-sm text-muted-foreground font-body">جاري التحميل...</div>;

  return (
    <form onSubmit={save} className="p-6 md:p-10 max-w-4xl mx-auto">
      <Link to="/admin/products" className="flex items-center gap-2 text-[10px] tracking-wide text-muted-foreground hover:text-foreground mb-6 font-body">
        <ArrowRight size={12} />
        العودة للمنتجات
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-display text-3xl font-light text-foreground">
          {isNew ? "منتج جديد" : "تعديل المنتج"}
        </h1>
        <div className="flex gap-3">
          {!isNew && (
            <button type="button" onClick={remove} className="flex items-center gap-2 text-[11px] tracking-wide text-destructive border border-destructive/30 px-5 py-2.5 hover:bg-destructive/10 transition-all font-body">
              <Trash2 size={13} strokeWidth={1.5} />
              حذف
            </button>
          )}
          <button type="submit" disabled={saving} className="flex items-center gap-2 text-[11px] tracking-wide bg-foreground text-background px-5 py-2.5 hover:bg-accent hover:text-accent-foreground transition-all font-body disabled:opacity-50">
            <Save size={13} strokeWidth={1.5} />
            {saving ? "جاري الحفظ..." : "حفظ"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Field label="الاسم" required>
          <input value={form.name} onChange={(e) => update("name", e.target.value)} required className={inputCls} />
        </Field>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="الاسم بالخط المائل (آخر كلمة)">
            <input value={form.name_italic} onChange={(e) => update("name_italic", e.target.value)} className={inputCls} />
          </Field>
          <Field label="الـ slug (للرابط)" required>
            <input value={form.slug} onChange={(e) => update("slug", e.target.value)} required placeholder="oud-royal" className={inputCls} />
          </Field>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <Field label="الفئة" required>
            <select value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls}>
              {["عود", "زهري", "مسك", "شرقي", "بخور", "خشبي"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </Field>
          <Field label="التاج (مثل: حصري)">
            <input value={form.tag} onChange={(e) => update("tag", e.target.value)} className={inputCls} />
          </Field>
          <Field label="ترتيب العرض">
            <input type="number" value={form.display_order} onChange={(e) => update("display_order", e.target.value)} className={inputCls} />
          </Field>
        </div>

        <Field label="وصف مختصر">
          <textarea value={form.short_description} onChange={(e) => update("short_description", e.target.value)} rows={2} className={inputCls} />
        </Field>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="السعر (رقم)" required>
            <input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} required className={inputCls} />
          </Field>
          <Field label='السعر للعرض (مثل "٢,٥٠٠ ج.م")' required>
            <input value={form.price_display} onChange={(e) => update("price_display", e.target.value)} required className={inputCls} />
          </Field>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="السعر الأصلي (للخصم)">
            <input type="number" step="0.01" value={form.original_price ?? ""} onChange={(e) => update("original_price", e.target.value || null)} className={inputCls} />
          </Field>
          <Field label="السعر الأصلي للعرض">
            <input value={form.original_price_display} onChange={(e) => update("original_price_display", e.target.value)} className={inputCls} />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <Field label="المادة">
            <input value={form.material} onChange={(e) => update("material", e.target.value)} className={inputCls} />
          </Field>
          <Field label="الموسم">
            <input value={form.season} onChange={(e) => update("season", e.target.value)} className={inputCls} />
          </Field>
        </div>

        <div className="grid md:grid-cols-2 gap-4 p-4 border border-border/20 bg-card/20">
          <Field label="الكمية المتوفرة بالمخزون">
            <input type="number" min="0" value={form.stock_count} onChange={(e) => update("stock_count", e.target.value)} className={inputCls} />
          </Field>
          <Field label="حد التنبيه (إشعار عند أقل من)">
            <input type="number" min="0" value={form.low_stock_threshold} onChange={(e) => update("low_stock_threshold", e.target.value)} className={inputCls} />
          </Field>
        </div>

        <Field label="الأحجام (مفصولة بفاصلة)">
          <input
            value={form.sizes.join(", ")}
            onChange={(e) => update("sizes", e.target.value.split(",").map((s) => s.trim()).filter(Boolean))}
            className={inputCls}
          />
        </Field>

        <div className="border border-accent/20 bg-accent/5 p-4 rounded">
          <p className="text-[11px] text-foreground font-body mb-1">نوع العبوة</p>
          <p className="text-[10px] text-muted-foreground font-body leading-relaxed">
            عبوات شذايا (كلاسيك ذهبي، أسطواني أسود، قبّة سوداء، دمعة كريستال) موحّدة لكل المنتجات ويختارها العميل من صفحة المنتج. لا تحتاج لإضافتها هنا.
          </p>
        </div>

        <Field label="صور المنتج (الأولى = الغلاف، يمكن سحب الترتيب)">
          <ImageUploader images={form.images} onChange={(imgs) => update("images", imgs)} />
        </Field>

        <Field label="أقسام التفاصيل">
          <div className="space-y-3">
            {form.accordion.map((a, i) => (
              <div key={i} className="border border-border/20 p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <input
                    className={inputCls + " flex-1"}
                    placeholder="عنوان القسم (مثل: المكونات)"
                    value={a.title}
                    onChange={(e) => {
                      const next = [...form.accordion];
                      next[i] = { ...next[i], title: e.target.value };
                      update("accordion", next);
                    }}
                  />
                  <button type="button" className="text-destructive p-2" onClick={() => update("accordion", form.accordion.filter((_, x) => x !== i))}>
                    <X size={13} />
                  </button>
                </div>
                <textarea
                  className={inputCls}
                  placeholder="محتوى القسم"
                  rows={3}
                  value={a.content}
                  onChange={(e) => {
                    const next = [...form.accordion];
                    next[i] = { ...next[i], content: e.target.value };
                    update("accordion", next);
                  }}
                />
              </div>
            ))}
            <button type="button" onClick={() => update("accordion", [...form.accordion, { title: "", content: "" }])} className="flex items-center gap-1 text-[10px] text-accent font-body">
              <Plus size={11} /> إضافة قسم
            </button>
          </div>
        </Field>

        <div className="flex gap-6">
          <label className="flex items-center gap-2 text-sm text-foreground font-body">
            <input type="checkbox" checked={form.in_stock} onChange={(e) => update("in_stock", e.target.checked)} />
            متوفر بالمخزون
          </label>
          <label className="flex items-center gap-2 text-sm text-foreground font-body">
            <input type="checkbox" checked={form.is_published} onChange={(e) => update("is_published", e.target.checked)} />
            منشور
          </label>
        </div>
      </div>
    </form>
  );
};

const inputCls =
  "w-full bg-transparent border border-border/30 focus:border-accent px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors";

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    {children}
  </div>
);

export default AdminProductForm;
