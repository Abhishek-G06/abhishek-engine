import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ShoppingCart, CheckSquare, Sparkles, Layout, Cloud, Dumbbell, ArrowUpRight } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ParallaxBackground from "@/components/ParallaxBackground";

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-featured online store with cart, checkout, and payment integration. Built with React, Node.js, and Stripe.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      icon: ShoppingCart,
      gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates, drag-and-drop, and team features.",
      tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      icon: CheckSquare,
      gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered tool that helps create marketing copy, blog posts, and social media content.",
      tags: ["React", "OpenAI", "Tailwind", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      icon: Sparkles,
      gradient: "from-orange-500/20 via-amber-500/20 to-yellow-500/20",
    },
    {
      title: "Portfolio Template",
      description:
        "A customizable portfolio template for developers and designers with dark mode support.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      icon: Layout,
    },
    {
      title: "Weather Dashboard",
      description:
        "A beautiful weather app with 7-day forecasts, location search, and weather alerts.",
      tags: ["Vue.js", "Weather API", "Charts"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      icon: Cloud,
    },
    {
      title: "Fitness Tracker",
      description:
        "Track workouts, set goals, and monitor progress with this comprehensive fitness companion.",
      tags: ["React Native", "Firebase", "Charts"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
      icon: Dumbbell,
    },
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="projects" 
      className={`py-20 lg:py-32 bg-card/50 relative overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <ParallaxBackground variant="projects" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              passion for building great products.
            </p>
          </div>

          {/* Featured Projects - Large Cards */}
          <div className="grid lg:grid-cols-3 gap-6 mb-16">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <div
                    key={project.title}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  >
                    {/* Card Background with Glassmorphism */}
                    <div className="absolute inset-0 bg-card/40 backdrop-blur-xl border border-border/30 rounded-2xl" />
                    
                    {/* Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Content */}
                    <div className="relative p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex gap-2">
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background/50 text-muted-foreground hover:text-primary hover:bg-background/80 transition-all duration-300"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-lg bg-background/50 text-muted-foreground hover:text-primary hover:bg-background/80 transition-all duration-300"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                      
                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-background/50 backdrop-blur-sm text-foreground/70 text-xs font-medium rounded-full border border-border/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="w-full group/btn"
                      >
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project
                          <ArrowUpRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                        </a>
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Other Projects - Compact Cards */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground/80 mb-6 text-center">
              Other Noteworthy Projects
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects
                .filter((p) => !p.featured)
                .map((project, index) => {
                  const IconComponent = project.icon;
                  return (
                    <div
                      key={project.title}
                      className={`group relative overflow-hidden rounded-xl transition-all duration-500 hover:-translate-y-1 ${
                        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}
                      style={{ transitionDelay: `${index * 100 + 600}ms` }}
                    >
                      {/* Background */}
                      <div className="absolute inset-0 bg-card/30 backdrop-blur-sm border border-border/20 rounded-xl group-hover:bg-card/50 group-hover:border-primary/30 transition-all duration-300" />
                      
                      {/* Content */}
                      <div className="relative p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="p-2 rounded-lg bg-primary/10">
                            <IconComponent className="w-5 h-5 text-primary/70" />
                          </div>
                          <div className="flex gap-2">
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Github className="w-4 h-4" />
                            </a>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-muted-foreground hover:text-primary transition-colors"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                          </div>
                        </div>
                        <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground/70 font-mono"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
