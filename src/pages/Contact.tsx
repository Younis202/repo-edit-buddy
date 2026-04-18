import { useState, useRef } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import GoldenOrnament from "@/components/GoldenOrnament";

const branches = [
  { name: "فرع القاهرة — سيتي ستارز", address: "مدينة نصر، القاهرة", phone: "+20 123 456 7890", hours: "١٠ ص — ١٠ م" },
  { name: "فرع الإسكندرية — سان ستيفانو", address: "سان ستيفانو، الإسكندرية", phone: "+20 123 456 7891", hours: "١٠ ص — ١٠ م" },
  { name: "فرع التجمع الخامس", address: "كايرو فيستيفال سيتي، التجمع الخامس", phone: "+20 123 456 7892", hours: "١١ ص — ١١ م" },
];

const Contact = () => {
  usePageSEO({ title: "تواصل معنا", description: "تواصل مع شذايا — زورنا في القاهرة أو تواصل معنا عبر الهاتف والبريد الإلكتروني." });
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          <section className="pt-24 md:pt-32 pb-12 md:pb-16 px-6 md:px-12">
            <motion.div ref={headerRef} initial={{ opacity: 0, y: 50 }} animate={isHeaderInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-5">تواصل معنا</p>
              <div className="luxury-divider mb-6" />
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
                نسعد <span className="italic">بخدمتك</span>
              </h1>
            </motion.div>
          </section>

          <section className="px-6 md:px-12 pb-16 md:pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
              {/* Form */}
              <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <h2 className="font-display text-2xl text-foreground mb-8">أرسل رسالة</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">الاسم</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground font-body focus:outline-none focus:border-accent transition-colors" placeholder="اسمك الكامل" />
                    </div>
                    <div>
                      <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">رقم الهاتف</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground font-body focus:outline-none focus:border-accent transition-colors" placeholder="٠١٠ ١٢٣٤ ٥٦٧٨" dir="ltr" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">البريد الإلكتروني</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground font-body focus:outline-none focus:border-accent transition-colors" placeholder="example@email.com" dir="ltr" />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">الموضوع</label>
                    <select value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground font-body focus:outline-none focus:border-accent transition-colors appearance-none">
                      <option value="" className="bg-card">اختر الموضوع</option>
                      <option value="order" className="bg-card">استفسار عن طلب</option>
                      <option value="product" className="bg-card">استفسار عن منتج</option>
                      <option value="return" className="bg-card">إرجاع / استبدال</option>
                      <option value="wholesale" className="bg-card">طلبات الجملة</option>
                      <option value="other" className="bg-card">أخرى</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-wide text-muted-foreground font-body block mb-2">الرسالة</label>
                    <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-transparent border-b border-border/50 py-3 text-sm text-foreground font-body focus:outline-none focus:border-accent transition-colors resize-none" placeholder="اكتب رسالتك هنا..." />
                  </div>
                  <button type="submit" className={`text-[11px] tracking-wide font-body px-10 py-4 flex items-center gap-3 transition-all duration-500 ${submitted ? "bg-accent text-accent-foreground" : "bg-foreground text-background hover:bg-accent hover:text-accent-foreground"}`}>
                    {submitted ? "تم الإرسال ✓" : (
                      <>
                        <Send size={14} strokeWidth={1.5} />
                        إرسال الرسالة
                      </>
                    )}
                  </button>
                </form>
              </motion.div>

              {/* Info */}
              <div>
                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-12">
                  <h2 className="font-display text-2xl text-foreground mb-6">معلومات التواصل</h2>
                  <div className="space-y-5">
                    <div className="flex items-center gap-4">
                      <Phone size={16} className="text-accent flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground font-body">+20 123 456 7890</p>
                        <p className="text-[10px] text-muted-foreground font-body">السبت — الخميس، ١٠ ص — ١٠ م</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Mail size={16} className="text-accent flex-shrink-0" />
                      <p className="text-sm text-foreground font-body">info@shathaya.com</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <MessageCircle size={16} className="text-accent flex-shrink-0" />
                      <div>
                        <p className="text-sm text-foreground font-body">واتساب: +20 123 456 7890</p>
                        <p className="text-[10px] text-muted-foreground font-body">رد فوري</p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <GoldenOrnament size="sm" className="!mx-0 mb-10" />

                <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}>
                  <h2 className="font-display text-2xl text-foreground mb-6">فروعنا</h2>
                  <div className="space-y-0">
                    {branches.map((branch, i) => (
                      <div key={i} className="py-6 border-b border-border/20 group hover:bg-secondary/10 transition-colors duration-300 px-4 -mx-4">
                        <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300 mb-2">{branch.name}</h3>
                        <div className="flex flex-wrap gap-x-6 gap-y-2">
                          <span className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                            <MapPin size={12} className="text-accent" /> {branch.address}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                            <Phone size={12} className="text-accent" /> {branch.phone}
                          </span>
                          <span className="flex items-center gap-2 text-xs text-muted-foreground font-body">
                            <Clock size={12} className="text-accent" /> {branch.hours}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Contact;
