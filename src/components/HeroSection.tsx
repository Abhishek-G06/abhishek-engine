import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";
import HeroScene from "@/components/3d/HeroScene";
import ParallaxBackground from "@/components/ParallaxBackground";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
    >
      {/* Parallax Background */}
      <ParallaxBackground variant="hero" />
      
      {/* 3D Background Scene */}
      <HeroScene />
      
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-transparent to-background/70 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative" style={{ zIndex: 2 }}>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <p className="text-primary font-medium mb-4 animate-fade-in opacity-0" style={{ animationDelay: "0.1s" }}>
              Hello, I'm
            </p>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6 animate-fade-in opacity-0"
              style={{ animationDelay: "0.2s" }}
            >
              Jane Doe
            </h1>
            <h2
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-serif mb-8 animate-fade-in opacity-0"
              style={{ animationDelay: "0.3s" }}
            >
              Full Stack Developer & Designer
            </h2>
            <p
              className="text-foreground/70 text-lg max-w-lg mx-auto lg:mx-0 mb-10 animate-fade-in opacity-0"
              style={{ animationDelay: "0.4s" }}
            >
              I craft beautiful, functional digital experiences that help
              businesses grow and users smile.
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in opacity-0"
              style={{ animationDelay: "0.5s" }}
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
              className="flex gap-4 justify-center lg:justify-start animate-fade-in opacity-0"
              style={{ animationDelay: "0.6s" }}
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
            className="flex-shrink-0 animate-scale-in opacity-0"
            style={{ animationDelay: "0.3s" }}
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
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
