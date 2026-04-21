import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Save, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

type Gov = { name: string; cost: number };

const AdminSettings = () => {
  const qc = useQueryClient();
  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, any> = {};
      (data || []).forEach((r) => (map[r.key] = r.value));
      return map;
    },
  });

  const [shipping, setShipping] = useState<{ default_cost: number; free_threshold: number; governorates: Gov[] }>({
    default_cost: 60, free_threshold: 1500, governorates: [],
  });
  const [store, setStore] = useState({ name: "", tagline: "", phone: "", whatsapp: "", email: "", instagram: "", facebook: "" });
  const [announcement, setAnnouncement] = useState({ enabled: true, text: "", link: "" });

  useEffect(() => {
    if (settings?.shipping) setShipping(settings.shipping);
    if (settings?.store) setStore(settings.store);
    if (settings?.announcement) setAnnouncement(settings.announcement);
  }, [settings]);

  const save = async (key: string, value: any) => {
    const { error } = await supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) toast.error("فشل الحفظ");
    else {
      toast.success("تم الحفظ");
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
    }
  };

  if (isLoading) return <div className="p-10 text-sm text-muted-foreground font-body">جاري التحميل...</div>;

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10">
      <div>
        <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">تخصيص المتجر</p>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
          <span className="italic">الإعدادات</span>
        </h1>
      </div>

      {/* بيانات المتجر */}
      <Section title="بيانات المتجر" onSave={() => save("store", store)}>
        <div className="grid md:grid-cols-2 gap-4">
          <Field label="اسم المتجر"><input className={input} value={store.name} onChange={(e) => setStore({ ...store, name: e.target.value })} /></Field>
          <Field label="الشعار"><input className={input} value={store.tagline} onChange={(e) => setStore({ ...store, tagline: e.target.value })} /></Field>
          <Field label="رقم الهاتف"><input className={input} value={store.phone} onChange={(e) => setStore({ ...store, phone: e.target.value })} /></Field>
          <Field label="رقم واتساب"><input className={input} value={store.whatsapp} onChange={(e) => setStore({ ...store, whatsapp: e.target.value })} /></Field>
          <Field label="البريد الإلكتروني"><input className={input} value={store.email} onChange={(e) => setStore({ ...store, email: e.target.value })} /></Field>
          <Field label="انستغرام (اسم الحساب)"><input className={input} value={store.instagram} onChange={(e) => setStore({ ...store, instagram: e.target.value })} /></Field>
          <Field label="فيسبوك (اسم الحساب)"><input className={input} value={store.facebook} onChange={(e) => setStore({ ...store, facebook: e.target.value })} /></Field>
        </div>
      </Section>

      {/* شريط الإعلان */}
      <Section title="شريط الإعلان (أعلى الموقع)" onSave={() => save("announcement", announcement)}>
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-sm font-body">
            <input type="checkbox" checked={announcement.enabled} onChange={(e) => setAnnouncement({ ...announcement, enabled: e.target.checked })} />
            تفعيل الشريط
          </label>
          <Field label="النص"><input className={input} value={announcement.text} onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })} /></Field>
          <Field label="الرابط (اختياري)"><input className={input} value={announcement.link} onChange={(e) => setAnnouncement({ ...announcement, link: e.target.value })} placeholder="/shop" /></Field>
        </div>
      </Section>

      {/* الشحن */}
      <Section title="الشحن والمحافظات" onSave={() => save("shipping", shipping)}>
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <Field label="تكلفة الشحن الافتراضية (ج.م)">
            <input type="number" className={input} value={shipping.default_cost} onChange={(e) => setShipping({ ...shipping, default_cost: Number(e.target.value) })} />
          </Field>
          <Field label="حد الشحن المجاني الداخلي (اختياري — اتركها 0 لتعطيله)">
            <input type="number" className={input} value={shipping.free_threshold} onChange={(e) => setShipping({ ...shipping, free_threshold: Number(e.target.value) })} />
          </Field>
        </div>

        <div className="border border-border/20">
          <div className="flex items-center justify-between p-3 border-b border-border/20">
            <p className="text-[10px] tracking-wide font-body text-muted-foreground">المحافظات ({shipping.governorates.length})</p>
            <button
              type="button"
              onClick={() => setShipping({ ...shipping, governorates: [...shipping.governorates, { name: "", cost: 60 }] })}
              className="flex items-center gap-1 text-[10px] text-accent font-body"
            >
              <Plus size={12} /> إضافة محافظة
            </button>
          </div>
          <div className="divide-y divide-border/15 max-h-[400px] overflow-y-auto">
            {shipping.governorates.map((g, i) => (
              <div key={i} className="grid grid-cols-12 gap-2 p-3 items-center">
                <input
                  className={input + " col-span-7"}
                  value={g.name}
                  placeholder="اسم المحافظة"
                  onChange={(e) => {
                    const next = [...shipping.governorates];
                    next[i] = { ...next[i], name: e.target.value };
                    setShipping({ ...shipping, governorates: next });
                  }}
                />
                <input
                  type="number"
                  className={input + " col-span-4"}
                  value={g.cost}
                  onChange={(e) => {
                    const next = [...shipping.governorates];
                    next[i] = { ...next[i], cost: Number(e.target.value) };
                    setShipping({ ...shipping, governorates: next });
                  }}
                />
                <button
                  type="button"
                  className="col-span-1 text-destructive"
                  onClick={() => setShipping({ ...shipping, governorates: shipping.governorates.filter((_, x) => x !== i) })}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  );
};

const Section = ({ title, children, onSave }: { title: string; children: React.ReactNode; onSave: () => void }) => (
  <div className="border border-border/20">
    <div className="flex items-center justify-between p-5 border-b border-border/20">
      <h3 className="font-display text-lg text-foreground">{title}</h3>
      <button onClick={onSave} className="flex items-center gap-2 text-[11px] tracking-wide bg-foreground text-background px-5 py-2 hover:bg-accent hover:text-accent-foreground transition-all font-body">
        <Save size={13} strokeWidth={1.5} /> حفظ
      </button>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">{label}</label>
    {children}
  </div>
);

const input = "w-full bg-transparent border border-border/30 focus:border-accent px-3 py-2 text-sm font-body text-foreground outline-none transition-colors";

export default AdminSettings;
