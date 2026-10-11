import { useEffect, useState } from "react";
import { ImagePlus, Info } from "lucide-react";
import { getSettings, saveSettings } from "../../lib/contentDb";
import { DEFAULT_CONTACT } from "../../lib/defaultContent";
import { GalleryField } from "./fields";
import { Field, SaveStatus, Section, btnMain, inp } from "./ui";

const normContact = (d) => ({
    ...DEFAULT_CONTACT,
    ...d,
    photos: Array.isArray(d?.photos) && d.photos.length ? d.photos : DEFAULT_CONTACT.photos,
});

export const ContactForm = ({ onDirty }) => {
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
