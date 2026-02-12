import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const footerLinks = [
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-xl font-bold text-foreground hover:text-primary transition-colors"
            >
              Portfolio
            </button>
            <p className="text-sm text-muted-foreground mt-2">
              Building digital experiences that matter.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
              © {currentYear} Jane Doe. Made with{" "}
              <Heart className="w-4 h-4 text-destructive fill-destructive" /> All
              rights reserved.
            </p>
            <Link to="/admin" className="text-xs text-muted-foreground/50 hover:text-muted-foreground transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
