import { useGsapScroll } from "@/hooks/use-gsap-scroll";
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
  const { sectionRef, contentRef } = useGsapScroll({ stagger: 0.1, y: 30 });
  
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", icon: Code2, color: "#61DAFB", glowColor: "rgba(97,218,251,0.6)" },
        { name: "TypeScript", icon: FileCode, color: "#3178C6", glowColor: "rgba(49,120,198,0.6)" },
        { name: "Tailwind", icon: Palette, color: "#06B6D4", glowColor: "rgba(6,182,212,0.6)" },
        { name: "Next.js", icon: Layers, color: "#888888", glowColor: "rgba(150,150,150,0.5)" },
      ],
    },
    {
      title: "Backend",
      skills: [
        { name: "Node.js", icon: Server, color: "#339933", glowColor: "rgba(51,153,51,0.6)" },
        { name: "PostgreSQL", icon: Database, color: "#4169E1", glowColor: "rgba(65,105,225,0.6)" },
        { name: "GraphQL", icon: Share2, color: "#E10098", glowColor: "rgba(225,0,152,0.6)" },
        { name: "REST APIs", icon: Globe, color: "#FF6B6B", glowColor: "rgba(255,107,107,0.6)" },
      ],
    },
    {
      title: "Tools & Others",
      skills: [
        { name: "Git", icon: GitBranch, color: "#F05032", glowColor: "rgba(240,80,50,0.6)" },
        { name: "Docker", icon: Container, color: "#2496ED", glowColor: "rgba(36,150,237,0.6)" },
        { name: "Figma", icon: PenTool, color: "#F24E1E", glowColor: "rgba(242,78,30,0.6)" },
        { name: "CI/CD", icon: Workflow, color: "#4CAF50", glowColor: "rgba(76,175,80,0.6)" },
      ],
    },
  ];

  return (
    <section 
      ref={sectionRef}
      id="skills" 
      className="py-20 lg:py-32 relative overflow-hidden bg-transparent"
    >
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 data-scroll className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Skills & Expertise
            </h2>
            <div data-scroll className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p data-scroll className="text-lg text-muted-foreground max-w-2xl mx-auto">
              I've honed my skills across the full stack, always staying current
              with the latest technologies and best practices.
            </p>
          </div>

          <div className="space-y-12">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                data-scroll
                className="text-center"
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
                  {category.skills.map((skill) => {
                    const IconComponent = skill.icon;
                    return (
                      <div 
                        key={skill.name}
                        className="group flex flex-col items-center gap-2 px-4 py-3 rounded-xl
                          transition-all duration-300 cursor-default"
                      >
                        <div 
                          className="p-2 rounded-lg transition-all duration-300 group-hover:scale-110"
                          style={{ 
                            '--glow-color': skill.glowColor 
                          } as React.CSSProperties}
                        >
                          <IconComponent 
                            className="w-8 h-8 transition-all duration-300 group-hover:animate-float group-hover:drop-shadow-[0_0_12px_var(--glow-color)]" 
                            style={{ color: skill.color }}
                          />
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
