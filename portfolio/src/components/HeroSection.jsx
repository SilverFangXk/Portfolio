import { useState, useEffect } from "react";
import { GitCommit, GitBranch, Download, ArrowRight, Database, Wand2, HardDrive } from "lucide-react";
import { SiPython } from "react-icons/si";
import { FaRobot } from "react-icons/fa";

import myResume from "../assets/cv_khadija_chkhichkh.pdf";
import myProfileImg from "../assets/profile.jpeg";

const commits = [
  { msg: "feat: started ISDIA", active: false },
  { msg: "build: technical portfolio", active: false },
  { msg: "fix: internship search", active: false },
  { msg: "wip: PFE - risk mgmt", active: true },
];

const etlSteps = [
  { label: "Extract", icon: Database },
  { label: "Transform", icon: Wand2 },
  { label: "Load", icon: HardDrive },
];

export const HeroSection = () => {
  const [etlStage, setEtlStage] = useState(0); // 0 = extract, 1 = transform, 2 = load

  useEffect(() => {
    const interval = setInterval(() => {
      setEtlStage((s) => (s + 1) % etlSteps.length);
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen px-6 py-24 md:px-12 lg:px-20 flex flex-col justify-center items-center"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 text-center lg:text-left">
        <div className="max-w-xl flex flex-col items-center lg:items-start">
          <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground/80">
            Hey, I'm Khadija
          </div>

          <h1 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-foreground">
            Data &amp; AI{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Engineer
            </span>
          </h1>

          <p className="mt-6 text-foreground/70 leading-relaxed">
            4th-year Data Science &amp; AI Engineering student building
            pipelines, models, and the systems that connect them. Currently
            looking for a PFA internship in Data Engineering, AI, and BI.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <a
              href={myResume}
              download="cv_khadija_chkhichkh.pdf"
              className="inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-secondary px-7 py-3.5 font-semibold text-primary-foreground transition-transform hover:scale-105"
            >
              <Download size={16} className="shrink-0" />
              Download CV
            </a>
            <a
              href="#projects"
              className="group inline-flex flex-row items-center justify-center gap-2 whitespace-nowrap rounded-full border border-border px-6 py-3.5 text-foreground/80 transition-colors hover:bg-card/60"
            >
              View projects
              <ArrowRight
                size={16}
                className="shrink-0 transition-transform group-hover:translate-x-1"
              />
            </a>
          </div>
        </div>

        <div className="relative w-full max-w-xs mx-auto">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-br from-primary/25 via-accent/15 to-secondary/25 blur-2xl" />

          <div className="relative rounded-3xl border border-border bg-card/80 backdrop-blur-sm overflow-hidden">
            <img
              src={myProfileImg}
              alt="Khadija Chkhichkh"
              className="w-full h-80 object-cover"
            />
            <div className="border-t border-border bg-background/80 px-5 py-4">
              <div className="font-bold text-foreground">Khadija Chkhichkh</div>
              <div className="text-sm text-foreground/60">
                Data Engineering / AI · ENSA Fès
              </div>
            </div>
          </div>

          {/* ETL pipeline animation */}
          <div className="mt-4 rounded-xl border border-border bg-background/90 backdrop-blur-sm p-3 shadow-lg">
            <div className="mb-2.5 font-mono text-[10px] text-primary tracking-wide">
              etl.pipeline()
            </div>

            <div className="relative flex items-center justify-between px-1">
              <div className="absolute left-4 right-4 top-1/2 h-px -translate-y-1/2 bg-border" />

              <div
                className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_6px_var(--color-primary)] transition-all duration-700 ease-in-out"
                style={{
                  left:
                    etlStage === 0
                      ? "8%"
                      : etlStage === 1
                      ? "48%"
                      : "88%",
                }}
              />

              {etlSteps.map((step, i) => {
                const Icon = step.icon;
                const isActive = etlStage === i;
                const isDone =
                  (etlStage === 1 && i === 0) ||
                  (etlStage === 2 && (i === 0 || i === 1));
                return (
                  <div
                    key={step.label}
                    className="relative z-10 flex flex-col items-center gap-1"
                  >
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-background transition-colors duration-500 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : isDone
                          ? "bg-secondary/70 text-foreground/70"
                          : "bg-card text-foreground/40"
                      }`}
                    >
                      <Icon size={12} />
                    </div>
                    <span
                      className={`font-mono text-[9px] uppercase tracking-wide transition-colors duration-500 ${
                        isActive ? "text-primary" : "text-foreground/40"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 pt-8 border-t border-border w-full max-w-5xl mx-auto">
        <div className="mb-6 flex items-center gap-2 font-mono text-xs text-foreground/50 justify-center lg:justify-start">
          <GitCommit size={14} />
          <span>git log --oneline</span>
        </div>
        <div className="overflow-x-auto pb-2 -mx-2 px-2">
          <div className="relative flex items-start justify-between min-w-[28rem] max-w-2xl mx-auto lg:mx-0">
            <div className="absolute left-0 right-0 top-1.5 h-px bg-border" />
            {commits.map((c, i) => (
              <div
                key={i}
                className="relative z-10 flex flex-1 min-w-[4.5rem] max-w-[6.5rem] flex-col items-center gap-2 px-1"
              >
                <div
                  className={`h-3 w-3 shrink-0 rounded-full border-2 border-background ${
                    c.active ? "bg-primary" : "bg-secondary"
                  }`}
                />
                <span
                  className={`text-center font-mono text-[11px] leading-tight ${
                    c.active ? "text-foreground" : "text-foreground/50"
                  }`}
                >
                  {c.msg}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/80 px-6 py-3 font-mono text-xs text-foreground/60 w-full max-w-5xl mx-auto">
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse-subtle rounded-full bg-primary" />
            <span className="text-primary">open_to_work</span>
          </span>
          <span className="flex items-center gap-1.5">
            <GitBranch size={14} />
            main
          </span>
          <span>UTF-8</span>
        </div>
        <div className="flex flex-wrap items-center gap-5">
          <span className="flex items-center gap-1.5">
            <SiPython size={14} />
            Python 3.11
          </span>
          <span className="flex items-center gap-1.5">
            <FaRobot size={14} />
            MLOps: active
          </span>
        </div>
      </div>
    </section>
  );
};