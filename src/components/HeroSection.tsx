import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import heroAvatar from "@/assets/hero-avatar.png";
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
      
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-primary/10 via-transparent to-accent/10 rounded-full blur-3xl" />
      
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/80 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Animated badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-fade-in opacity-0"
              style={{ animationDelay: "0.1s" }}
            >
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-primary font-medium text-sm">Available for new projects</span>
            </div>
            
            <p className="text-primary font-medium mb-4 text-lg animate-fade-in opacity-0" style={{ animationDelay: "0.15s" }}>
              Hello, I'm
            </p>
            
            {/* Gradient text name */}
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 animate-fade-in opacity-0 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]"
              style={{ animationDelay: "0.2s" }}
            >
              Jane Doe
            </h1>
            
            {/* Typewriter-style subtitle with glow */}
            <h2
              className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-serif mb-8 animate-fade-in opacity-0 relative"
              style={{ animationDelay: "0.3s" }}
            >
              <span className="relative">
                Full Stack Developer & Designer
                <span className="absolute -inset-1 bg-primary/10 blur-xl rounded-lg -z-10" />
              </span>
            </h2>
            
            <p
              className="text-foreground/70 text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 mb-10 animate-fade-in opacity-0 leading-relaxed"
              style={{ animationDelay: "0.4s" }}
            >
              I craft beautiful, functional digital experiences that help
              businesses grow and users smile.
            </p>

            {/* CTA Buttons with enhanced styling */}
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 animate-fade-in opacity-0"
              style={{ animationDelay: "0.5s" }}
            >
              <Button
                variant="hero"
                size="xl"
                onClick={() => scrollToSection("projects")}
                className="group relative overflow-hidden"
              >
                <span className="relative z-10">View My Work</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-[gradient-shift_2s_linear_infinite]" />
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() => scrollToSection("contact")}
                className="backdrop-blur-sm"
              >
                Contact Me
              </Button>
            </div>

            {/* Social Links with enhanced hover */}
            <div
              className="flex gap-4 justify-center lg:justify-start animate-fade-in opacity-0"
              style={{ animationDelay: "0.6s" }}
            >
              {[
                { href: "https://github.com", icon: Github, label: "GitHub" },
                { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
                { href: "mailto:hello@example.com", icon: Mail, label: "Email" },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="group p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-primary hover:border-primary transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-primary/20 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:text-primary-foreground transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Enhanced Avatar */}
          <div
            className="flex-shrink-0 animate-scale-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative group">
              {/* Animated glow rings */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent to-primary rounded-full opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500 animate-pulse" />
              <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-20 animate-[spin_8s_linear_infinite]" />
              
              {/* Main avatar container */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl shadow-primary/20 group-hover:border-primary/50 transition-all duration-500">
                <img
                  src={heroAvatar}
                  alt="Jane Doe - Full Stack Developer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              
              {/* Floating experience badge */}
              <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-lg shadow-primary/30 animate-[float_3s_ease-in-out_infinite] group-hover:scale-110 transition-transform duration-300">
                <span className="text-primary-foreground font-bold text-sm text-center leading-tight">
                  5+ Years<br />Exp.
                </span>
              </div>
              
              {/* Decorative dots */}
              <div className="absolute -top-4 -left-4 w-3 h-3 bg-primary rounded-full animate-pulse" />
              <div className="absolute top-1/4 -right-6 w-2 h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute -bottom-6 left-1/4 w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </div>
        </div>

        {/* Scroll indicator with enhanced animation */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">Scroll Down</span>
          <div className="relative">
            <ArrowDown className="w-6 h-6 animate-bounce" />
            <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
