import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, Layers } from "lucide-react";
import { FaGithub } from "react-icons/fa";

import { optimized } from "../lib/Cloudinary";
import { DEFAULT_PROJECTS } from "../lib/defaultContent";
import { useCollection } from "../lib/useCollection";
import { ThemeCover } from "./ThemeCover";

// Data comes from the admin (Firestore), with DEFAULT_PROJECTS as the fallback.
// Edit it in admin -> Projects (first time: "Import current data").
// Card text = the project's "Short description". The full story lives on /projects/:slug.
// Filter = each project's `fields` list, e.g. ["Data Engineering", "BI"]
// (tick them in admin -> Projects -> Fields).
// A project with a "Dark mode image" (admin -> Projects) gets the light/dark switch cover.

const fieldsOf = (p) =>
  Array.isArray(p.fields) ? p.fields : p.field ? [p.field] : [];

export const ProjectsSection = () => {
  const { items: allProjects } = useCollection("projects", DEFAULT_PROJECTS);
  // projects switched off in the admin (Visibility) are not shown
  const projects = useMemo(() => allProjects.filter((p) => p.visible !== false), [allProjects]);
  const [active, setActive] = useState("All");

  // filter buttons are built from whatever fields your projects use
  const fields = useMemo(() => {
    const seen = [];
    projects.forEach((p) =>
      fieldsOf(p).forEach((f) => !seen.includes(f) && seen.push(f))
    );
    return seen;
  }, [projects]);

  const current = fields.includes(active) ? active : "All";
  const countOf = (f) =>
    f === "All" ? projects.length : projects.filter((p) => fieldsOf(p).includes(f)).length;
  const visible =
    current === "All" ? projects : projects.filter((p) => fieldsOf(p).includes(current));

  return (
    <section id="projects" className="py-24 px-6 relative">
      <style>{`
        @keyframes proj-pop{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        .proj-pop{animation:proj-pop .4s ease both}
        @media (prefers-reduced-motion:reduce){.proj-pop{animation:none}}
      `}</style>

      <div className="container mx-auto max-w-7xl">
        {/* Section Heading — matches Hero / About / Experience / Education / Skills */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            ThingsHaveShipped.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Featured{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
        </div>

        {/* Field filter (hidden until at least one project has a field) */}
        {fields.length > 0 && (
          <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
            {["All", ...fields].map((f) => {
              const on = f === current;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setActive(f)}
                  aria-pressed={on}
                  className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[13px] transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground/80 hover:border-primary/50"
                  }`}
                >
                  {f}
                  <span className={`text-[10px] ${on ? "opacity-80" : "text-foreground/50"}`}>
                    {countOf(f)}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Projects grid — 1 column on mobile, 2 on tablet, 3 on desktop */}
        <div key={current} className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <article
              key={project.slug ?? index}
              style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
              className="proj-pop group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              {/* Cover: light/dark switch if the project has a dark image, otherwise the normal image */}
              {project.cover && project.coverDark ? (
                <ThemeCover light={project.cover} dark={project.coverDark} alt={project.title} />
              ) : (
                <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60 bg-muted/30">
                  {project.cover ? (
                    <img
                      src={optimized(project.cover, 800)}
                      alt={project.title}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                      <Layers className="h-12 w-12 text-primary/70" strokeWidth={1.5} />
                    </div>
                  )}
                </div>
              )}

              {/* Details */}
              <div className="flex flex-1 flex-col gap-3 p-5 text-left">
                <h3 className="text-base font-bold leading-snug text-foreground">
                  {project.title}
                </h3>

                {project.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {project.summary && (
                  <p className="line-clamp-2 text-[13px] leading-relaxed text-foreground/70">
                    {project.summary}
                  </p>
                )}

                {/* Footer — pinned to the bottom so cards of different heights line up */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border/60 pt-3">
                  <Link
                    to={`/projects/${project.slug}`}
                    className="group/link inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    View details
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>

                  <div className="flex items-center gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground/80 transition-colors hover:text-primary"
                      >
                        <FaGithub size={14} /> Source
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-foreground/80 transition-colors hover:text-primary"
                      >
                        <ExternalLink size={14} /> Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};