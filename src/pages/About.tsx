import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  return (
    <main className="bg-background min-h-screen">
      <Navbar />
      <section className="pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-[10px] tracking-ultra uppercase text-muted-foreground font-body mb-4">Our Story</p>
          <h1 className="font-display text-5xl md:text-7xl font-light tracking-editorial mb-6">About Maison</h1>
          <p className="text-muted-foreground font-body text-sm max-w-lg mx-auto leading-relaxed">
            Founded on the belief that clothing should be an extension of identity — not a compromise. Maison creates timeless pieces for the modern individual.
          </p>
        </div>
        <div className="max-w-3xl mx-auto mb-16">
          <div className="aspect-[16/9] overflow-hidden">
            <img src={aboutImage} alt="About Maison" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="max-w-2xl mx-auto space-y-8 text-center">
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            We believe in the power of restraint — in design, in process, in presentation. Each collection is a study in balance: between tradition and innovation, structure and fluidity, presence and subtlety.
          </p>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            Our materials are sourced from the finest mills across Italy, Japan, and the British Isles. Every garment is constructed with an obsessive attention to detail that honours the craft of making.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default About;
