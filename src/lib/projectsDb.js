import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { CLOUDINARY, db } from "./firebaseCloudinaryConfig";

// Each project is one document in the "projects" collection.
// The document id is the project's slug (its web address).

export const listProjects = async () => {
  const snap = await getDocs(collection(db, "projects"));
  return snap.docs
    .map((d) => d.data())
    .sort((a, b) => (a.createdAt ?? 0) - (b.createdAt ?? 0));
};

export const getProject = async (slug) => {
  const snap = await getDoc(doc(db, "projects", slug));
  return snap.exists() ? snap.data() : null;
};

export const saveProject = (project) =>
  setDoc(doc(db, "projects", project.slug), project);

export const removeProject = (slug) => deleteDoc(doc(db, "projects", slug));

// Uploads one image to Cloudinary and returns its https link
export const uploadImage = async (file) => {
  const body = new FormData();
  body.append("file", file);
  body.append("upload_preset", CLOUDINARY.uploadPreset);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY.cloudName}/image/upload`,
    { method: "POST", body }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error?.message || `Cloudinary image upload failed (${res.status}).`);
  }
  if (!data.secure_url) {
    throw new Error("Cloudinary did not return a secure image URL.");
  }
  return data.secure_url;
};