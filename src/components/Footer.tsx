import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer ref={ref} className="px-6 md:px-12 pt-20 pb-10 border-t border-border/40 relative overflow-hidden">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} className="mb-16 md:mb-24">
        <h2 className="font-display text-6xl md:text-[8rem] lg:text-[14rem] font-light text-foreground/[0.03] leading-none select-none">شذايا</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-4">
          <h3 className="font-display text-xl text-foreground mb-4">شذايا</h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-body max-w-xs mb-8">
            عطور فاخرة مصنوعة بعناية فائقة عند تقاطع الفن والأصالة. لمن يبحث عن التميز والرقي.
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[11px] tracking-wide text-muted-foreground mb-6 font-body">المتجر</h4>
          <ul className="space-y-3">
            <li><Link to="/new-in" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">جديدنا</Link></li>
            <li><Link to="/shop" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">عود</Link></li>
            <li><Link to="/shop" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">زهري</Link></li>
            <li><Link to="/shop" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">شرقي</Link></li>
            <li><Link to="/shop" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">مسك</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[11px] tracking-wide text-muted-foreground mb-6 font-body">شذايا</h4>
          <ul className="space-y-3">
            <li><Link to="/about" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">قصتنا</Link></li>
            <li><Link to="/lookbook" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">الكتالوج</Link></li>
            <li><Link to="/contact" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">تواصل معنا</Link></li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="text-[11px] tracking-wide text-muted-foreground mb-6 font-body">المساعدة</h4>
          <ul className="space-y-3">
            <li><Link to="/track" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">تتبع طلبك</Link></li>
            <li><Link to="/faq" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">الأسئلة الشائعة</Link></li>
            <li><Link to="/shipping-returns" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">الشحن والإرجاع</Link></li>
            <li><Link to="/perfume-guide" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">دليل العطور</Link></li>
            <li><Link to="/branches" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">فروعنا</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30 gap-4">
        <p className="text-[11px] text-muted-foreground/40 font-body">© ٢٠٢٦ شذايا. جميع الحقوق محفوظة.</p>
        <div className="flex gap-8">
          {[
            { name: "انستقرام", url: "https://instagram.com/shathaya" },
            { name: "تيك توك", url: "https://tiktok.com/@shathaya" },
            { name: "سناب شات", url: "https://snapchat.com/add/shathaya" },
            { name: "تويتر", url: "https://twitter.com/shathaya" },
          ].map((social) => (
            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="text-[11px] tracking-wide text-muted-foreground/40 hover:text-foreground transition-colors duration-300 font-body">{social.name}</a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <Link to="/privacy" className="text-[11px] text-muted-foreground/40 hover:text-foreground transition-colors duration-300 font-body">الخصوصية</Link>
          <Link to="/terms" className="text-[11px] text-muted-foreground/40 hover:text-foreground transition-colors duration-300 font-body">الشروط</Link>
          <button onClick={scrollToTop} className="w-10 h-10 border border-border/30 flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-500 group" aria-label="العودة للأعلى">
            <ArrowUp size={14} strokeWidth={1.5} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
