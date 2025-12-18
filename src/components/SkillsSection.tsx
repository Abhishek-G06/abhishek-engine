import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ParallaxBackground from "@/components/ParallaxBackground";
import { 
  Code2, 
  FileJson, 
  Palette, 
  LayoutGrid,
  Server, 
  Database, 
  GitGraph, 
  Globe,
  GitBranch, 
  Container, 
  Figma, 
  RefreshCw 
} from "lucide-react";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: Code2 },
        { name: "TypeScript", icon: FileJson },
        { name: "Tailwind CSS", icon: Palette },
        { name: "Next.js", icon: LayoutGrid },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: Server },
        { name: "PostgreSQL", icon: Database },
        { name: "GraphQL", icon: GitGraph },
        { name: "REST APIs", icon: Globe },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "Docker", icon: Container },
        { name: "Figma", icon: Figma },
        { name: "CI/CD", icon: RefreshCw },
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
                className={`transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${categoryIndex * 150 + 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                  {category.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <div 
                        key={skill.name}
                        className={`flex flex-col items-center gap-2 transition-all duration-500 hover:scale-110 ${
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${categoryIndex * 150 + skillIndex * 100 + 400}ms` }}
                      >
                        <div className="p-4 rounded-xl bg-card/30 backdrop-blur-sm border border-border/20 hover:bg-card/50 hover:border-primary/30 transition-all duration-300">
                          <IconComponent className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-sm text-foreground/80 font-medium">
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
