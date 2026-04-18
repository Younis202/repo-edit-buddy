import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage, type Product, allProducts } from "@/data/products";

const mapDbProduct = (p: any): Product => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  nameItalic: p.name_italic || p.name.split(" ").pop() || "",
  price: p.price_display,
  originalPrice: p.original_price_display || undefined,
  category: p.category,
  tag: p.tag || "",
  sizes: Array.isArray(p.sizes) ? p.sizes : [],
  images: (Array.isArray(p.images) ? p.images : []).map(resolveImage),
  colors: Array.isArray(p.colors) ? p.colors : [],
  shortDescription: p.short_description || "",
  material: p.material || "",
  season: p.season || "",
  accordion: Array.isArray(p.accordion) ? p.accordion : [],
});

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async (): Promise<Product[]> => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error || !data || data.length === 0) {
        return allProducts;
      }
      return data.map(mapDbProduct);
    },
    staleTime: 60_000,
  });
};

export const useProduct = (slug: string | undefined) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: async (): Promise<Product | null> => {
      if (!slug) return null;
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      if (error || !data) {
        const fallback = allProducts.find((p) => p.slug === slug);
        return fallback || null;
      }
      return mapDbProduct(data);
    },
    enabled: !!slug,
  });
};
