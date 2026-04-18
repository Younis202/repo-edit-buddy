import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { LogOut, Package, MapPin, User as UserIcon, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { db as supabase } from "@/integrations/supabase/db";
import { usePageSEO } from "@/hooks/usePageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import { toast } from "@/hooks/use-toast";

interface Profile {
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
}

const statusLabels: Record<string, string> = {
  pending: "قيد المراجعة",
  confirmed: "مؤكد",
  processing: "قيد التجهيز",
  shipped: "تم الشحن",
  delivered: "تم التسليم",
  cancelled: "ملغى",
  refunded: "مسترد",
};

const Account = () => {
  usePageSEO({ title: "حسابي", description: "إدارة حسابك وطلباتك في شذايا." });
  const { user, loading, signOut } = useAuth();
  const { isAdmin } = useIsAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"profile" | "orders">("profile");
  const [profile, setProfile] = useState<Profile>({ first_name: "", last_name: "", phone: "" });
  const [orders, setOrders] = useState<Order[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) navigate("/auth", { replace: true });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await supabase.from("profiles").select("first_name, last_name, phone").eq("user_id", user.id).maybeSingle();
      if (data) setProfile({ first_name: data.first_name || "", last_name: data.last_name || "", phone: data.phone || "" });

      const { data: ord } = await supabase.from("orders").select("id, order_number, status, total, created_at").eq("user_id", user.id).order("created_at", { ascending: false });
      if (ord) setOrders(ord);
    })();
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").upsert({ user_id: user.id, ...profile }, { onConflict: "user_id" });
    setSaving(false);
    if (error) toast({ title: "خطأ", description: error.message, variant: "destructive" });
    else toast({ title: "تم الحفظ" });
  };

  if (loading || !user) {
    return (
      <main className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      </main>
    );
  }

  return (
    <>
      <FilmGrain />
      <main className="bg-background min-h-screen">
        <Navbar />
        <section className="pt-24 md:pt-32 pb-16 px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <nav className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-8">
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">حسابي</span>
            </nav>
            <p className="text-[10px] tracking-wide text-muted-foreground mb-3 font-body">{user.email}</p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-12">
              مرحباً <span className="italic">{profile.first_name || "بك"}</span>
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Sidebar */}
            <aside className="lg:col-span-3 space-y-1">
              <button onClick={() => setTab("profile")} className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] font-body tracking-wide text-right transition-colors ${tab === "profile" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                <UserIcon size={14} strokeWidth={1.5} />
                البيانات الشخصية
              </button>
              <button onClick={() => setTab("orders")} className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] font-body tracking-wide text-right transition-colors ${tab === "orders" ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>
                <Package size={14} strokeWidth={1.5} />
                طلباتي ({orders.length})
              </button>
              <Link to="/wishlist" className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-body tracking-wide text-muted-foreground hover:text-foreground transition-colors">
                <MapPin size={14} strokeWidth={1.5} />
                المفضلة
              </Link>
              {isAdmin && (
                <Link to="/admin" className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-body tracking-wide text-accent hover:opacity-70 transition-colors border-t border-border/20 mt-4 pt-4">
                  <LayoutDashboard size={14} strokeWidth={1.5} />
                  لوحة التحكم
                </Link>
              )}
              <button onClick={async () => { await signOut(); navigate("/"); }} className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-body tracking-wide text-destructive/70 hover:text-destructive transition-colors mt-6 border-t border-border/20 pt-6">
                <LogOut size={14} strokeWidth={1.5} />
                تسجيل الخروج
              </button>
            </aside>

            {/* Content */}
            <div className="lg:col-span-9">
              {tab === "profile" && (
                <motion.form onSubmit={handleSaveProfile} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border/20 p-8 max-w-xl">
                  <h2 className="font-display text-2xl text-foreground mb-8">البيانات الشخصية</h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <input value={profile.first_name || ""} onChange={(e) => setProfile({ ...profile, first_name: e.target.value })} placeholder="الاسم الأول" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body outline-none transition-colors" />
                      <input value={profile.last_name || ""} onChange={(e) => setProfile({ ...profile, last_name: e.target.value })} placeholder="اسم العائلة" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body outline-none transition-colors" />
                    </div>
                    <input value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} placeholder="رقم الجوال" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body outline-none transition-colors" />
                    <input value={user.email || ""} disabled className="w-full bg-transparent border-b border-border/30 pb-3 pt-1 text-sm font-body text-muted-foreground outline-none" />
                  </div>
                  <button type="submit" disabled={saving} className="mt-8 bg-foreground text-background px-10 py-3.5 text-[11px] tracking-wide font-body hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50">
                    {saving ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </button>
                </motion.form>
              )}

              {tab === "orders" && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="border border-border/20 p-8">
                  <h2 className="font-display text-2xl text-foreground mb-8">طلباتي</h2>
                  {orders.length === 0 ? (
                    <p className="text-sm text-muted-foreground font-body">لا توجد طلبات بعد. <Link to="/shop" className="text-accent hover:underline">ابدأ التسوق</Link></p>
                  ) : (
                    <div className="space-y-3">
                      {orders.map((o) => (
                        <div key={o.id} className="flex items-center justify-between border border-border/20 p-5 hover:border-accent transition-colors">
                          <div>
                            <p className="font-display text-lg text-foreground">{o.order_number}</p>
                            <p className="text-[10px] tracking-wide text-muted-foreground font-body mt-1">
                              {new Date(o.created_at).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}
                            </p>
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] tracking-wide text-accent font-body">{statusLabels[o.status] || o.status}</p>
                            <p className="font-body text-sm text-foreground mt-1">{Number(o.total).toLocaleString("ar-EG")} ج.م</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Account;
