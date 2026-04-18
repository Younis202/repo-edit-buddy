import { useQuery } from "@tanstack/react-query";
import { db as supabase } from "@/integrations/supabase/db";
import { useAuth } from "@/contexts/AuthContext";

export const useIsAdmin = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["is-admin", user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (error) return false;
      return !!data;
    },
    enabled: !!user,
    staleTime: 5 * 60_000,
  });
  return { isAdmin: !!data, isLoading };
};
