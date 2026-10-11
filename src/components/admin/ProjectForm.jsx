import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Eye, Info, LayoutGrid, Link2, Pencil, Plus, Route, Trash2 } from "lucide-react";
import { getProject, removeProject, saveProject } from "../../lib/projectsDb";
import { listItems, saveItem } from "../../lib/contentDb";
import { DEFAULT_PROJECTS } from "../../lib/defaultContent";
import { WaveTimeline } from "../WaveTimeline";
import { Field, ImageField, SaveStatus, Section, btnGhost, btnMain, inp } from "./ui";

/* ---------- preview (what the project page will look like) ---------- */
const Preview = ({ p, tags }) => {
    const steps = p.steps
        .filter((s) => s.title.trim() || s.text.trim() || s.image)
        .map((s, i) => ({ ...s, label: s.label.trim() || `Step ${i + 1}` }));
    const [i, setI] = useState(0);
    const active = Math.min(i, Math.max(steps.length - 1, 0));
    const cur = steps[active];

    return (
        <div className="space-y-6 rounded-2xl border border-border bg-card p-5">
            <div>
                <h2 className="text-2xl font-black">{p.title || "Untitled project"}</h2>
                <div className="mt-3 flex flex-wrap gap-2">
                    {tags.map((t) => (
                        <span
                            key={t}
                            className="rounded-md bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>

            {steps.length > 1 && <WaveTimeline steps={steps} active={active} onSelect={setI} />}

            {cur ? (
                <div className="grid gap-6 md:grid-cols-[1.15fr_1fr]">
                    <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-border bg-primary/10 text-sm text-foreground/60">
                        {cur.image ? (
                            <img src={cur.image} alt="" className="h-full w-full object-contain" />
                        ) : (
                            cur.label
                        )}
                    </div>
                    <div>
                        <p className="font-mono text-xs text-foreground/60">
                            step {active + 1} of {steps.length}
                        </p>
                        <h3 className="mt-2 text-lg font-bold">{cur.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/75">{cur.text}</p>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-foreground/60">Add a step to see it here.</p>
            )}

            <div className="flex flex-wrap gap-2 text-xs text-foreground/60">
                {p.githubUrl && <span className="rounded-full border border-border px-3 py-1">Source code</span>}
                {p.demoUrl && <span className="rounded-full border border-border px-3 py-1">Live demo tab</span>}
                {p.pdfUrl && <span className="rounded-full border border-border px-3 py-1">Report tab</span>}
            </div>
        </div>
    );
};

// Filter buttons on the Projects section. Taken from the default projects, plus anything you add.
const FIELD_OPTIONS = [...new Set(DEFAULT_PROJECTS.flatMap((p) => p.fields ?? []))];

// Not wrapped in <Field>: buttons inside a <label> would toggle the wrong thing.
const FieldsPicker = ({ value, onChange }) => {
    const [draft, setDraft] = useState("");
    const options = [...FIELD_OPTIONS, ...value.filter((v) => !FIELD_OPTIONS.includes(v))];
    const toggle = (f) => onChange(value.includes(f) ? value.filter((x) => x !== f) : [...value, f]);
    const addDraft = () => {
        const t = draft.trim();
        if (t && !value.includes(t)) onChange([...value, t]);
        setDraft("");
    };

    return (
        <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
                {options.map((f) => {
                    const on = value.includes(f);
                    return (
                        <button
                            key={f}
                            type="button"
                            onClick={() => toggle(f)}
                            aria-pressed={on}
                            className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${on
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border text-foreground/70 hover:border-primary/50"
                                }`}
                        >
                            {f}
                        </button>
                    );
                })}
            </div>
            <div className="flex gap-2">
                <input
                    value={draft}
                    placeholder="Add another field"
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            e.preventDefault();
                            addDraft();
                        }
                    }}
                    className={inp}
                />
                <button type="button" onClick={addDraft} className={`${btnGhost} text-xs`}>
                    <Plus size={14} /> Add
                </button>
            </div>
        </div>
    );
};

// older projects may have no `fields`, or a single legacy `field` string
const normProject = (pr) => ({
    ...pr,
    fields: Array.isArray(pr.fields) ? pr.fields : pr.field ? [pr.field] : [],
});

const emptyProject = () => ({
    slug: "",
    title: "",
    summary: "",
    cover: "",
    coverDark: "",
    tags: [],
    fields: [],
    visible: true,
    githubUrl: "",
    demoUrl: "",
    pdfUrl: "",
    details: [],
    steps: [{ label: "", title: "", text: "", image: "" }],
    createdAt: Date.now(),
});

const slugify = (s) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const ProjectForm = ({ initial, onSaved, onCancel, onDirty, startSaved = false }) => {
    const isNew = !initial;
    const [start, setStart] = useState(() => normProject(initial ?? emptyProject()));
    const [startTags, setStartTags] = useState((initial?.tags ?? []).join(", "));
    const [saved, setSaved] = useState(startSaved);
    const [p, setP] = useState(start);
    const [tagsText, setTagsText] = useState(startTags);
    const [mode, setMode] = useState("edit"); // edit | preview
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState("");

    const tags = tagsText.split(",").map((t) => t.trim()).filter(Boolean);
    const dirty = JSON.stringify(p) !== JSON.stringify(start) || tagsText !== startTags;

    // tell the dashboard whether there are unsaved changes
    useEffect(() => {
        onDirty?.(dirty);
    }, [dirty, onDirty]);

    const set = (k, v) => setP((x) => ({ ...x, [k]: v }));
    const patch = (k, i, change) =>
        setP((x) => ({
            ...x,
            [k]: x[k].map((it, j) => (j === i ? { ...it, ...change } : it)),
        }));
    const add = (k, item) => setP((x) => ({ ...x, [k]: [...x[k], item] }));
    const remove = (k, i) => setP((x) => ({ ...x, [k]: x[k].filter((_, j) => j !== i) }));
    const move = (i, dir) =>
        setP((x) => {
            const steps = [...x.steps];
            const j = i + dir;
            if (j < 0 || j >= steps.length) return x;
            [steps[i], steps[j]] = [steps[j], steps[i]];
            return { ...x, steps };
        });

    const save = async (e) => {
        e.preventDefault();
        const oldSlug = initial?.slug;
        const slug = isNew ? slugify(p.slug || p.title) : slugify(p.slug) || oldSlug;
        const renamed = !isNew && slug !== oldSlug;
        if (!p.title.trim() || !slug) {
            setErr("Add a title first.");
            return;
        }
        setSaving(true);
        setErr("");
        try {
            if ((isNew || renamed) && (await getProject(slug))) {
                setErr("A project with this web address already exists.");
                setSaving(false);
                return;
            }
            const data = {
                ...p,
                slug,
                tags,
                details: p.details.filter((d) => d.label.trim() && d.value.trim()),
                steps: p.steps
                    .filter((s) => s.title.trim() || s.text.trim() || s.image)
                    .map((s, i) => ({ ...s, label: s.label.trim() || `Step ${i + 1}` })),
            };
            await saveProject(data);

            if (renamed) {
                // the old copy is deleted only after the new one is saved
                await removeProject(oldSlug);
                // experiences that linked the old address now point to the new one
                const exps = await listItems("experience");
                await Promise.all(
                    exps
                        .filter((x) => x.projectSlugs?.includes(oldSlug))
                        .map((x) =>
                            saveItem("experience", {
                                ...x,
                                projectSlugs: x.projectSlugs.map((s) => (s === oldSlug ? slug : s)),
                            })
                        )
                );
            }
            // the saved version becomes the new baseline, so "unsaved" clears
            setStart(data);
            setP(data);
            setStartTags(tags.join(", "));
            setTagsText(tags.join(", "));
            setSaved(true);
            onSaved(data);
        } catch {
            setErr("Could not save. Check your connection and that you are logged in.");
        }
        setSaving(false);
    };

    return (
        <form onSubmit={save} className="space-y-4">
            <div className="flex items-center justify-between gap-3">
                <h2 className="truncate text-lg font-black">
                    {p.title || (isNew ? "New project" : "Edit project")}
                </h2>
                <div className="inline-flex shrink-0 overflow-hidden rounded-full border border-border text-xs font-semibold">
                    {[
                        ["edit", "Edit", Pencil],
                        ["preview", "Preview", Eye],
                    ].map(([key, label, Icon]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => setMode(key)}
                            className={`inline-flex cursor-pointer items-center gap-1.5 px-4 py-2 transition-colors ${mode === key ? "bg-primary/15 text-foreground" : "text-foreground/60 hover:text-primary"
                                }`}
                        >
                            <Icon size={13} />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {mode === "preview" ? (
                <Preview p={p} tags={tags} />
            ) : (
                <>
                    <Section icon={Info} title="Basics">
                        <div className="space-y-1.5">
                            <span className="text-xs font-semibold text-foreground/70">Visibility</span>
                            <label className="flex cursor-pointer items-center gap-2 text-sm">
                                <input
                                    type="checkbox"
                                    checked={p.visible !== false}
                                    onChange={(e) => set("visible", e.target.checked)}
                                    className="h-4 w-4 cursor-pointer accent-primary"
                                />
                                Show this project on the site
                            </label>
                            <span className="block text-[11px] text-foreground/50">
                                Untick to hide it from the site without deleting it. You can show it again any time.
                            </span>
                        </div>
                        <Field label="Title">
                            <input value={p.title} onChange={(e) => set("title", e.target.value)} className={inp} />
                        </Field>
                        <Field
                            label="Web address"
                            hint={
                                isNew
                                    ? "Leave empty to build it from the title. Becomes /projects/your-address"
                                    : "You can change it. Old links to this project will stop working."
                            }
                        >
                            <input
                                value={p.slug}
                                onChange={(e) => set("slug", e.target.value)}
                                className={inp}
                            />
                        </Field>
                        <Field label="Short description" hint="Shown on the project card.">
                            <textarea rows={3} value={p.summary} onChange={(e) => set("summary", e.target.value)} className={inp} />
                        </Field>
                        <Field label="Card image">
                            <ImageField value={p.cover} onChange={(v) => set("cover", v)} />
                        </Field>
                        <Field
                            label="Dark mode image (optional)"
                            hint="Only for a project that has a light and a dark version of the same page. The Card image above is the light version and this one is the dark version. The card then switches between them with a lights on/off animation. Leave empty for a normal card."
                        >
                            <ImageField value={p.coverDark ?? ""} onChange={(v) => set("coverDark", v)} />
                        </Field>
                        <div className="space-y-1.5">
                            <span className="text-xs font-semibold text-foreground/70">Fields</span>
                            <FieldsPicker value={p.fields ?? []} onChange={(v) => set("fields", v)} />
                            <span className="block text-[11px] text-foreground/50">
                                Tick the fields this project belongs to. They become the filter buttons on the Projects section. Empty means it only shows under All.
                            </span>
                        </div>
                        <Field label="Tech tags" hint="Separate with commas: React, Vite, Tailwind">
                            <input value={tagsText} onChange={(e) => setTagsText(e.target.value)} className={inp} />
                        </Field>
                    </Section>

                    <Section icon={Link2} title="Links" hint="empty means hidden">
                        <div className="grid gap-4 sm:grid-cols-3">
                            <Field label="GitHub">
                                <input value={p.githubUrl} onChange={(e) => set("githubUrl", e.target.value)} className={inp} />
                            </Field>
                            <Field label="Live demo">
                                <input value={p.demoUrl} onChange={(e) => set("demoUrl", e.target.value)} className={inp} />
                            </Field>
                            <Field label="Report (PDF)">
                                <input value={p.pdfUrl} onChange={(e) => set("pdfUrl", e.target.value)} className={inp} />
                            </Field>
                        </div>
                    </Section>

                    <Section icon={LayoutGrid} title="Detail boxes">
                        {p.details.map((d, i) => (
                            <div key={i} className="flex gap-2">
                                <input
                                    placeholder="Label (Volume)"
                                    value={d.label}
                                    onChange={(e) => patch("details", i, { label: e.target.value })}
                                    className={inp}
                                />
                                <input
                                    placeholder="Value (30M+ rows)"
                                    value={d.value}
                                    onChange={(e) => patch("details", i, { value: e.target.value })}
                                    className={inp}
                                />
                                <button
                                    type="button"
                                    aria-label="Remove detail"
                                    onClick={() => remove("details", i)}
                                    className="cursor-pointer px-2 text-foreground/50 hover:text-rose"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                        <button type="button" onClick={() => add("details", { label: "", value: "" })} className={`${btnGhost} text-xs`}>
                            <Plus size={14} /> Add a box
                        </button>
                    </Section>

                    <Section icon={Route} title="Steps" hint="each one builds on the last">
                        {p.steps.map((s, i) => (
                            <div key={i} className="space-y-4 rounded-xl border border-border bg-background/60 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-mono text-xs text-foreground/60">step {i + 1}</span>
                                    <div className="flex items-center gap-1">
                                        <button type="button" aria-label="Move up" onClick={() => move(i, -1)} className="cursor-pointer p-2 text-foreground/60 hover:text-primary">
                                            <ArrowUp size={16} />
                                        </button>
                                        <button type="button" aria-label="Move down" onClick={() => move(i, 1)} className="cursor-pointer p-2 text-foreground/60 hover:text-primary">
                                            <ArrowDown size={16} />
                                        </button>
                                        <button type="button" aria-label="Remove step" onClick={() => remove("steps", i)} className="cursor-pointer p-2 text-foreground/60 hover:text-rose">
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="grid gap-4 sm:grid-cols-[1fr_2fr]">
                                    <Field label="Short label" hint="One word: Model, Load...">
                                        <input value={s.label} onChange={(e) => patch("steps", i, { label: e.target.value })} className={inp} />
                                    </Field>
                                    <Field label="Title">
                                        <input value={s.title} onChange={(e) => patch("steps", i, { title: e.target.value })} className={inp} />
                                    </Field>
                                </div>
                                <Field label="Text">
                                    <textarea rows={4} value={s.text} onChange={(e) => patch("steps", i, { text: e.target.value })} className={inp} />
                                </Field>
                                <Field label="Image">
                                    <ImageField compact value={s.image} onChange={(v) => patch("steps", i, { image: v })} />
                                </Field>
                            </div>
                        ))}
                        <button type="button" onClick={() => add("steps", { label: "", title: "", text: "", image: "" })} className={btnGhost}>
                            <Plus size={16} /> Add a step
                        </button>
                    </Section>
                </>
            )}

            {err && <p className="text-sm text-rose">{err}</p>}

            {/* sticky save bar */}
            <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <SaveStatus dirty={dirty} saved={saved} />
                <div className="flex gap-2">
                    <button type="button" onClick={onCancel} className={`${btnGhost} px-4`}>
                        Cancel
                    </button>
                    <button type="submit" disabled={saving || !dirty} className={`${btnMain} px-5`}>
                        {saving ? "Saving..." : "Save project"}
                    </button>
                </div>
            </div>
        </form>
    );
};