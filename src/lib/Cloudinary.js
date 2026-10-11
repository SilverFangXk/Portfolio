import { CLOUDINARY } from "./firebaseCloudinaryConfig";

const CLOUD_NAME = CLOUDINARY.cloudName;
const UPLOAD_PRESET = CLOUDINARY.uploadPreset; 

export const optimized = (url, width) => {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (/\/upload\/[^/]*(f_auto|q_auto|w_\d+)/.test(url)) return url; // already transformed
  const t = ["f_auto", "q_auto", width && `w_${width}`, width && "c_limit"].filter(Boolean).join(",");
  return url.replace("/upload/", `/upload/${t}/`);
};
export async function uploadCV(file) {
  if (!file || file.type !== "application/pdf") {
    throw new Error("Please select a PDF file.");
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error("The PDF must be smaller than 10 MB.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error?.message || `Cloudinary PDF upload failed (${response.status}).`);
  }

  if (!data.secure_url) {
    throw new Error("Cloudinary did not return a secure PDF URL.");
  }
  return data.secure_url;
}