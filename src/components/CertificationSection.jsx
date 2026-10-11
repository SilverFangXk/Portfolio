import { useEffect, useRef, useState } from "react";
import { Award, ChevronLeft, ChevronRight, ExternalLink, Eye, ShieldCheck, X } from "lucide-react";

import { optimized } from "../lib/Cloudinary";
import { DEFAULT_CERTIFICATIONS } from "../lib/defaultContent";
import { useCollection } from "../lib/useCollection";

// Data comes from the admin (Firestore), with DEFAULT_CERTIFICATIONS as the fallback.
// Edit it in admin -> Certifications (first time: "Import current data", which also
// uploads the built-in certificate images to Cloudinary).
// Grid = small thumbnails. Click one to open the full certificate in a viewer.

const VIEWER_CSS = `
@keyframes cert-in { from { opacity: 0; transform: translateY(12px) scale(.97); } to { opacity: 1; transform: none; } }
dialog.cert-viewer[open] { animation: cert-in 200ms cubic-bezier(.22,1,.36,1); }
@media (prefers-reduced-motion: reduce) { dialog.cert-viewer[open] { animation: none; } }
`;

export const CertificationsSection = () => {
  const { items: certifications } = useCollection("certifications", DEFAULT_CERTIFICATIONS);
  const [open, setOpen] = useState(null); // index of the certificate being viewed, or null
  const ref = useRef(null);

  const total = certifications.length;
  const cert = open !== null ? certifications[open] : null;

  const go = (step) => setOpen((i) => (i === null ? i : (i + step + total) % total));

  // Native <dialog>: Escape to close, focus trapping and the backdrop come for free.
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (cert && !d.open) d.showModal();
    if (!cert && d.open) d.close();
  }, [cert]);

  // Lock page scroll + arrow keys while the viewer is open.
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, total]);

  return (
    <section id="certifications" className="py-24 px-6 relative">
      <style>{VIEWER_CSS}</style>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            certifications.render()
          </div>

          <h2 className="mt-4 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Licenses &{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Certifications
            </span>
          </h2>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((c, index) => (
            <button
              key={c.id ?? index}
              type="button"
              onClick={() => setOpen(index)}
              aria-label={`View certificate: ${c.name}`}
              className="group flex cursor-pointer flex-col gap-3 text-left focus-visible:outline-none"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40 group-hover:shadow-xl group-hover:shadow-primary/10 group-focus-visible:ring-2 group-focus-visible:ring-primary/50">
                {c.image ? (
                  <img
                    src={optimized(c.image, 600)}
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover object-top"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-primary/5">
                    <Award className="h-10 w-10 text-primary/60" strokeWidth={1.5} />
                  </div>
                )}

                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-foreground/55 text-sm font-semibold text-background opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Eye size={16} /> View certificate
                </div>
              </div>

              <div className="min-w-0">
                <h3 className="text-sm font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {c.name}
                </h3>
                {(c.issuer || c.date) && (
                  <p className="mt-0.5 text-xs text-foreground/60">
                    {[c.issuer, c.date].filter(Boolean).join(" · ")}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Viewer */}
      <dialog
        ref={ref}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === ref.current && setOpen(null)} // click on the dim backdrop
        aria-labelledby="cert-viewer-title"
        className="cert-viewer m-auto max-h-[92dvh] w-[calc(100%-2rem)] max-w-3xl overflow-hidden rounded-2xl border border-border bg-card p-0 text-left text-foreground shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {cert && (
          <div className="flex max-h-[92dvh] flex-col">
            {/* Image area */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-auto bg-muted/30 p-4">
              {cert.image ? (
                <img
                  src={optimized(cert.image, 1600)}
                  alt={`${cert.name} certificate`}
                  className="max-h-[58dvh] w-auto max-w-full rounded-md object-contain shadow-md"
                />
              ) : (
                <Award className="my-10 h-20 w-20 text-primary/50" strokeWidth={1.2} />
              )}

              <button
                type="button"
                onClick={() => setOpen(null)}
                aria-label="Close"
                className="absolute right-3 top-3 cursor-pointer rounded-full bg-card/90 p-2 text-foreground/70 shadow transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <X size={18} />
              </button>

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Previous certificate"
                    className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-card/90 p-2 text-foreground/70 shadow transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Next certificate"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-card/90 p-2 text-foreground/70 shadow transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Details */}
            <div className="shrink-0 space-y-2 border-t border-border/60 px-6 py-5">
              <h3 id="cert-viewer-title" className="text-lg font-black leading-snug">
                {cert.name}
              </h3>
              {(cert.issuer || cert.date) && (
                <p className="text-sm text-foreground/60">
                  {[cert.issuer, cert.date].filter(Boolean).join(" · ")}
                </p>
              )}
              {cert.description && (
                <p className="text-sm leading-relaxed text-foreground/75">{cert.description}</p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/btn inline-flex cursor-pointer items-center gap-2 pt-1 text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:text-primary"
                >
                  <ShieldCheck size={14} className="text-primary" />
                  <span>Verify certificate</span>
                  <ExternalLink
                    size={12}
                    className="opacity-60 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5"
                  />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
};