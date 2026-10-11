import { uploadImage } from "../../lib/projectsDb";

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

export const prepareCertifications = (items) => {
    const up = makeUploader();
    return Promise.all(items.map(async (it) => ({ ...it, image: await up(it.image) })));
};

export const prepareProjects = (items) => {
    const up = makeUploader();
    return Promise.all(
        items.map(async (p) => ({
            ...p,
            cover: await up(p.cover),
            steps: await Promise.all((p.steps ?? []).map(async (st) => ({ ...st, image: await up(st.image) }))),
        }))
    );
};
