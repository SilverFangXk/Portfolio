import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {
    ArrowDown,
    ArrowUp,
    Check,
    ChevronLeft,
    ChevronRight,
    ExternalLink,
    Eye,
    FileText,
    EyeOff,
    ImagePlus,
    Info,
    LayoutGrid,
    Link2,
    LogOut,
    Pencil,
    Plus,
    Route,
    Trash2,
} from "lucide-react";
import { auth } from "../lib/firebaseCloudinaryConfig";
import {
    getProject,
    listProjects,
    removeProject,
    saveProject,
    uploadImage,
} from "../lib/projectsDb";
import { NEXT_DEFAULTS, getSettings, importItems, listItems, removeItem, saveItem, saveSettings } from "../lib/contentDb";
import { DEFAULT_CERTIFICATIONS, DEFAULT_CONTACT, DEFAULT_EDUCATION, DEFAULT_EXPERIENCE, DEFAULT_EXP_STATUS, DEFAULT_PROJECTS, DEFAULT_SKILLS } from "../lib/defaultContent";
import { SKILL_ICON_OPTIONS } from "../lib/skillIcons";
import { Background } from "../components/Background";
// The file name must match this spelling exactly (Vercel is case-sensitive)
import { PandaPeek } from "../components/Pandapeek";
import { WaveTimeline } from "../components/WaveTimeline";

import { uploadCV } from "../lib/Cloudinary";

/* ---------- shared styles and small pieces ---------- */

const inp =
    "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/30";
const btn =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors cursor-pointer disabled:opacity-50";
const btnMain = `${btn} bg-gradient-to-r from-primary to-secondary text-primary-foreground`;
const btnGhost = `${btn} border border-border text-foreground/80 hover:bg-primary/10`;

const TerminalBar = ({ title }) => (
    <div className="flex items-center gap-1.5 border-b border-border bg-muted/60 px-4 py-2.5 font-mono text-xs text-foreground/60">
        <span className="h-2.5 w-2.5 rounded-full bg-rose/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
        <span className="ml-2 truncate">{title}</span>
    </div>
);

const Field = ({ label, hint, children }) => (
    <label className="block space-y-1.5">
        <span className="text-xs font-semibold text-foreground/70">{label}</span>
        {children}
        {hint && <span className="block text-[11px] text-foreground/50">{hint}</span>}
    </label>
);

const Section = ({ icon: Icon, title, hint, children }) => (
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
const SaveStatus = ({ dirty, saved }) => (
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

const ImageField = ({ value, onChange, compact = false }) => {
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

/* ---------- login ---------- */

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [busy, setBusy] = useState(false);
    const [showPw, setShowPw] = useState(false);
    const [sass, setSass] = useState(false);
    const [slow, setSlow] = useState(false);

    // login taking too long: she rolls her eyes until it finishes
    useEffect(() => {
        if (!busy) return;
        const t = setTimeout(() => setSlow(true), 2500);
        return () => {
            clearTimeout(t);
            setSlow(false);
        };
    }, [busy]);

    // tapping the eye to hide the password: she gets sassy for a moment
    const toggleEye = () => {
        const next = !showPw;
        setShowPw(next);
        if (!next) {
            setSass(true);
            setTimeout(() => setSass(false), 2500);
        }
    };

    // eye roll beats pout, pout beats sass, otherwise she follows the cursor
    const mood = slow ? "roll" : err ? "hmph" : sass ? "sass" : "idle";

    const submit = async (e) => {
        e.preventDefault();
        setBusy(true);
        setErr("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch {
            setErr("Wrong email or password.");
        }
        setBusy(false);
    };

    return (
        <div className="flex min-h-screen items-center justify-center px-6 py-12">
            <PandaPeek className="mx-auto w-full max-w-sm" mood={mood}>
                <form
                    onSubmit={submit}
                    className="overflow-hidden rounded-2xl border border-border bg-card text-left shadow-lg"
                >
                    <TerminalBar title="khadija@portfolio: ~/admin" />
                    <div className="space-y-4 p-6">
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
                            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
                            admin.login()
                        </span>
                        <div>
                            <h1 className="text-xl font-black">Log in to edit</h1>
                            <p className="mt-1 text-sm text-foreground/60">
                                Only the owner of this portfolio can sign in.
                            </p>
                        </div>
                        <Field label="Email">
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={inp}
                            />
                        </Field>
                        <Field label="Password">
                            <div className="relative">
                                <input
                                    type={showPw ? "text" : "password"}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`${inp} pr-11`}
                                />
                                <button
                                    type="button"
                                    onClick={toggleEye}
                                    aria-label={showPw ? "Hide password" : "Show password"}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-foreground/50 hover:text-primary"
                                >
                                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </Field>
                        {err && <p className="text-sm text-rose">{err}</p>}
                        <button type="submit" disabled={busy} className={`${btnMain} w-full`}>
                            {busy ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                </form>
            </PandaPeek>
        </div>
    );
};

/* ---------- steps: several images each ---------- */

// A step keeps `images` = [{ url, caption }]. `image` (the first url) is still saved too,
// so anything that only knows the old single-image field keeps working.
const normStep = (s) => ({
    ...s,
    images: Array.isArray(s.images) && s.images.length ? s.images : s.image ? [{ url: s.image, caption: "" }] : [],
});

const cleanImages = (s) =>
    (s.images ?? []).filter((p) => p?.url).map((p) => ({ url: p.url, caption: (p.caption ?? "").trim() }));

const emptyStep = () => ({ label: "", title: "", text: "", image: "", images: [] });

/* ---------- preview (what the project page will look like) ---------- */

const Preview = ({ p, tags }) => {
    const steps = p.steps
        .filter((s) => s.title.trim() || s.text.trim() || (s.images ?? []).length)
        .map((s, i) => ({ ...s, label: s.label.trim() || `Step ${i + 1}` }));
    const [i, setI] = useState(0);
    const active = Math.min(i, Math.max(steps.length - 1, 0));
    const cur = steps[active];
    const imgs = (cur?.images ?? []).filter((x) => x?.url);

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
                    <div className="space-y-2">
                        <div className="flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-border bg-primary/10 text-sm text-foreground/60">
                            {imgs[0] ? (
                                <img src={imgs[0].url} alt={imgs[0].caption ?? ""} className="h-full w-full object-contain" />
                            ) : (
                                cur.label
                            )}
                        </div>
                        {imgs.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {imgs.slice(1).map((im, k) => (
                                    <img
                                        key={`${im.url}-${k}`}
                                        src={im.url}
                                        alt={im.caption ?? ""}
                                        className="aspect-video w-full rounded-lg border border-border bg-background object-cover"
                                    />
                                ))}
                            </div>
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

/* ---------- project form ---------- */

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

// older projects may have no `fields`, or a single legacy `field` string;
// older steps have a single `image` instead of `images`
const normProject = (pr) => ({
    ...pr,
    fields: Array.isArray(pr.fields) ? pr.fields : pr.field ? [pr.field] : [],
    steps: (pr.steps ?? []).map(normStep),
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
    steps: [emptyStep()],
    createdAt: Date.now(),
});

const slugify = (s) =>
    s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const ProjectForm = ({ initial, onSaved, onCancel, onDirty, startSaved = false }) => {
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
                    .map((s) => {
                        const images = cleanImages(s);
                        // `image` stays the first picture, for pages that only read the old field
                        return { ...s, images, image: images[0]?.url ?? "" };
                    })
                    .filter((s) => s.title.trim() || s.text.trim() || s.images.length)
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
                                {/* Not wrapped in <Field>: several buttons inside one <label> would trigger the wrong one */}
                                <div className="space-y-1.5">
                                    <span className="text-xs font-semibold text-foreground/70">Images</span>
                                    <GalleryField
                                        value={s.images ?? []}
                                        onChange={(v) => patch("steps", i, { images: v })}
                                    />
                                    <span className="block text-[11px] text-foreground/50">
                                        Add as many as you want. The first one is the main image. Use the arrows to reorder them.
                                    </span>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => add("steps", emptyStep())} className={btnGhost}>
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

/* ---------- generic section form (skills, experience, education, certifications) ---------- */

// Several photos for one item (internship photos, contact photos, project steps). Each upload goes to Cloudinary.
// value = [{ url, caption }]. The first photo is the cover.
// Not wrapped in <Field>: several controls inside one <label> would trigger the wrong one.
const GalleryField = ({ value, onChange }) => {
    const [busy, setBusy] = useState(false);
    const [err, setErr] = useState("");

    const add = async (e) => {
        const files = [...(e.target.files ?? [])];
        e.target.value = "";
        if (!files.length) return;
        setBusy(true);
        setErr("");
        const added = [];
        try {
            for (const file of files) added.push({ url: await uploadImage(file), caption: "" });
        } catch (x) {
            setErr(x.message);
        }
        if (added.length) onChange([...value, ...added]);
        setBusy(false);
    };

    const move = (i, d) => {
        const j = i + d;
        if (j < 0 || j >= value.length) return;
        const next = [...value];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };
    const setCaption = (i, caption) => onChange(value.map((p, k) => (k === i ? { ...p, caption } : p)));
    const remove = (i) => onChange(value.filter((_, k) => k !== i));
    const small =
        "cursor-pointer rounded-md p-1.5 text-foreground/60 hover:bg-primary/10 hover:text-primary disabled:cursor-default disabled:opacity-30";

    return (
        <div className="space-y-3">
            {value.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2">
                    {value.map((p, i) => (
                        <div key={`${p.url}-${i}`} className="space-y-2 rounded-lg border border-border p-2">
                            <div className="relative">
                                <img src={p.url} alt="" className="h-28 w-full rounded-md bg-background object-cover" />
                                {i === 0 && (
                                    <span className="absolute left-1.5 top-1.5 rounded bg-background/85 px-1.5 py-0.5 text-[10px] font-semibold">
                                        Cover
                                    </span>
                                )}
                            </div>
                            <input
                                value={p.caption ?? ""}
                                onChange={(e) => setCaption(i, e.target.value)}
                                placeholder="Caption (optional)"
                                className={inp}
                            />
                            <div className="flex items-center justify-between">
                                <div className="flex gap-1">
                                    <button type="button" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move earlier" className={small}>
                                        <ChevronLeft size={14} />
                                    </button>
                                    <button type="button" onClick={() => move(i, 1)} disabled={i === value.length - 1} aria-label="Move later" className={small}>
                                        <ChevronRight size={14} />
                                    </button>
                                </div>
                                <button type="button" onClick={() => remove(i)} aria-label="Remove photo" className={small}>
                                    <Trash2 size={14} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            <label className={`${btnGhost} w-fit text-xs`}>
                <ImagePlus size={14} />
                {busy ? "Uploading..." : value.length ? "Add more photos" : "Upload photos"}
                <input type="file" accept="image/*" multiple onChange={add} disabled={busy} className="hidden" />
            </label>
            {err && <p className="text-xs text-rose">{err}</p>}
        </div>
    );
};

// Tick existing projects (from the Projects tab) to attach them to an experience.
// Not wrapped in <Field>: a checkbox inside a <label> would toggle the wrong box.
const ProjectPicker = ({ value, onChange }) => {
    const [projects, setProjects] = useState(null);

    useEffect(() => {
        listProjects().then(setProjects).catch(() => setProjects([]));
    }, []);

    if (projects === null) return <p className="text-xs text-foreground/60">Loading projects...</p>;
    if (projects.length === 0)
        return <p className="text-xs text-foreground/60">No projects yet. Create them in the Projects tab first.</p>;

    const toggle = (slug) =>
        onChange(value.includes(slug) ? value.filter((x) => x !== slug) : [...value, slug]);

    return (
        <div className="space-y-1.5">
            {projects.map((pr) => (
                <label
                    key={pr.slug}
                    className="flex cursor-pointer items-start gap-3 rounded-lg border border-border px-3 py-2.5 text-sm hover:bg-primary/5"
                >
                    <input
                        type="checkbox"
                        checked={value.includes(pr.slug)}
                        onChange={() => toggle(pr.slug)}
                        className="mt-0.5 accent-primary"
                    />
                    <span className="min-w-0">
                        <span className="block font-semibold">{pr.title}</span>
                        {pr.summary && (
                            <span className="line-clamp-1 block text-[11px] text-foreground/50">{pr.summary}</span>
                        )}
                    </span>
                </label>
            ))}
        </div>
    );
};

const TagsInput = ({ value, onChange }) => {
    const [text, setText] = useState((value ?? []).join(", "));
    return (
        <input
            value={text}
            onChange={(e) => {
                setText(e.target.value);
                onChange(e.target.value.split(",").map((t) => t.trim()).filter(Boolean));
            }}
            className={inp}
        />
    );
};

const StringList = ({ value, onChange, placeholder }) => (
    <div className="space-y-2">
        {value.map((line, i) => (
            <div key={i} className="flex gap-2">
                <input
                    placeholder={placeholder}
                    value={line}
                    onChange={(e) => onChange(value.map((l, j) => (j === i ? e.target.value : l)))}
                    className={inp}
                />
                <button
                    type="button"
                    aria-label="Remove line"
                    onClick={() => onChange(value.filter((_, j) => j !== i))}
                    className="cursor-pointer px-2 text-foreground/50 hover:text-rose"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        ))}
        <button type="button" onClick={() => onChange([...value, ""])} className={`${btnGhost} text-xs`}>
            <Plus size={14} /> Add a line
        </button>
    </div>
);

/*
  Field types: text | textarea | paragraphs | number | image | tags | list | select | date | projects | gallery | toggle
  Each section below only describes its fields; ItemForm does the rest.
*/
const SECTIONS = {
    skills: {
        singular: "skill",
        titleKey: "name",
        subtitleKey: "category",
        groups: [
            {
                title: "Skill",
                icon: Info,
                fields: [
                    { key: "name", label: "Name", type: "text", placeholder: "Python" },
                    {
                        key: "category",
                        label: "Category",
                        type: "text",
                        suggestions: [...new Set(DEFAULT_SKILLS.map((s) => s.category))],
                        hint: "Skills with the same category are grouped in one column. Type a new name to start a new column.",
                    },
                    { key: "order", label: "Order", type: "number", hint: "Lower numbers show first (inside their column)." },
                    { key: "iconKey", label: "Built-in icon", type: "select", options: SKILL_ICON_OPTIONS, hint: "Pick a logo, or upload your own below. An uploaded image wins." },
                    { key: "icon", label: "Uploaded icon or logo", type: "image" },
                ],
            },
        ],
    },

    experience: {
        singular: "experience",
        titleKey: "role",
        subtitleKey: "company",
        groups: [
            {
                title: "Details",
                icon: Info,
                fields: [
                    {
                        key: "visible",
                        label: "Visibility",
                        type: "toggle",
                        toggleLabel: "Show this experience on the site",
                        hint: "Untick to hide it from the site without deleting it. You can show it again any time.",
                        wide: true,
                    },
                    { key: "role", label: "Role", type: "text", placeholder: "Data Engineering Intern" },
                    { key: "company", label: "Company", type: "text" },
                    { key: "location", label: "Location", type: "text" },
                    { key: "color", label: "Accent color", type: "select", options: ["primary", "secondary", "accent", "purple", "rose"] },
                    { key: "startDate", label: "Start date", type: "date" },
                    { key: "endDate", label: "End date", type: "date", hint: "Leave empty if it is still ongoing." },
                    { key: "tags", label: "Stack / skills used", type: "tags", hint: "Separate with commas: Python, SQL, Flask" },
                    { key: "projectSlugs", label: "Projects done here", type: "projects", hint: "Tick the projects you built during this experience. They show in the drawer with a View work link." },
                    { key: "photos", label: "Internship photos", type: "gallery", hint: "Photos you took during this experience. The first one is the cover. You can select several at once, add captions and reorder them." },
                ],
            },
            {
                title: "Description",
                icon: LayoutGrid,
                fields: [
                    {
                        key: "descriptionTitle",
                        label: "Title",
                        type: "text",
                        wide: true,
                        placeholder: "What I did",
                        hint: "Heading shown above the description. Leave empty to use the default.",
                    },
                    {
                        key: "description",
                        label: "What I did",
                        type: "paragraphs",
                        rows: 12,
                        placeholder: "Write freely. Press Enter for a new line, and leave an empty line between paragraphs.",
                        hint: "Write as much as you want. An empty line starts a new paragraph, and normal line breaks are kept.",
                    },
                ],
            },
        ],
    },

    education: {
        singular: "education",
        titleKey: "degree",
        subtitleKey: "school",
        groups: [
            {
                title: "Basics",
                icon: Info,
                fields: [
                    { key: "degree", label: "Degree or program", type: "text" },
                    { key: "school", label: "School", type: "text" },
                    { key: "location", label: "Location", type: "text" },
                    { key: "order", label: "Order", type: "number", hint: "Lower numbers show first." },
                    { key: "startYear", label: "Start year", type: "text", placeholder: "2024", hint: "Leave empty for a single graduation year (shows \"Graduated 2022\")." },
                    { key: "endYear", label: "End year", type: "text", placeholder: "2027", hint: "Leave empty if ongoing (shows \"2024 - Present\")." },
                    { key: "color", label: "Accent color", type: "select", options: ["primary", "accent", "purple", "secondary", "rose"] },
                    { key: "description", label: "Short description", type: "textarea" },
                ],
            },
            {
                title: "Extras",
                icon: Link2,
                fields: [{ key: "logo", label: "School logo", type: "image" }],
            },
        ],
    },

    certifications: {
        singular: "certification",
        titleKey: "name",
        subtitleKey: "issuer",
        groups: [
            {
                title: "Certification",
                icon: Info,
                fields: [
                    { key: "name", label: "Name", type: "text" },
                    { key: "issuer", label: "Issued by", type: "text", placeholder: "Microsoft" },
                    { key: "date", label: "Date", type: "text", placeholder: "Mar 2026" },
                    { key: "order", label: "Order", type: "number", hint: "Lower numbers show first." },
                    { key: "credentialUrl", label: "Credential link", type: "text", hint: "Empty hides the Verify Certificate link." },
                    { key: "description", label: "Short description", type: "textarea" },
                    { key: "image", label: "Badge or certificate image", type: "image" },
                ],
            },
        ],
    },
};

const optValue = (o) => (typeof o === "string" ? o : o.value);
const optLabel = (o) => (typeof o === "string" ? o : o.label);

const emptyItem = (def, nextOrder) => {
    const o = { createdAt: Date.now() };
    def.groups.forEach((g) =>
        g.fields.forEach((f) => {
            o[f.key] =
                ["list", "tags", "projects", "gallery"].includes(f.type)
                    ? []
                    : f.type === "toggle"
                        ? true
                        : f.type === "select"
                            ? optValue(f.options[0])
                            : "";
        })
    );
    if ("order" in o) o.order = nextOrder;
    return o;
};

const ItemForm = ({ def, save: saveFn, initial, onSaved, onCancel, onDirty, nextOrder, startSaved = false }) => {
    const [start, setStart] = useState(() => initial ?? emptyItem(def, nextOrder));
    const [item, setItem] = useState(start);
    const [saved, setSaved] = useState(startSaved);
    const [saving, setSaving] = useState(false);
    const [err, setErr] = useState("");

    const dirty = JSON.stringify(item) !== JSON.stringify(start);

    useEffect(() => {
        onDirty?.(dirty);
    }, [dirty, onDirty]);

    const set = (k, v) => setItem((x) => ({ ...x, [k]: v }));

    const renderField = (f) => {
        const v = item[f.key] ?? (["list", "tags", "projects", "gallery"].includes(f.type) ? [] : "");
        switch (f.type) {
            case "toggle":
                // a missing value (older items) counts as ON
                return (
                    <span className="flex cursor-pointer items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={item[f.key] !== false}
                            onChange={(e) => set(f.key, e.target.checked)}
                            className="h-4 w-4 cursor-pointer accent-primary"
                        />
                        {f.toggleLabel ?? "Yes"}
                    </span>
                );
            case "textarea":
            case "paragraphs":
                return (
                    <textarea
                        rows={f.rows ?? 4}
                        value={Array.isArray(v) ? v.join("\n\n") : v}
                        placeholder={f.placeholder}
                        onChange={(e) => set(f.key, e.target.value)}
                        className={`${inp} resize-y leading-relaxed`}
                    />
                );
            case "image":
                return <ImageField compact value={v} onChange={(x) => set(f.key, x)} />;
            case "tags":
                return <TagsInput value={v} onChange={(x) => set(f.key, x)} />;
            case "gallery":
                return <GalleryField value={v} onChange={(x) => set(f.key, x)} />;
            case "projects":
                return <ProjectPicker value={v} onChange={(x) => set(f.key, x)} />;
            case "list":
                return <StringList value={v} placeholder={f.placeholder} onChange={(x) => set(f.key, x)} />;
            case "select":
                return (
                    <select value={v} onChange={(e) => set(f.key, e.target.value)} className={inp}>
                        {f.options.map((o) => (
                            <option key={optValue(o)} value={optValue(o)}>
                                {optLabel(o)}
                            </option>
                        ))}
                    </select>
                );
            default:
                return (
                    <>
                        <input
                            type={f.type === "number" ? "number" : f.type === "date" ? "date" : "text"}
                            placeholder={f.placeholder}
                            value={v}
                            list={f.suggestions ? `dl-${f.key}` : undefined}
                            onChange={(e) => set(f.key, e.target.value)}
                            className={inp}
                        />
                        {f.suggestions && (
                            <datalist id={`dl-${f.key}`}>
                                {f.suggestions.map((o) => (
                                    <option key={o} value={o} />
                                ))}
                            </datalist>
                        )}
                    </>
                );
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!String(item[def.titleKey] ?? "").trim()) {
            setErr(`Add a ${def.singular} name first.`);
            return;
        }
        setSaving(true);
        setErr("");
        try {
            const clean = { ...item };
            def.groups.forEach((g) =>
                g.fields.forEach((f) => {
                    const val = item[f.key];
                    if (f.type === "list") clean[f.key] = (val ?? []).map((s) => s.trim()).filter(Boolean);
                    else if (f.type === "number") clean[f.key] = val === "" || val == null ? null : Number(val);
                    else if (typeof val === "string") clean[f.key] = val.trim();
                })
            );
            const savedItem = await saveFn(clean);
            setStart(savedItem);
            setItem(savedItem);
            setSaved(true);
            onSaved(savedItem);
        } catch {
            setErr("Could not save. Check your connection and that you are logged in.");
        }
        setSaving(false);
    };

    return (
        <form onSubmit={submit} className="space-y-4">
            <h2 className="truncate text-lg font-black">
                {item[def.titleKey] || `${initial ? "Edit" : "New"} ${def.singular}`}
            </h2>

            {def.groups.map((g) => (
                <Section key={g.title} icon={g.icon} title={g.title}>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {g.fields.map((f) => {
                            const wide = f.wide ?? ["textarea", "paragraphs", "list", "tags", "image", "projects", "gallery"].includes(f.type);
                            return (
                                <div key={f.key} className={wide ? "sm:col-span-2" : ""}>
                                    {f.type === "projects" || f.type === "gallery" ? (
                                        <div className="space-y-1.5">
                                            <span className="text-xs font-semibold text-foreground/70">{f.label}</span>
                                            {renderField(f)}
                                            {f.hint && <span className="block text-[11px] text-foreground/50">{f.hint}</span>}
                                        </div>
                                    ) : (
                                        <Field label={f.label} hint={f.hint}>
                                            {renderField(f)}
                                        </Field>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Section>
            ))}

            {err && <p className="text-sm text-rose">{err}</p>}

            <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <SaveStatus dirty={dirty} saved={saved} />
                <div className="flex gap-2">
                    <button type="button" onClick={onCancel} className={`${btnGhost} px-4`}>
                        Cancel
                    </button>
                    <button type="submit" disabled={saving || !dirty} className={`${btnMain} px-5`}>
                        {saving ? "Saving..." : `Save ${def.singular}`}
                    </button>
                </div>
            </div>
        </form>
    );
};

/* ---------- site settings (status, CV, hero paragraph) ---------- */

const emptySettings = { heroTitle: "", heroText: "", cvUrl: "", cvUrl2: "", badgeShow: true, badgeText: "", expStatus: DEFAULT_EXP_STATUS };

const SiteForm = ({ onDirty }) => {
    const [start, setStart] = useState(null); // null = still loading
    const [s, setS] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [err, setErr] = useState("");
    const [uploadingCV, setUploadingCV] = useState(null);
    const [cvError, setCvError] = useState("");

    useEffect(() => {
        getSettings()
            .then((d) => {
                const v = { ...emptySettings, ...d };
                setStart(v);
                setS(v);
            })
            .catch(() => {
                setStart(emptySettings);
                setS(emptySettings);
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

    const handleCVUpload = async (file, slot) => {
        setUploadingCV(slot);
        setCvError("");
        try {
            set(slot, await uploadCV(file));
        } catch (e) {
            setCvError(e?.message || "CV upload failed.");
        } finally {
            setUploadingCV(null);
        }
    };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErr("");
        try {
            const clean = {
                heroTitle: s.heroTitle.trim(),
                heroText: s.heroText.trim(),
                cvUrl: s.cvUrl.trim(),
                cvUrl2: s.cvUrl2.trim(),
                badgeShow: s.badgeShow !== false,
                badgeText: s.badgeText.trim(),
                expStatus: s.expStatus.trim(),
            };
            await saveSettings(clean);
            setStart(clean);
            setS(clean);
            setSaved(true);
        } catch {
            setErr("Could not save. Check your connection and that you are logged in.");
        }
        setSaving(false);
    };

    return (
        <form onSubmit={save} className="space-y-4">
            <h2 className="text-lg font-black">Site</h2>

            <Section icon={Info} title="Hero section">
                <Field label="Title" hint="The big heading. The last word gets the gradient. Leave empty to use Data & AI Engineer.">
                    <input
                        value={s.heroTitle}
                        placeholder="Data & AI Engineer"
                        onChange={(e) => set("heroTitle", e.target.value)}
                        className={inp}
                    />
                </Field>
                <Field label="Paragraph" hint="The text under the title.">
                    <textarea
                        rows={5}
                        value={s.heroText}
                        onChange={(e) => set("heroText", e.target.value)}
                        className={inp}
                    />
                </Field>
            </Section>


            <Section icon={FileText} title="CV Documents" hint="one PDF per language">
                <div className="space-y-2">
                    {[
                        { key: "cvUrl", label: "French" },
                        { key: "cvUrl2", label: "English" },
                    ].map((cv) => (
                        <div
                            key={cv.key}
                            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-background/60 px-4 py-3"
                        >
                            <div className="min-w-0">
                                <p className="text-sm font-semibold">{cv.label}</p>
                                {uploadingCV === cv.key ? (
                                    <p className="text-xs text-foreground/60">Uploading...</p>
                                ) : s[cv.key] ? (
                                    <a
                                        href={s[cv.key]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center gap-1.5 text-xs text-foreground/60 hover:text-primary"
                                    >
                                        <ExternalLink size={12} />
                                        View current file
                                    </a>
                                ) : (
                                    <p className="text-xs text-foreground/50">No file yet</p>
                                )}
                            </div>

                            <label
                                className={`${btnGhost} text-xs ${uploadingCV !== null ? "pointer-events-none opacity-50" : ""}`}
                            >
                                <FileText size={14} />
                                {uploadingCV === cv.key ? "Uploading..." : s[cv.key] ? "Replace PDF" : "Upload PDF"}
                                <input
                                    type="file"
                                    accept=".pdf,application/pdf"
                                    className="hidden"
                                    disabled={uploadingCV !== null}
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) handleCVUpload(file, cv.key);
                                        e.target.value = "";
                                    }}
                                />
                            </label>
                        </div>
                    ))}
                </div>

                {cvError && <p className="text-sm text-rose">{cvError}</p>}

                <p className="text-xs text-foreground/60">
                    After uploading, click Save changes to store the new links.
                </p>
            </Section>

            <Section icon={Eye} title="Status badge" hint="top of the hero">
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                        type="checkbox"
                        checked={s.badgeShow !== false}
                        onChange={(e) => set("badgeShow", e.target.checked)}
                        className="h-4 w-4 cursor-pointer accent-primary"
                    />
                    Show the badge
                </label>
                <Field label="Badge text" hint="What you are doing or looking for right now. Leave empty to use open_to_work.">
                    <input
                        value={s.badgeText}
                        placeholder="open_to_work"
                        onChange={(e) => set("badgeText", e.target.value)}
                        className={inp}
                    />
                </Field>
            </Section>

            <Section icon={Route} title="Experience section" hint="the line above the timeline">
                <Field
                    label="Status line"
                    hint="Shown above the timeline. Put **double asterisks** around words to highlight them. Empty hides the line."
                >
                    <input value={s.expStatus} onChange={(e) => set("expStatus", e.target.value)} className={inp} />
                </Field>
            </Section>

            {err && <p className="text-sm text-rose">{err}</p>}

            <div className="sticky bottom-4 z-20 flex items-center justify-between gap-3 rounded-2xl border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <SaveStatus dirty={dirty} saved={saved} />
                <button type="submit" disabled={saving || uploadingCV !== null || !dirty} className={`${btnMain} px-5`}>
                    {saving ? "Saving..." : "Save changes"}
                </button>
            </div>
        </form>
    );
};

/* ---------- "What's next" section settings ---------- */

const normNext = (o) => ({ ...o, duration: String(o.duration ?? "") });

const NextForm = ({ onDirty }) => {
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

/* ---------- Contact section settings ---------- */

const normContact = (d) => ({
    ...DEFAULT_CONTACT,
    ...d,
    photos: Array.isArray(d?.photos) && d.photos.length ? d.photos : DEFAULT_CONTACT.photos,
});

const ContactForm = ({ onDirty }) => {
    const [start, setStart] = useState(null); // null = still loading
    const [s, setS] = useState(null);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [err, setErr] = useState("");

    useEffect(() => {
        getSettings("contact")
            .then((d) => {
                const v = normContact(d);
                setStart(v);
                setS(v);
            })
            .catch(() => {
                const v = normContact({});
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
                email: s.email.trim(),
                phone: s.phone.trim(),
                linkedin: s.linkedin.trim(),
                location: s.location.trim(),
                photos: s.photos
                    .filter((p) => p?.url)
                    .map((p) => ({ url: p.url, caption: (p.caption ?? "").trim() })),
            };
            await saveSettings(clean, "contact");
            const n = normContact(clean);
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
            <h2 className="text-lg font-black">Contact</h2>

            <Section icon={Info} title="Contact details" hint="shown in the cards and the orbit icons">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Email">
                        <input type="email" value={s.email} onChange={(e) => set("email", e.target.value)} className={inp} />
                    </Field>
                    <Field label="Phone" hint="Any format. The call link ignores spaces and dashes.">
                        <input value={s.phone} onChange={(e) => set("phone", e.target.value)} className={inp} />
                    </Field>
                    <Field label="LinkedIn" hint="A handle (khadija-chkhichkh) or the full profile URL.">
                        <input value={s.linkedin} onChange={(e) => set("linkedin", e.target.value)} className={inp} />
                    </Field>
                    <Field label="Location" hint="Shown as 'Based in'.">
                        <input value={s.location} onChange={(e) => set("location", e.target.value)} className={inp} />
                    </Field>
                </div>
            </Section>

            <Section icon={ImagePlus} title="Photos" hint="one = static circle, several = fading slideshow">
                <GalleryField value={s.photos} onChange={(v) => set("photos", v)} />
                <p className="text-[11px] text-foreground/50">
                    The first photo shows first. If you remove them all, the built-in photo comes back.
                </p>
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

/* ---------- one-time import: move built-in local images to Cloudinary ---------- */

// Built-in content points at files bundled with the site (/pum.png, src/assets/...).
// On "Import current data" each one is downloaded and uploaded to Cloudinary, and the
// database gets the Cloudinary link instead. Images that are already https:// stay as they are.
const toCloudinary = async (src) => {
    const res = await fetch(src);
    const blob = await res.blob();
    if (!res.ok || blob.type.startsWith("text/")) throw new Error(`Could not read the image ${src}`);
    const name = src.split("/").pop().split("?")[0] || "image";
    return uploadImage(new File([blob], name, { type: blob.type }));
};

const makeUploader = () => {
    const cache = new Map(); // same file used twice (cover + step 1) is uploaded once
    return (src) => {
        if (!src || /^https?:\/\//.test(src)) return Promise.resolve(src);
        if (!cache.has(src)) cache.set(src, toCloudinary(src));
        return cache.get(src);
    };
};

const prepareCertifications = (items) => {
    const up = makeUploader();
    return Promise.all(items.map(async (it) => ({ ...it, image: await up(it.image) })));
};

const prepareProjects = (items) => {
    const up = makeUploader();
    return Promise.all(
        items.map(async (p) => ({
            ...p,
            cover: await up(p.cover),
            steps: await Promise.all((p.steps ?? []).map(async (st) => ({ ...st, image: await up(st.image) }))),
        }))
    );
};

/* ---------- dashboard ---------- */

// One entry per tab. Everything the dashboard needs to list, edit and delete is here.
const sectionTab = (key, label, defaults, prepare) => {
    const def = SECTIONS[key];
    return {
        key,
        label,
        defaults,
        prepare,
        singular: def.singular,
        list: () => listItems(key),
        remove: (it) => removeItem(key, it.id),
        idOf: (it) => it.id,
        titleOf: (it) => it[def.titleKey] || "Untitled",
        subtitleOf: (it) => it[def.subtitleKey] || "",
        Form: (props) => <ItemForm def={def} save={(d) => saveItem(key, d)} {...props} />,
    };
};

const TABS = [
    {
        key: "projects",
        label: "Projects",
        defaults: DEFAULT_PROJECTS,
        prepare: prepareProjects,
        singular: "project",
        list: listProjects,
        remove: (p) => removeProject(p.slug),
        idOf: (p) => p.slug,
        titleOf: (p) => p.title,
        subtitleOf: (p) => `/projects/${p.slug}`,
        viewTo: (p) => `/projects/${p.slug}`,
        Form: ProjectForm,
    },
    sectionTab("skills", "Skills", DEFAULT_SKILLS),
    sectionTab("experience", "Experience", DEFAULT_EXPERIENCE),
    sectionTab("education", "Education", DEFAULT_EDUCATION),
    sectionTab("certifications", "Certifications", DEFAULT_CERTIFICATIONS, prepareCertifications),
    { key: "site", label: "Site", single: true, Form: SiteForm },
    { key: "next", label: "What's next", single: true, Form: NextForm },
    { key: "contact", label: "Contact", single: true, Form: ContactForm },
];

const Dashboard = ({ user }) => {
    const [tab, setTab] = useState("projects");
    const [list, setList] = useState(null);
    const [reload, setReload] = useState(0);
    const [selected, setSelected] = useState(null); // null | "new" | item
    const [dirty, setDirty] = useState(false);
    const [justSaved, setJustSaved] = useState(false); // a brand-new item remounts its form after saving
    const [imported, setImported] = useState({}); // which built-in sections were already copied to Firestore
    const [importing, setImporting] = useState(false);
    const [mood, setMood] = useState("love"); // she greets you when you arrive

    // any mood other than idle fades back to idle after a moment
    useEffect(() => {
        if (mood === "idle") return;
        const t = setTimeout(() => setMood("idle"), 2200);
        return () => clearTimeout(t);
    }, [mood]);

    const cfg = TABS.find((t) => t.key === tab);

    useEffect(() => {
        getSettings("imports").then(setImported).catch(() => { });
    }, []);

    const runImport = async () => {
        const note = cfg.prepare ? " Their images will be uploaded to Cloudinary (this can take a minute)." : "";
        if (!window.confirm(`Copy the built-in ${cfg.label.toLowerCase()} into the database? Do this only once.${note}`)) return;
        setImporting(true);
        try {
            const items = cfg.prepare ? await cfg.prepare(cfg.defaults) : cfg.defaults;
            await importItems(cfg.key, items);
            setImported((x) => ({ ...x, [cfg.key]: true }));
            setReload((n) => n + 1);
        } catch (e) {
            window.alert(`Import failed. ${e?.message ?? ""}\nCheck that you are logged in, that your Firestore rules allow writes, and that the Cloudinary upload preset in firebaseCloudinaryConfig.js is configured for unsigned image uploads.`);
        }
        setImporting(false);
    };
    const Form = cfg.Form;

    useEffect(() => {
        if (cfg.single) return;
        let alive = true;
        cfg.list()
            .then((l) => alive && setList(l))
            .catch(() => alive && setList([]));
        return () => {
            alive = false;
        };
    }, [reload, cfg]);

    // ask before leaving a form that has unsaved changes
    const guard = (fn) => () => {
        if (dirty && !window.confirm("Discard unsaved changes?")) return;
        setDirty(false);
        setJustSaved(false);
        fn();
    };

    const switchTab = (key) =>
        guard(() => {
            setTab(key);
            setSelected(null);
            setList(null);
        })();

    const saved = (item) => {
        setDirty(false);
        setJustSaved(true);
        setSelected(item);
        setReload((n) => n + 1);
        setMood("love");
    };

    const isActive = (item) =>
        selected && selected !== "new" && cfg.idOf(selected) === cfg.idOf(item);

    const del = async (item) => {
        if (!window.confirm(`Delete "${cfg.titleOf(item)}"? This can't be undone.`)) return;
        await cfg.remove(item);
        if (isActive(item)) {
            setSelected(null);
            setDirty(false);
        }
        setReload((n) => n + 1);
    };

    return (
        <div className="mx-auto max-w-5xl px-6 py-8 text-left">
            {/* top bar: section tabs, with the panda peeking over it */}
            <PandaPeek align="right" size={0.8} mood={mood} className="mb-6">
                <header className="overflow-hidden rounded-2xl border border-border bg-card">
                    <TerminalBar title={`${user.email}: ~/admin`} />
                    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                        <nav className="flex flex-wrap gap-1">
                            {TABS.map((t) => (
                                <button
                                    key={t.key}
                                    type="button"
                                    onClick={() => switchTab(t.key)}
                                    className={`cursor-pointer rounded-full border px-3 py-1.5 font-mono text-xs transition-colors ${tab === t.key
                                        ? "border-primary/30 bg-primary/10 text-foreground"
                                        : "border-transparent text-foreground/50 hover:text-primary"
                                        }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </nav>
                        <div className="flex gap-2">
                            <Link to="/" className={`${btnGhost} px-4 py-1.5 text-xs`}>
                                View site
                            </Link>
                            <button onClick={() => signOut(auth)} className={`${btnGhost} px-4 py-1.5 text-xs`}>
                                <LogOut size={14} /> Log out
                            </button>
                        </div>
                    </div>
                </header>
            </PandaPeek>

            {cfg.single ? (
                <div className="max-w-2xl">
                    <Form onDirty={setDirty} />
                </div>
            ) : (
                <div className="grid items-start gap-6 md:grid-cols-[260px_1fr]">
                    {/* left panel: existing items */}
                    <aside className="space-y-3 rounded-2xl border border-border bg-card p-3 md:sticky md:top-4">
                        <div className="flex items-center justify-between px-1">
                            <h2 className="text-sm font-bold">{cfg.label}</h2>
                            <button onClick={guard(() => setSelected("new"))} className={`${btnMain} px-3 py-1.5 text-xs`}>
                                <Plus size={14} /> New
                            </button>
                        </div>

                        {cfg.defaults && !imported[cfg.key] && (
                            <div className="space-y-2 rounded-lg border border-primary/30 bg-primary/10 p-3">
                                <p className="text-xs text-foreground/70">
                                    The site still shows its built-in {cfg.label.toLowerCase()}. Import them to edit them here.
                                </p>
                                <button
                                    type="button"
                                    onClick={runImport}
                                    disabled={importing}
                                    className={`${btnMain} w-full px-3 py-1.5 text-xs`}
                                >
                                    {importing ? "Importing..." : "Import current data"}
                                </button>
                            </div>
                        )}

                        <div className="max-h-[70vh] space-y-1 overflow-y-auto">
                            {selected === "new" && (
                                <div className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm font-semibold">
                                    New {cfg.singular}
                                    <span className="ml-2 font-mono text-[11px] font-normal text-foreground/50">unsaved</span>
                                </div>
                            )}

                            {list === null && <p className="px-2 text-xs text-foreground/60">Loading...</p>}
                            {list?.length === 0 && selected !== "new" && (
                                <p className="px-2 text-xs text-foreground/60">Nothing yet. Click New.</p>
                            )}

                            {list?.map((item) => (
                                <div
                                    key={cfg.idOf(item)}
                                    className={`flex items-center gap-1 rounded-lg border transition-colors ${isActive(item)
                                        ? "border-primary/30 bg-primary/10"
                                        : "border-transparent hover:bg-primary/5"
                                        }`}
                                >
                                    <button
                                        type="button"
                                        onClick={guard(() => setSelected(item))}
                                        className="min-w-0 flex-1 cursor-pointer px-3 py-2 text-left"
                                    >
                                        <p className="truncate text-sm font-semibold">{cfg.titleOf(item)}</p>
                                        {cfg.subtitleOf(item) && (
                                            <p className="truncate font-mono text-[11px] text-foreground/50">
                                                {cfg.subtitleOf(item)}
                                            </p>
                                        )}
                                    </button>
                                    {cfg.viewTo && (
                                        <Link
                                            to={cfg.viewTo(item)}
                                            aria-label="View page"
                                            className="p-1.5 text-foreground/40 hover:text-primary"
                                        >
                                            <ExternalLink size={14} />
                                        </Link>
                                    )}
                                    <button
                                        aria-label="Delete"
                                        onClick={() => del(item)}
                                        className="mr-1 cursor-pointer p-1.5 text-foreground/40 hover:text-rose"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* right panel: editor */}
                    <main className="min-w-0">
                        {selected ? (
                            <Form
                                key={`${tab}-${selected === "new" ? "new" : cfg.idOf(selected)}`}
                                initial={selected === "new" ? null : selected}
                                startSaved={justSaved}
                                nextOrder={(list?.length ?? 0) + 1}
                                onSaved={saved}
                                onCancel={guard(() => setSelected(null))}
                                onDirty={setDirty}
                            />
                        ) : (
                            <div className="flex min-h-[240px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-border p-8 text-center">
                                <Pencil size={20} className="text-foreground/40" />
                                <p className="text-sm text-foreground/60">
                                    Select a {cfg.singular} on the left to edit it, or create a new one.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            )}
        </div>
    );
};

/* ---------- page ---------- */

export const Admin = () => {
    const [user, setUser] = useState(undefined); // undefined = still checking

    useEffect(() => onAuthStateChanged(auth, setUser), []);

    return (
        <div className="relative min-h-screen text-foreground">
            <Background />
            <div className="relative z-10">
                {user === undefined ? (
                    <p className="p-8 text-sm text-foreground/60">Loading...</p>
                ) : user ? (
                    <Dashboard user={user} />
                ) : (
                    <Login />
                )}
            </div>
        </div>
    );
};