import { useEffect, useState } from "react";
import { optimized } from "../lib/Cloudinary";

const CSS = `
@keyframes tc-flicker{0%{opacity:0}12%{opacity:.55}24%{opacity:.05}38%{opacity:.4}52%{opacity:0}100%{opacity:0}}
.tc-flicker{animation:tc-flicker .55s linear both}
`;

const ORIGIN = "50% 50%"; // where the dark layer grows from (try "90% 12%" for the top right corner)

export const ThemeCover = ({ light, dark, alt = "", interval = 3500 }) => {
  const [isDark, setIsDark] = useState(false);
  const [flick, setFlick] = useState(0); // 0 = no flicker yet (nothing on first render)
  const [reduce] = useState(
    () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );

  const flip = () => {
    setIsDark((d) => !d);
    setFlick((n) => n + 1);
  };

  // one timer per mode: when it flips, the next countdown starts
  useEffect(() => {
    const t = setTimeout(flip, interval);
    return () => clearTimeout(t);
  }, [isDark, interval]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border/60">
      <style>{CSS}</style>

      {/* light version */}
      <div className="absolute inset-0 bg-muted/30">
        <img src={optimized(light, 800)} alt={alt} className="h-full w-full object-contain" />
      </div>

      {/* dark version: grows out of the middle (or fades in with reduce motion) */}
      <div
        className="absolute inset-0 bg-neutral-950"
        style={
          reduce
            ? { opacity: isDark ? 1 : 0, transition: "opacity 700ms ease" }
            : {
                clipPath: `circle(${isDark ? "150%" : "0%"} at ${ORIGIN})`,
                transition: "clip-path 700ms cubic-bezier(.65,0,.35,1)",
              }
        }
        aria-hidden={!isDark}
      >
        <img src={optimized(dark, 800)} alt="" className="h-full w-full object-contain" />
      </div>

      {/* flicker: dark flash when the light goes off, bright flash when it comes back on */}
      {!reduce && flick > 0 && (
        <span
          key={flick}
          className={`tc-flicker pointer-events-none absolute inset-0 z-10 ${isDark ? "bg-black" : "bg-white"}`}
        />
      )}
    </div>
  );
};