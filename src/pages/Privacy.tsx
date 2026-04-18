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
    title: "جمع المعلومات",
    content: "نجمع المعلومات التي تقدمها لنا مباشرة عند إجراء عملية شراء أو التسجيل في النشرة الإخبارية أو التواصل معنا. تشمل هذه المعلومات: الاسم، البريد الإلكتروني، رقم الهاتف، عنوان الشحن، ومعلومات الدفع.",
  },
  {
    title: "استخدام المعلومات",
    content: "نستخدم معلوماتك لمعالجة الطلبات، إرسال تحديثات الشحن، تحسين تجربة التسوق، وإرسال العروض الحصرية (بموافقتك). لا نبيع أو نشارك بياناتك الشخصية مع أطراف ثالثة لأغراض تسويقية.",
  },
  {
    title: "حماية البيانات",
    content: "نستخدم تقنيات تشفير متقدمة (SSL) لحماية بياناتك. جميع عمليات الدفع تتم عبر بوابات دفع آمنة ومعتمدة. نحتفظ ببياناتك فقط طالما كان ذلك ضرورياً لتقديم خدماتنا.",
  },
  {
    title: "ملفات تعريف الارتباط",
    content: "نستخدم ملفات تعريف الارتباط لتحسين تجربة التصفح وتحليل حركة المرور على الموقع. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال متصفحك.",
  },
  {
    title: "حقوقك",
    content: "لديك الحق في الوصول إلى بياناتك الشخصية، تصحيحها، أو حذفها في أي وقت. يمكنك أيضاً إلغاء الاشتراك في النشرة الإخبارية عبر رابط إلغاء الاشتراك الموجود في كل رسالة.",
  },
  {
    title: "التواصل معنا",
    content: "إذا كانت لديك أي أسئلة حول سياسة الخصوصية، يمكنك التواصل معنا عبر صفحة تواصل معنا أو مراسلتنا على privacy@shathaya.com.",
  },
];

const Privacy = () => {
  usePageSEO({ title: "سياسة الخصوصية", description: "سياسة الخصوصية لشذايا — كيف نجمع ونستخدم ونحمي بياناتك الشخصية." });
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
            <span className="text-foreground">سياسة الخصوصية</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="text-[10px] tracking-wide text-muted-foreground mb-4 font-body">آخر تحديث: أبريل ٢٠٢٦</p>
            <h1 className="font-display text-4xl md:text-6xl font-light text-foreground mb-12">
              سياسة <span className="italic">الخصوصية</span>
            </h1>
            <p className="text-sm text-muted-foreground font-body leading-relaxed mb-12 max-w-2xl">
              في شذايا، نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع واستخدام وحماية معلوماتك.
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
        </section>
        <Footer />
      </main>
    </SmoothScroll>
    </>
  );
};

export default Privacy;
