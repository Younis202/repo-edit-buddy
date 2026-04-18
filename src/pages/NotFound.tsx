import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { usePageSEO } from "@/hooks/usePageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

const NotFound = () => {
  usePageSEO({ title: "الصفحة غير موجودة", description: "الصفحة التي تبحث عنها غير موجودة في موقع شذايا." });

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />
          <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden">
            {/* Giant background number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-stroke font-display text-[30vw] md:text-[20vw] font-bold leading-none">٤٠٤</span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 text-center"
            >
              <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-6">صفحة مفقودة</p>
              <div className="luxury-divider mx-auto mb-8" />
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light text-foreground mb-6 leading-tight">
                هذه الصفحة <span className="italic text-gold-gradient">لا وجود لها</span>
              </h1>
              <p className="text-sm text-muted-foreground font-body leading-relaxed max-w-md mx-auto mb-12">
                يبدو أنك وصلت إلى مكان غير موجود. دعنا نعيدك إلى عالم شذايا الفاخر.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/"
                  className="px-10 py-4 bg-accent text-accent-foreground text-sm font-accent tracking-wide hover:bg-accent/90 transition-all duration-500"
                >
                  العودة للرئيسية
                </Link>
                <Link
                  to="/shop"
                  className="px-10 py-4 border border-border/50 text-foreground text-sm font-accent tracking-wide hover:border-accent hover:text-accent transition-all duration-500"
                >
                  تصفح المتجر
                </Link>
              </div>
            </motion.div>
          </section>
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default NotFound;
