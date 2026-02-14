import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, ShoppingBag, Search, ArrowUpRight, Globe } from "lucide-react";

const navLinks = [
  { label: "Shop", href: "/shop", isRoute: true },
  { label: "New In", href: "#collection" },
  { label: "Collections", href: "#categories" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Atelier", href: "#craftsmanship" },
  { label: "About", href: "#about" },
];

const megaMenuData: Record<string, { title: string; items: { name: string; desc: string }[]; featured?: string }> = {
  "New In": {
    title: "Latest Arrivals",
    items: [
      { name: "The Overcoat", desc: "Italian wool blend" },
      { name: "Ivory Knit", desc: "Mongolian cashmere" },
      { name: "Midnight Suit", desc: "Super 150s wool" },
      { name: "Heritage Boots", desc: "Full-grain leather" },
    ],
    featured: "SS26 Collection",
  },
  Collections: {
    title: "Shop by World",
    items: [
      { name: "Outerwear", desc: "24 Pieces" },
      { name: "Knitwear", desc: "18 Pieces" },
      { name: "Tailoring", desc: "31 Pieces" },
      { name: "Accessories", desc: "42 Pieces" },
    ],
  },
};

const MagneticLink = ({ children, href, isRoute, className, onMouseEnter, onMouseLeave }: { children: React.ReactNode; href: string; isRoute?: boolean; className?: string; onMouseEnter?: () => void; onMouseLeave?: () => void }) => {
  const [transform, setTransform] = useState({ x: 0, y: 0 });

  return (
    <motion.div
      className={className}
      animate={{ x: transform.x, y: transform.y }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      onMouseMove={(e) => {
        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        setTransform({ x: (e.clientX - cx) * 0.2, y: (e.clientY - cy) * 0.2 });
      }}
      onMouseLeave={() => { setTransform({ x: 0, y: 0 }); onMouseLeave?.(); }}
      onMouseEnter={onMouseEnter}
    >
      {isRoute ? (
        <Link to={href} className="block">{children}</Link>
      ) : (
        <a href={href} className="block">{children}</a>
      )}
    </motion.div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 100);
  });

  const handleMegaEnter = (label: string) => {
    clearTimeout(megaTimeout.current);
    if (megaMenuData[label]) setActiveMega(label);
  };

  const handleMegaLeave = () => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 200);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-2xl border-b border-border/30"
            : ""
        }`}
        onMouseLeave={handleMegaLeave}
      >
        <nav className="flex items-center justify-between px-6 md:px-12 py-5">
          {/* Left nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 3).map((link) => (
              <MagneticLink
                key={link.label}
                href={link.href}
                isRoute={link.isRoute}
                onMouseEnter={() => handleMegaEnter(link.label)}
                onMouseLeave={handleMegaLeave}
                className="nav-link text-[11px] tracking-ultra uppercase text-foreground/60 hover:text-foreground transition-colors duration-300 pb-1 font-body"
              >
                {link.label}
              </MagneticLink>
            ))}
          </div>

          {/* Center logo with animated line */}
          <a href="#" className="relative font-display text-xl md:text-2xl font-medium tracking-editorial text-foreground lg:text-center flex-shrink-0 group">
            <span className="relative z-10">MAISON</span>
            <motion.span
              className="absolute -bottom-1 left-0 right-0 h-px bg-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />
          </a>

          {/* Right nav */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(3).map((link) => (
              <MagneticLink
                key={link.label}
                href={link.href}
                className="nav-link text-[11px] tracking-ultra uppercase text-foreground/60 hover:text-foreground transition-colors duration-300 pb-1 font-body"
              >
                {link.label}
              </MagneticLink>
            ))}
            <div className="flex items-center gap-1 text-foreground/40 hover:text-foreground transition-colors cursor-pointer">
              <Globe size={14} strokeWidth={1.5} />
              <span className="text-[10px] tracking-editorial uppercase font-body">EN</span>
            </div>
            <button className="text-foreground/60 hover:text-foreground transition-colors" aria-label="Search">
              <Search size={18} strokeWidth={1.5} />
            </button>
            <button className="relative text-foreground/60 hover:text-foreground transition-colors" aria-label="Shopping bag">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body font-medium">
                2
              </span>
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex items-center gap-5 lg:hidden">
            <button className="relative text-foreground/60" aria-label="Shopping bag">
              <ShoppingBag size={18} strokeWidth={1.5} />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body font-medium">
                2
              </span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
              aria-label="Menu"
            >
              {isOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>

        {/* Mega Menu */}
        <AnimatePresence>
          {activeMega && megaMenuData[activeMega] && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block overflow-hidden border-t border-border/20 bg-background/95 backdrop-blur-2xl"
              onMouseEnter={() => { clearTimeout(megaTimeout.current); }}
              onMouseLeave={handleMegaLeave}
            >
              <div className="px-12 py-10 grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-6 font-body">
                    {megaMenuData[activeMega].title}
                  </p>
                  <div className="luxury-divider mb-6" />
                  {megaMenuData[activeMega].featured && (
                    <p className="text-xs text-accent font-body tracking-editorial uppercase">
                      {megaMenuData[activeMega].featured}
                    </p>
                  )}
                </div>
                <div className="col-span-6 grid grid-cols-2 gap-x-12 gap-y-4">
                  {megaMenuData[activeMega].items.map((item, i) => (
                    <motion.a
                      key={item.name}
                      href="#"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                      className="group flex items-center justify-between py-3 border-b border-border/20 hover:border-accent/40 transition-colors duration-500"
                    >
                      <div>
                        <span className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                          {item.name}
                        </span>
                        <p className="text-[10px] text-muted-foreground font-body mt-0.5">{item.desc}</p>
                      </div>
                      <ArrowUpRight size={14} strokeWidth={1.5} className="text-foreground/20 group-hover:text-accent transition-colors duration-300" />
                    </motion.a>
                  ))}
                </div>
                <div className="col-span-3 flex items-end">
                  <a href="#" className="text-[10px] tracking-ultra uppercase text-foreground/40 hover:text-accent transition-colors duration-300 font-body flex items-center gap-2 group">
                    <span>View All</span>
                    <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center lg:hidden"
          >
            {/* Giant background number */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-display text-[30vw] font-light text-foreground/[0.02] leading-none">M</span>
            </div>
            
            <nav className="flex flex-col items-center gap-6 relative z-10">
              {navLinks.map((link, i) => {
                const motionProps = {
                  key: link.label,
                  initial: { opacity: 0, y: 30 } as const,
                  animate: { opacity: 1, y: 0 } as const,
                  transition: { delay: 0.3 + i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] },
                  onClick: () => setIsOpen(false),
                  className: "font-display text-4xl md:text-5xl font-light tracking-wide text-foreground hover:text-accent transition-colors duration-300",
                };
                return link.isRoute ? (
                  <motion.div {...motionProps}>
                    <Link to={link.href} className="block">{link.label}</Link>
                  </motion.div>
                ) : (
                  <motion.a {...motionProps} href={link.href}>
                    {link.label}
                  </motion.a>
                );
              })}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 flex flex-col items-center gap-6"
            >
              <div className="flex items-center gap-2 text-foreground/40">
                <Globe size={14} strokeWidth={1.5} />
                <span className="text-[10px] tracking-editorial uppercase font-body">EN / USD</span>
              </div>
              <div className="flex gap-8">
                {["Instagram", "Pinterest", "TikTok"].map((s) => (
                  <a key={s} href="#" className="text-[10px] tracking-ultra uppercase text-muted-foreground hover:text-foreground transition-colors">{s}</a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
