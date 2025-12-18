import { Code2, Palette, Lightbulb, Cpu } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Code2,
      title: "CLEAN CODE",
      description: "Writing maintainable, scalable architectures",
      color: "primary",
    },
    {
      icon: Palette,
      title: "UI/UX DESIGN",
      description: "Creating stunning visual experiences",
      color: "secondary",
    },
    {
      icon: Lightbulb,
      title: "INNOVATION",
      description: "Turning ideas into digital reality",
      color: "accent",
    },
    {
      icon: Cpu,
      title: "PERFORMANCE",
      description: "Optimized for maximum efficiency",
      color: "primary",
    },
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-primary font-mono text-sm tracking-wider mb-4">
              {"// ABOUT_ME"}
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              WHO <span className="text-primary text-glow-cyan">AM I</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-gradient-to-r from-transparent to-primary" />
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <div className="h-px w-24 bg-gradient-to-l from-transparent to-primary" />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <div className="glass rounded-2xl p-8 neon-border">
                <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                  I'm a <span className="text-primary font-semibold">full-stack developer</span> with 
                  over 5 years of experience creating digital products that push the boundaries of 
                  what's possible on the web.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                  My journey began with curiosity and evolved into a passion for crafting 
                  <span className="text-secondary"> next-generation</span> user experiences using 
                  cutting-edge technologies.
                </p>
                <p className="text-lg text-foreground/90 leading-relaxed">
                  I specialize in <span className="text-primary">React</span>, 
                  <span className="text-secondary"> TypeScript</span>, 
                  <span className="text-accent"> Three.js</span>, and modern web frameworks.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "5+", label: "YEARS" },
                  { value: "50+", label: "PROJECTS" },
                  { value: "30+", label: "CLIENTS" },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="glass rounded-xl p-4 text-center neon-border"
                  >
                    <div className="text-3xl font-display font-bold text-primary text-glow-cyan">
                      {stat.value}
                    </div>
                    <div className="text-xs font-mono text-muted-foreground tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="glass rounded-xl p-6 neon-border hover:border-primary/50 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-6 h-6 text-${item.color}`} />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2 text-sm tracking-wider">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
