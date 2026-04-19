import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowLeft, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { getBottleByName } from "@/data/bottleTypes";

const CartDrawer = () => {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm" onClick={closeCart} />
          <motion.aside initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} className="fixed left-0 top-0 bottom-0 z-[70] w-full max-w-md bg-card border-r border-border/20 flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <ShoppingBag size={18} strokeWidth={1.5} className="text-foreground" />
                <h2 className="font-display text-lg font-light text-foreground"><span className="italic">حقيبتك</span></h2>
                <span className="text-[10px] tracking-wide text-muted-foreground font-body">({totalItems} {totalItems === 1 ? "منتج" : "منتجات"})</span>
              </div>
              <button onClick={closeCart} className="w-9 h-9 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors">
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={40} strokeWidth={1} className="text-foreground/10 mb-4" />
                  <p className="font-display text-xl font-light text-foreground mb-2">حقيبتك فارغة</p>
                  <p className="text-[11px] tracking-wide text-muted-foreground font-body mb-8">اكتشف مجموعتنا</p>
                  <Link to="/shop" onClick={closeCart} className="text-[11px] tracking-wide font-body text-foreground border border-border/30 px-8 py-3 hover:border-accent hover:text-accent transition-all duration-300">تسوّق الآن</Link>
                </div>
              ) : (
                <div className="space-y-0">
                  {items.map((item) => (
                    <motion.div key={`${item.product.id}-${item.size}-${item.color}`} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }} className="flex gap-4 py-5 border-b border-border/15">
                      <Link to={`/product/${item.product.slug}`} onClick={closeCart} className="w-20 h-26 flex-shrink-0 overflow-hidden">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </Link>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <Link to={`/product/${item.product.slug}`} onClick={closeCart} className="font-display text-sm text-foreground hover:text-accent transition-colors block truncate">{item.product.name}</Link>
                          <div className="flex items-center gap-2 mt-1.5">
                            {(() => {
                              const bottle = getBottleByName(item.color);
                              return bottle ? (
                                <span className="inline-flex items-center gap-1.5 text-[10px] tracking-wide text-muted-foreground font-body bg-secondary/30 px-1.5 py-0.5">
                                  <img src={bottle.image} alt={bottle.name} className="w-4 h-5 object-contain" />
                                  {bottle.name}
                                </span>
                              ) : item.color ? (
                                <span className="text-[10px] tracking-wide text-muted-foreground font-body">العبوة: {item.color}</span>
                              ) : null;
                            })()}
                            <span className="text-[10px] tracking-wide text-muted-foreground font-body">• {item.size}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-border/30">
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"><Minus size={11} strokeWidth={1.5} /></button>
                            <span className="w-8 h-8 flex items-center justify-center text-[11px] font-body text-foreground">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.size, item.color, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-foreground/50 hover:text-foreground transition-colors"><Plus size={11} strokeWidth={1.5} /></button>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-body text-foreground">{item.product.price}</span>
                            <button onClick={() => removeItem(item.product.id, item.size, item.color)} className="text-foreground/30 hover:text-destructive transition-colors"><Trash2 size={13} strokeWidth={1.5} /></button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-border/20 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] tracking-wide text-muted-foreground font-body">المجموع</span>
                  <span className="font-display text-lg text-foreground">{totalPrice.toLocaleString("ar-EG")} ج.م</span>
                </div>
                <p className="text-[10px] tracking-wide text-muted-foreground font-body">الشحن والرسوم تُحسب عند الدفع</p>
                <Link to="/checkout" onClick={closeCart} className="w-full py-4 text-[12px] tracking-wide font-body bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center gap-3">
                  إتمام الشراء
                  <ArrowLeft size={14} strokeWidth={1.5} />
                </Link>
                <button onClick={closeCart} className="w-full text-[11px] tracking-wide text-muted-foreground font-body text-center hover:text-foreground transition-colors py-2">مواصلة التسوق</button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
