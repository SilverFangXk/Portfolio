import { GraduationCap, Calendar, MapPin } from "lucide-react";

export const EducationSection = () => {
  // 1. Array holding your academic history data
  const educationData = [
    {
      degree: "Engineering Cycle in Big Data & Data Engineering",
      school: "National School of Applied Sciences – Fès  (ENSAF) ",
      location: "Fès, Morocco",
      duration: "2024 - 2027",
      description: "Currently specializing in data engineering, big data systems, machine learning, deep learning, web development, and exploratory data analysis (EDA)."
    },
    {
      degree: "Preparatory Cycle in Engineering Sciences",
      school: "National School of Applied Sciences – Fès  (ENSAF) ",
      location: "Fès, Morocco",
      duration: "2022 - 2024",
      description: "An intensive preparatory journey in mathematics, physics, algorithms, and programming (C language), with exposure to tools such as MATLAB and Simulink."
    },
    {
      degree: "Baccalaureate in Mathematical Sciences (With Honors)",
      school: "El Yassmine High School",
      location: "Khémisset, Morocco",
      duration: "Graduated 2022",
      description: " Academic background in mathematics and physics, completed with a 'Mention Bien' distinction."
    }
  ];

  return (
    <section id="education" className="py-24 px-8 relative bg-background">
      <div className="container mx-auto max-w-4xl">

        {/* Section Title */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="p-3 rounded-full bg-primary/10 text-primary mb-3">
            <GraduationCap className="h-8 w-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Academic <span className="text-primary">Timeline</span>
          </h2>
        </div>

        {/* Timeline Layout Spine */}
        {/* Generates a vertical line in the middle on desktop, shifts left on mobile */}
        <div className="relative border-l-2 border-border/60 md:border-l-0 before:absolute before:left-0 before:top-0 before:h-full before:w-[2px] before:bg-linear-to-b before:from-primary/80 before:via-border/60 before:to-transparent md:before:left-1/2 md:before:-translate-x-1/2">

          {/* Loop through each school object */}
          {educationData.map((edu, index) => {
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative mb-12 last:mb-0 pl-8 md:pl-0 w-full flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""
                  }`}
              >
                {/* 2. THE CHRONO DOT (Sits perfectly anchored on the center line) */}
                <div className="absolute left-0 top-1.5 md:left-1/2 md:-translate-x-1/2 z-10 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping absolute opacity-75" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                </div>

                {/* 3. TIMELINE CARD WRAPPER */}
                {/* Takes half-width on desktop, handles left/right shifting offsets */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${isEven ? "md:pr-0" : "md:pl-0"
                  }`}>
                  <div className="gradient-border p-6 card-hover rounded-xl border border-border/40 text-left space-y-3 shadow-xs">

                    {/* Duration Badge & Metadata */}
                    <div className="flex flex-wrap items-center gap-3 text-xs font-semibold tracking-wider text-primary">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                        <Calendar size={12} />
                        {edu.duration}
                      </span>
                      <span className="inline-flex items-center gap-1 text-foreground/60 font-medium">
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                    </div>

                    {/* Degree & Institutional Details */}
                    <div>
                      <h3 className="text-xl font-bold text-foreground leading-snug">
                        {edu.degree}
                      </h3>
                      <h4 className="text-sm font-semibold text-foreground/80 mt-1">
                        {edu.school}
                      </h4>
                    </div>

                    {/* Paragraph Copy */}
                    <p className="text-sm text-foreground/75 leading-relaxed pt-1 border-t border-border/20">
                      {edu.description}
                    </p>

                  </div>
                </div>

                {/* Invisible spacer block keeping the layout side balanced across the spine */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};