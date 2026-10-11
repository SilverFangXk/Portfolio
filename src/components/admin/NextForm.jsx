import { useEffect, useState } from "react";
import { Info, LayoutGrid } from "lucide-react";
import { NEXT_DEFAULTS, getSettings, saveSettings } from "../../lib/contentDb";
import { StringList } from "./fields";
import { Field, SaveStatus, Section, btnMain, inp } from "./ui";

const normNext = (o) => ({ ...o, duration: String(o.duration ?? "") });

export const NextForm = ({ onDirty }) => {
    const [start, setStart] = useState(null); // null = still loading
    const [s, setS] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        getSettings("next")
            .then((d) => {
                const v = normNext({ ...NEXT_DEFAULTS, ...d });
                setStart(v);
                setS(v);
            })
            .catch(() => {
                const v = normNext(NEXT_DEFAULTS);
                setStart(v);
                setS(v);
            });
    }, []);

    const dirty = s !== null && JSON.stringify(s) !== JSON.stringify(start);

    useEffect(() => {
        onDirty?.(dirty);
    }, [dirty, onDirty]);

    if (s === null) return <p className="text-sm text-foreground/60">Loading...</p>;

    const set = (k, v) => {
        setSaved(false);
        setS((x) => ({ ...x, [k]: v }));
    };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErr("");
        try {
            const clean = {
                sectionTitle: s.sectionTitle.trim(),
                heading: s.heading.trim(),
                text: s.text.trim(),
                seeking: s.seeking.trim(),
                focusAreas: s.focusAreas.map((a) => a.trim()).filter(Boolean),
                availableFrom: s.availableFrom.trim(),
                duration: s.duration.trim() === "" ? "" : Number(s.duration),
                footerNote: s.footerNote.trim(),
            };
            await saveSettings(clean, "next");
            const n = normNext(clean);
            setStart(n);
            setS(n);
            setSaved(true);
        } catch {
            setErr("Could not save. Check your connection and that you are logged in.");
        }
        setSaving(false);
    };

    return (
        <form onSubmit={save} className="space-y-4">
            <h2 className="text-lg font-black">What's next</h2>

            <Section icon={Info} title="Text">
                <Field label="Section title" hint="The last word gets the gradient.">
                    <input value={s.sectionTitle} onChange={(e) => set("sectionTitle", e.target.value)} className={inp} />
                </Field>
                <Field label="Heading">
                    <input value={s.heading} onChange={(e) => set("heading", e.target.value)} className={inp} />
                </Field>
                <Field label="Paragraph">
                    <textarea rows={5} value={s.text} onChange={(e) => set("text", e.target.value)} className={inp} />
                </Field>
            </Section>

            <Section icon={LayoutGrid} title="What you're looking for" hint="feeds the pill and the JSON card">
                <Field
                    label="Looking for"
                    hint="Shows as 'Seeking ...' on the pill and in the card. Examples: PFE Internship, Full-time job. Empty hides both."
                >
                    <input value={s.seeking} onChange={(e) => set("seeking", e.target.value)} className={inp} />
                </Field>
                <Field label="Focus areas" hint="One per line in the JSON card.">
                    <StringList
                        value={s.focusAreas}
                        placeholder="Data Engineering"
                        onChange={(v) => set("focusAreas", v)}
                    />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Available from" hint="2027-01 shows as January 2027. Any text works too. Empty hides it.">
                        <input
                            value={s.availableFrom}
                            placeholder="2027-01"
                            onChange={(e) => set("availableFrom", e.target.value)}
                            className={inp}
                        />
                    </Field>
                    <Field label="Duration (months)" hint="Leave empty to hide, for example for a job.">
                        <input
                            type="number"
                            value={s.duration}
                            onChange={(e) => set("duration", e.target.value)}
                            className={inp}
                        />
                    </Field>
                </div>
                <Field label="Card footer note" hint="Small comment at the bottom of the card. Empty hides it.">
                    <input value={s.footerNote} onChange={(e) => set("footerNote", e.target.value)} className={inp} />
                </Field>
            </Section>

            {err && <p className="text-sm text-rose">{err}</p>}

            <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <SaveStatus dirty={dirty} saved={saved} />
                <button type="submit" disabled={saving || !dirty} className={`${btnMain} px-5`}>
                    {saving ? "Saving..." : "Save changes"}
                </button>
            </div>
        </form>
    );
};
