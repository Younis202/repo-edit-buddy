import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { db as supabase } from "@/integrations/supabase/db";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Review {
  id: string;
  user_id: string;
  rating: number;
  title: string | null;
  comment: string | null;
  is_verified_purchase: boolean;
  created_at: string;
  profiles?: { first_name: string | null; last_name: string | null } | null;
}

interface Props {
  productId: string;
}

const ProductReviewsLive = ({ productId }: Props) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("product_id", productId)
      .eq("is_approved", true)
      .order("created_at", { ascending: false });
    setReviews((data as Review[]) || []);
    setLoading(false);
  };

  useEffect(() => {
    if (productId) load();
  }, [productId]);

  const avg = reviews.length
    ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    const { error } = await supabase.from("reviews").upsert(
      {
        product_id: productId,
        user_id: user.id,
        rating,
        title: title.trim() || null,
        comment: comment.trim() || null,
      },
      { onConflict: "product_id,user_id" }
    );
    setSubmitting(false);
    if (error) {
      toast.error("لم نتمكن من حفظ تقييمك");
      return;
    }
    toast.success("شكراً لك! تم نشر تقييمك");
    setShowForm(false);
    setTitle("");
    setComment("");
    setRating(5);
    load();
  };

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 border-t border-border/20">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-[10px] tracking-wide text-muted-foreground mb-3 font-body">آراء العملاء</p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">
              تجارب <span className="italic">حقيقية</span>
            </h2>
            {reviews.length > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      strokeWidth={1.5}
                      className={s <= Math.round(avg) ? "fill-accent text-accent" : "text-foreground/20"}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground font-body">{avg.toFixed(1)}</span>
                <span className="text-xs text-muted-foreground font-body">({reviews.length} تقييم)</span>
              </div>
            )}
          </div>
          {user ? (
            <button
              onClick={() => setShowForm(!showForm)}
              className="text-[11px] tracking-wide font-body border border-border/30 px-6 py-3 hover:border-accent hover:text-accent transition-all duration-300"
            >
              {showForm ? "إلغاء" : "اكتب تقييم"}
            </button>
          ) : (
            <Link
              to="/auth"
              className="text-[11px] tracking-wide font-body border border-border/30 px-6 py-3 hover:border-accent hover:text-accent transition-all duration-300"
            >
              سجّل دخولك للتقييم
            </Link>
          )}
        </div>

        {showForm && user && (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="border border-border/20 p-6 mb-10 space-y-4"
          >
            <div>
              <p className="text-[10px] tracking-wide text-muted-foreground mb-3 font-body">تقييمك</p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    type="button"
                    key={s}
                    onMouseEnter={() => setHover(s)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(s)}
                    className="p-1"
                  >
                    <Star
                      size={22}
                      strokeWidth={1.5}
                      className={s <= (hover || rating) ? "fill-accent text-accent" : "text-foreground/20"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان (اختياري)"
              maxLength={100}
              className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none"
            />
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="شاركنا تجربتك مع هذا العطر..."
              rows={4}
              maxLength={1000}
              className="w-full bg-transparent border-b border-border/30 focus:border-accent pb-3 pt-1 text-sm font-body text-foreground placeholder:text-muted-foreground/50 outline-none resize-none"
            />
            <button
              type="submit"
              disabled={submitting}
              className="text-[11px] tracking-wide font-body bg-foreground text-background px-8 py-3 hover:bg-accent hover:text-accent-foreground transition-colors disabled:opacity-50"
            >
              {submitting ? "جاري النشر..." : "نشر التقييم"}
            </button>
          </motion.form>
        )}

        {loading ? (
          <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground font-body text-center py-12">
            لا توجد تقييمات بعد — كن أول من يشارك تجربته
          </p>
        ) : (
          <div className="space-y-6">
            {reviews.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b border-border/15 pb-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={12}
                        strokeWidth={1.5}
                        className={s <= r.rating ? "fill-accent text-accent" : "text-foreground/20"}
                      />
                    ))}
                  </div>
                  {r.is_verified_purchase && (
                    <span className="text-[9px] tracking-wide text-accent font-body">مشتري مؤكد</span>
                  )}
                  <span className="text-[10px] text-muted-foreground font-body mr-auto">
                    {new Date(r.created_at).toLocaleDateString("ar-EG")}
                  </span>
                </div>
                {r.title && <p className="font-display text-lg text-foreground mb-1">{r.title}</p>}
                {r.comment && <p className="text-sm text-foreground/70 font-body leading-relaxed">{r.comment}</p>}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReviewsLive;
