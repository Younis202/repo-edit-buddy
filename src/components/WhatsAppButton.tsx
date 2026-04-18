import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const whatsappNumber = "201234567890";
  const message = encodeURIComponent("مرحباً، أود الاستفسار عن عطور شذايا");

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 3, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-card border border-accent/30 flex items-center justify-center shadow-[0_0_30px_-10px_hsl(38,60%,55%,0.2)] hover:border-accent hover:shadow-[0_0_40px_-10px_hsl(38,60%,55%,0.35)] hover:scale-105 transition-all duration-500 group"
      aria-label="تواصل عبر واتساب"
    >
      <MessageCircle size={22} className="text-accent" strokeWidth={1.5} />
      <span className="absolute left-full mr-3 whitespace-nowrap bg-card text-foreground text-[11px] font-body px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border border-border/30">
        تواصل معنا
      </span>
    </motion.a>
  );
};

export default WhatsAppButton;
