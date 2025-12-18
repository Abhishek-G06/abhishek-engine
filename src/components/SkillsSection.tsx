import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxBackground from "@/components/ParallaxBackground";

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Tailwind CSS", level: 92 },
        { name: "Next.js", level: 85 },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "PostgreSQL", level: 82 },
        { name: "GraphQL", level: 78 },
        { name: "REST APIs", level: 90 },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", level: 92 },
        { name: "Docker", level: 75 },
        { name: "Figma", level: 85 },
        { name: "CI/CD", level: 80 },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
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
      id="skills" 
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      <ParallaxBackground variant="skills" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I've honed my skills across the full stack, always staying current
              with the latest technologies and best practices.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {skillCategories.map((category) => (
              <motion.div
                key={category.title}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border/50 hover:shadow-lg transition-shadow duration-500"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.4 + skillIndex * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground/80 font-medium">
                          {skill.name}
                        </span>
                        <span className="text-primary font-semibold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted/50 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{
                            duration: 1,
                            delay: 0.6 + skillIndex * 0.1,
                            ease: "easeOut",
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
