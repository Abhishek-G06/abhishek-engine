import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ParallaxBackground from "@/components/ParallaxBackground";
import { 
  Code2, 
  FileCode, 
  Palette, 
  Layers,
  Server, 
  Database, 
  Share2, 
  Globe,
  GitBranch, 
  Container, 
  Figma, 
  Workflow
} from "lucide-react";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: Code2 },
        { name: "TypeScript", icon: FileCode },
        { name: "Tailwind CSS", icon: Palette },
        { name: "Next.js", icon: Layers },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: Server },
        { name: "PostgreSQL", icon: Database },
        { name: "GraphQL", icon: Share2 },
        { name: "REST APIs", icon: Globe },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "Docker", icon: Container },
        { name: "Figma", icon: Figma },
        { name: "CI/CD", icon: Workflow },
      ],
    },
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLElement>}
      id="skills" 
      className={`py-20 lg:py-32 relative overflow-hidden transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <ParallaxBackground variant="skills" />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I've honed my skills across the full stack, always staying current
              with the latest technologies and best practices.
            </p>
          </div>

          <div className="space-y-12">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`backdrop-blur-md bg-card/30 border border-border/30 rounded-2xl p-8 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${categoryIndex * 150 + 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-6">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <div 
                        key={skill.name}
                        className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-background/50 border border-border/40 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 ${
                          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                        }`}
                        style={{ transitionDelay: `${categoryIndex * 150 + skillIndex * 100 + 400}ms` }}
                      >
                        <IconComponent className="w-5 h-5 text-primary" />
                        <span className="text-foreground/90 font-medium">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
