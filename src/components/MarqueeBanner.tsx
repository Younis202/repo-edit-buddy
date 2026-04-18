

const MarqueeBanner = () => {
  const items = [
    "مجموعة ٢٠٢٦ الجديدة",
    "✦",
    "شحن مجاني فوق ١,٠٠٠ ج.م",
    "✦",
    "إرجاع سهل خلال ٣٠ يوم",
    "✦",
    "دفع آمن ومشفّر",
    "✦",
    "تقسيط بدون فوائد",
    "✦",
    "تغليف فاخر مجاني",
    "✦",
  ];

  const text = items.join("   ") + "   ";

  return (
    <div className="py-5 border-y border-border/50 overflow-hidden bg-secondary/20 relative">
      <div className="whitespace-nowrap flex animate-marquee-rtl">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-[11px] tracking-wide text-muted-foreground font-body inline-block">{text}</span>
        ))}
      </div>
      <div className="whitespace-nowrap flex animate-marquee-ltr mt-2 opacity-30">
        {[...Array(8)].map((_, i) => (
          <span key={i} className="text-[11px] tracking-wide text-muted-foreground font-body inline-block">{text}</span>
        ))}
      </div>
    </div>
  );
};

export default MarqueeBanner;
