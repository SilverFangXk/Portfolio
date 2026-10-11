import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "./firebaseCloudinaryConfig";


export const listItems = async (col) => {
    const snap = await getDocs(collection(db, col));
    return snap.docs
        .map((d) => ({ ...d.data(), id: d.id }))
        .sort(
            (a, b) =>
                (a.order ?? 9999) - (b.order ?? 9999) ||
                (a.createdAt ?? 0) - (b.createdAt ?? 0)
        );
};

export const saveItem = async (col, item) => {
    const id = item.id || doc(collection(db, col)).id;
    const data = { ...item, id };
    await setDoc(doc(db, col, id), data);
    return data;
};

export const removeItem = (col, id) => deleteDoc(doc(db, col, id));

export const getSettings = async (id = "site") => {
    const snap = await getDoc(doc(db, "settings", id));
    return snap.exists() ? snap.data() : {};
};

export const saveSettings = (data, id = "site") =>
    setDoc(doc(db, "settings", id), data, { merge: true });

// What the "What's next" section shows until something is saved from the admin.
export const NEXT_DEFAULTS = {
    sectionTitle: "What's Next?",
    heading: "Preparing for what's next",
    text: "I'm completing my internship at Nexteer Automotive, where I've been developing digital solutions for HSE processes. My next step is a PFE internship where I can contribute to meaningful projects and strengthen my skills in Data Engineering, Big Data, Cloud, and AI.",
    seeking: "PFE Internship",
    focusAreas: ["Data Engineering", "Big Data", "Cloud Engineering", "AI & Machine Learning"],
    availableFrom: "2027-01",
    duration: "6",
    footerNote: "Open to opportunities in Morocco and abroad",
};

// One-time copy of built-in content into a collection.
// Ids come from the data, so running it twice doesn't duplicate anything.
export const importItems = async (col, items) => {
    await Promise.all(
        items.map((it, i) => {
            const id = it.id || doc(collection(db, col)).id;
            return setDoc(doc(db, col, id), {
                ...it,
                id,
                order: it.order ?? i + 1,
                createdAt: it.createdAt ?? Date.now() + i,
            });
        })
    );
    await setDoc(doc(db, "settings", "imports"), { [col]: true }, { merge: true });
};