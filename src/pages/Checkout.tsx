import { useState } from "react";
import { usePageSEO } from "@/hooks/usePageSEO";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShoppingBag, Check, Gift } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useCoupon } from "@/hooks/useCoupon";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { db as supabase } from "@/integrations/supabase/db";

const Checkout = () => {
  usePageSEO({ title: "إتمام الطلب", description: "أكمل طلبك من شذايا — شحن مجاني وتغليف فاخر." });
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const { applied: coupon, error: couponError, loading: couponLoading, apply: applyCoupon, remove: removeCoupon } = useCoupon();
  const [couponCode, setCouponCode] = useState("");
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");
  const { data: settings } = useSiteSettings();
  const governorates = settings?.shipping?.governorates || [];
  const defaultShippingCost = settings?.shipping?.default_cost ?? 75;
  const freeThreshold = settings?.shipping?.free_threshold ?? 1000;

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    governorate: "",
    country: "مصر",
    postalCode: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const [orderError, setOrderError] = useState(false);

  const selectedGov = governorates.find((g) => g.name === form.governorate);
  const govShippingCost = selectedGov ? selectedGov.cost : defaultShippingCost;
  const shippingCost = totalPrice >= freeThreshold ? 0 : govShippingCost;
  const giftWrapCost = giftWrap ? 150 : 0;
  const couponDiscount = coupon?.discount || 0;
  const finalTotal = Math.max(0, totalPrice + shippingCost + giftWrapCost - couponDiscount);

  const parsePriceNum = (price: string) => {
    const western = price.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
    return parseFloat(western.replace(/[^0-9.]/g, "")) || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setIsSubmitting(true);
    setOrderError(false);

    try {
      const subtotal = totalPrice;
      const total = finalTotal;

      // 1. Create the order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user?.id || null,
          guest_email: user ? null : form.email,
          guest_phone: user ? null : form.phone,
          shipping_full_name: `${form.firstName} ${form.lastName}`.trim(),
          shipping_phone: form.phone,
          shipping_street: form.address,
          shipping_city: form.city,
          shipping_governorate: form.governorate || form.city,
          shipping_country: form.country || "مصر",
          shipping_postal_code: form.postalCode || null,
          subtotal,
          shipping_cost: shippingCost,
          discount: 0,
          coupon_code: coupon?.code || null,
          coupon_discount: couponDiscount,
          total,
          gift_wrap: giftWrap,
          gift_message: giftWrap ? giftMessage : null,
          notes: form.notes || null,
          payment_method: "cash_on_delivery",
          status: "pending",
          order_number: "",
        })
        .select()
        .single();

      if (orderError || !order) throw orderError || new Error("فشل إنشاء الطلب");

      // 2. Insert order items
      const orderItems = items.map((i) => {
        const unitPrice = parsePriceNum(i.product.price);
        return {
          order_id: order.id,
          product_id: typeof i.product.id === "string" ? i.product.id : null,
          product_slug: i.product.slug,
          product_name: i.product.name,
          product_image: i.product.images[0] || null,
          size: i.size,
          color: i.color,
          unit_price: unitPrice,
          unit_price_display: i.product.price,
          quantity: i.quantity,
          line_total: unitPrice * i.quantity,
        };
      });

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems);
      if (itemsError) throw itemsError;

      // 3. Record coupon redemption (best-effort)
      if (coupon) {
        await supabase.from("coupon_redemptions").insert({
          coupon_id: coupon.id,
          order_id: order.id,
          user_id: user?.id || null,
          discount_applied: couponDiscount,
        });
      }

      // 4. Send email notification (best-effort)
      supabase.functions.invoke("send-order", {
        body: {
          orderNumber: order.order_number,
          customer: form,
          items: items.map((i) => ({ name: i.product.name, slug: i.product.slug, price: i.product.price, size: i.size, color: i.color, quantity: i.quantity })),
          giftWrap,
          giftMessage: giftWrap ? giftMessage : undefined,
          total: `${total.toLocaleString("ar-EG")} ج.م`,
        },
      }).catch(() => {});

      setOrderPlaced(true);
      clearCart();
    } catch (err) {
      console.error("Checkout error:", err);
      setOrderError(true);
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
          <main className="bg-background min-h-screen md:cursor-none">
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
                <p className="text-[10px] tracking-wide text-accent mb-4 font-body">تم تأكيد الطلب</p>
                <h1 className="font-display text-4xl md:text-5xl font-light text-foreground mb-4">
                  شكراً <span className="italic">لك</span>
                </h1>
                <p className="text-sm text-muted-foreground font-body leading-relaxed mb-10">
                  تم استلام طلبك بنجاح. سنتواصل معك قريباً لتأكيد الطلب وتفاصيل الشحن.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    to="/shop"
                    className="text-[10px] tracking-wide font-body text-background bg-foreground px-10 py-4 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                    تابع التسوّق
                  </Link>
                  <Link
                    to="/"
                    className="text-[10px] tracking-wide font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300"
                  >
                    العودة للرئيسية
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
          <main className="bg-background min-h-screen md:cursor-none">
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
                  حقيبتك <span className="italic">فارغة</span>
                </h1>
                <Link
                  to="/shop"
                  className="text-[10px] tracking-wide font-body text-foreground border border-border/30 px-10 py-4 hover:border-accent hover:text-accent transition-all duration-300 inline-block mt-6"
                >
                  تسوّق الآن
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
              <Link to="/shop" className="hover:text-foreground transition-colors">المتجر</Link>
              <span>/</span>
              <span className="text-foreground">الدفع</span>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-10"
            >
              <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">الدفع الآمن</p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
                إتمام <span className="italic">الطلب</span>
              </h1>
            </motion.div>

            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                {/* Right — Form */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="lg:col-span-7 space-y-8"
                >
                  <div>
                    <h3 className="text-[10px] tracking-wide text-foreground font-body mb-5">معلومات التواصل</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        name="firstName"
                        value={form.firstName}
                        onChange={handleChange}
                        required
                        placeholder="الاسم الأول"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="lastName"
                        value={form.lastName}
                        onChange={handleChange}
                        required
                        placeholder="اسم العائلة"
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
                        placeholder="البريد الإلكتروني"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        placeholder="رقم الجوال"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-wide text-foreground font-body mb-5">عنوان الشحن</h3>
                    <input
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="العنوان"
                      className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors mb-4"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {governorates.length > 0 ? (
                        <select
                          name="governorate"
                          value={form.governorate}
                          onChange={handleChange}
                          required
                          className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground outline-none transition-colors"
                        >
                          <option value="">المحافظة</option>
                          {governorates.map((g) => (
                            <option key={g.name} value={g.name}>
                              {g.name} — {g.cost} ج.م
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          name="governorate"
                          value={form.governorate}
                          onChange={handleChange}
                          required
                          placeholder="المحافظة"
                          className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                        />
                      )}
                      <input
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        required
                        placeholder="المدينة / المنطقة"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                      <input
                        name="postalCode"
                        value={form.postalCode}
                        onChange={handleChange}
                        placeholder="الرمز البريدي (اختياري)"
                        className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[10px] tracking-wide text-foreground font-body mb-5">ملاحظات الطلب <span className="text-muted-foreground">(اختياري)</span></h3>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={3}
                      placeholder="تعليمات خاصة لطلبك..."
                      className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Gift Wrapping */}
                  <div className="border border-border/20 p-5">
                    <button
                      type="button"
                      onClick={() => setGiftWrap(!giftWrap)}
                      className="w-full flex items-center gap-4 group"
                    >
                      <div className={`w-10 h-10 border flex items-center justify-center transition-all duration-300 ${
                        giftWrap ? "border-accent bg-accent/10 text-accent" : "border-border/30 text-foreground/40 group-hover:border-foreground/60"
                      }`}>
                        <Gift size={16} strokeWidth={1.5} />
                      </div>
                      <div className="flex-1 text-right">
                        <p className="text-[11px] tracking-wide text-foreground font-body">تغليف هدية فاخر</p>
                        <p className="text-[10px] text-muted-foreground font-body mt-0.5">حقيبة مخملية + بطاقة إهداء مخصصة — ١٥٠ ج.م</p>
                      </div>
                      <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all duration-300 ${
                        giftWrap ? "border-accent bg-accent" : "border-border/40"
                      }`}>
                        {giftWrap && <Check size={12} strokeWidth={2.5} className="text-accent-foreground" />}
                      </div>
                    </button>
                    {giftWrap && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <textarea
                          value={giftMessage}
                          onChange={(e) => setGiftMessage(e.target.value)}
                          rows={2}
                          maxLength={150}
                          placeholder="اكتب رسالة الإهداء هنا..."
                          className="w-full mt-4 bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none transition-colors resize-none"
                        />
                        <p className="text-[9px] text-muted-foreground/40 font-body mt-2">{giftMessage.length}/١٥٠ حرف</p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>

                {/* Left — Order Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="lg:col-span-5"
                >
                  <div className="lg:sticky lg:top-28 border border-border/20 p-6">
                    <h3 className="text-[10px] tracking-wide text-foreground font-body mb-6">ملخص الطلب</h3>

                    <div className="space-y-0">
                      {items.map((item) => (
                        <div key={`${item.product.id}-${item.size}-${item.color}`} className="flex gap-3 py-4 border-b border-border/15">
                          <div className="w-16 h-20 flex-shrink-0 overflow-hidden">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-display text-sm text-foreground truncate">{item.product.name}</p>
                            <p className="text-[9px] tracking-wide text-muted-foreground font-body mt-0.5">
                              {item.size} / {item.color} / الكمية: {item.quantity}
                            </p>
                            <p className="text-xs text-foreground/70 font-body mt-1">{item.product.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-3 pt-5">
                      <div className="flex justify-between text-[10px] tracking-wide font-body">
                        <span className="text-muted-foreground">المجموع الفرعي</span>
                        <span className="text-foreground">{totalPrice.toLocaleString("ar-EG")} ج.م</span>
                      </div>
                      {giftWrap && (
                        <div className="flex justify-between text-[10px] tracking-wide font-body">
                          <span className="text-muted-foreground">تغليف هدية</span>
                          <span className="text-foreground">١٥٠ ج.م</span>
                        </div>
                      )}
                      <div className="flex justify-between text-[10px] tracking-wide font-body">
                        <span className="text-muted-foreground">الشحن{form.governorate ? ` (${form.governorate})` : ""}</span>
                        <span className="text-accent">{shippingCost === 0 ? "مجاني" : `${shippingCost.toLocaleString("ar-EG")} ج.م`}</span>
                      </div>
                      {coupon && (
                        <div className="flex justify-between text-[10px] tracking-wide font-body">
                          <span className="text-accent">خصم ({coupon.code})</span>
                          <span className="text-accent">-{couponDiscount.toLocaleString("ar-EG")} ج.م</span>
                        </div>
                      )}

                      {/* Coupon input */}
                      <div className="pt-2">
                        {coupon ? (
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="text-[10px] tracking-wide text-muted-foreground hover:text-destructive font-body underline"
                          >
                            إزالة الكوبون
                          </button>
                        ) : (
                          <div>
                            <div className="flex gap-2">
                              <input
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="كود الخصم"
                                className="flex-1 bg-transparent border border-border/30 focus:border-accent px-3 py-2 text-xs font-body text-foreground placeholder:text-muted-foreground/50 outline-none"
                              />
                              <button
                                type="button"
                                onClick={() => applyCoupon(couponCode, totalPrice)}
                                disabled={couponLoading || !couponCode}
                                className="text-[10px] tracking-wide font-body border border-border/30 px-4 hover:border-accent hover:text-accent transition-all disabled:opacity-50"
                              >
                                {couponLoading ? "..." : "تطبيق"}
                              </button>
                            </div>
                            {couponError && <p className="text-[10px] text-destructive font-body mt-2">{couponError}</p>}
                          </div>
                        )}
                      </div>

                      <div className="border-t border-border/20 pt-3 flex justify-between items-baseline">
                        <span className="text-[10px] tracking-wide text-foreground font-body">الإجمالي</span>
                        <span className="font-display text-2xl text-foreground">
                          {finalTotal.toLocaleString("ar-EG")} ج.م
                        </span>
                      </div>
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileTap={{ scale: 0.97 }}
                      className="w-full mt-6 py-4 text-[11px] tracking-wide font-body bg-foreground text-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        "جاري إرسال الطلب..."
                      ) : (
                        <>
                          <ShoppingBag size={14} strokeWidth={1.5} />
                          تأكيد الطلب
                        </>
                      )}
                    </motion.button>

                    <p className="text-[9px] tracking-wide text-muted-foreground font-body text-center mt-4">
                      بإتمام طلبك، أنت توافق على الشروط والأحكام
                    </p>
                    {orderError && (
                      <p className="text-[10px] text-destructive font-body text-center mt-3">
                        حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.
                      </p>
                    )}
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
