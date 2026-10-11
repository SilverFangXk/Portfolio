import { Fragment } from "react";
import { FileCode2 } from "lucide-react";

import { useSiteSettings } from "../lib/useSiteSettings";
import { NEXT_DEFAULTS } from "../lib/contentDb";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// "2027-01" -> "January 2027"; any other text is shown as typed
const formatAvailable = (v) => {
  const m = /^(\d{4})-(\d{2})$/.exec(v);
  return m && MONTHS[Number(m[2]) - 1] ? `${MONTHS[Number(m[2]) - 1]} ${m[1]}` : v;
};

export const CurrentStatus = () => {
  // everything below is editable from the admin "What's next" tab
  const { loaded, ...saved } = useSiteSettings("next");
  const c = { ...NEXT_DEFAULTS, ...saved };

  const titleWords = (c.sectionTitle ?? "").trim().split(/\s+/).filter(Boolean);
  const titleLast = titleWords.pop();
  const titleFirst = titleWords.join(" ");

  const areas = (c.focusAreas ?? []).filter(Boolean);
  const hasDuration = c.duration !== "" && c.duration != null;

  // JSON card entries; empty fields are left out
  const entries = [];
  if (c.seeking) entries.push({ key: "seeking", type: "string", value: c.seeking });
  if (areas.length) entries.push({ key: "focus_areas", type: "array", value: areas });
  if (c.availableFrom) entries.push({ key: "available_from", type: "string", value: c.availableFrom });
  if (hasDuration) entries.push({ key: "duration_months", type: "number", value: c.duration });

  // wait for Firestore so the default text never flashes first
  const fade = `transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`;

  return (
    <section id="about" className="relative px-6 py-24 md:px-12 lg:px-20">
      <div className={`container mx-auto max-w-6xl ${fade}`}>
        {/* Section heading */}
        <div className="mb-16 flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            CurrentStatus.CurrentStatus()
          </div>

          {titleLast && (
            <h2 className="mt-6 text-3xl font-black tracking-tight text-foreground md:text-4xl">
              {titleFirst && `${titleFirst} `}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {titleLast}
              </span>
            </h2>
          )}
        </div>

        {/* Text + JSON side by side */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left column: Description */}
          <div className="text-left">
            {c.heading && (
              <h3 className="text-xl font-bold text-foreground md:text-2xl">{c.heading}</h3>
            )}

            {c.text && (
              <p className="mt-4 max-w-lg whitespace-pre-line text-sm leading-7 text-foreground/70 md:text-base">
                {c.text}
              </p>
            )}

            {(c.seeking || c.availableFrom) && (
              <div className="mt-6 flex flex-wrap items-center gap-3">
                {c.seeking && (
                  <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-2 font-mono text-xs text-foreground/80">
                    <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
                    Seeking {c.seeking}
                  </span>
                )}

                {c.availableFrom && (
                  <span className="font-mono text-xs text-foreground/60">
                    Available: {formatAvailable(c.availableFrom)}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Right column: JSON editor */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-border bg-[#211D1A] shadow-sm">
            {/* Editor header */}
            <div className="flex items-center justify-between border-b border-[#48403A] px-4 py-3">
              <div className="flex items-center gap-2">
                <FileCode2 size={15} className="text-[#D9BFA1]" />
                <span className="font-mono text-xs text-[#D9BFA1]">current_status.json</span>
              </div>
              <span className="font-mono text-[10px] text-[#8F8378]">JSON</span>
            </div>

            {/* Left-aligned JSON with preserved indentation */}
            <div className="w-full overflow-x-auto p-5 text-left font-mono text-xs leading-7 md:p-6 md:text-sm">
              <pre className="m-0 whitespace-pre text-left">
                <span className="text-[#C5A5E8]">{"{"}</span>
                {"\n"}
                {entries.map((e, i) => (
                  <Fragment key={e.key}>
                    {"  "}
                    <span className="text-[#D9BFA1]">{`"${e.key}"`}</span>
                    <span className="text-[#C9BEB3]">: </span>
                    {e.type === "array" ? (
                      <>
                        <span className="text-[#C9BEB3]">[</span>
                        {"\n"}
                        {e.value.map((v, j) => (
                          <Fragment key={j}>
                            {"    "}
                            <span className="text-[#B9D9A6]">{`"${v}"`}</span>
                            {j < e.value.length - 1 && <span className="text-[#C9BEB3]">,</span>}
                            {"\n"}
                          </Fragment>
                        ))}
                        {"  "}
                        <span className="text-[#C9BEB3]">]</span>
                      </>
                    ) : e.type === "number" ? (
                      <span className="text-[#E8C58B]">{e.value}</span>
                    ) : (
                      <span className="text-[#B9D9A6]">{`"${e.value}"`}</span>
                    )}
                    {i < entries.length - 1 && <span className="text-[#C9BEB3]">,</span>}
                    {"\n"}
                  </Fragment>
                ))}
                <span className="text-[#C5A5E8]">{"}"}</span>
              </pre>
            </div>

            {/* Editor footer */}
            {c.footerNote && (
              <div className="border-t border-[#48403A] px-5 py-3">
                <p className="font-mono text-[10px] text-[#8F8378]">// {c.footerNote}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};