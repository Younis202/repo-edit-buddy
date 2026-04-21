// EssentialsContext — يحفظ "وضع العبوة الاقتصادية" المختار حالياً عبر التنقل بين الصفحات.
// لما العميل يختار عبوة من الشنطة أو من /essentials، الـ ProductDetail يقرأ الحالة دي
// ويغيّر الـ flow: يخفي filter العبوات الفاخرة ويستخدم سعر العبوة الاقتصادية.
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { EssentialsPackage, PackageVariant } from "@/data/essentialsPackages";
import { getPackageVariant } from "@/data/essentialsPackages";

export interface EssentialsSelection {
  packageId: EssentialsPackage["id"];
  variantId: string;
}

interface EssentialsContextType {
  /** الاختيار الحالي للعبوة الاقتصادية (أو null لو مش في الوضع ده) */
  selection: EssentialsSelection | null;
  /** البيانات الكاملة للاختيار الحالي */
  selected: { pkg: EssentialsPackage; variant: PackageVariant } | null;
  /** تفعيل وضع العبوة الاقتصادية */
  setSelection: (sel: EssentialsSelection | null) => void;
  /** الخروج من وضع العبوة الاقتصادية */
  clearSelection: () => void;
  /** فتح/إغلاق modal اختيار العطر */
  isPickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
}

const EssentialsContext = createContext<EssentialsContextType | undefined>(undefined);

const STORAGE_KEY = "shazaya_essentials_selection_v1";

export const useEssentials = () => {
  const ctx = useContext(EssentialsContext);
  if (!ctx) throw new Error("useEssentials must be inside EssentialsProvider");
  return ctx;
};

export const EssentialsProvider = ({ children }: { children: ReactNode }) => {
  const [selection, setSelectionState] = useState<EssentialsSelection | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (selection) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } else {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, [selection]);

  const setSelection = useCallback((sel: EssentialsSelection | null) => {
    setSelectionState(sel);
  }, []);

  const clearSelection = useCallback(() => setSelectionState(null), []);
  const openPicker = useCallback(() => setIsPickerOpen(true), []);
  const closePicker = useCallback(() => setIsPickerOpen(false), []);

  const selected = selection
    ? getPackageVariant(selection.packageId, selection.variantId) ?? null
    : null;

  return (
    <EssentialsContext.Provider
      value={{
        selection,
        selected,
        setSelection,
        clearSelection,
        isPickerOpen,
        openPicker,
        closePicker,
      }}
    >
      {children}
    </EssentialsContext.Provider>
  );
};
