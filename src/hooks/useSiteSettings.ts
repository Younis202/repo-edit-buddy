import { useQuery } from "@tanstack/react-query";
import { db as supabase } from "@/integrations/supabase/db";

export const useSiteSettings = () => {
  return useQuery({
    queryKey: ["site-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map: Record<string, any> = {};
      (data || []).forEach((r) => (map[r.key] = r.value));
      return map as {
        shipping?: { default_cost: number; free_threshold: number; governorates: { name: string; cost: number }[] };
        store?: { name: string; tagline: string; phone: string; whatsapp: string; email: string; instagram: string; facebook: string };
        announcement?: { enabled: boolean; text: string; link: string };
      };
    },
    staleTime: 5 * 60_000,
  });
};
