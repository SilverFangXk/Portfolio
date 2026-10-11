import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { ExternalLink, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { auth } from "../../lib/firebaseCloudinaryConfig";
import { getSettings, importItems } from "../../lib/contentDb";
import { PandaPeek } from "../Pandapeek";
import { TerminalBar, btnGhost, btnMain } from "./ui";
import { TABS } from "./tabs";

export const Dashboard = ({ user }) => {
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
