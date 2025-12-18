import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
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
      
      // Initial state: content slides from right, avatar slides from left
      const elements = [greeting, name, title, description, buttons, socials];
      gsap.set(elements, { 
        opacity: 0, 
        x: 60,
        visibility: "hidden"
      });
      
      gsap.set(avatarRef.current, { 
        opacity: 0, 
        x: -60,
        scale: 0.98,
        visibility: "hidden"
      });
      
      gsap.set(scrollIndicatorRef.current, { 
        opacity: 0,
        y: 20,
        visibility: "hidden"
      });

      // Create timeline with 300ms initial delay
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: {
          ease: customEase,
        }
      });

      // Avatar slides in from left
      tl.to(avatarRef.current, {
        opacity: 1,
        x: 0,
        scale: 1,
        visibility: "visible",
        duration: 1.4,
      })
      // Content slides in from right with line-by-line stagger
      .to(greeting, {
        opacity: 1,
        x: 0,
        visibility: "visible",
        duration: 1.4,
      }, 0.1)
      .to(name, {
        opacity: 1,
        x: 0,
        visibility: "visible",
        duration: 1.4,
      }, 0.3)
      .to(title, {
        opacity: 1,
        x: 0,
        visibility: "visible",
        duration: 1.4,
      }, 0.5)
      .to(description, {
        opacity: 1,
        x: 0,
        visibility: "visible",
        duration: 1.4,
      }, 0.7)
      .to(buttons, {
        opacity: 1,
        x: 0,
        visibility: "visible",
        duration: 1.4,
      }, 0.9)
      .to(socials, {
        opacity: 1,
        x: 0,
        visibility: "visible",
        duration: 1.4,
      }, 1.1)
      .to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        visibility: "visible",
        duration: 1.2,
      }, 1.3);

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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div ref={contentRef} className="flex-1 text-center lg:text-left">
            <p 
              data-animate="greeting"
              className="text-primary font-medium mb-4"
              style={{ visibility: "hidden" }}
            >
              Hello, I'm
            </p>
            <h1
              data-animate="name"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6"
              style={{ visibility: "hidden" }}
            >
              Jane Doe
            </h1>
            <h2
              data-animate="title"
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-serif mb-8"
              style={{ visibility: "hidden" }}
            >
              Full Stack Developer & Designer
            </h2>
            <p
              data-animate="description"
              className="text-foreground/70 text-lg max-w-lg mx-auto lg:mx-0 mb-10"
              style={{ visibility: "hidden" }}
            >
              I craft beautiful, functional digital experiences that help
              businesses grow and users smile.
            </p>

            {/* CTA Buttons */}
            <div
              data-animate="buttons"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              style={{ visibility: "hidden" }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("projects")}
              >
                View My Work
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => scrollToSection("contact")}
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links */}
            <div
              data-animate="socials"
              className="flex gap-4 justify-center lg:justify-start"
              style={{ visibility: "hidden" }}
            >
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@example.com"
                className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Avatar */}
          <div
            ref={avatarRef}
            className="flex-shrink-0"
            style={{ visibility: "hidden" }}
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src={heroAvatar}
                  alt="Jane Doe - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-bold text-sm text-center">
                  5+ Years<br />Exp.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          ref={scrollIndicatorRef}
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          style={{ visibility: "hidden" }}
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
