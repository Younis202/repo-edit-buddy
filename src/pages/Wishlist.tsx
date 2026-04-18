import { Link } from "react-router-dom";
import { usePageSEO } from "@/hooks/usePageSEO";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";

const Wishlist = () => {
  usePageSEO({ title: "المفضلة", description: "قائمة عطورك المفضلة من شذايا." });
  const { items, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (product: typeof items[0]) => {
    addItem(product, product.sizes[0], product.colors[0]?.name || "افتراضي");
  };

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />

          <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12">
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-10"
            >
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">المفضلة</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">عطورك المفضلة</p>
              <h1 className="font-display text-4xl md:text-6xl font-light text-foreground">
                قائمة <span className="italic">الأمنيات</span>
              </h1>
            </motion.div>

            {items.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center min-h-[40vh] text-center"
              >
                <Heart size={48} strokeWidth={1} className="text-foreground/10 mb-4" />
                <p className="font-display text-2xl font-light text-foreground mb-2">قائمتك فارغة</p>
                <p className="text-sm text-muted-foreground font-body mb-8">أضف عطورك المفضلة لتجدها بسهولة لاحقاً</p>
                <Link
                  to="/shop"
                  className="text-[10px] tracking-wide font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300"
                >
                  تسوّق الآن
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {items.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group"
                  >
                    <Link to={`/product/${product.slug}`} className="block">
                      <div className="relative overflow-hidden aspect-[3/4] mb-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                        />
                        <button
                          onClick={(e) => { e.preventDefault(); removeFromWishlist(product.id); }}
                          className="absolute top-3 left-3 w-8 h-8 bg-background/60 backdrop-blur-md flex items-center justify-center text-destructive hover:bg-destructive hover:text-destructive-foreground transition-all duration-300"
                        >
                          <Trash2 size={13} strokeWidth={1.5} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                          <button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(product); }}
                            className="w-full text-[10px] tracking-wide text-background bg-foreground py-2.5 font-body hover:bg-accent hover:text-accent-foreground transition-colors duration-300 flex items-center justify-center gap-2"
                          >
                            <ShoppingBag size={11} strokeWidth={1.5} />
                            أضف للحقيبة
                          </button>
                        </div>
                      </div>
                    </Link>
                    <h3 className="font-display text-sm text-foreground group-hover:text-accent transition-colors duration-300 mb-0.5">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-foreground/70 font-body">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-[10px] text-muted-foreground line-through font-body">{product.originalPrice}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Wishlist;
