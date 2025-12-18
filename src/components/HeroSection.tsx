import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Terminal } from "lucide-react";
import Scene3D from "./Scene3D";

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-futuristic"
    >
      <Scene3D />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Terminal-like header */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass neon-border mb-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <Terminal className="w-4 h-4 text-primary" />
            <span className="text-sm font-mono text-primary">
              ~/portfolio $ <span className="animate-pulse">_</span>
            </span>
          </div>

          <h1
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-foreground">JANE</span>{" "}
            <span className="text-primary text-glow-cyan">DOE</span>
          </h1>

          <div
            className="flex items-center justify-center gap-4 mb-8 animate-fade-in opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-display tracking-wider text-muted-foreground">
              FULL STACK <span className="text-secondary text-glow-purple">DEVELOPER</span>
            </h2>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-secondary" />
          </div>

          <p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-sans leading-relaxed animate-fade-in opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            Crafting <span className="text-primary">next-generation</span> digital experiences 
            with cutting-edge technology and futuristic design principles.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("projects")}
              className="group"
            >
              <span className="relative z-10">EXPLORE WORK</span>
              <div className="absolute inset-0 bg-primary/20 blur-xl group-hover:bg-primary/40 transition-all duration-300" />
            </Button>
            <Button
              variant="heroOutline"
              size="xl"
              onClick={() => scrollToSection("contact")}
            >
              INITIALIZE CONTACT
            </Button>
          </div>

          {/* Social Links */}
          <div
            className="flex gap-4 justify-center animate-fade-in opacity-0"
            style={{ animationDelay: "0.6s" }}
          >
            {[
              { icon: Github, href: "https://github.com", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg glass neon-border hover:bg-primary/20 transition-all duration-300 group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
        >
          <span className="text-xs font-mono tracking-wider">SCROLL</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
