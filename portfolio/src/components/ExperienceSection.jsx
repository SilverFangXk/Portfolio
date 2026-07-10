import { Circle } from "lucide-react";

export const ExperienceSection = () => {
  // Each entry renders as a fake "git commit" — role/company become the commit
  // message, status maps to a commit type prefix (feat/chore), and each gets
  // its own color so the log reads like colored branches in a real git graph.
  const experienceData = [
    {
      hash: "7a3f1e2",
      type: "feat",
      scope: "nexteer",
      role: "Data Engineering Intern (PFA/PFE)",
      company: "Nexteer Automotive Morocco",
      location: "Zone Franche de Kénitra, Morocco",
      duration: "July 14, 2026",
      status: "upcoming",
      description: [
        "Upcoming internship focused on data engineering practices",
        "within an automotive manufacturing environment.",
        "Details to be logged as the internship progresses."
      ],
      color: "primary"
    },
    {
      hash: "4c9d081",
      type: "chore",
      scope: "safe-consulting",
      role: "Développeuse Stagiaire",
      company: "Safe Consulting",
      location: "Salé, Morocco",
      duration: "Jul 01 – Aug 01, 2025",
      status: "past",
      description: [
        "Designed and developed a stock management web application",
        "for product tracking and administration.",
        "Stack: HTML, CSS, JavaScript, Flask, MySQL."
      ],
      color: "purple"
    }
    // Add future roles here — same shape, new "color" from
    // { primary | secondary | accent | purple | rose }.
  ];

  const colorStyles = {
    primary: { bar: "bg-primary", text: "text-primary", dot: "text-primary" },
    secondary: { bar: "bg-secondary", text: "text-secondary", dot: "text-secondary" },
    accent: { bar: "bg-accent", text: "text-accent", dot: "text-accent" },
    purple: { bar: "bg-purple", text: "text-purple", dot: "text-purple" },
    rose: { bar: "bg-rose", text: "text-rose", dot: "text-rose" }
  };

  const statusLabel = {
    upcoming: "HEAD -> main, upcoming",
    current: "HEAD -> main",
    past: "origin/main"
  };

  return (
    <section id="experience" className="relative px-6 py-24 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-4xl">

        {/* Section header — matches Hero / About / Behind the Data pattern */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            WorkExperience.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Work{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience
            </span>
          </h2>
        </div>

        {/* Terminal window */}
        <div className="mt-12 rounded-2xl border border-border/60 bg-card shadow-xl overflow-hidden">

          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-muted/60 border-b border-border/50">
            <span className="w-3 h-3 rounded-full bg-rose/70" />
            <span className="w-3 h-3 rounded-full bg-accent/70" />
            <span className="w-3 h-3 rounded-full bg-primary/70" />
            <span className="ml-3 text-xs font-mono text-foreground/50">
              khadija@portfolio: ~/experience
            </span>
          </div>

          {/* Terminal body — text-left is explicit because #root has a global
              text-align: center that would otherwise center every line */}
          <div className="p-6 md:p-8 font-mono text-sm leading-relaxed overflow-x-auto text-left">

            {/* Status line — currently open to a PFE internship */}
            <p className="mb-2 text-left">
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground/50">git status</span>
            </p>
            <p className="mb-6 text-left pl-4 border-l-2 border-primary/40 text-foreground/70">
              On branch <span className="text-primary font-semibold">main</span> — currently searching for a{" "}
              <span className="text-primary font-semibold">PFE internship in Data Engineering</span>.
            </p>

            <p className="text-foreground/50 mb-6 text-left">
              <span className="text-accent">$</span> git log --graph --author="khadija.chkhichkh"
            </p>

            <div className="space-y-8">
              {experienceData.map((exp, index) => {
                const c = colorStyles[exp.color];
                return (
                  <div key={index} className="flex gap-4 text-left">

                    {/* Graph rail: just the dot now — the connecting line is redundant
                        once each commit has its own shaded card for separation */}
                    <div className="flex flex-col items-center pt-4 shrink-0">
                      <Circle size={10} className={`${c.dot} fill-current`} />
                    </div>

                    {/* Commit body — wrapped in a faint card so each commit reads as
                        one distinct block instead of blending into the next */}
                    <div className="flex-1 min-w-0 pb-2 text-left">
                      <div className="rounded-lg bg-muted/40 border border-border/30 px-4 py-3.5">
                        <p className="text-left text-[13px] tracking-wide">
                          <span className={`${c.text} font-bold`}>commit {exp.hash}</span>
                          <span className="text-foreground/40"> ({statusLabel[exp.status]})</span>
                        </p>

                        {/* Author/Date as a small aligned label grid so the colon column lines up */}
                        <div className="grid grid-cols-[4.5rem_1fr] gap-x-2 gap-y-0.5 text-foreground/55 mt-2 mb-4 text-left text-[13px]">
                          <span>Author:</span>
                          <span>Khadija Chkhichkh</span>
                          <span>Date:</span>
                          <span>{exp.duration}</span>
                        </div>

                        <p className="text-foreground pl-4 border-l-2 border-border/50 text-left">
                          <span className={`${c.text} font-bold`}>{exp.type}</span>
                          <span className="text-foreground/70">({exp.scope}): </span>
                          <span className="font-semibold">{exp.role}</span>
                        </p>
                        <p className="pl-4 border-l-2 border-border/50 text-foreground/70 text-left mt-1 pb-2">
                          @ {exp.company} — {exp.location}
                        </p>

                        <div className="pl-4 border-l-2 border-border/50 text-foreground/70 space-y-1 text-left">
                          {exp.description.map((line, i) => (
                            <p key={i} className="text-left">{line}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Blinking cursor at the end, playful nod to an active terminal */}
            <p className="mt-6 text-foreground/50 text-left">
              <span className="text-accent">$</span>{" "}
              <span className="inline-block w-2 h-4 bg-primary align-middle animate-pulse" />
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};