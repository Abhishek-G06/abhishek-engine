import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";
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

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="projects" 
      className={`py-20 lg:py-32 relative overflow-hidden transition-all duration-700 ${
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

          {/* Featured Projects - Bento Grid Style */}
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <div
                  key={project.title}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 ${
                    index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    index === 0 
                      ? 'from-primary/30 via-accent/20 to-primary/10' 
                      : index === 1 
                        ? 'from-accent/30 via-primary/20 to-accent/10'
                        : 'from-primary/20 via-accent/30 to-primary/20'
                  } group-hover:opacity-80 transition-opacity duration-500`} />
                  
                  {/* Glassmorphism overlay */}
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-card/40" />
                  
                  {/* Content */}
                  <div className={`relative p-8 h-full flex flex-col ${index === 0 ? 'min-h-[400px]' : 'min-h-[220px]'}`}>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-auto">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Folder className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-background/40 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-background/60 transition-all duration-300"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-primary/20 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                        >
                          <ArrowUpRight className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                    
                    {/* Title & Description */}
                    <div className="mt-auto">
                      <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors ${
                        index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-muted-foreground mb-5 ${
                        index === 0 ? 'text-base line-clamp-3' : 'text-sm line-clamp-2'
                      }`}>
                        {project.description}
                      </p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-background/50 backdrop-blur-sm text-foreground/80 text-xs font-medium rounded-full border border-border/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-2xl border border-border/30 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
                </div>
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <div
                  key={project.title}
                  className={`group relative rounded-xl overflow-hidden transition-all duration-500 hover:-translate-y-1 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  {/* Background */}
                  <div className="absolute inset-0 bg-card/60 backdrop-blur-sm" />
                  
                  {/* Content */}
                  <div className="relative p-6 border border-border/40 rounded-xl group-hover:border-primary/40 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Folder className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex gap-3">
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
                          className="text-xs text-muted-foreground/80 font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
