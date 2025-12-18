import { Code, Palette, Lightbulb, Heart } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxBackground from "@/components/ParallaxBackground";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code is my passion",
    },
    {
      icon: Palette,
      title: "Design Focus",
      description: "Creating visually stunning user interfaces",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant solutions",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Building experiences people love to use",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section 
      ref={ref}
      id="about" 
      className="py-20 lg:py-32 bg-card/50 relative overflow-hidden"
    >
      <ParallaxBackground variant="about" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <motion.div
              className="space-y-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.p
                className="text-lg text-foreground/80 leading-relaxed"
                variants={itemVariants}
              >
                I'm a passionate full-stack developer with over 5 years of
                experience creating digital products that make a difference. My
                journey in tech started with a curiosity about how things work,
                and it has evolved into a career dedicated to crafting
                exceptional user experiences.
              </motion.p>
              <motion.p
                className="text-lg text-foreground/80 leading-relaxed"
                variants={itemVariants}
              >
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community. I believe in continuous learning and
                pushing the boundaries of what's possible on the web.
              </motion.p>
              <motion.p
                className="text-lg text-foreground/80 leading-relaxed"
                variants={itemVariants}
              >
                I specialize in React, TypeScript, Node.js, and modern CSS
                frameworks. I'm always excited to take on new challenges and
                collaborate with teams that share my passion for quality and
                innovation.
              </motion.p>
            </motion.div>

            {/* Highlights Grid */}
            <motion.div
              className="grid grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              {highlights.map((item) => (
                <motion.div
                  key={item.title}
                  className="p-6 bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1 border border-border/50"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
