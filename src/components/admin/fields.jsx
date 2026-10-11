import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ImagePlus, Plus, Trash2 } from "lucide-react";
import { listProjects, uploadImage } from "../../lib/projectsDb";
import { btnGhost, inp } from "./ui";

// Reusable inputs: several photos, project picker, comma tags, list of lines.

// Several photos for one item (internship photos, contact photos). Each upload goes to Cloudinary.
// value = [{ url, caption }]. The first photo is the cover.
// Not wrapped in <Field>: several controls inside one <label> would trigger the wrong one.
export const GalleryField = ({ value, onChange }) => {
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
export const ProjectPicker = ({ value, onChange }) => {
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

export const TagsInput = ({ value, onChange }) => {
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

export const StringList = ({ value, onChange, placeholder }) => (
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
