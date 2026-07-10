import { Search, Brain, Crown, Grid3x3, BookOpen, Languages } from "lucide-react";

/* ---------- mini visual widgets ---------- */

const ChessWidget = () => {
  const pieces = {
    "0,0": "♜", "1,0": "♞", "2,0": "♝", "3,0": "♛",
    "4,0": "♚", "5,0": "♝", "6,0": "♞", "7,0": "♜",
    "0,1": "♟", "2,1": "♟", "3,1": "♟", "5,1": "♟", "7,1": "♟",
    "1,3": "♟", "4,3": "♙",
    "3,4": "♗",
    "0,6": "♙", "1,6": "♙", "2,6": "♙", "3,6": "♙",
    "5,6": "♙", "6,6": "♙", "7,6": "♙",
    "0,7": "♖", "2,7": "♘", "4,7": "♔", "7,7": "♖",
  };
  const cells = [];
  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      const dark = (x + y) % 2 === 1;
      cells.push(
        <div
          key={`${x},${y}`}
          className="relative flex items-center justify-center"
          style={{
            backgroundColor: dark
              ? "color-mix(in srgb, var(--color-primary) 18%, var(--color-card))"
              : "var(--color-card)",
          }}
        >
          {pieces[`${x},${y}`] && (
            <span className="text-[13px] leading-none text-foreground">
              {pieces[`${x},${y}`]}
            </span>
          )}
        </div>
      );
    }
  }
  return (
    <div className="grid grid-cols-8 aspect-square w-full rounded-md overflow-hidden border border-border">
      {cells}
    </div>
  );
};

const SudokuWidget = () => {
  const grid = [
    [5, 3, "", "", 7, "", "", "", ""],
    [6, "", "", 1, 9, 5, "", "", ""],
    ["", 9, 8, "", "", "", "", 6, ""],
    [8, "", "", "", 6, "", "", "", 3],
    [4, "", "", 8, "", 3, "", "", 1],
    [7, "", "", "", 2, "", "", "", 6],
    ["", 6, "", "", "", "", 2, 8, ""],
    ["", "", "", 4, 1, 9, "", "", 5],
    ["", "", "", "", 8, "", "", 7, 9],
  ];
  return (
    <div className="grid grid-cols-9 aspect-square w-full rounded-md overflow-hidden border-2 border-border">
      {grid.flatMap((row, y) =>
        row.map((v, x) => (
          <div
            key={`${x},${y}`}
            className="flex items-center justify-center bg-card"
            style={{
              borderRight: `1px solid ${
                x % 3 === 2 && x !== 8
                  ? "var(--color-foreground)"
                  : "var(--color-border)"
              }`,
              borderBottom: `1px solid ${
                y % 3 === 2 && y !== 8
                  ? "var(--color-foreground)"
                  : "var(--color-border)"
              }`,
              borderRightWidth: x % 3 === 2 && x !== 8 ? "1.5px" : "1px",
              borderBottomWidth: y % 3 === 2 && y !== 8 ? "1.5px" : "1px",
              opacity: x % 3 === 2 && x !== 8 ? 0.6 : 0.35,
            }}
          >
            <span
              className={`text-[9px] leading-none ${
                v ? "text-foreground/80 font-semibold" : ""
              }`}
            >
              {v}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

const CaseBoardWidget = () => {
  const nodes = [
    { x: 20, y: 25 }, { x: 65, y: 15 }, { x: 85, y: 55 },
    { x: 45, y: 60 }, { x: 15, y: 75 }, { x: 75, y: 85 },
  ];
  const links = [
    [0, 1], [1, 2], [0, 3], [3, 4], [3, 2], [2, 5], [4, 5],
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full aspect-square">
      {links.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].x}
          y1={nodes[a].y}
          x2={nodes[b].x}
          y2={nodes[b].y}
          stroke="var(--color-secondary)"
          strokeWidth="0.8"
          strokeDasharray="2 2"
          opacity="0.6"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r="4.5"
            fill="var(--color-card)"
            stroke="var(--color-primary)"
            strokeWidth="1.2"
          />
          <circle cx={n.x} cy={n.y} r="1.4" fill="var(--color-primary)" />
        </g>
      ))}
    </svg>
  );
};

const PsychologyWidget = () => {
  const center = { x: 50, y: 50 };
  const satellites = [
    { x: 50, y: 12, label: "id" },
    { x: 85, y: 35, label: "ego" },
    { x: 78, y: 78, label: "affect" },
    { x: 22, y: 78, label: "bias" },
    { x: 15, y: 35, label: "memory" },
  ];
  return (
    <svg viewBox="0 0 100 100" className="w-full aspect-square">
      {satellites.map((s, i) => (
        <line
          key={i}
          x1={center.x}
          y1={center.y}
          x2={s.x}
          y2={s.y}
          stroke="var(--color-border)"
          strokeWidth="1"
        />
      ))}
      <circle
        cx={center.x}
        cy={center.y}
        r="9"
        fill="var(--color-primary)"
        opacity="0.15"
        stroke="var(--color-primary)"
        strokeWidth="1.2"
      />
      <circle cx={center.x} cy={center.y} r="2.5" fill="var(--color-primary)" />
      {satellites.map((s, i) => (
        <g key={i}>
          <circle
            cx={s.x}
            cy={s.y}
            r="6"
            fill="var(--color-card)"
            stroke="var(--color-secondary)"
            strokeWidth="1"
          />
          <text
            x={s.x}
            y={s.y + 2.2}
            textAnchor="middle"
            fontSize="3.6"
            fill="var(--color-foreground)"
            opacity="0.7"
            fontFamily="monospace"
          >
            {s.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

const ReadingWidget = () => {
  const spines = [
    { h: 78, c: "var(--color-primary)", title: "The Cold Case Files" },
    { h: 92, c: "var(--color-secondary)", title: "Thinking in Systems" },
    { h: 60, c: "var(--color-primary)", title: "Endgame Theory" },
    { h: 85, c: "var(--color-foreground)", title: "The Suspect's Mind" },
    { h: 70, c: "var(--color-secondary)", title: "Predictably Human" },
    { h: 95, c: "var(--color-primary)", title: "A Grid of Clues" },
    { h: 55, c: "var(--color-foreground)", title: "Notes on Motive" },
    { h: 80, c: "var(--color-secondary)", title: "The Logic of Doubt" },
  ];
  return (
    <div className="flex items-end gap-[3px] w-full aspect-square px-1 pb-1">
      {spines.map((s, i) => (
        <div
          key={i}
          className="relative flex-1 rounded-t-sm overflow-hidden"
          style={{
            height: `${s.h}%`,
            backgroundColor: s.c,
            opacity: 0.85,
          }}
        >
          {/* decorative band near the top, like a title strip */}
          <div
            className="absolute inset-x-0 top-[10%] h-[1.5px]"
            style={{ backgroundColor: "var(--color-background)", opacity: 0.5 }}
          />
          <span
            className="absolute inset-0 flex items-center justify-center whitespace-nowrap font-mono"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              fontSize: "6.5px",
              letterSpacing: "0.02em",
              color: "var(--color-background)",
              paddingTop: "10%",
              paddingBottom: "6%",
            }}
          >
            {s.title}
          </span>
        </div>
      ))}
    </div>
  );
};

const LanguagesPanel = () => {
  const langs = [
    { name: "French", level: 3, tag: "intermediate" },
    { name: "English", level: 3, tag: "intermediate" },
    { name: "Spanish", level: 1, tag: "basic" },
    { name: "Arabic", level: 5, tag: "native" },
  ];
  return (
    <div className="rounded-xl border border-border bg-card/80 backdrop-blur-sm p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Languages size={12} />
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wide text-foreground/50">
          languages
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {langs.map((l) => (
          <div key={l.name} className="flex flex-col gap-1">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-medium text-foreground/80">
                {l.name}
              </span>
              <span className="font-mono text-[9px] uppercase text-foreground/40">
                {l.tag}
              </span>
            </div>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      i < l.level
                        ? "var(--color-primary)"
                        : "var(--color-border)",
                    opacity: i < l.level ? 0.85 : 0.5,
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ---------- widget shell ---------- */

const Widget = ({ icon: Icon, label, className = "", children }) => (
  <div
    className={`rounded-xl border border-border bg-card/80 backdrop-blur-sm p-3 flex flex-col ${className}`}
  >
    <div className="mb-2 flex items-center gap-2">
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon size={11} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-wide text-foreground/50">
        {label}
      </span>
    </div>
    <div className="flex-1 flex items-center">{children}</div>
  </div>
);

/* ---------- section ---------- */

export const BehindTheDataSection = () => {
  return (
    <section
      id="behind-data"
      className="relative px-6 py-14 md:px-12 lg:px-20 flex flex-col items-center"
    >
      <div className="w-full max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            interests.render()
          </div>

          <h2 className="mt-4 text-2xl md:text-3xl font-black tracking-tight text-foreground">
            Interests{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Dashboard
            </span>
          </h2>

          <p className="mt-3 max-w-md text-sm text-foreground/70 leading-relaxed">
            Not stats about what I like — the shapes of the things themselves.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-6 gap-3">
          <Widget icon={Crown} label="chess" className="md:col-span-3">
            <ChessWidget />
          </Widget>

          <Widget icon={Grid3x3} label="sudoku" className="md:col-span-3">
            <SudokuWidget />
          </Widget>

          <Widget icon={Search} label="true_crime" className="md:col-span-2">
            <CaseBoardWidget />
          </Widget>

          <Widget icon={Brain} label="psychology" className="md:col-span-2">
            <PsychologyWidget />
          </Widget>

          <Widget icon={BookOpen} label="reading" className="md:col-span-2">
            <ReadingWidget />
          </Widget>
        </div>

        <div className="mt-3">
          <LanguagesPanel />
        </div>
      </div>
    </section>
  );
};