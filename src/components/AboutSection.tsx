import { Code, Palette, Lightbulb, Heart } from "lucide-react";
import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import ParallaxBackground from "@/components/ParallaxBackground";
import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const { sectionRef, contentRef } = useGsapScroll({ stagger: 0.12, y: 30 });
  const { t } = useLanguage();

  const highlights = [
    { icon: Code, titleKey: "about.cleanCode", descKey: "about.cleanCodeDesc" },
    { icon: Palette, titleKey: "about.designFocus", descKey: "about.designFocusDesc" },
    { icon: Lightbulb, titleKey: "about.problemSolver", descKey: "about.problemSolverDesc" },
    { icon: Heart, titleKey: "about.userCentric", descKey: "about.userCentricDesc" },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 lg:py-32 bg-card/50 relative overflow-hidden">
      <ParallaxBackground variant="about" />
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 data-scroll className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              {t("about.title")}
            </h2>
            <div data-scroll className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <p data-scroll className="text-lg text-foreground/80 leading-relaxed">{t("about.p1")}</p>
              <p data-scroll className="text-lg text-foreground/80 leading-relaxed">{t("about.p2")}</p>
              <p data-scroll className="text-lg text-foreground/80 leading-relaxed">{t("about.p3")}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item) => (
                <div key={item.titleKey} data-scroll className="p-6 bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{t(item.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground">{t(item.descKey)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
