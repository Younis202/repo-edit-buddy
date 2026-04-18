import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import GoldenOrnament from "@/components/GoldenOrnament";
import SmokeEffect from "@/components/SmokeEffect";
import { db as supabase } from "@/integrations/supabase/db";

const NewsletterSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setStatus("loading");
    setErrorMsg("");

    const { error } = await supabase
      .from("newsletter_subscribers" as any)
      .insert([{ email }] as any);

    if (error) {
      if (error.code === "23505") {
        // Unique violation — already subscribed
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg("حدث خطأ. حاول مرة أخرى.");
      }
    } else {
      setStatus("success");
      setEmail("");
    }
  };

  return (
    <section className="px-6 md:px-12 py-20 md:py-32 relative overflow-hidden">
      <SmokeEffect />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-stroke font-display text-[20vw] font-bold leading-none whitespace-nowrap">شذايا</span>
      </div>
      <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }} className="max-w-3xl mx-auto text-center relative z-10">
        <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-6">انضم للدائرة الحصرية</p>
        <GoldenOrnament size="md" className="mb-10" />
        <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-5 leading-tight">
          كن <span className="text-gold-gradient">الأول</span>
          <br />
          في المعرفة
        </h2>
        <p className="text-sm text-muted-foreground mb-14 font-body max-w-md mx-auto leading-relaxed">
          وصول مبكر للمجموعات الجديدة، فعاليات حصرية، وقصص من خلف أبواب المعمل.
        </p>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 py-4"
          >
            <div className="w-10 h-10 border border-accent/40 flex items-center justify-center">
              <Check size={18} className="text-accent" />
            </div>
            <p className="text-sm text-foreground font-body">تم اشتراكك بنجاح! ترقب أخبارنا الحصرية.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
            <div className={`flex border-b transition-all duration-500 ${isFocused ? "border-accent" : "border-border/50"}`}>
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={status === "loading"}
                className="flex-1 py-4 bg-transparent text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none font-body tracking-wide text-right disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={status === "loading" || !email}
                className="pr-4 py-4 text-foreground/40 hover:text-accent transition-colors duration-500 group disabled:opacity-30"
              >
                {status === "loading" ? (
                  <Loader2 size={20} strokeWidth={1.5} className="animate-spin" />
                ) : (
                  <ArrowLeft size={20} strokeWidth={1.5} className="group-hover:-translate-x-1.5 transition-transform duration-300" />
                )}
              </button>
            </div>
            {errorMsg && <p className="mt-3 text-[11px] text-destructive font-body">{errorMsg}</p>}
            <p className="mt-4 text-[10px] text-muted-foreground/30 font-body">بالاشتراك توافق على سياسة الخصوصية. يمكنك إلغاء الاشتراك في أي وقت.</p>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default NewsletterSection;
