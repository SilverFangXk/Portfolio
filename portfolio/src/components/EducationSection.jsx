import { Calendar, MapPin } from "lucide-react";

export const EducationSection = () => {
  // 1. Array holding your academic history data
  // Each entry gets a color key so the timeline reads as a color-coded sequence
  const educationData = [
    {
      degree: "Engineering Cycle in Big Data & Data Engineering",
      school: "National School of Applied Sciences – Fès (ENSAF)",
      location: "Fès, Morocco",
      duration: "2024 - 2027",
      description: "Currently specializing in data engineering, big data systems, machine learning, deep learning, web development, and exploratory data analysis (EDA).",
      color: "primary"
    },
    {
      degree: "Preparatory Cycle in Engineering Sciences",
      school: "National School of Applied Sciences – Fès (ENSAF)",
      location: "Fès, Morocco",
      duration: "2022 - 2024",
      description: "An intensive preparatory journey in mathematics, physics, algorithms, and programming (C language), with exposure to tools such as MATLAB and Simulink.",
      color: "accent"
    },
    {
      degree: "Baccalaureate in Mathematical Sciences (With Honors)",
      school: "El Yassmine High School",
      location: "Khémisset, Morocco",
      duration: "Graduated 2022",
      description: "Academic background in mathematics and physics, completed with a 'Mention Bien' distinction.",
      color: "purple"
    }
  ];

  // Maps the color key to the Tailwind classes each card needs.
  // Kept explicit (not string-interpolated) so Tailwind's compiler can see every class.
  const colorStyles = {
    primary: {
      dot: "border-primary bg-primary",
      badge: "bg-primary/10 text-primary border-primary/20",
      title: "group-hover:text-primary",
      glow: "hover:shadow-primary/10"
    },
    accent: {
      dot: "border-accent bg-accent",
      badge: "bg-accent/10 text-accent border-accent/20",
      title: "group-hover:text-accent",
      glow: "hover:shadow-accent/10"
    },
    purple: {
      dot: "border-purple bg-purple",
      badge: "bg-purple/10 text-purple border-purple/20",
      title: "group-hover:text-purple",
      glow: "hover:shadow-purple/10"
    }
  };

  return (
    <section id="education" className="py-24 px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">

        {/* Section Title — matches Hero / About / Experience pattern */}
        <div className="flex flex-col items-center mb-20 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            AcademicTimeline.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Academic{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Timeline
            </span>
          </h2>
        </div>

        {/* ==================== MOBILE: simple stacked list ==================== */}
        <div className="flex flex-col gap-8 md:hidden">
          {educationData.map((edu, index) => {
            const c = colorStyles[edu.color];
            return (
              <div key={index} className={`gradient-border p-6 card-hover rounded-xl text-left space-y-3 shadow-xs ${c.glow}`}>
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${c.badge}`}>
                    <Calendar size={12} />
                    {edu.duration}
                  </span>
                  <span className="inline-flex items-center gap-1 text-foreground/60 font-medium">
                    <MapPin size={12} />
                    {edu.location}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground leading-snug">{edu.degree}</h3>
                  <h4 className="text-sm font-semibold text-foreground/80 mt-1">{edu.school}</h4>
                </div>
                <p className="text-sm text-foreground/75 leading-relaxed pt-1 border-t border-border/20">
                  {edu.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ==================== DESKTOP: horizontal timeline, cards alternating top/bottom ==================== */}
        <div className="hidden md:block relative">

          {/* The horizontal gradient spine, running left to right through primary -> accent -> purple */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[3px] rounded-full bg-gradient-to-r from-primary via-accent to-purple opacity-70" />

          <div
            className="grid items-center relative"
            style={{ gridTemplateColumns: `repeat(${educationData.length}, 1fr)` }}
          >
            {educationData.map((edu, index) => {
              const c = colorStyles[edu.color];
              const isTop = index % 2 === 0; // top, bottom, top ...

              return (
                <div key={index} className="relative flex flex-col items-center min-h-[560px]">

                  {/* The dot, always anchored on the center spine */}
                  <div className="absolute top-1/2 -translate-y-1/2 z-20 flex items-center justify-center">
                    <span className={`absolute w-3 h-3 rounded-full ${c.dot} animate-ping opacity-60`} />
                    <span className={`relative w-3 h-3 rounded-full border-4 border-background ${c.dot}`} />
                  </div>

                  {/* Vertical connector stem from the dot to the card */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b ${isTop ? "from-transparent to-border/60 bottom-1/2 h-[calc(50%-6px)]" : "from-border/60 to-transparent top-1/2 h-[calc(50%-6px)]"
                      }`}
                  />

                  {/* Card, pinned either to the top half or bottom half of the row */}
                  <div
                    className={`absolute w-[88%] ${isTop ? "bottom-[calc(50%+28px)]" : "top-[calc(50%+28px)]"
                      }`}
                  >
                    <div className={`gradient-border p-6 card-hover rounded-xl text-left space-y-3 shadow-xs group ${c.glow}`}>
                      <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border ${c.badge}`}>
                          <Calendar size={12} />
                          {edu.duration}
                        </span>
                      </div>
                      <div>
                        <h3 className={`text-lg font-bold text-foreground leading-snug transition-colors duration-200 ${c.title}`}>
                          {edu.degree}
                        </h3>
                        <h4 className="text-sm font-semibold text-foreground/80 mt-1">
                          {edu.school}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-xs text-foreground/60 font-medium mt-1">
                          <MapPin size={11} />
                          {edu.location}
                        </span>
                      </div>
                      <p className="text-sm text-foreground/75 leading-relaxed pt-1 border-t border-border/20">
                        {edu.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};