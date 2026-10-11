// Shared by ExperienceSection and ExperienceDialog.
// Dates are "YYYY-MM-DD" (what the admin date picker saves).

// Full class names so Tailwind can see them (no string-built classes).
export const colorStyles = {
  primary: { dot: "bg-primary", text: "text-primary", ring: "border-primary/40", badge: "bg-primary/10 text-primary", chip: "bg-primary/10 text-primary border-primary/20" },
  secondary: { dot: "bg-secondary", text: "text-secondary", ring: "border-secondary/40", badge: "bg-secondary/10 text-secondary", chip: "bg-secondary/10 text-secondary border-secondary/20" },
  accent: { dot: "bg-accent", text: "text-accent", ring: "border-accent/40", badge: "bg-accent/10 text-accent", chip: "bg-accent/10 text-accent border-accent/20" },
  purple: { dot: "bg-purple", text: "text-purple", ring: "border-purple/40", badge: "bg-purple/10 text-purple", chip: "bg-purple/10 text-purple border-purple/20" },
  rose: { dot: "bg-rose", text: "text-rose", ring: "border-rose/40", badge: "bg-rose/10 text-rose", chip: "bg-rose/10 text-rose border-rose/20" },
};

export const statusLabel = { upcoming: "Upcoming", current: "Ongoing", past: "Completed" };

/* ---------- date helpers (parsed by hand to avoid timezone shifts) ---------- */

export const parse = (iso) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const fmt = (iso) =>
  parse(iso).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });

export const getStatus = (exp) => {
  if (!exp.startDate) return exp.status || "past";
  const today = new Date().toISOString().slice(0, 10);
  if (exp.startDate > today) return "upcoming";
  if (!exp.endDate || exp.endDate >= today) return "current";
  return "past";
};

export const getRange = (exp, status) => {
  if (!exp.startDate) return exp.duration || "";
  if (!exp.endDate) return status === "upcoming" ? `Starts ${fmt(exp.startDate)}` : `${fmt(exp.startDate)} – Present`;
  return `${fmt(exp.startDate)} – ${fmt(exp.endDate)}`;
};

export const getLength = (exp) => {
  if (!exp.startDate || !exp.endDate) return "";
  const s = parse(exp.startDate);
  const e = parse(exp.endDate);
  let months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  if (e.getDate() < s.getDate()) months -= 1;
  if (months < 1) {
    const days = Math.max(1, Math.round((e - s) / 86400000));
    return `${days} day${days > 1 ? "s" : ""}`;
  }
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y && `${y} yr`, m && `${m} month${m > 1 ? "s" : ""}`].filter(Boolean).join(" ");
};