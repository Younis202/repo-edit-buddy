import { useState, useRef } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import GoldenOrnament from "@/components/GoldenOrnament";

const faqCategories = [
  {
    title: "الطلبات والشحن",
    items: [
      { q: "كم يستغرق الشحن؟", a: "الشحن داخل القاهرة والجيزة يستغرق ١-٢ يوم عمل. المحافظات الأخرى ٣-٥ أيام عمل. الشحن الدولي ٧-١٤ يوم عمل." },
      { q: "هل الشحن مجاني؟", a: "نعم، الشحن مجاني لجميع الطلبات داخل مصر فوق ٢,٠٠٠ ج.م. للطلبات الأقل، رسوم الشحن ٥٠ ج.م." },
      { q: "هل يمكنني تتبع طلبي؟", a: "نعم، ستصلك رسالة على الواتساب والبريد الإلكتروني برقم التتبع فور شحن طلبك." },
      { q: "هل تشحنون خارج مصر؟", a: "نعم، نشحن لجميع الدول العربية ودول الخليج. رسوم الشحن تختلف حسب الدولة." },
    ],
  },
  {
    title: "المنتجات والعطور",
    items: [
      { q: "هل العطور أصلية ١٠٠٪؟", a: "جميع عطور شذايا مصنوعة يدوياً من مواد خام أصلية مستوردة. كل زجاجة مرقمة وتحمل شهادة أصالة." },
      { q: "كم يدوم العطر؟", a: "عطورنا مركّزة بدرجة عالية (Eau de Parfum). المعدل ٨-١٤ ساعة حسب نوع البشرة والعطر." },
      { q: "هل يمكنني تجربة العطر قبل الشراء؟", a: "نعم، يمكنك زيارة أي فرع من فروعنا للتجربة. كما نوفر عينات بحجم ٣ مل لبعض العطور." },
      { q: "ما الفرق بين الأحجام المختلفة؟", a: "العطر نفسه بتركيز موحد في جميع الأحجام. الفرق فقط في كمية العطر. ٣٠ مل للسفر، ٥٠ مل كلاسيك، ١٠٠ مل فاخر." },
    ],
  },
  {
    title: "الإرجاع والاستبدال",
    items: [
      { q: "ما سياسة الإرجاع؟", a: "يمكنك إرجاع أو استبدال المنتج خلال ٣٠ يوماً من الاستلام بشرط أن يكون المنتج غير مفتوح وفي حالته الأصلية." },
      { q: "كيف أطلب إرجاع؟", a: "تواصل معنا عبر الواتساب أو البريد الإلكتروني وسنرسل مندوب لاستلام المنتج مجاناً." },
      { q: "متى أسترد المبلغ؟", a: "يتم استرداد المبلغ خلال ٥-٧ أيام عمل من استلام المنتج المرتجع." },
    ],
  },
  {
    title: "الدفع",
    items: [
      { q: "ما طرق الدفع المتاحة؟", a: "نقبل الدفع عند الاستلام، فيزا/ماستركارد، فوري، وفودافون كاش. كما نوفر تقسيط بدون فوائد حتى ١٢ شهر." },
      { q: "هل الدفع آمن؟", a: "نعم، جميع المعاملات مشفرة بأعلى معايير الأمان (SSL). بياناتك المالية محمية بالكامل." },
    ],
  },
];

const FAQ = () => {
  usePageSEO({ title: "الأسئلة الشائعة", description: "إجابات على أكثر الأسئلة شيوعاً حول منتجات شذايا — الشحن، الإرجاع، الدفع، وطرق الاستخدام." });
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-60px" });

  const toggleItem = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
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
              <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-5">المساعدة</p>
              <div className="luxury-divider mb-6" />
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground leading-[0.95]">
                الأسئلة <span className="italic">الشائعة</span>
              </h1>
            </motion.div>
          </section>

          <section className="px-6 md:px-12 pb-16 md:pb-24 max-w-4xl">
            {faqCategories.map((cat, catIndex) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                className="mb-12"
              >
                <h2 className="font-display text-xl text-foreground mb-6">{cat.title}</h2>
                <div className="space-y-0">
                  {cat.items.map((item, i) => {
                    const key = `${catIndex}-${i}`;
                    return (
                      <div key={key} className="border-b border-border/20">
                        <button onClick={() => toggleItem(key)} className="w-full flex items-center justify-between py-5 group text-right">
                          <span className="text-sm text-foreground font-body group-hover:text-accent transition-colors duration-300 pr-0 pl-4">{item.q}</span>
                          <motion.div animate={{ rotate: openItems[key] ? 180 : 0 }} transition={{ duration: 0.3 }}>
                            <ChevronDown size={14} strokeWidth={1.5} className="text-foreground/40 flex-shrink-0" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {openItems[key] && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                              <p className="text-sm text-muted-foreground leading-relaxed font-body pb-5">{item.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}

            <GoldenOrnament size="sm" className="!mx-0 mt-8 mb-8" />
            <p className="text-sm text-muted-foreground font-body">
              لم تجد إجابة لسؤالك؟{" "}
              <Link to="/contact" className="text-accent hover:underline">تواصل معنا</Link>
            </p>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default FAQ;
