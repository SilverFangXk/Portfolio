import { Database, Cpu, Terminal } from "lucide-react"; // Highly relevant data engineering icons

export const AboutSection = () => {
  // 1. Centralized milestones data array
  const milestones = [
    {
      icon: <Terminal className="h-6 w-6" />,
      title: "Data Pipelines",
      description: "Designing, building, and optimizing automated ETL/ELT workflows to handle large-scale structured and unstructured data processing streams."
    },
    {
      icon: <Database className="h-6 w-6" />, // 🌟 Our core middle highlight card
      title: "Core Architecture",
      description: "Developing scalable data warehouses, designing optimal relational/NoSQL schemas, and managing secure cloud lake storage infrastructures."
    },
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Analytics Engines",
      description: "Optimizing computation configurations, handling task orchestration layers, and transforming massive, raw datasets into production analytics."
    }
  ];

  return (
    <section id="about" className="py-24 px-8 relative bg-background">
      <div className="container mx-auto max-w-5xl">
        
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-foreground">
          About <span className="text-primary">Me</span>
        </h2>
        
        {/* Two-Column Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left Column: Personal Narrative */}
          <div className="space-y-6 text-center md:text-left">
            <h3 className="text-2xl font-bold text-primary tracking-tight">
              Future Data Engineer
            </h3>
            <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
              I am a driven software developer transitioning deeply into data infrastructure ecosystems. My core path revolves around engineering solid architectural frameworks, structuring reliable cloud assets, and building optimized compute systems.
            </p>
            <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
              With deep programming experience, I merge data logic systems seamlessly with backend APIs and fast client user interfaces.
            </p>
          </div>

          {/* Right Column: Stacked Core Cards */}
          <div className="grid grid-cols-1 gap-6 w-full">
            {milestones.map((item, index) => {
              // Conditional check to isolate the exact middle card instance
              const isMiddleCard = index === 1;

              return (
                <div
                  key={index}
                  className={`p-6 transition-all duration-300 card-hover rounded-xl border ${
                    isMiddleCard
                      ? "bg-primary/5 border-primary/40 shadow-md shadow-primary/5" // Highlighted middle state
                      : "gradient-border border-border/40" // Baseline standard state
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Circle Icon Badge Frame */}
                    <div
                      className={`p-3 rounded-full shrink-0 flex items-center justify-center ${
                        isMiddleCard
                          ? "bg-primary text-primary-foreground shadow-sm shadow-primary/20" // Pop style on middle icon
                          : "bg-primary/10 text-primary" // Subtle baseline tone
                      }`}
                    >
                      {item.icon}
                    </div>

                    {/* Card Copy */}
                    <div className="text-left space-y-1">
                      <h4 className={`font-bold text-lg ${isMiddleCard ? "text-primary" : "text-foreground"}`}>
                        {item.title}
                      </h4>
                      <p className="text-sm text-foreground/75 leading-relaxed">
                        {item.description}
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