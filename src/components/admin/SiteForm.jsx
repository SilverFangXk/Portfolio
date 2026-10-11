import { useEffect, useState } from "react";
import { ExternalLink, Eye, FileText, Info, Route } from "lucide-react";
import { getSettings, saveSettings } from "../../lib/contentDb";
import { DEFAULT_EXP_STATUS } from "../../lib/defaultContent";
import { uploadCV } from "../../lib/Cloudinary";
import { Field, SaveStatus, Section, btnGhost, btnMain, inp } from "./ui";

const emptySettings = { heroTitle: "", heroText: "", cvUrl: "", cvUrl2: "", badgeShow: true, badgeText: "", expStatus: DEFAULT_EXP_STATUS };

export const SiteForm = ({ onDirty }) => {
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
