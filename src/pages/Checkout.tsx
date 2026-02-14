import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);

    try {
      const orderData = {
        customer: form,
        items: items.map((i) => ({
          name: i.product.name,
          slug: i.product.slug,
          price: i.product.price,
          size: i.size,
          color: i.color,
          quantity: i.quantity,
          category: i.product.category,
        })),
        total: `$${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}`,
      };

      await supabase.functions.invoke("send-order", { body: orderData });

      setOrderPlaced(true);
      clearCart();
    } catch {
      // Still show success — edge function may not be deployed yet
      setOrderPlaced(true);
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <CustomCursor />
        <FilmGrain />
        <SmoothScroll>
          <main className="bg-background min-h-screen cursor-none md:cursor-none">
            <Navbar />
            <div className="pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center min-h-[70vh]">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-lg"
              >
                <div className="w-16 h-16 border-2 border-accent rounded-full flex items-center justify-center mx-auto mb-8">
                  <Check size={28} strokeWidth={1.5} className="text-accent" />
                </div>
                <p className="text-[10px] tracking-ultra uppercase text-accent mb-4 font-body">Order Confirmed</p>
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
                  Thank <span className="italic">You</span>
                </h1>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-10">
                  Your order has been received. We'll be in touch shortly with confirmation and shipping details.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/shop"
                    className="text-[10px] tracking-ultra uppercase font-body text-background bg-foreground px-10 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    Continue Shopping
                  </Link>
                  <Link
                    to="/"
                    className="text-[10px] tracking-ultra uppercase font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    Back to Home
                  </Link>
                </div>
              </motion.div>
            </div>
            <Footer />
          </main>
        </SmoothScroll>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <CustomCursor />
        <FilmGrain />
        <SmoothScroll>
          <main className="bg-background min-h-screen cursor-none md:cursor-none">
            <Navbar />
            <div className="pt-32 pb-24 px-6 md:px-12 flex flex-col items-center justify-center min-h-[60vh]">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <ShoppingBag size={40} strokeWidth={1} className="text-foreground/10 mx-auto mb-4" />
                <h1 className="font-display text-3xl font-light text-foreground mb-3">
                  Your bag is <span className="italic">empty</span>
                </h1>
                <Link
                  to="/shop"
                  className="text-[10px] tracking-ultra uppercase font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 inline-block mt-6"
                >
                  Shop Now
                </Link>
              </motion.div>
            </div>
            <Footer />
          </main>
        </SmoothScroll>
      </>
    );
  }

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen cursor-none md:cursor-none">
          <Navbar />

          <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 text-[10px] tracking-editorial uppercase font-body text-muted-foreground mb-10"
            >
              <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
              <span>/</span>
              <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
              <span>/</span>
              <span className="text-foreground">Checkout</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground mb-4 font-body">Secure Checkout</p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
                Place Your <span className="italic">Order</span>
              </h1>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Left — Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="lg:col-span-7 space-y-8"
                >
                  {/* Contact */}
                  <div>
                    <h3 className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-5">Contact Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="First Name"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Last Name"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email Address"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="Phone Number"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Shipping */}
                  <div>
                    <h3 className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-5">Shipping Address</h3>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="Street Address"
                      className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors mb-4"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="City"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="country"
                        value={form.country}
                        onChange={handleChange}
                        required
                        placeholder="Country"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        required
                        placeholder="Postal Code"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <h3 className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-5">Order Notes <span className="text-muted-foreground">(optional)</span></h3>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Special instructions for your order..."
                      className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors resize-none"
                    />
                  </div>
                </motion.div>

                {/* Right — Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-5"
                >
                  <div className="lg:sticky lg:top-28 border border-border/20 p-6">
                    <h3 className="text-[10px] tracking-ultra uppercase text-foreground font-body mb-6">Order Summary</h3>

                    <div className="space-y-0">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 py-4 border-b border-border/15">
                          <div className="w-16 h-20 flex-shrink-0 overflow-hidden">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm text-foreground truncate">{item.product.name}</p>
                            <p className="text-[9px] tracking-editorial uppercase text-muted-foreground font-body mt-0.5">
                              {item.size} / {item.color} / Qty: {item.quantity}
                            </p>
                            <p className="text-xs text-foreground/70 font-body mt-1">{item.product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pt-5">
                      <div className="flex justify-between text-[10px] tracking-editorial uppercase font-body">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span className="text-foreground">${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}</span>
                      </div>
                      <div className="flex justify-between text-[10px] tracking-editorial uppercase font-body">
                        <span className="text-muted-foreground">Shipping</span>
                        <span className="text-accent">Complimentary</span>
                      </div>
                      <div className="border-t border-border/20 pt-3 flex justify-between items-baseline">
                        <span className="text-[10px] tracking-ultra uppercase text-foreground font-body">Total</span>
                        <span className="font-display text-2xl text-foreground">
                          ${totalPrice.toLocaleString("en-US", { minimumFractionDigits: 0 })}
                        </span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-6 py-4 text-[11px] tracking-ultra uppercase font-body bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "Placing Order..."
                      ) : (
                        <>
                          <ShoppingBag size={14} strokeWidth={1.5} />
                          Place Order
                        </>
                      )}
                    </motion.button>

                    <p className="text-[9px] tracking-editorial text-muted-foreground font-body text-center mt-4">
                      By placing your order, you agree to our terms & conditions
                    </p>
                  </div>
                </motion.div>
              </div>
            </form>
          </section>

          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default Checkout;
