import { MapPin, GraduationCap, Search } from "lucide-react";

const profile = [
  { label: "role", value: "Data & AI Engineering student" },
  { label: "focus", value: "Data Engineering · BI · Data Analysis · Web Dev" },
  { label: "based_in", value: "Fès, Morocco" },
  { label: "currently", value: "Looking for a PFE in Data Engineering" },
];

export const AboutSection = () => {
  return (
    <section id="about" className="relative px-6 py-24 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-5xl">
        {/* Section header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground/80">
            Who I am
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            The person behind the{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              pipelines
            </span>
          </h2>
        </div>

        {/* Narrative + profile card */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-start">
          {/* Narrative */}
          <div className="space-y-5 text-center lg:text-left">
            <p className="text-sm md:text-base leading-relaxed text-foreground/70">
              I like data for the same reason I like a good mystery: raw
              information rarely tells the whole story until you know where
              to look. A messy dataset and an unsolved case ask the same
              question  what pattern is hiding in here, and can you prove
              it?
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/70">
              I'm a 4th-year Data Science & AI Engineering student at ENSA
              Fès, and most of what I build sits at the point where raw data
              becomes something a person can actually use  a clean
              pipeline, a dashboard that answers the question before someone
              has to ask it twice, an interface that makes the data usable
              instead of just accurate.
            </p>
            <p className="text-sm md:text-base leading-relaxed text-foreground/70">
              Right now I'm looking for a PFE in Data Engineering, drawing on
              what I've built so far across BI, data analysis, data
              engineering, and web development  the part of the stack where
              data stops being a problem and starts being an answer.
            </p>
          </div>

          {/* Profile config card */}
          <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden shadow-lg">
            <div className="flex items-center gap-2 border-b border-border bg-background/60 px-4 py-2.5 font-mono text-[11px] text-foreground/50">
              <Search size={12} />
              profile.json
            </div>
            <div className="p-5 space-y-3 font-mono text-xs">
              {profile.map((p) => (
                <div key={p.label} className="flex flex-wrap gap-x-2">
                  <span className="text-primary">{p.label}:</span>
                  <span className="text-foreground/70">"{p.value}"</span>
                </div>
              ))}
              <div className="flex items-center gap-1.5 pt-2 text-foreground/40">
                <MapPin size={11} />
                <span>Fès, Morocco</span>
              </div>
              <div className="flex items-center gap-1.5 text-foreground/40">
                <GraduationCap size={11} />
                <span>ENSA Fès</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};