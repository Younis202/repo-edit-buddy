import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowUpLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useProducts } from "@/hooks/useProducts";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: allProducts = [] } = useProducts();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const results = query.length >= 2
    ? allProducts.filter((p) =>
        p.name.includes(query) ||
        p.category.includes(query) ||
        p.material.includes(query) ||
        p.shortDescription.includes(query)
      )
    : [];

  const popularSearches = ["عود", "ورد", "مسك", "شرقي", "بخور"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[60] bg-background/98 backdrop-blur-2xl"
        >
          <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
            <div className="flex items-center justify-between mb-12">
              <span className="text-[11px] tracking-wide text-muted-foreground font-body">بحث</span>
              <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-foreground/60 hover:text-foreground transition-colors">
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            <div className="relative mb-12">
              <div className="flex items-center gap-4 border-b border-border/50 pb-4">
                <Search size={20} strokeWidth={1.5} className="text-accent flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="ابحث عن عطر، فئة، أو مكوّن..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent font-display text-2xl md:text-4xl text-foreground placeholder:text-foreground/15 focus:outline-none"
                  dir="rtl"
                />
              </div>
            </div>

            {query.length < 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <p className="text-[11px] tracking-wide text-muted-foreground font-body mb-6">عمليات بحث شائعة</p>
                <div className="flex flex-wrap gap-3">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-5 py-2.5 border border-border/30 text-sm font-body text-foreground/60 hover:border-accent hover:text-accent transition-all duration-300"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {query.length >= 2 && (
              <div>
                <p className="text-[11px] tracking-wide text-muted-foreground font-body mb-8">
                  {results.length > 0 ? `${results.length} نتيجة` : "لا توجد نتائج"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
                  {results.map((product, i) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="group flex items-center gap-5 p-4 hover:bg-secondary/30 transition-colors duration-300"
                      >
                        <div className="w-20 h-24 overflow-hidden flex-shrink-0">
                          <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-display text-lg text-foreground group-hover:text-accent transition-colors duration-300">{product.name}</h3>
                          <p className="text-[10px] tracking-wide text-muted-foreground font-body mt-1">{product.category} — {product.material}</p>
                          <p className="text-sm text-foreground/70 font-body mt-2">{product.price}</p>
                        </div>
                        <ArrowUpLeft size={14} className="text-foreground/20 group-hover:text-accent transition-colors" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
                {results.length > 0 && (
                  <Link
                    to="/shop"
                    onClick={onClose}
                    className="inline-flex items-center gap-3 mt-8 text-[11px] tracking-wide text-foreground/50 hover:text-accent transition-colors duration-500 font-body group"
                  >
                    <span>عرض كل العطور</span>
                    <ArrowUpLeft size={12} className="group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                )}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchOverlay;
