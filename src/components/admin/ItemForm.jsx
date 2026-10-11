import { useEffect, useState } from "react";
import { GalleryField, ProjectPicker, StringList, TagsInput } from "./fields";
import { Field, ImageField, SaveStatus, Section, btnGhost, btnMain, inp } from "./ui";

// Generic editor for any section described in sections.jsx.

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

export const ItemForm = ({ def, save: saveFn, initial, onSaved, onCancel, onDirty, nextOrder, startSaved = false }) => {
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