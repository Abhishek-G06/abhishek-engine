const SkillsSection = () => {
  const skillCategories = [
    {
      title: "FRONTEND",
      color: "primary",
      skills: [
        { name: "React / Next.js", level: 95 },
        { name: "TypeScript", level: 90 },
        { name: "Three.js / WebGL", level: 85 },
        { name: "Tailwind CSS", level: 92 },
      ],
    },
    {
      title: "BACKEND",
      color: "secondary",
      skills: [
        { name: "Node.js", level: 88 },
        { name: "PostgreSQL", level: 82 },
        { name: "GraphQL", level: 78 },
        { name: "REST APIs", level: 90 },
      ],
    },
    {
      title: "TOOLS",
      color: "accent",
      skills: [
        { name: "Git / GitHub", level: 92 },
        { name: "Docker", level: 75 },
        { name: "Figma", level: 85 },
        { name: "CI/CD", level: 80 },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-secondary font-mono text-sm tracking-wider mb-4">
              {"// TECH_STACK"}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              SKILLS & <span className="text-secondary text-glow-purple">EXPERTISE</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-secondary" />
              <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-secondary" />
            </div>
            <p className="text-muted-foreground mt-6 max-w-2xl mx-auto">
              Mastery across the full technology stack with focus on modern, 
              performance-driven solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="glass rounded-2xl p-8 neon-border hover:border-primary/30 transition-all duration-300"
              >
                <h3 className={`font-display font-bold text-${category.color} text-lg tracking-wider mb-6`}>
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-2">
                        <span className="text-foreground/80 font-medium text-sm">
                          {skill.name}
                        </span>
                        <span className={`text-${category.color} font-mono text-sm`}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2 bg-muted/30 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${category.color} to-${category.color}/50 rounded-full relative`}
                          style={{ width: `${skill.level}%` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Tech logos row */}
          <div className="mt-16 glass rounded-2xl p-8 neon-border">
            <p className="text-center text-muted-foreground font-mono text-sm mb-6">
              {"// TECHNOLOGIES_I_WORK_WITH"}
            </p>
            <div className="flex flex-wrap justify-center gap-8">
              {["React", "TypeScript", "Node.js", "Three.js", "PostgreSQL", "Docker", "AWS", "GraphQL"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
