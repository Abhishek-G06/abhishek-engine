import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight, Sparkles } from "lucide-react";
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
      gradient: "from-primary/30 via-accent/20 to-primary/10",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative project management tool with real-time updates, drag-and-drop, and team features.",
      tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      gradient: "from-accent/30 via-primary/20 to-accent/10",
    },
    {
      title: "AI Content Generator",
      description:
        "An AI-powered tool that helps create marketing copy, blog posts, and social media content.",
      tags: ["React", "OpenAI", "Tailwind", "Vercel"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
      gradient: "from-primary/20 via-accent/30 to-primary/20",
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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">My Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full mb-6" />
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
                  className={`group relative bg-card/80 backdrop-blur-sm rounded-3xl overflow-hidden border border-border/50 hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10 ${
                    index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`} />
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent" />
                  
                  <div className={`relative p-8 ${index === 0 ? 'lg:p-12' : ''} h-full flex flex-col`}>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex gap-2">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-background/60 backdrop-blur-sm text-foreground/80 text-xs font-medium rounded-full border border-border/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-border/50"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-full bg-background/60 backdrop-blur-sm text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all duration-300 border border-border/50"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-end">
                      <h3 className={`font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300 ${index === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-muted-foreground mb-6 ${index === 0 ? 'text-base lg:text-lg' : 'text-sm'}`}>
                        {project.description}
                      </p>
                      
                      <Button
                        variant="outline"
                        size={index === 0 ? "default" : "sm"}
                        asChild
                        className="w-fit group/btn bg-background/60 backdrop-blur-sm border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary"
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
                </div>
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects
              .filter((p) => !p.featured)
              .map((project, index) => (
                <div
                  key={project.title}
                  className={`group relative bg-card/60 backdrop-blur-sm p-6 rounded-2xl border border-border/50 hover:border-primary/40 hover:bg-card/80 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 100 + 600}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
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
                        className="text-xs text-muted-foreground font-mono px-2 py-1 rounded-md bg-muted/50"
                      >
                        {tag}
                      </span>
                    ))}
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
