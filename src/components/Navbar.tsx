import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Zap } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "ABOUT", id: "about" },
    { label: "SKILLS", id: "skills" },
    { label: "PROJECTS", id: "projects" },
    { label: "CONTACT", id: "contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass border-b border-primary/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 text-xl font-display font-bold text-foreground hover:text-primary transition-colors"
          >
            <Zap className="w-6 h-6 text-primary" />
            <span className="text-glow-cyan">PORT</span>
            <span className="text-secondary">FOLIO</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.id}
                variant="ghost"
                onClick={() => scrollToSection(link.id)}
                className="text-muted-foreground hover:text-primary font-display text-sm tracking-wider"
              >
                {link.label}
              </Button>
            ))}
            <Button
              variant="hero"
              size="sm"
              onClick={() => scrollToSection("contact")}
              className="ml-4 font-display"
            >
              CONNECT
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden glass border-t border-primary/20 animate-fade-in">
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-3 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-all font-display tracking-wider"
                >
                  {link.label}
                </button>
              ))}
              <Button
                variant="hero"
                className="w-full mt-4 font-display"
                onClick={() => scrollToSection("contact")}
              >
                CONNECT
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
