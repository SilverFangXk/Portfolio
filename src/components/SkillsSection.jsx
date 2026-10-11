import { Cloud, Database, BarChart3, Brain, Globe, Layers } from "lucide-react";

import { DEFAULT_SKILLS } from "../lib/defaultContent";
import { SkillIcon } from "../lib/skillIcons";
import { useCollection } from "../lib/useCollection";

// Data comes from the admin (Firestore), with DEFAULT_SKILLS as the fallback.
// Skills are flat items; the ones sharing a category are grouped into one column.
// Column order = order of the first skill of each category (admin "Order" field).

// Maps each color key to the Tailwind classes the branch card + icon badge need.
// Written explicitly (not string-interpolated) so Tailwind's compiler picks up every class.
const colorStyles = {
  primary: { icon: "text-primary", ring: "border-primary/50 shadow-primary/10", iconBg: "bg-primary/10", hover: "hover:bg-primary/5 hover:border-primary/40" },
  secondary: { icon: "text-secondary", ring: "border-secondary/50 shadow-secondary/10", iconBg: "bg-secondary/10", hover: "hover:bg-secondary/5 hover:border-secondary/40" },
  accent: { icon: "text-accent", ring: "border-accent/50 shadow-accent/10", iconBg: "bg-accent/10", hover: "hover:bg-accent/5 hover:border-accent/40" },
  purple: { icon: "text-purple", ring: "border-purple/50 shadow-purple/10", iconBg: "bg-purple/10", hover: "hover:bg-purple/5 hover:border-purple/40" },
  rose: { icon: "text-rose", ring: "border-rose/50 shadow-rose/10", iconBg: "bg-rose/10", hover: "hover:bg-rose/5 hover:border-rose/40" },
};

// Known categories keep their original color + icon. Any new category you type in the
// admin gets the next color in the cycle and a generic icon.
const CATEGORY_STYLE = {
  "data engineering": { color: "primary", Icon: Database },
  "artificial intelligence": { color: "accent", Icon: Brain },
  "cloud & devops": { color: "purple", Icon: Cloud },
  databases: { color: "secondary", Icon: Database },
  "business intelligence": { color: "rose", Icon: BarChart3 },
  "web development": { color: "primary", Icon: Globe },
};
const COLOR_CYCLE = ["primary", "accent", "purple", "secondary", "rose"];

const groupByCategory = (skills) => {
  const groups = new Map();
  skills.forEach((skill) => {
    const field = (skill.category || "").trim() || "Other";
    const key = field.toLowerCase();
    if (!groups.has(key)) groups.set(key, { key, field, skills: [] });
    groups.get(key).skills.push(skill);
  });
  return [...groups.values()];
};

export const SkillsSection = () => {
  const { items: skills } = useCollection("skills", DEFAULT_SKILLS);
  const skillTreeData = groupByCategory(skills);

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden w-full min-h-screen flex items-center justify-center">

      {/* Background ambient glow, now pulling from primary/accent instead of hardcoded blue */}
      <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">

        {/* ==================== SECTION HEADER — matches Hero / About / Experience / Education ==================== */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            skills.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Technical{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Technical Stack
            </span>
          </h2>
        </div>

        {/* ==================== BRANCHES AND LEAVES ==================== */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          {skillTreeData.map((branch, bIdx) => {
            const known = CATEGORY_STYLE[branch.key];
            const c = colorStyles[known?.color ?? COLOR_CYCLE[bIdx % COLOR_CYCLE.length]];
            const BranchIcon = known?.Icon ?? Layers;

            return (
              <div key={branch.key} className="flex flex-col items-center space-y-6 w-full">

                {/* FIELD TITLE */}
                <div className={`relative px-5 py-3 bg-card border rounded-xl shadow-lg ${c.ring} transition-transform duration-300 hover:scale-105 w-full max-w-[240px] text-center z-20`}>
                  <div className="flex items-center justify-center gap-3">
                    <div className={`shrink-0 p-1.5 rounded-lg ${c.iconBg} ${c.icon}`}>
                      <BranchIcon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-xs tracking-wide text-foreground">
                      {branch.field}
                    </h3>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  {branch.skills.map((skill, sIdx) => (
                    <div
                      key={skill.id ?? sIdx}
                      className={`group flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-xs border border-border/40 rounded-xl shadow-xs transition-all duration-300 ${c.hover} hover:-translate-y-0.5`}
                    >
                      <div className="p-2 rounded-lg bg-background border border-border/50">
                        <SkillIcon skill={skill} />
                      </div>
                      <span className="text-sm text-foreground/85">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};