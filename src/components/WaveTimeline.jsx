import { useEffect, useRef } from "react";

// Drawing space (the SVG scales to fit its container)
const W = 600;
const H = 150;
const PAD = 75; // space left/right of the first and last dot
const HIGH = 60; // y of dots on the upper side of the wave
const LOW = 92; // y of dots on the lower side of the wave

// [width, height] per image, cycled. Even positions sit above the wave,
// odd positions below, so keep this list's length even.
const SIZES = [
  [88, 46],
  [62, 36],
  [76, 42],
  [80, 44],
];

// Explicit class names so Tailwind can see every one of them
const TINTS = ["bg-primary/20", "bg-accent/20", "bg-purple/20", "bg-rose/20"];

export const WaveTimeline = ({ steps, active, onSelect }) => {
  const progressRef = useRef(null);
  const n = steps.length;

  const points = steps.map((_, i) => ({
    x: n === 1 ? W / 2 : PAD + (i * (W - 2 * PAD)) / (n - 1),
    y: i % 2 === 0 ? HIGH : LOW,
  }));

  // Smooth S-curve through every point (horizontal tangents at each dot)
  const d = points
    .map((p, i) => {
      if (i === 0) return `M${p.x} ${p.y}`;
      const q = points[i - 1];
      const half = (p.x - q.x) / 2;
      return `C${q.x + half} ${q.y} ${p.x - half} ${p.y} ${p.x} ${p.y}`;
    })
    .join(" ");

  // Fill the orange line up to the active step
  useEffect(() => {
    const path = progressRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = n > 1 ? length * (1 - active / (n - 1)) : 0;
  }, [active, n, d]);

  return (
    <div className="overflow-x-auto">
      <div
        className="relative w-full min-w-[480px]"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d={d}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="2"
            strokeDasharray="3 6"
            strokeLinecap="round"
          />
          <path
            ref={progressRef}
            d={d}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.6s ease" }}
          />
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="6"
              strokeWidth="2"
              fill={i <= active ? "var(--color-primary)" : "var(--color-card)"}
              stroke={i <= active ? "var(--color-primary)" : "var(--color-border)"}
            />
          ))}
        </svg>

        {steps.map((step, i) => {
          const [w, h] = SIZES[i % SIZES.length];
          const { x, y } = points[i];
          const above = i % 2 === 0;
          const top = above ? y - 12 - h : y + 12;
          const isActive = i === active;

          return (
            <button
              key={i}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Step ${i + 1}: ${step.label}`}
              aria-current={isActive ? "step" : undefined}
              className={`absolute overflow-hidden rounded-lg border border-border text-[11px] text-foreground cursor-pointer animate-float motion-reduce:animate-none ${TINTS[i % TINTS.length]} ${
                isActive ? "outline-2 outline-offset-2 outline-primary" : ""
              }`}
              style={{
                left: `${((x - w / 2) / W) * 100}%`,
                top: `${(top / H) * 100}%`,
                width: `${(w / W) * 100}%`,
                height: `${(h / H) * 100}%`,
                animationDuration: `${3.8 + (i % 4) * 0.4}s`,
                animationDelay: `${-i * 0.7}s`,
              }}
            >
              {step.image ? (
                <>
                  <img
                    src={step.image}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute left-1 top-1 rounded bg-background/80 px-1 font-mono text-[10px]">
                    {i + 1}
                  </span>
                </>
              ) : (
                <span className="flex h-full w-full items-center justify-center gap-1 px-1">
                  <b className="font-medium">{i + 1}</b>
                  <span className="truncate">{step.label}</span>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};