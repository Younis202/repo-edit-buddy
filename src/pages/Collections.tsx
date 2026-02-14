import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const collections = [
  { name: "Outerwear", count: "24 Pieces", desc: "Tailored coats and jackets in premium fabrics" },
  { name: "Knitwear", count: "18 Pieces", desc: "Mongolian cashmere and merino wool essentials" },
  { name: "Tailoring", count: "31 Pieces", desc: "Precision-cut suits and separates" },
  { name: "Accessories", count: "42 Pieces", desc: "Leather goods and finishing touches" },
];

const Collections = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-4">Explore</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-editorial mb-6">Collections</h1>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
            Shop by world — curated edits for every facet of modern living.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-0">
          {collections.map((col) => (
            <Link
              key={col.name}
              to="/shop"
              className="group flex items-center justify-between py-8 border-b border-border/30 hover:border-accent/40 transition-colors"
            >
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-light text-foreground group-hover:text-accent transition-colors">{col.name}</h2>
                <p className="text-muted-foreground font-body text-xs mt-1">{col.desc}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body">{col.count}</span>
                <ArrowRight size={16} className="text-foreground/20 group-hover:text-accent transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Collections;
