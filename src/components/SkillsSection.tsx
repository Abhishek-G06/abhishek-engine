import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import ParallaxBackground from "@/components/ParallaxBackground";
import { 
  Atom, 
  FileCode2, 
  Paintbrush, 
  LayoutGrid,
  Server, 
  Database, 
  Share2, 
  Plug,
  GitBranch, 
  Container, 
  Figma, 
  RefreshCcw 
} from "lucide-react";

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: Atom },
        { name: "TypeScript", icon: FileCode2 },
        { name: "Tailwind CSS", icon: Paintbrush },
        { name: "Next.js", icon: LayoutGrid },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: Server },
        { name: "PostgreSQL", icon: Database },
        { name: "GraphQL", icon: Share2 },
        { name: "REST APIs", icon: Plug },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: GitBranch },
        { name: "Docker", icon: Container },
        { name: "Figma", icon: Figma },
        { name: "CI/CD", icon: RefreshCcw },
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className={`relative overflow-hidden bg-card/30 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-border/20 hover:shadow-lg hover:bg-card/40 transition-all duration-500 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/5 before:via-transparent before:to-transparent before:pointer-events-none ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${categoryIndex * 150 + 200}ms` }}
              >
                <h3 className="text-xl font-semibold text-foreground mb-6">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <div 
                        key={skill.name}
                        className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-background/20 hover:bg-background/40 transition-all duration-300 ${
                          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                        }`}
                        style={{ transitionDelay: `${categoryIndex * 150 + skillIndex * 100 + 400}ms` }}
                      >
                        <Icon className="w-8 h-8 text-primary" />
                        <span className="text-sm text-foreground/80 font-medium text-center">
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
