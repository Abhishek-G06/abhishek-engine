import { Code, Palette, Lightbulb, Heart } from "lucide-react";

const AboutSection = () => {
  const highlights = [
    {
      icon: Code,
      title: "Clean Code",
      description: "Writing maintainable, scalable code is my passion",
    },
    {
      icon: Palette,
      title: "Design Focus",
      description: "Creating visually stunning user interfaces",
    },
    {
      icon: Lightbulb,
      title: "Problem Solver",
      description: "Turning complex challenges into elegant solutions",
    },
    {
      icon: Heart,
      title: "User-Centric",
      description: "Building experiences people love to use",
    },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 bg-card/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              About Me
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                I'm a passionate full-stack developer with over 5 years of
                experience creating digital products that make a difference. My
                journey in tech started with a curiosity about how things work,
                and it has evolved into a career dedicated to crafting
                exceptional user experiences.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies,
                contributing to open-source projects, or sharing knowledge with
                the developer community. I believe in continuous learning and
                pushing the boundaries of what's possible on the web.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                I specialize in React, TypeScript, Node.js, and modern CSS
                frameworks. I'm always excited to take on new challenges and
                collaborate with teams that share my passion for quality and
                innovation.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <div
                  key={item.title}
                  className="p-6 bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
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
