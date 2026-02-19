import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/i18n/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLButtonElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Custom easing: cubic-bezier(0.22, 1, 0.36, 1)
      const customEase = "power2.out";
      
      // Get all animated elements
      const greeting = contentRef.current?.querySelector('[data-animate="greeting"]');
      const name = contentRef.current?.querySelector('[data-animate="name"]');
      const title = contentRef.current?.querySelector('[data-animate="title"]');
      const description = contentRef.current?.querySelector('[data-animate="description"]');
      const buttons = contentRef.current?.querySelector('[data-animate="buttons"]');
      const socials = contentRef.current?.querySelector('[data-animate="socials"]');
      
      // Check if mobile for different animation directions
      const isMobile = window.innerWidth < 1024;
      
      // Initial state: everything hidden
      // Content slides in from the right (desktop) or bottom (mobile)
      const elements = [greeting, name, title, description, buttons, socials];
      gsap.set(elements, { 
        opacity: 0, 
        x: isMobile ? 0 : 100,
        y: isMobile ? 40 : 0,
      });
      
      // Avatar slides in from the left (desktop) or top (mobile)
      gsap.set(avatarRef.current, { 
        opacity: 0, 
        x: isMobile ? 0 : -100,
        y: isMobile ? -40 : 0,
      });
      
      gsap.set(scrollIndicatorRef.current, { 
        opacity: 0,
      });

      // Create timeline with 300ms initial delay
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: customEase,
        }
      });

      // Line-by-line reveal with stagger - content slides from right/bottom
      tl.to(greeting, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.4,
      })
      .to(name, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.4,
      }, "-=1.2")
      .to(title, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.4,
      }, "-=1.2")
      .to(description, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.4,
      }, "-=1.2")
      .to(buttons, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.4,
      }, "-=1.2")
      .to(socials, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.4,
      }, "-=1.2")
      .to(avatarRef.current, {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1.6,
      }, "-=1.4")
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        duration: 1.2,
      }, "-=0.8");

      // Scroll-linked parallax for avatar (subtle movement)
      gsap.to(avatarRef.current, {
        y: 100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        }
      });

      // Fade out content on scroll
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "50% top",
          scrub: 1,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20"
    >
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-transparent to-background/70 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content - Right side on desktop */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
            <p 
              data-animate="greeting"
              className="text-primary font-medium mb-4"
            >
              {t("hero.greeting")}
            </p>
            <h1
              data-animate="name"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6"
            >
              Abhishek Gupta
            </h1>
            <h2
              data-animate="title"
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-serif mb-8"
            >
              {t("hero.title")}
            </h2>
            <p
              data-animate="description"
              className="text-foreground/70 text-lg max-w-lg mx-auto lg:mx-0 mb-10"
            >
              {t("hero.description")}
            </p>

            {/* CTA Buttons */}
            <div
              data-animate="buttons"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("projects")}
              >
                {t("hero.viewWork")}
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => scrollToSection("contact")}
              >
                {t("hero.contactMe")}
              </Button>
            </div>

            {/* Social Links */}
            <div
              data-animate="socials"
              className="flex gap-4 justify-center lg:justify-start"
            >
              <a
                href="https://github.com/Abhishek-G06"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/abhishek-gupta-667229189/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:abhi2002gupta@gmail.com"
                aria-label="Send email"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Avatar - Left side on desktop */}
          <div
            ref={avatarRef}
            className="flex-shrink-0 lg:order-first"
          >
            <div className="relative">
              <HeroAvatar />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          ref={scrollIndicatorRef}
          onClick={() => scrollToSection("about")}
          aria-label="Scroll to about section"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

const HeroAvatar = () => {
  const [showAnimated, setShowAnimated] = useState(false);
  const [animatedSrc, setAnimatedSrc] = useState<string | null>(null);

  const handleMouseEnter = () => {
    if (!animatedSrc) {
      import("@/assets/hero-avatar-animated.png").then((mod) => {
        setAnimatedSrc(mod.default);
        setShowAnimated(true);
      });
    } else {
      setShowAnimated(true);
    }
  };

  return (
    <div
      className="group w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl bg-background relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setShowAnimated(false)}
    >
      <img
        src={heroAvatar}
        alt="Abhishek Gupta - Full Stack Developer"
        width={384}
        height={384}
        fetchPriority="high"
        className="w-full h-full object-cover object-top absolute inset-0 transition-opacity duration-500"
        style={{ opacity: showAnimated ? 0 : 1 }}
      />
      {animatedSrc && (
        <img
          src={animatedSrc}
          alt="Abhishek Gupta - Animated Avatar"
          width={384}
          height={384}
          className="w-full h-full object-cover object-top absolute inset-0 transition-opacity duration-500"
          style={{ opacity: showAnimated ? 1 : 0 }}
        />
      )}
    </div>
  );
};

export default HeroSection;
