import { motion } from "framer-motion";
import { Truck, RotateCcw, Shield, Droplets } from "lucide-react";

const features = [
  { icon: Truck, label: "شحن مجاني", desc: "للطلبات فوق ١,٠٠٠ ج.م" },
  { icon: RotateCcw, label: "إرجاع سهل", desc: "خلال ٣٠ يوماً" },
  { icon: Droplets, label: "عطور أصلية", desc: "مضمونة ١٠٠٪" },
  { icon: Shield, label: "دفع آمن", desc: "مشفّر ومحمي" },
];

const SizeGuideStrip = () => (
  <section className="border-y border-border/30 bg-secondary/10">
    <div className="grid grid-cols-2 md:grid-cols-4">
      {features.map((f, i) => (
        <motion.div key={f.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
          className="flex items-center gap-4 px-6 md:px-8 py-5 border-l border-border/20 last:border-l-0 group hover:bg-secondary/20 transition-colors duration-500 cursor-pointer">
          <f.icon size={18} strokeWidth={1.5} className="text-accent flex-shrink-0" />
          <div>
            <p className="text-[11px] tracking-wide text-foreground font-body font-medium">{f.label}</p>
            <p className="text-[10px] text-muted-foreground font-body mt-0.5">{f.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default SizeGuideStrip;
