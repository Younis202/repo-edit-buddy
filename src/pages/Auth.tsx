import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/contexts/AuthContext";
import { usePageSEO } from "@/hooks/usePageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FilmGrain from "@/components/FilmGrain";
import { toast } from "@/hooks/use-toast";

const Auth = () => {
  usePageSEO({ title: "تسجيل الدخول", description: "ادخل إلى حسابك أو أنشئ حساب جديد في شذايا." });
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", firstName: "", lastName: "" });

  const redirectTo = (location.state as any)?.from || "/account";

  useEffect(() => {
    if (user) navigate(redirectTo, { replace: true });
  }, [user, navigate, redirectTo]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email: form.email,
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { first_name: form.firstName, last_name: form.lastName },
          },
        });
        if (error) throw error;
        toast({ title: "تم إنشاء الحساب", description: "تحقق من بريدك لتأكيد الحساب." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password });
        if (error) throw error;
        toast({ title: "أهلاً بعودتك" });
      }
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message || "حدث خطأ، حاول مرة أخرى", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/account" });
      if (result.error) throw result.error;
    } catch (err: any) {
      toast({ title: "خطأ", description: err.message || "تعذّر تسجيل الدخول", variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <>
      <FilmGrain />
      <main className="bg-background min-h-screen">
        <Navbar />
        <section className="pt-32 pb-24 px-6 md:px-12 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md"
          >
            <Link to="/" className="inline-flex items-center gap-2 text-[10px] tracking-wide text-muted-foreground hover:text-foreground transition-colors mb-10 font-body">
              <ArrowLeft size={14} />
              العودة للرئيسية
            </Link>

            <p className="text-[10px] tracking-wide text-muted-foreground mb-3 font-body">
              {mode === "signin" ? "أهلاً بعودتك" : "ابدأ رحلتك معنا"}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-10">
              {mode === "signin" ? <>تسجيل <span className="italic">الدخول</span></> : <>إنشاء <span className="italic">حساب</span></>}
            </h1>

            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-border/40 py-3.5 mb-6 hover:border-accent transition-colors disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              <span className="text-[12px] tracking-wide font-body text-foreground">المتابعة باستخدام Google</span>
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-border/30" />
              <span className="text-[10px] text-muted-foreground font-body">أو</span>
              <div className="flex-1 h-px bg-border/30" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <input name="firstName" value={form.firstName} onChange={handleChange} required placeholder="الاسم الأول" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors" />
                  <input name="lastName" value={form.lastName} onChange={handleChange} required placeholder="اسم العائلة" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors" />
                </div>
              )}
              <input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="البريد الإلكتروني" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors" />
              <input name="password" type="password" value={form.password} onChange={handleChange} required minLength={6} placeholder="كلمة المرور" className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors" />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-foreground text-background py-4 text-[11px] tracking-wide font-body hover:bg-accent hover:text-accent-foreground transition-all duration-300 disabled:opacity-50 mt-8"
              >
                {loading ? "جاري التحميل..." : mode === "signin" ? "تسجيل الدخول" : "إنشاء الحساب"}
              </button>
            </form>

            <p className="text-center text-[11px] text-muted-foreground font-body mt-8">
              {mode === "signin" ? "ليس لديك حساب؟" : "لديك حساب بالفعل؟"}{" "}
              <button type="button" onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-accent hover:underline">
                {mode === "signin" ? "أنشئ حساباً جديداً" : "سجّل الدخول"}
              </button>
            </p>
          </motion.div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Auth;
