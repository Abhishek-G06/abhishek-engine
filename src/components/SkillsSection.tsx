import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ParallaxBackground from "@/components/ParallaxBackground";
import { 
  Code2, 
  FileCode, 
  Palette, 
  Layers, 
  Server, 
  Database, 
  GitBranch, 
  Container, 
  PenTool,
  GitMerge,
  Workflow,
  Braces
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
        { name: "GraphQL", icon: Braces },
        { name: "REST APIs", icon: Workflow },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "Docker", icon: Container },
        { name: "Figma", icon: PenTool },
        { name: "CI/CD", icon: GitMerge },
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

          {/* Glassmorphism container */}
          <div 
            className={`backdrop-blur-md bg-card/30 border border-border/30 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <div className="space-y-10">
              {skillCategories.map((category, categoryIndex) => (
                <div
                  key={category.title}
                  className={`transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${categoryIndex * 150 + 300}ms` }}
                >
                  <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    {category.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 md:gap-6">
                    {category.skills.map((skill, skillIndex) => {
                      const IconComponent = skill.icon;
                      return (
                        <div 
                          key={skill.name}
                          className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-background/40 backdrop-blur-sm border border-border/20 hover:border-primary/40 hover:bg-background/60 transition-all duration-300 group ${
                            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                          }`}
                          style={{ transitionDelay: `${categoryIndex * 150 + skillIndex * 80 + 400}ms` }}
                        >
                          <IconComponent className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
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
      </div>
    </section>
  );
};

export default SkillsSection;
