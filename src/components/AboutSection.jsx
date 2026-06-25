import { Database, BarChart3, Brain } from "lucide-react"; // Highly relevant data engineering icons

export const AboutSection = () => {
  // 1. Centralized milestones data array
  const milestones = [
    {
      icon: <Database className="h-6 w-6" />,
      title: "Data Pipelines",
      description: "Designing and building ETL/ELT workflows to extract, transform, and load large-scale data efficiently across distributed systems."
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Analytics & Business Intelligence",
      description: "Transforming processed data into insights through analytics, reporting systems, and visualization-driven decision support."
    },
    {
      icon: <Brain className="h-6 w-6" />,
      title: "Machine Learning & AI Systems",
      description: "Developing ML models and AI-powered systems that learn from data and enable intelligent, automated applications."
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
              What fascinates me about data is its ability to reveal patterns, trends, and insights hidden within information that may at first appear insignificant or chaotic.
            </p>
            <p className="text-foreground/80 leading-relaxed text-sm md:text-base">
              As a future Data Engineer, I'm passionate about building the foundations that transform raw data into knowledge, enabling discoveries that can shape industries, influence decisions, and drive innovation. After all, data has become one of the most valuable resources of our time the fuel powering the digital world.
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
                  className={`p-6 transition-all duration-300 card-hover rounded-xl border ${isMiddleCard
                      ? "bg-primary/5 border-primary/40 shadow-md shadow-primary/5" // Highlighted middle state
                      : "gradient-border border-border/40" // Baseline standard state
                    }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Circle Icon Badge Frame */}
                    <div
                      className={`p-3 rounded-full shrink-0 flex items-center justify-center ${isMiddleCard
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