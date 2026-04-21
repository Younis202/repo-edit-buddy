import { usePageSEO } from "@/hooks/usePageSEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import FilmGrain from "@/components/FilmGrain";
import SmoothScroll from "@/components/SmoothScroll";

const sections = [
  {
    title: "شروط الاستخدام",
    content: "باستخدامك لموقع شذايا، فإنك توافق على الالتزام بهذه الشروط والأحكام. نحتفظ بالحق في تعديل هذه الشروط في أي وقت، وسيتم إعلامك بأي تغييرات جوهرية.",
  },
  {
    title: "الطلبات والدفع",
    content: "جميع الأسعار مدرجة بالجنيه المصري وتشمل ضريبة القيمة المضافة. نقبل الدفع بالبطاقات الائتمانية، فوري، وفودافون كاش. يتم تأكيد الطلب بعد التحقق من الدفع. نحتفظ بالحق في رفض أي طلب لأي سبب.",
  },
  {
    title: "الشحن والتوصيل",
    content: "شحن متميز لكل أنحاء مصر بتكلفة محسوبة حسب المحافظة. التوصيل خلال ٢-٥ أيام عمل للقاهرة والإسكندرية، و٣-٧ أيام عمل لباقي المحافظات. جميع الشحنات مؤمّنة ومتتبّعة بتغليف فاخر مخصص.",
  },
  {
    title: "الإرجاع والاستبدال",
    content: "يمكنك إرجاع المنتجات خلال ٣٠ يوماً من تاريخ الاستلام بشرط أن تكون غير مفتوحة وفي عبوتها الأصلية. يتم رد المبلغ خلال ٧-١٤ يوم عمل بنفس طريقة الدفع الأصلية. تكاليف إرجاع الشحن مجانية.",
  },
  {
    title: "الملكية الفكرية",
    content: "جميع المحتويات على هذا الموقع بما فيها الشعارات، النصوص، الصور، والتصاميم هي ملك لشذايا ومحمية بموجب قوانين الملكية الفكرية. لا يجوز نسخ أو إعادة إنتاج أي محتوى بدون إذن كتابي مسبق.",
  },
  {
    title: "المسؤولية",
    content: "نبذل قصارى جهدنا لضمان دقة المعلومات المعروضة على الموقع. ومع ذلك، قد تختلف الألوان المعروضة قليلاً عن المنتج الفعلي بسبب اختلاف إعدادات الشاشات.",
  },
];

const Terms = () => {
  usePageSEO({ title: "الشروط والأحكام", description: "الشروط والأحكام لمتجر شذايا — الطلبات، الشحن، الإرجاع، والملكية الفكرية." });
  return (
    <>
    <CustomCursor />
    <FilmGrain />
    <SmoothScroll>
      <main className="bg-background min-h-screen md:cursor-none">
        <Navbar />
        <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 max-w-4xl mx-auto">
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-[10px] tracking-wide font-body text-muted-foreground mb-10"
          >
            <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-foreground">الشروط والأحكام</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">آخر تحديث: أبريل ٢٠٢٦</p>
            <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-12">
              الشروط <span className="italic">والأحكام</span>
            </h1>
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
        </section>
        <Footer />
      </main>
    </SmoothScroll>
    </>
  );
};

export default Terms;
