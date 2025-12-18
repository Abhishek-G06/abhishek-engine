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
  PenTool, 
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
        { name: "Tailwind", icon: Palette },
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
        { name: "Figma", icon: PenTool },
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
                className={`text-center transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${categoryIndex * 150 + 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {category.title}
                </h3>
                <div 
                  className="inline-flex flex-wrap justify-center gap-6 px-8 py-6 rounded-2xl 
                    bg-background/10 backdrop-blur-lg border border-primary/20 
                    shadow-[0_8px_32px_rgba(0,0,0,0.12)] 
                    hover:bg-background/15 hover:border-primary/30 transition-all duration-300"
                >
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = skill.icon;
                    return (
                      <div 
                        key={skill.name}
                        className={`flex flex-col items-center gap-2 px-4 py-3 rounded-xl
                          hover:bg-primary/10 transition-all duration-300 cursor-default
                          ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
                        style={{ transitionDelay: `${categoryIndex * 150 + skillIndex * 100 + 400}ms` }}
                      >
                        <IconComponent className="w-8 h-8 text-primary" />
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
