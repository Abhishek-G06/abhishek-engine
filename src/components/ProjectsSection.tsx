import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Folder } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ParallaxBackground from "@/components/ParallaxBackground";

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with cart, checkout, and payment integration. Built with React, Node.js, and Stripe.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates, drag-and-drop, and team features.",
      tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered tool that helps create marketing copy, blog posts, and social media content.",
      tags: ["React", "OpenAI", "Tailwind", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "Portfolio Template",
      description:
        "A customizable portfolio template for developers and designers with dark mode support.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Weather Dashboard",
      description:
        "A beautiful weather app with 7-day forecasts, location search, and weather alerts.",
      tags: ["Vue.js", "Weather API", "Charts"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "Fitness Tracker",
      description:
        "Track workouts, set goals, and monitor progress with this comprehensive fitness companion.",
      tags: ["React Native", "Firebase", "Charts"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
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

  const itemVariants = {
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
      id="projects" 
      className="py-20 lg:py-32 bg-card/50 relative overflow-hidden"
    >
      <ParallaxBackground variant="projects" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              passion for building great products.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            className="grid lg:grid-cols-2 gap-8 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <motion.div
                  key={project.title}
                  className="group bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/30 to-primary/10 flex items-center justify-center">
                    <Folder className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>

          {/* Other Projects */}
          <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <motion.div
                  key={project.title}
                  className="group bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="w-10 h-10 text-primary/70" />
                    <div className="flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted-foreground font-mono"
                      >
                        {tag}
                      </span>
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

export default ProjectsSection;
