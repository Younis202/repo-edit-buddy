import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Truck, RotateCcw, Shield, Gift } from "lucide-react";
import { usePageSEO } from "@/hooks/usePageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

const features = [
  { icon: Truck, title: "شحن سريع", desc: "توصيل خلال ٢-٥ أيام عمل للقاهرة والإسكندرية، و٣-٧ أيام لباقي المحافظات." },
  { icon: Gift, title: "شحن مجاني", desc: "على جميع الطلبات فوق ١,٠٠٠ ج.م داخل مصر." },
  { icon: RotateCcw, title: "إرجاع سهل", desc: "إرجاع مجاني خلال ٣٠ يوماً — المنتج يجب أن يكون غير مفتوح." },
  { icon: Shield, title: "ضمان الجودة", desc: "جميع منتجاتنا أصلية ١٠٠٪ مع ضمان سنة كاملة." },
];

const shippingSections = [
  {
    title: "سياسة الشحن",
    items: [
      "شحن مجاني على الطلبات فوق ١,٠٠٠ ج.م داخل مصر",
      "رسوم الشحن ٥٠ ج.م للطلبات أقل من ١,٠٠٠ ج.م",
      "التوصيل خلال ٢-٥ أيام عمل (القاهرة والإسكندرية)",
      "التوصيل خلال ٣-٧ أيام عمل (باقي المحافظات)",
      "جميع الشحنات مؤمنة ومتتبعة — ستصلك رسالة بتفاصيل التتبع",
      "تغليف فاخر مجاني مع كل طلب",
    ],
  },
  {
    title: "سياسة الإرجاع والاستبدال",
    items: [
      "يمكنك إرجاع المنتج خلال ٣٠ يوماً من تاريخ الاستلام",
      "يجب أن يكون المنتج غير مفتوح وفي عبوته الأصلية",
      "استلام المرتجعات مجاني — سنرسل مندوباً لاستلام المنتج",
      "يتم رد المبلغ خلال ٧-١٤ يوم عمل بنفس طريقة الدفع",
      "في حالة وجود عيب في المنتج — يتم الاستبدال فوراً بدون تكاليف",
    ],
  },
];

const ShippingReturns = () => {
  usePageSEO({ title: "الشحن والإرجاع", description: "سياسة الشحن والإرجاع في شذايا — شحن مجاني وإرجاع سهل خلال ٣٠ يوم." });

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />
          <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-5xl mx-auto">
            <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-10">
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">الشحن والإرجاع</span>
            </motion.nav>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-12">
                الشحن <span className="italic text-gold-gradient">والإرجاع</span>
              </h1>
            </motion.div>

            {/* Feature cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-6 border border-border/20 text-center hover:border-accent/30 transition-colors duration-500"
                >
                  <f.icon size={24} className="text-accent mx-auto mb-3" strokeWidth={1.5} />
                  <h3 className="font-display text-sm text-foreground mb-2">{f.title}</h3>
                  <p className="text-[11px] text-muted-foreground font-body leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Detailed sections */}
            <div className="space-y-14">
              {shippingSections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                >
                  <h2 className="font-display text-2xl text-foreground mb-6">{section.title}</h2>
                  <ul className="space-y-4">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                        <span className="text-sm text-muted-foreground font-body leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default ShippingReturns;
