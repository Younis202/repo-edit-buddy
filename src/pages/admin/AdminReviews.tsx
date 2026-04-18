import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Star, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

const AdminReviews = () => {
  const qc = useQueryClient();
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data } = await supabase
        .from("reviews")
        .select("*, products(name, slug)")
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const toggleApprove = async (id: string, current: boolean) => {
    const { error } = await supabase.from("reviews").update({ is_approved: !current }).eq("id", id);
    if (!error) {
      toast.success(current ? "تم إخفاء التقييم" : "تم اعتماد التقييم");
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
    }
  };

  const remove = async (id: string) => {
    if (!confirm("حذف التقييم؟")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (!error) {
      toast.success("تم الحذف");
      qc.invalidateQueries({ queryKey: ["admin-reviews"] });
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="mb-8">
        <p className="text-[10px] tracking-wide text-muted-foreground mb-2 font-body">آراء العملاء</p>
        <h1 className="font-display text-3xl md:text-4xl font-light text-foreground">
          <span className="italic">التقييمات</span>
        </h1>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground font-body">جاري التحميل...</p>
      ) : reviews && reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map((r: any) => (
            <div key={r.id} className={`border p-5 ${r.is_approved ? "border-border/20" : "border-destructive/30 bg-destructive/5"}`}>
              <div className="flex items-start justify-between gap-4 mb-3 flex-wrap">
                <div>
                  <p className="font-display text-sm text-foreground">{r.products?.name || "—"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={11} strokeWidth={1.5}
                          className={s <= r.rating ? "fill-accent text-accent" : "text-foreground/20"} />
                      ))}
                    </div>
                    <span className="text-[10px] text-muted-foreground font-body">
                      {new Date(r.created_at).toLocaleDateString("ar-EG")}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleApprove(r.id, r.is_approved)}
                    className={`text-[10px] tracking-wide font-body px-3 py-1.5 flex items-center gap-1 border ${r.is_approved ? "border-accent text-accent" : "border-border/30 text-muted-foreground"}`}
                  >
                    {r.is_approved ? <Check size={11} strokeWidth={1.5} /> : <X size={11} strokeWidth={1.5} />}
                    {r.is_approved ? "معتمد" : "مخفي"}
                  </button>
                  <button onClick={() => remove(r.id)} className="text-destructive hover:opacity-70 p-2">
                    <Trash2 size={13} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              {r.title && <p className="font-display text-base text-foreground mb-2">{r.title}</p>}
              {r.comment && <p className="text-sm text-foreground/70 font-body leading-relaxed">{r.comment}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-border/30">
          <Star size={32} strokeWidth={1} className="text-foreground/20 mx-auto mb-3" />
          <p className="text-sm text-muted-foreground font-body">لا توجد تقييمات بعد</p>
        </div>
      )}
    </div>
  );
};

export default AdminReviews;
