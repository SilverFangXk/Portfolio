import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";


// Lighter copy of a Cloudinary image: f_auto picks WebP/AVIF, q_auto the quality, and the
// width stops a 5 MB phone photo from being downloaded for a small thumbnail.
// Non-Cloudinary links pass through unchanged.
export const optimized = (url, width) => {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  if (/\/upload\/[^/]*(f_auto|q_auto|w_\d+)/.test(url)) return url;
  const t = ["f_auto", "q_auto", width && `w_${width}`, width && "c_limit"].filter(Boolean).join(",");
  return url.replace("/upload/", `/upload/${t}/`);
};

// Photo gallery with a big photo, thumbnails and a full-screen viewer.
// photos = [{ url, caption }]. Click the big photo to open the viewer;
// arrow keys and the side buttons move between photos, Escape closes.

const Lightbox = ({ photos, index, onIndex, onClose }) => {
  const ref = useRef(null);
  const open = index !== null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") onIndex((index + 1) % photos.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + photos.length) % photos.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, index, photos.length, onIndex]);

  const photo = open ? photos[index] : null;
  const many = photos.length > 1;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-label="Photo viewer"
      className="m-auto max-h-[94vh] w-[min(96vw,64rem)] max-w-none overflow-hidden bg-transparent p-0 text-white backdrop:bg-black/85"
    >
      {photo && (
        <figure className="relative flex flex-col items-center">
          <img
            src={optimized(photo.url, 1600)}
            alt={photo.caption || ""}
            className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
          />
          {photo.caption && <figcaption className="mt-3 max-w-xl text-center text-sm text-white/85">{photo.caption}</figcaption>}
          {many && (
            <p className="mt-1 font-mono text-[11px] text-white/60">
              {index + 1} / {photos.length}
            </p>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close photo viewer"
            className="absolute right-2 top-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            <X size={18} />
          </button>
          {many && (
            <>
              <button
                type="button"
                onClick={() => onIndex((index - 1 + photos.length) % photos.length)}
                aria-label="Previous photo"
                className="absolute left-2 top-[40%] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => onIndex((index + 1) % photos.length)}
                aria-label="Next photo"
                className="absolute right-2 top-[40%] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
        </figure>
      )}
    </dialog>
  );
};

export const PhotoGallery = ({ photos = [] }) => {
  const list = photos.filter((p) => p?.url);
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(null);

  if (list.length === 0) return null;
  const i = Math.min(active, list.length - 1);
  const cur = list[i];
  const many = list.length > 1;
  const step = (d) => setActive((n) => (n + d + list.length) % list.length);

  const arrow =
    "absolute top-1/2 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-background/85 text-foreground shadow-xs transition-colors hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40";

  return (
    <div>
      <div className="relative overflow-hidden rounded-xl border border-border/60 bg-muted/30">
        <button
          type="button"
          onClick={() => setZoom(i)}
          aria-label="View photo full size"
          className="block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <img src={optimized(cur.url, 900)} alt={cur.caption || ""} className="aspect-[4/3] w-full object-cover" />
        </button>

        {many && (
          <>
            <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className={`${arrow} left-2`}>
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => step(1)} aria-label="Next photo" className={`${arrow} right-2`}>
              <ChevronRight size={16} />
            </button>
            <span className="pointer-events-none absolute bottom-2 right-2 rounded bg-background/85 px-2 py-0.5 font-mono text-[11px] text-foreground/80">
              {i + 1} / {list.length}
            </span>
          </>
        )}
      </div>

      {cur.caption && <p className="mt-2 text-xs leading-relaxed text-foreground/60">{cur.caption}</p>}

      {many && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {list.map((p, n) => (
            <button
              key={`${p.url}-${n}`}
              type="button"
              onClick={() => setActive(n)}
              aria-label={`Show photo ${n + 1}`}
              aria-current={n === i}
              className={`h-12 w-16 shrink-0 cursor-pointer overflow-hidden rounded-md border transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${
                n === i ? "border-primary" : "border-border/60 opacity-70 hover:opacity-100"
              }`}
            >
              <img src={optimized(p.url, 160)} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}

      <Lightbox photos={list} index={zoom} onIndex={setZoom} onClose={() => setZoom(null)} />
    </div>
  );
};