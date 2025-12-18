import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import heroAvatar from "@/assets/hero-avatar.png";
import ParallaxBackground from "@/components/ParallaxBackground";

const HeroSection = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut" as const,
      },
    },
  };

  const avatarVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        delay: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 1 + i * 0.1,
        ease: "easeOut" as const,
      },
    }),
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background pt-20"
    >
      {/* Parallax Background */}
      <ParallaxBackground variant="hero" />
      
      {/* Subtle gradient overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-transparent to-background/70 pointer-events-none" style={{ zIndex: 1 }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          {/* Text Content */}
          <motion.div
            className="flex-1 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-primary font-medium mb-4"
              variants={itemVariants}
            >
              Hello, I'm
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-6"
              variants={itemVariants}
            >
              Jane Doe
            </motion.h1>
            <motion.h2
              className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-serif mb-8"
              variants={itemVariants}
            >
              Full Stack Developer & Designer
            </motion.h2>
            <motion.p
              className="text-foreground/70 text-lg max-w-lg mx-auto lg:mx-0 mb-10"
              variants={itemVariants}
            >
              I craft beautiful, functional digital experiences that help
              businesses grow and users smile.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
              variants={itemVariants}
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
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                { href: "https://github.com", icon: Github },
                { href: "https://linkedin.com", icon: Linkedin },
                { href: "mailto:hello@example.com", icon: Mail },
              ].map((social, i) => (
                <motion.a
                  key={social.href}
                  href={social.href}
                  target={social.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={social.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="p-3 rounded-full bg-card hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg"
                  variants={socialVariants}
                  initial="hidden"
                  animate="visible"
                  custom={i}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Avatar */}
          <motion.div
            className="flex-shrink-0"
            variants={avatarVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="relative">
              <div className="w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                <img
                  src={heroAvatar}
                  alt="Jane Doe - Full Stack Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary rounded-full flex items-center justify-center shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
              >
                <span className="text-primary-foreground font-bold text-sm text-center">
                  5+ Years<br />Exp.
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          onClick={() => scrollToSection("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
