import { useState } from "react";
import { Check, ImagePlus } from "lucide-react";
import { uploadImage } from "../../lib/projectsDb";

// Shared styles and small pieces used by every admin form.

export const inp =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/30";
export const btn =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50";
export const btnMain = `${btn} bg-gradient-to-r from-primary to-secondary text-primary-foreground`;
export const btnGhost = `${btn} border border-border text-foreground/80 hover:bg-primary/10`;

export const TerminalBar = ({ title }) => (
    <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-2.5 font-mono text-xs text-foreground/60">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 truncate">{title}</span>
    </div>
);

export const Field = ({ label, hint, children }) => (
    <label className="block space-y-1.5">
        <span className="text-xs font-semibold text-foreground/70">{label}</span>
        {children}
        {hint && <span className="block text-[11px] text-foreground/50">{hint}</span>}
    </label>
);

export const Section = ({ icon: Icon, title, hint, children }) => (
    <section className="space-y-4 rounded-2xl border border-border bg-card p-5">
        <h3 className="flex flex-wrap items-center gap-2 text-sm font-bold">
            <Icon size={16} className="text-primary" />
            {title}
            {hint && <span className="text-[11px] font-normal text-foreground/50">{hint}</span>}
        </h3>
        {children}
    </section>
);

// Left side of every sticky save bar: unsaved (amber) / saved (green check) / untouched (grey)
export const SaveStatus = ({ dirty, saved }) => (
    <span className="flex items-center gap-2 text-xs text-foreground/60">
        {dirty ? (
            <>
                <span className="h-2 w-2 rounded-full bg-accent" />
                Unsaved changes
            </>
        ) : saved ? (
            <span className="flex items-center gap-1.5 font-semibold text-green-600 dark:text-green-400">
                <Check size={14} strokeWidth={3} />
                Saved
            </span>
        ) : (
            <>
                <span className="h-2 w-2 rounded-full bg-foreground/20" />
                No changes yet
            </>
        )}
    </span>
);

export const ImageField = ({ value, onChange, compact = false }) => {
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    const pick = async (e) => {
        const file = e.target.files?.[0];
        e.target.value = "";
        if (!file) return;
        setBusy(true);
        setErr("");
        try {
            onChange(await uploadImage(file));
        } catch (x) {
            setErr(x.message);
        }
        setBusy(false);
    };

    return (
        <div className="space-y-2">
            {value && (
                <img
                    src={value}
                    alt=""
                    className={`w-full rounded-lg border border-border bg-background object-contain ${compact ? "h-20" : "h-28"}`}
                />
            )}
            <div className="flex flex-wrap items-center gap-3">
                <label className={`${btnGhost} text-xs`}>
                    <ImagePlus size={14} />
                    {busy ? "Uploading..." : value ? "Replace image" : "Upload image"}
                    <input type="file" accept="image/*" onChange={pick} disabled={busy} className="hidden" />
                </label>
                {value && (
                    <button
                        type="button"
                        onClick={() => onChange("")}
                        className="cursor-pointer text-xs text-foreground/60 hover:text-primary"
                    >
                        Remove
                    </button>
                )}
            </div>
            {err && <p className="text-xs text-rose">{err}</p>}
        </div>
    );
};
