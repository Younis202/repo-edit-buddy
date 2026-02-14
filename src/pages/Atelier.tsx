import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import craftsmanship from "@/assets/craftsmanship-1.jpg";

const Atelier = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-4">Craftsmanship</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-editorial mb-6">The Atelier</h1>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
            Every piece begins with intention. From sourcing the finest materials to the final stitch, our atelier is where heritage meets innovation.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mb-16">
          <div className="aspect-[16/9] overflow-hidden">
            <img src={craftsmanship} alt="The Atelier" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { label: "Hours per Garment", value: "40+" },
            { label: "Countries Sourcing", value: "12" },
            { label: "Years of Heritage", value: "Since 2024" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-light text-foreground mb-2">{stat.value}</p>
              <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Atelier;
