import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  Menu,
  X,
  ShoppingBag,
  Search,
  ArrowUpLeft,
  Heart,
  User,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useAuth } from "@/contexts/AuthContext";
import BrandLogo from "@/components/BrandLogo";
import SearchOverlay from "@/components/SearchOverlay";

const navLinks = [
  { label: "المتجر", href: "/shop", isRoute: true },
  { label: "جديدنا", href: "/new-in", isRoute: true },
  { label: "الاكتشاف", href: "/discovery", isRoute: true },
  { label: "في المتناول", href: "/essentials", isRoute: true },
  { label: "المجموعات", href: "/collections", isRoute: true },
  { label: "الكتالوج", href: "/lookbook", isRoute: true },
  { label: "من نحن", href: "/about", isRoute: true },
];

const megaMenuData: Record<
  string,
  {
    title: string;
    items: { name: string; desc: string; href: string }[];
    featured?: string;
  }
> = {
  جديدنا: {
    title: "أحدث الإصدارات",
    items: [
      { name: "عود ملكي", desc: "عود كمبودي فاخر", href: "/product/oud-royal" },
      {
        name: "ورد طائفي",
        desc: "ورد طائفي أصيل",
        href: "/product/ward-taifi",
      },
      { name: "مسك أسود", desc: "مسك نادر حصري", href: "/product/misk-aswad" },
      {
        name: "ليالي العنبر",
        desc: "عنبر طبيعي فاخر",
        href: "/product/amber-nights",
      },
    ],
    featured: "مجموعة ٢٠٢٦",
  },
  المجموعات: {
    title: "تسوّق حسب العالم",
    items: [
      { name: "رجالي", desc: "عطور بحضور قوي", href: "/shop?g=men" },
      { name: "حريمي", desc: "نفحات أنثوية ساحرة", href: "/shop?g=women" },
      { name: "للجميع", desc: "تركيبات تجمع الكل", href: "/shop?g=unisex" },
      { name: "صندوق الاكتشاف", desc: "٥ عينات بسعر واحد", href: "/discovery" },
    ],
  },
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout>>();
  const { scrollY } = useScroll();
  const { totalItems, toggleCart } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const { user } = useAuth();

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
          {/* Right nav (RTL) */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {navLinks.slice(0, 3).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onMouseEnter={() => handleMegaEnter(link.label)}
                onMouseLeave={handleMegaLeave}
                className="nav-link text-[12px] tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-300 pb-1 font-body"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Center logo */}
          <Link
            to="/"
            className="relative flex-shrink-0 group"
            aria-label="شذايا — الرئيسية"
          >
            <BrandLogo
              size="md"
              variant="light"
              className="opacity-90 group-hover:opacity-100 transition-opacity"
            />
          </Link>

          {/* Left nav (RTL) */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            {navLinks.slice(3).map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="nav-link text-[12px] tracking-wide text-foreground/60 hover:text-foreground transition-colors duration-300 pb-1 font-body"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/60 hover:text-foreground transition-colors"
              aria-label="بحث"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              to={user ? "/account" : "/auth"}
              className="text-foreground/60 hover:text-foreground transition-colors"
              aria-label="حسابي"
            >
              <User size={18} strokeWidth={1.5} />
            </Link>
            <Link
              to="/wishlist"
              className="relative text-foreground/60 hover:text-foreground transition-colors"
              aria-label="المفضلة"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleCart}
              className="relative text-foreground/60 hover:text-foreground transition-colors"
              aria-label="حقيبة التسوق"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body font-medium">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile */}
          <div className="flex items-center gap-4 lg:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground/60"
              aria-label="بحث"
            >
              <Search size={18} strokeWidth={1.5} />
            </button>
            <Link
              to="/wishlist"
              className="relative text-foreground/60"
              aria-label="المفضلة"
            >
              <Heart size={18} strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body font-medium">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <button
              onClick={toggleCart}
              className="relative text-foreground/60"
              aria-label="حقيبة التسوق"
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[9px] flex items-center justify-center font-body font-medium">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
              aria-label="القائمة"
            >
              {isOpen ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
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
              onMouseEnter={() => {
                clearTimeout(megaTimeout.current);
              }}
              onMouseLeave={handleMegaLeave}
            >
              <div className="px-12 py-10 grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <p className="text-[11px] tracking-wide text-muted-foreground mb-6 font-body">
                    {megaMenuData[activeMega].title}
                  </p>
                  <div className="luxury-divider mb-6" />
                  {megaMenuData[activeMega].featured && (
                    <p className="text-xs text-accent font-body">
                      {megaMenuData[activeMega].featured}
                    </p>
                  )}
                </div>
                <div className="col-span-6 grid grid-cols-2 gap-x-12 gap-y-4">
                  {megaMenuData[activeMega].items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setActiveMega(null)}
                        className="group flex items-center justify-between py-3 border-b border-border/20 hover:border-accent/40 transition-colors duration-500"
                      >
                        <div>
                          <span className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300">
                            {item.name}
                          </span>
                          <p className="text-[11px] text-muted-foreground font-body mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowUpLeft
                          size={14}
                          strokeWidth={1.5}
                          className="text-foreground/20 group-hover:text-accent transition-colors duration-300"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="col-span-3 flex items-end">
                  <Link
                    to="/shop"
                    onClick={() => setActiveMega(null)}
                    className="text-[11px] tracking-wide text-foreground/40 hover:text-accent transition-colors duration-300 font-body flex items-center gap-2 group"
                  >
                    <span>عرض الكل</span>
                    <ArrowUpLeft
                      size={12}
                      className="group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                    />
                  </Link>
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
            initial={{ clipPath: "circle(0% at 40px 40px)" }}
            animate={{ clipPath: "circle(150% at 40px 40px)" }}
            exit={{ clipPath: "circle(0% at 40px 40px)" }}
            transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
            className="fixed inset-0 z-40 bg-background flex flex-col items-center justify-center lg:hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-display text-[30vw] font-light text-foreground/[0.02] leading-none">
                ش
              </span>
            </div>
            <nav className="flex flex-col items-center gap-6 relative z-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.08,
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setIsOpen(false)}
                  className="font-display text-4xl md:text-5xl font-light text-foreground hover:text-accent transition-colors duration-300"
                >
                  <Link to={link.href} className="block">
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 flex flex-col items-center gap-6"
            >
              <div className="flex gap-8">
                {["انستقرام", "تيك توك", "سناب شات"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-[11px] tracking-wide text-muted-foreground hover:text-foreground transition-colors font-body"
                  >
                    {s}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default Navbar;
