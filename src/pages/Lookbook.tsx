import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import lookbook1 from "@/assets/lookbook-1.jpg";
import lookbook2 from "@/assets/lookbook-2.jpg";
import lookbook3 from "@/assets/lookbook-3.jpg";

const Lookbook = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-4">Editorial</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-editorial mb-6">Lookbook</h1>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
            A visual narrative of the season — styled moments captured in our latest editorial.
          </p>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          {[lookbook1, lookbook2, lookbook3].map((img, i) => (
            <div key={i} className="aspect-[3/4] overflow-hidden">
              <img src={img} alt={`Lookbook ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Lookbook;
