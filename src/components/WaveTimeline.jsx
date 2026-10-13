import { Check } from "lucide-react";

// Compact vertical timeline. Same props as before, so nothing that uses it has to change:
//   <WaveTimeline steps={steps} active={index} onSelect={(i) => ...} />
// Each step shows a numbered dot on a rail, its label, an optional one-line title and a small
// thumbnail. The rail fills up to the active step; completed steps get a check mark.

const thumbOf = (s) => s.image || s.images?.find((p) => p?.url)?.url || "";

export const WaveTimeline = ({ steps, active, onSelect }) => {
  const n = steps.length;

  return (
    <nav aria-label="Project steps">
      <ol className="m-0 list-none p-0">
        {steps.map((step, i) => {
          const done = i < active;
          const isActive = i === active;
          const reached = i <= active;
          const thumb = thumbOf(step);
          const last = i === n - 1;

          return (
            <li key={i} className="relative pl-10">
              {/* rail segment from this dot down to the next one */}
              {!last && (
                <span
                  aria-hidden="true"
                  className={`absolute left-[13px] top-7 bottom-0 w-0.5 rounded-full transition-colors duration-500 ${
                    done ? "bg-primary" : "bg-border"
                  }`}
                />
              )}

              {/* dot */}
              <span
                aria-hidden="true"
                className={`absolute left-0 top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 font-mono text-[11px] font-semibold transition-colors duration-300 ${
                  reached
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground/60"
                } ${isActive ? "ring-4 ring-primary/20" : ""}`}
              >
                {done ? <Check size={13} strokeWidth={3} /> : i + 1}
              </span>

              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={`Step ${i + 1}: ${step.label}`}
                aria-current={isActive ? "step" : undefined}
                className={`mb-1.5 flex w-full cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                  isActive ? "bg-primary/10" : "hover:bg-primary/5"
                }`}
              >
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-sm font-semibold ${
                      isActive ? "text-foreground" : "text-foreground/75"
                    }`}
                  >
                    {step.label}
                  </span>
                  {step.title && (
                    <span className="block truncate text-[11px] text-foreground/50">{step.title}</span>
                  )}
                </span>

                {thumb && (
                  <img
                    src={thumb}
                    alt=""
                    loading="lazy"
                    className="h-8 w-12 shrink-0 rounded-md border border-border/60 object-cover"
                  />
                )}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};