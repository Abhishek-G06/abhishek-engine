import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Folder } from "lucide-react";
import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import ParallaxBackground from "@/components/ParallaxBackground";
import { useProjects } from "@/hooks/use-projects";

const fallbackProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart, checkout, and payment integration.",
    tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
    live_url: "#", github_url: "#", featured: true, image_url: "",
  },
  {
    title: "Task Management App",
    description: "A collaborative project management tool with real-time updates and drag-and-drop.",
    tags: ["Next.js", "TypeScript", "Prisma", "WebSocket"],
    live_url: "#", github_url: "#", featured: true, image_url: "",
  },
  {
    title: "AI Content Generator",
    description: "An AI-powered tool that helps create marketing copy and blog posts.",
    tags: ["React", "OpenAI", "Tailwind", "Vercel"],
    live_url: "#", github_url: "#", featured: true, image_url: "",
  },
];

const ProjectsSection = () => {
  const { sectionRef, contentRef } = useGsapScroll({ stagger: 0.12, y: 40 });
  const { data: dbProjects } = useProjects();

  const projects = dbProjects && dbProjects.length > 0
    ? dbProjects
        .filter((p) => p.visible)
        .map((p) => ({
          title: p.title,
          description: p.description,
          tags: p.tags,
          live_url: p.live_url,
          github_url: p.github_url,
          featured: p.featured,
          image_url: p.image_url,
        }))
    : fallbackProjects;

  return (
    <section 
      ref={sectionRef}
      id="projects" 
      className="py-20 lg:py-32 bg-card/50 relative overflow-hidden"
    >
      <ParallaxBackground variant="projects" />
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 data-scroll className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <div data-scroll className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p data-scroll className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              passion for building great products.
            </p>
          </div>

          {/* Featured Projects */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {projects
              .filter((p) => p.featured)
              .map((project) => (
                <div
                  key={project.title}
                  data-scroll
                  className="group relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border/50 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 aspect-[16/10]"
                >
                  {/* Full-size image background */}
                  <div className="absolute inset-0 bg-background flex items-start justify-center">
                    {project.image_url ? (
                      <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : project.live_url && project.live_url !== "#" ? (
                      <img
                        src={`https://image.thum.io/get/width/1280/noanimate/${project.live_url}`}
                        alt={project.title}
                        className="w-full h-auto object-top group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    ) : (
                      <Folder className="w-16 h-16 text-primary/60 group-hover:scale-110 transition-transform duration-300 mt-12" />
                    )}
                  </div>

                  {/* Hover overlay with details */}
                  <div className="absolute inset-0 bg-background/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-center p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-150">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-200">
                      <Button
                        variant="default"
                        size="sm"
                        asChild
                        className="flex-1"
                      >
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-4 h-4" />
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
              .map((project) => (
                <div
                  key={project.title}
                  data-scroll
                  className="group bg-card p-6 rounded-xl border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Folder className="w-10 h-10 text-primary/70" />
                    <div className="flex gap-2">
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                      <a
                        href={project.live_url}
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
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
