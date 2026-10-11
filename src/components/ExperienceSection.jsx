import { useState } from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";

import { DEFAULT_EXPERIENCE, DEFAULT_EXP_STATUS } from "../lib/defaultContent";
import { colorStyles, getRange, getStatus, statusLabel } from "../lib/experienceUtils";
import { useCollection } from "../lib/useCollection";
import { useSiteSettings } from "../lib/useSiteSettings";
import { ExperienceDialog, toParagraphs } from "./ExperienceDialog";

// Data comes from the admin (Firestore), with DEFAULT_EXPERIENCE as the fallback.
// Status (upcoming / ongoing / completed) is worked out from start/end dates.
// Card sizes follow Education / Certifications: title text-lg, body text-sm, meta text-xs.

// "**double asterisks**" -> highlighted words (same markup the admin hint describes)
const renderHighlights = (text) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
    i % 2 ? (
      <span key={i} className="font-semibold text-primary">
        {part}
      </span>
    ) : (
      part
    )
  );

export const ExperienceSection = () => {
  const [selected, setSelected] = useState(null);
  const { items: experienceData } = useCollection("experience", DEFAULT_EXPERIENCE);
  const { expStatus, loaded: settingsLoaded } = useSiteSettings();
  const statusText = (expStatus ?? DEFAULT_EXP_STATUS).trim();

  // Newest first. Entries without a startDate sink to the bottom.
  const items = [...experienceData].sort((a, b) => (b.startDate || "").localeCompare(a.startDate || ""));

  return (
    <section id="experience" className="relative px-6 py-24 md:px-12 lg:px-20">
      <div className="container mx-auto max-w-4xl">

        {/* Section header — matches Hero / About / Education / Skills pattern */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            ExperienceInternships.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Experience{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              & Internships
            </span>
          </h2>

          {/* Editable in admin -> Site. Clear it there to hide this line. */}
          {settingsLoaded && statusText && (
            <p className="mt-4 max-w-xl text-sm md:text-base text-foreground/70">
              {renderHighlights(statusText.charAt(0).toUpperCase() + statusText.slice(1))}.
            </p>
          )}
        </div>

        {/* Timeline: thin rail on the left, one card per experience */}
        <ol className="relative mt-14 space-y-6 text-left">
          <span aria-hidden className="absolute bottom-3 left-[7px] top-3 w-px bg-border/70" />

          {items.map((exp, index) => {
            const c = colorStyles[exp.color] ?? colorStyles.primary;
            const status = getStatus(exp);
            const range = getRange(exp, status);
            // description can be a string (new) or an array of lines (old)
            const preview = toParagraphs(exp.description)[0];

            return (
              <li key={exp.id ?? `${exp.company}-${exp.startDate || index}`} className="relative pl-9">
                <span
                  aria-hidden
                  className={`absolute left-0 top-7 h-[15px] w-[15px] rounded-full border-2 border-background ${c.dot}`}
                />

                <div className="gradient-border card-hover group flex flex-col rounded-xl p-6 shadow-xs">
                  {/* Date + status */}
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider">
                    {range && (
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 ${c.chip}`}>
                        <CalendarDays size={12} />
                        {range}
                      </span>
                    )}
                    <span
                      className={`rounded-full px-2.5 py-1 ${
                        status === "past" ? "bg-muted text-foreground/60" : c.badge
                      }`}
                    >
                      {statusLabel[status]}
                    </span>
                  </div>

                  {/* Role / company / place */}
                  <div className="mt-3">
                    <h3 className="text-lg font-bold leading-snug text-foreground">{exp.role}</h3>
                    <h4 className="mt-1 text-sm font-semibold text-foreground/80">{exp.company}</h4>
                    {exp.location && (
                      <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-foreground/60">
                        <MapPin size={11} />
                        {exp.location}
                      </span>
                    )}
                  </div>

                  {preview && (
                    <p className="mt-3 line-clamp-2 border-t border-border/20 pt-3 text-sm leading-relaxed text-foreground/75">
                      {preview}
                    </p>
                  )}

                  <div className="mt-4">
                    <button
                      type="button"
                      onClick={() => setSelected(exp)}
                      className="group/btn inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    >
                      View details
                      <ArrowUpRight
                        size={13}
                        className="opacity-60 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                      />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <ExperienceDialog exp={selected} onClose={() => setSelected(null)} />
    </section>
  );
};