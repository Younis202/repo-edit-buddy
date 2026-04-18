import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Product } from "@/data/products";

interface WishlistContextType {
  items: Product[];
  isWishlisted: (productId: string | number) => boolean;
  toggleWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string | number) => void;
  clearWishlist: () => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be inside WishlistProvider");
  return ctx;
};

const WISHLIST_KEY = "shazaya-wishlist";

const loadLocal = (): Product[] => {
  try {
    const raw = localStorage.getItem(WISHLIST_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [items, setItems] = useState<Product[]>(() => loadLocal());

  // Sync to localStorage always (offline cache + guests)
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(items));
  }, [items]);

  // When user logs in: merge local wishlist into DB, then load from DB
  useEffect(() => {
    if (!user) return;
    let cancelled = false;

    const sync = async () => {
      // Push local items with valid UUID (string) ids to DB
      const local = loadLocal();
      const toUpload = local.filter((p) => typeof p.id === "string");
      if (toUpload.length > 0) {
        await supabase
          .from("wishlist_items")
          .upsert(
            toUpload.map((p) => ({ user_id: user.id, product_id: p.id as string })),
            { onConflict: "user_id,product_id", ignoreDuplicates: true }
          );
      }

      // Load wishlist from DB joined with products
      const { data } = await supabase
        .from("wishlist_items")
        .select("product_id, products(*)")
        .eq("user_id", user.id);

      if (cancelled) return;

      if (data) {
        const { resolveImage } = await import("@/data/products");
        const dbProducts: Product[] = data
          .filter((row: any) => row.products)
          .map((row: any) => {
            const p = row.products;
            return {
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
            };
          });
        setItems(dbProducts);
      }
    };

    sync();
    return () => { cancelled = true; };
  }, [user]);

  const isWishlisted = useCallback(
    (productId: string | number) => items.some((i) => i.id === productId),
    [items]
  );

  const toggleWishlist = useCallback(async (product: Product) => {
    const exists = items.some((i) => i.id === product.id);
    if (exists) {
      setItems((prev) => prev.filter((i) => i.id !== product.id));
      if (user && typeof product.id === "string") {
        await supabase
          .from("wishlist_items")
          .delete()
          .eq("user_id", user.id)
          .eq("product_id", product.id);
      }
    } else {
      setItems((prev) => [...prev, product]);
      if (user && typeof product.id === "string") {
        await supabase
          .from("wishlist_items")
          .upsert(
            { user_id: user.id, product_id: product.id },
            { onConflict: "user_id,product_id", ignoreDuplicates: true }
          );
      }
    }
  }, [items, user]);

  const removeFromWishlist = useCallback(async (productId: string | number) => {
    setItems((prev) => prev.filter((i) => i.id !== productId));
    if (user && typeof productId === "string") {
      await supabase
        .from("wishlist_items")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", productId);
    }
  }, [user]);

  const clearWishlist = useCallback(async () => {
    setItems([]);
    if (user) {
      await supabase.from("wishlist_items").delete().eq("user_id", user.id);
    }
  }, [user]);

  return (
    <WishlistContext.Provider
      value={{ items, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist, totalItems: items.length }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
