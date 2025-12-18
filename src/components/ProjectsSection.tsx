import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Folder, ArrowUpRight } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      title: "NEURAL COMMERCE",
      description:
        "AI-powered e-commerce platform with predictive analytics, personalized recommendations, and seamless checkout experience.",
      tags: ["React", "Node.js", "AI/ML", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "QUANTUM TASKS",
      description:
        "Real-time collaborative project management with WebSocket sync, drag-and-drop interfaces, and team analytics.",
      tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "SYNTHWAVE AI",
      description:
        "AI content generation platform using GPT-4 for marketing copy, blog posts, and creative writing.",
      tags: ["React", "OpenAI", "Tailwind", "Edge Functions"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true,
    },
    {
      title: "CYBER PORTFOLIO",
      description:
        "Futuristic 3D portfolio template with Three.js animations and interactive elements.",
      tags: ["React", "Three.js", "GSAP"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "WEATHER MATRIX",
      description:
        "Immersive weather visualization with 3D globe, real-time data, and predictive forecasting.",
      tags: ["Vue.js", "WebGL", "Weather API"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
    {
      title: "BIOMETRIC TRACKER",
      description:
        "Comprehensive fitness tracking with wearable integration and data visualization.",
      tags: ["React Native", "Firebase", "HealthKit"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-accent font-mono text-sm tracking-wider mb-4">
              {"// FEATURED_WORK"}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              MY <span className="text-accent text-glow-pink">PROJECTS</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-accent" />
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-6 mb-12">
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <div
                  key={project.title}
                  className="group glass rounded-2xl overflow-hidden neon-border hover:border-primary/50 transition-all duration-500"
                >
                  <div className="h-48 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-grid opacity-50" />
                    <Folder className="w-20 h-20 text-primary/40 group-hover:scale-110 group-hover:text-primary/60 transition-all duration-500" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:bg-primary/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg glass hover:bg-primary/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-display font-semibold text-foreground mb-3 tracking-wider group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs font-mono rounded-full border border-primary/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <Button
                      variant="heroOutline"
                      size="sm"
                      className="w-full font-display"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        VIEW PROJECT
                        <ArrowUpRight className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          {/* Other Projects */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects
              .filter((p) => !p.featured)
              .map((project) => (
                <div
                  key={project.title}
                  className="group glass p-6 rounded-xl neon-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="w-10 h-10 text-primary/50 group-hover:text-primary transition-colors" />
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
                  <h3 className="font-display font-semibold text-foreground mb-2 tracking-wider group-hover:text-primary transition-colors">
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
