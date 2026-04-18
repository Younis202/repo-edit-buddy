import { useState } from "react";
import { db as supabase } from "@/integrations/supabase/db";

export interface AppliedCoupon {
  id: string;
  code: string;
  discount: number;
  description?: string;
}

export const useCoupon = () => {
  const [applied, setApplied] = useState<AppliedCoupon | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apply = async (code: string, subtotal: number): Promise<AppliedCoupon | null> => {
    setLoading(true);
    setError(null);
    try {
      const trimmed = code.trim().toUpperCase();
      if (!trimmed) {
        setError("أدخل كود الخصم");
        return null;
      }

      const { data, error: fetchError } = await supabase
        .from("coupons")
        .select("*")
        .eq("code", trimmed)
        .eq("is_active", true)
        .maybeSingle();

      if (fetchError || !data) {
        setError("الكود غير صحيح أو منتهي");
        return null;
      }

      if (data.expires_at && new Date(data.expires_at) < new Date()) {
        setError("هذا الكود منتهي الصلاحية");
        return null;
      }

      if (data.max_uses && data.uses_count >= data.max_uses) {
        setError("تم استنفاد هذا الكود");
        return null;
      }

      if (subtotal < Number(data.min_order_amount)) {
        setError(`الحد الأدنى للطلب ${Number(data.min_order_amount).toLocaleString("ar-EG")} ج.م`);
        return null;
      }

      const discount =
        data.discount_type === "percent"
          ? Math.round((subtotal * Number(data.discount_value)) / 100)
          : Math.min(Number(data.discount_value), subtotal);

      const result: AppliedCoupon = {
        id: data.id,
        code: data.code,
        discount,
        description: data.description || undefined,
      };
      setApplied(result);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const remove = () => {
    setApplied(null);
    setError(null);
  };

  return { applied, loading, error, apply, remove };
};
