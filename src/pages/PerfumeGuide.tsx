import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { usePageSEO } from "@/hooks/usePageSEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

const sections = [
  {
    title: "عائلات العطور",
    content: "تنقسم العطور إلى عائلات رئيسية: العود (دافئ وعميق)، الزهري (ناعم ورومانسي)، المسك (نظيف وجذاب)، الشرقي (غامض ودافئ)، والخشبي (أنيق وهادئ). في شذايا، نقدم تشكيلة مختارة من كل عائلة.",
  },
  {
    title: "تركيز العطر",
    content: "أو دو بارفان (EDP) هو التركيز الأكثر شيوعاً في عطورنا — يدوم من ٦ إلى ٨ ساعات. الدهن المركّز (مثل دهن الورد) يدوم أكثر من ١٢ ساعة بفضل تركيزه العالي جداً.",
  },
  {
    title: "طبقات العطر",
    content: "كل عطر يتكون من ثلاث طبقات: المقدمة (الانطباع الأول — تدوم ١٥-٣٠ دقيقة)، القلب (جوهر العطر — يدوم ٢-٤ ساعات)، والقاعدة (الأساس — تدوم حتى نهاية اليوم).",
  },
  {
    title: "كيف تختار عطرك",
    content: "جرّب العطر على بشرتك وليس على الورق فقط — كل بشرة تتفاعل بشكل مختلف. انتظر ٣٠ دقيقة على الأقل قبل اتخاذ قرارك. لا تجرب أكثر من ٣ عطور في نفس الزيارة.",
  },
  {
    title: "نقاط التطبيق",
    content: "رشّ العطر على نقاط النبض: خلف الأذن، المعصم، منحنى الكوع، وقاعدة العنق. تجنب فرك المعصمين معاً — هذا يكسر جزيئات العطر ويغيّر رائحته.",
  },
  {
    title: "حفظ العطور",
    content: "احفظ عطورك في مكان بارد وجاف بعيداً عن أشعة الشمس المباشرة. تجنب الحمام — الرطوبة والحرارة تُفسد التركيبة. الخزانة المغلقة هي المكان المثالي.",
  },
];

const PerfumeGuide = () => {
  usePageSEO({ title: "دليل العطور", description: "دليلك الشامل لعالم العطور — تعلم كيف تختار عطرك المثالي من شذايا." });

  return (
    <>
      <CustomCursor />
      <FilmGrain />
      <SmoothScroll>
        <main className="bg-background min-h-screen md:cursor-none">
          <Navbar />
          <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-4xl mx-auto">
            <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-10">
              <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
              <span>/</span>
              <span className="text-foreground">دليل العطور</span>
            </motion.nav>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="text-[11px] tracking-[0.2em] text-accent/60 font-accent mb-4">معرفة عطرية</p>
              <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-6">
                دليل <span className="italic text-gold-gradient">العطور</span>
              </h1>
              <p className="text-sm text-muted-foreground font-body leading-relaxed mb-16 max-w-2xl">
                كل ما تحتاج معرفته عن عالم العطور — من اختيار العطر المثالي إلى الحفاظ عليه.
              </p>
            </motion.div>

            <div className="space-y-10">
              {sections.map((section, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
                  className="border-b border-border/20 pb-10"
                >
                  <h2 className="font-display text-xl md:text-2xl text-foreground mb-4">{section.title}</h2>
                  <p className="text-sm text-muted-foreground font-body leading-[2]">{section.content}</p>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="mt-16 text-center">
              <Link to="/shop" className="inline-block px-10 py-4 bg-accent text-accent-foreground text-sm font-accent tracking-wide hover:bg-accent/90 transition-all duration-500">
                تسوق العطور
              </Link>
            </motion.div>
          </section>
          <Footer />
        </main>
      </SmoothScroll>
    </>
  );
};

export default PerfumeGuide;
