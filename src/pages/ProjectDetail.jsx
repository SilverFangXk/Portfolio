import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Image as ImageIcon,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { Background } from "../components/Background";
import { ThemeToggle } from "../components/ThemeToggle";
import { WaveTimeline } from "../components/WaveTimeline";
import { DEFAULT_PROJECTS } from "../lib/defaultContent";
import { useCollection } from "../lib/useCollection";

const PLACEHOLDER_TINTS = ["bg-primary/20", "bg-accent/20", "bg-purple/20", "bg-rose/20"];

const tabClass = (on) =>
  `inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-mono uppercase tracking-wide transition-colors cursor-pointer ${
    on
      ? "border-primary/30 bg-primary/10 text-foreground"
      : "border-transparent text-foreground/60 hover:bg-primary/10 hover:text-primary"
  }`;

const FramedView = ({ url, title, height }) => (
  <div className="overflow-hidden rounded-2xl border border-border bg-card">
    <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-2 font-mono text-xs text-foreground/60">
      <span className="truncate">{url}</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex shrink-0 items-center gap-1 hover:text-primary"
      >
        <ExternalLink size={12} />
        Open in new tab
      </a>
    </div>
    <iframe src={url} title={title} className={`w-full bg-background ${height}`} />
  </div>
);

const ProjectView = ({ project }) => {
  const [view, setView] = useState("walk");
  const [step, setStep] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const steps = project.steps ?? [];
  const current = steps[step];
  const multi = steps.length > 1;
  const go = (i) => setStep((i + steps.length) % steps.length);

  const tabs = [
    { key: "walk", label: "Walkthrough", icon: ImageIcon, show: true },
    { key: "demo", label: "Live demo", icon: Globe, show: !!project.demoUrl },
    { key: "report", label: "Report", icon: FileText, show: !!project.pdfUrl },
  ].filter((t) => t.show);

  return (
    <div className="relative min-h-screen text-foreground overflow-x-hidden">
      <Background />
      <ThemeToggle />

      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-2 px-6 py-3">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/70 hover:text-primary transition-colors"
          >
            <ArrowLeft size={16} />
            Projects
          </Link>
          <span className="hidden truncate text-sm font-semibold sm:block">
            {project.title}
          </span>

          <nav className="ml-auto flex flex-wrap gap-1">
            {tabs.map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setView(t.key)}
                  className={tabClass(view === t.key)}
                >
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-8 text-left">
        {view === "walk" && (
          <>
            <h1 className="text-2xl font-black tracking-tight md:text-4xl">
              {project.title}
            </h1>
            <div className="mt-4 flex flex-wrap gap-2">
              {(project.tags ?? []).map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>

            {multi && (
              <div className="mt-8">
                <WaveTimeline steps={steps} active={step} onSelect={setStep} />
              </div>
            )}

            <div className={`mt-6 grid grid-cols-1 items-start gap-8 ${current ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
              {/* Big image (only when the project has walkthrough steps) */}
              {current && (
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <div
                  className={`flex aspect-video w-full items-center justify-center ${
                    current.image ? "" : PLACEHOLDER_TINTS[step % PLACEHOLDER_TINTS.length]
                  }`}
                >
                  {current.image ? (
                    <img
                      src={current.image}
                      alt={current.title}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-sm text-foreground/60">
                      <ImageIcon size={28} />
                      {current.label}
                    </div>
                  )}
                </div>
              </div>
              )}

              {/* Description */}
              <div>
                {multi && (
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-foreground/60">
                      step {step + 1} of {steps.length}
                    </span>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => go(step - 1)}
                        aria-label="Previous step"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                      >
                        <ArrowLeft size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => go(step + 1)}
                        aria-label="Next step"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                      >
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {current ? (
                  <>
                    <h2 className="text-xl font-bold">{current.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/75 md:text-base">
                      {current.text}
                    </p>
                  </>
                ) : (
                  project.summary && (
                    <p className="text-sm leading-relaxed text-foreground/75 md:text-base">
                      {project.summary}
                    </p>
                  )
                )}

                {project.details?.length > 0 && (
                  <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {project.details.map((item) => (
                      <div
                        key={item.label}
                        className="rounded-xl border border-border/60 bg-card/60 px-4 py-3"
                      >
                        <div className="text-[11px] text-foreground/50">{item.label}</div>
                        <div className="text-sm font-semibold">{item.value}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105"
                    >
                      <FaGithub size={16} />
                      Source code
                    </a>
                  )}
                  {project.pdfUrl && (
                    <a
                      href={project.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors hover:bg-card/60"
                    >
                      <Download size={16} />
                      Report (PDF)
                    </a>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {view === "demo" && project.demoUrl && (
          <FramedView
            url={project.demoUrl}
            title={`${project.title} live demo`}
            height="h-[75vh]"
          />
        )}

        {view === "report" && project.pdfUrl && (
          <FramedView
            url={project.pdfUrl}
            title={`${project.title} report`}
            height="h-[80vh]"
          />
        )}
      </main>
    </div>
  );
};

export const ProjectDetail = () => {
  const { slug } = useParams();
  // Firestore (after "Import current data" in admin) or DEFAULT_PROJECTS before that
  const { loaded, items } = useCollection("projects", DEFAULT_PROJECTS);
  const project = items.find((p) => p.slug === slug);

  if (!loaded) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-foreground/60">
        Loading...
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-foreground">
        <p>That project doesn't exist.</p>
        <Link to="/#projects" className="text-primary hover:underline">
          Back to projects
        </Link>
      </div>
    );
  }

  // key resets the step and tab when you move between projects
  return <ProjectView key={project.slug} project={project} />;
};