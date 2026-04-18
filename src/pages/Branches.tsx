import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, Phone } from "lucide-react";
import { usePageSEO } from "@/hooks/usePageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

const branches = [
  {
    name: "شذايا — داون تاون القاهرة",
    address: "٢٣ شارع قصر النيل، وسط البلد، القاهرة",
    phone: "+20 2 2391 0000",
    hours: "١٠ ص — ١٠ م يومياً",
    isMain: true,
  },
  {
    name: "شذايا — مول أوف إيجيبت",
    address: "مول مصر، الطابق الأول، ٦ أكتوبر",
    phone: "+20 2 3851 0000",
    hours: "١٠ ص — ١١ م يومياً",
    isMain: false,
  },
  {
    name: "شذايا — سيتي ستارز",
    address: "سيتي ستارز مول، المرحلة الثانية، مدينة نصر",
    phone: "+20 2 2480 0000",
    hours: "١٠ ص — ١١ م يومياً",
    isMain: false,
  },
  {
    name: "شذايا — الإسكندرية",
    address: "سان ستيفانو مول، الطابق الأرضي، الإسكندرية",
    phone: "+20 3 4699 0000",
    hours: "١٠ ص — ١٠ م يومياً",
    isMain: false,
  },
];

const Branches = () => {
  usePageSEO({ title: "فروعنا", description: "زر فروع شذايا في القاهرة والإسكندرية — تجربة عطرية فاخرة في انتظارك." });
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />
          <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-6xl mx-auto">
            <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-10">
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">فروعنا</span>
            </motion.nav>

            <motion.div ref={headerRef} initial={{ opacity: 0, y: 30 }} animate={headerInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}>
              <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
                فروع <span className="italic text-gold-gradient">شذايا</span>
              </h1>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-16 max-w-2xl">
                زورنا في أحد فروعنا واستمتع بتجربة عطرية فريدة. فريقنا المتخصص في انتظارك لمساعدتك في اختيار العطر المثالي.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {branches.map((branch, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                  className={`p-8 border transition-colors duration-500 hover:border-accent/40 ${branch.isMain ? "border-accent/30 bg-accent/[0.03]" : "border-border/20"}`}
                >
                  {branch.isMain && <span className="text-[10px] tracking-wide text-accent font-accent mb-3 block">الفرع الرئيسي</span>}
                  <h2 className="font-display text-xl text-foreground mb-5">{branch.name}</h2>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin size={14} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground font-body">{branch.address}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={14} className="text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground font-body" dir="ltr">{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-accent shrink-0" />
                      <span className="text-sm text-muted-foreground font-body">{branch.hours}</span>
                    </div>
                  </div>
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

export default Branches;
