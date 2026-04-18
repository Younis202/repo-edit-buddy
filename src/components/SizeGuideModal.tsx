import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const sizes = [
  { size: "٣ مل", type: "عينة / تجربة", duration: "٢-٣ ساعات", usage: "للتجربة قبل الشراء" },
  { size: "٦ مل", type: "دهن عطري", duration: "٦-٨ ساعات", usage: "للاستخدام اليومي المركّز" },
  { size: "١٢ مل", type: "دهن عطري كبير", duration: "٨-١٠ ساعات", usage: "لعشاق الدهن العطري" },
  { size: "٣٠ مل", type: "سفر", duration: "٦-٨ ساعات", usage: "مثالي للسفر والتنقل" },
  { size: "٥٠ مل", type: "كلاسيك", duration: "٨-١٢ ساعة", usage: "الحجم الأكثر شيوعاً" },
  { size: "١٠٠ مل", type: "فاخر", duration: "١٠-١٤ ساعة", usage: "للاستخدام المنتظم والإهداء" },
];

const SizeGuideModal = ({ isOpen, onClose }: SizeGuideModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 z-[71] w-auto md:w-[600px] max-h-[85vh] overflow-y-auto bg-card border border-border/30"
          >
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display text-2xl text-foreground">دليل الأحجام</h3>
                <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-foreground/40 hover:text-foreground transition-colors">
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              <div className="space-y-0">
                <div className="grid grid-cols-4 gap-4 pb-4 border-b border-border/30">
                  <span className="text-[10px] tracking-wide text-muted-foreground font-body">الحجم</span>
                  <span className="text-[10px] tracking-wide text-muted-foreground font-body">النوع</span>
                  <span className="text-[10px] tracking-wide text-muted-foreground font-body">مدة الثبات</span>
                  <span className="text-[10px] tracking-wide text-muted-foreground font-body">الاستخدام</span>
                </div>
                {sizes.map((s) => (
                  <div key={s.size} className="grid grid-cols-4 gap-4 py-4 border-b border-border/20 hover:bg-secondary/20 transition-colors duration-300">
                    <span className="font-display text-base text-foreground">{s.size}</span>
                    <span className="text-xs text-foreground/70 font-body">{s.type}</span>
                    <span className="text-xs text-accent font-body">{s.duration}</span>
                    <span className="text-xs text-muted-foreground font-body">{s.usage}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-secondary/20 border border-border/20">
                <p className="text-[11px] text-foreground font-body mb-2">💡 نصيحة</p>
                <p className="text-[11px] text-muted-foreground font-body leading-relaxed">
                  للحصول على أفضل ثبات، رشّ العطر على نقاط النبض (المعصم، خلف الأذن، الرقبة) ولا تفرك العطر بعد الرش.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SizeGuideModal;
