import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ArrowUp } from "lucide-react";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer ref={ref} className="px-6 md:px-12 pt-20 pb-10 border-t border-border/40 relative overflow-hidden">
      {/* Animated giant brand watermark */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="mb-16 md:mb-24"
      >
        <h2 className="font-display text-6xl md:text-[8rem] lg:text-[14rem] font-light text-foreground/[0.03] leading-none tracking-tight select-none">
          MAISON
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        <div className="md:col-span-4">
          <h3 className="font-display text-xl tracking-editorial text-foreground mb-4">MAISON</h3>
          <p className="text-sm text-muted-foreground leading-relaxed font-body max-w-xs mb-8">
            Timeless garments crafted at the intersection of art and utility for the discerning gentleman.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-xs tracking-editorial uppercase text-foreground/50 hover:text-accent transition-colors duration-300 font-body group"
          >
            <span>Visit our flagship store</span>
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>

        {[
          { title: "Shop", links: ["New Arrivals", "Outerwear", "Knitwear", "Tailoring", "Accessories"] },
          { title: "Maison", links: ["Our Story", "Sustainability", "Atelier", "Press", "Contact"] },
          { title: "Help", links: ["Shipping & Returns", "Size Guide", "Care Guide", "FAQ", "Store Locator"] },
        ].map((col) => (
          <div key={col.title} className="md:col-span-2 md:col-start-auto">
            <h4 className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-6 font-body">{col.title}</h4>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-foreground/40 hover:text-foreground transition-colors duration-300 font-body">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Back to top + bottom bar */}
      <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border/30 gap-4">
        <p className="text-[10px] text-muted-foreground/40 font-body">© 2026 MAISON. All rights reserved.</p>
        <div className="flex gap-8">
          {["Instagram", "Pinterest", "TikTok", "LinkedIn"].map((social) => (
            <a
              key={social}
              href="#"
              className="text-[10px] tracking-editorial uppercase text-muted-foreground/40 hover:text-foreground transition-colors duration-300 font-body"
            >
              {social}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {["Privacy", "Terms"].map((link) => (
            <a key={link} href="#" className="text-[10px] text-muted-foreground/40 hover:text-foreground transition-colors duration-300 font-body">
              {link}
            </a>
          ))}
          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-border/30 flex items-center justify-center hover:border-accent hover:text-accent transition-colors duration-500 group"
            aria-label="Back to top"
          >
            <ArrowUp size={14} strokeWidth={1.5} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
