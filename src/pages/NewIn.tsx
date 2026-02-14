import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const NewIn = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-4">SS26 Collection</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-editorial mb-6">New Arrivals</h1>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
            Discover the latest additions to our collection — thoughtfully crafted pieces that embody modern elegance.
          </p>
        </div>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground font-body text-sm mb-8">New pieces arriving soon. Browse our current collection in the meantime.</p>
          <Link to="/shop" className="inline-flex items-center gap-2 text-[11px] tracking-ultra uppercase font-body text-foreground hover:text-accent transition-colors">
            <span>Shop Now</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default NewIn;
