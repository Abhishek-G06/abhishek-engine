import { Heart, Zap } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: "ABOUT", id: "about" },
    { label: "SKILLS", id: "skills" },
    { label: "PROJECTS", id: "projects" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-primary/20">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 text-xl font-display font-bold text-foreground hover:text-primary transition-colors"
            >
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-glow-cyan">PORT</span>
              <span className="text-secondary">FOLIO</span>
            </button>
            <p className="text-sm text-muted-foreground mt-2 font-mono">
              // Building the future, one line at a time
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-display tracking-wider"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-1 font-mono">
            © {currentYear} JANE DOE // Made with{" "}
            <Heart className="w-4 h-4 text-accent fill-accent animate-pulse" />{" "}
            and <span className="text-primary">{"<code/>"}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
