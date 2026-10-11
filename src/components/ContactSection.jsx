import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { Mail, Phone, MapPin, Send, User, AtSign, MessageSquare, Check, AlertCircle } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

import { optimized } from "../lib/Cloudinary";
import { getSettings } from "../lib/contentDb";
import { DEFAULT_CONTACT } from "../lib/defaultContent";

// Values come from admin -> Contact (Firestore), with DEFAULT_CONTACT as the fallback.

const CONTACT_CSS = `
@keyframes cp-float { 0%,100% { translate: 0 0; } 50% { translate: 0 -6px; } }
@media (prefers-reduced-motion: reduce) { .cp-orb { animation: none !important; } }
`;

// Cloudinary links get resized; local files (/meB.jpeg) are used as they are
const photoSrc = (u) => (/^https?:\/\//i.test(u) ? optimized(u, 600) : u);

export const ContactSection = () => {
  const [saved, setSaved] = useState(null); // null = still loading
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    let alive = true;
    getSettings("contact")
      .then((d) => alive && setSaved(d ?? {}))
      .catch(() => alive && setSaved({}));
    return () => {
      alive = false;
    };
  }, []);

  const loaded = saved !== null;
  const data = { ...DEFAULT_CONTACT, ...(saved ?? {}) };

  const email = (data.email || DEFAULT_CONTACT.email).trim();
  const phone = (data.phone || DEFAULT_CONTACT.phone).trim();
  const location = (data.location || DEFAULT_CONTACT.location).trim();

  const linkedinRaw = (data.linkedin || DEFAULT_CONTACT.linkedin).trim();
  const linkedinUrl = /^https?:\/\//i.test(linkedinRaw)
    ? linkedinRaw
    : `https://linkedin.com/in/${linkedinRaw.replace(/^\/+|\/+$/g, "")}`;
  const linkedinHandle = linkedinUrl
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/(in\/)?/i, "")
    .replace(/\/+$/, "");

  const savedPics = (Array.isArray(data.photos) ? data.photos : [])
    .map((p) => (typeof p === "string" ? p : p?.url))
    .filter(Boolean);
  const pics = savedPics.length ? savedPics : DEFAULT_CONTACT.photos.map((p) => p.url);

  // wait for Firestore before showing editable values, so the defaults never flash first
  const fade = `transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`;

  // slideshow (only when there is more than one photo)
  useEffect(() => {
    setSlide(0);
    if (pics.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setSlide((n) => (n + 1) % pics.length), 3500);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pics.length]);

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget; // grab before the await

    setStatus("sending");
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      form.reset();
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const contactPoints = [
    { key: "email", icon: Mail, label: "Email", value: email, href: `mailto:${email}`, color: "primary" },
    { key: "phone", icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/[^\d+]/g, "")}`, color: "accent" },
    { key: "linkedin", icon: FaLinkedin, label: "LinkedIn", value: linkedinHandle, href: linkedinUrl, color: "purple" },
    { key: "location", icon: MapPin, label: "Based in", value: location, href: null, color: "rose" },
  ];

  const colorStyles = {
    primary: "bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-primary-foreground",
    accent: "bg-accent/10 text-accent border-accent/20 group-hover:bg-accent group-hover:text-accent-foreground",
    purple: "bg-purple/10 text-purple border-purple/20 group-hover:bg-purple group-hover:text-white",
    rose: "bg-rose/10 text-rose border-rose/20 group-hover:bg-rose group-hover:text-white",
  };

  const fields = [
    { name: "user_name", type: "text", label: "Your name", icon: User },
    { name: "user_email", type: "email", label: "Email address", icon: AtSign },
    { name: "user_subject", type: "text", label: "Subject", icon: Mail },
  ];

  return (
    <section id="contact" className="py-24 px-6 relative overflow-hidden">
      <style>{CONTACT_CSS}</style>
      <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            GetInTouch.GetInTouch()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            Get In{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="mt-4 max-w-md text-sm md:text-base text-foreground/70">
            Have an open role, an internship project opportunity, or just want to discuss data pipelines? Drop a message!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: orbit of contact points */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
              {/* rings */}
              <div className="absolute inset-0 rounded-full border border-border/30" />
              <div className="absolute inset-[10%] rounded-full border border-border/20" />
              <div className="absolute inset-[22%] rounded-full border border-dashed border-primary/30 animate-[spin_60s_linear_infinite]" />

              {/* travelling dots */}
              <div className="absolute inset-0 animate-[spin_14s_linear_infinite]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent" />
              </div>
              <div className="absolute inset-0 animate-[spin_22s_linear_infinite_reverse]">
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-purple/70" />
              </div>

              {/* photo(s) */}
              <div
                className={`relative z-10 w-44 h-44 rounded-full overflow-hidden border-4 border-card ring-[3px] ring-primary/60 shadow-[0_12px_30px_-10px_var(--color-primary)] ${fade}`}
              >
                {pics.map((src, i) => (
                  <img
                    key={src + i}
                    src={photoSrc(src)}
                    alt={i === 0 ? "Khadija Chkhichkh" : ""}
                    className={`absolute inset-0 h-full w-full object-cover object-[50%_24%] transition-opacity duration-700 ${
                      i === slide ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}
              </div>

              {pics.length > 1 && (
                <div className="absolute bottom-[23%] z-10 flex gap-2">
                  {pics.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSlide(i)}
                      aria-label={`Photo ${i + 1}`}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === slide ? "w-5 bg-primary" : "w-2 bg-border hover:bg-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}

              {/* floating contact points */}
              {contactPoints.map((point, i) => {
                const angle = (360 / contactPoints.length) * i - 90;
                const radius = 46;
                const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
                const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
                const Icon = point.icon;
                return (
                  <a
                    key={point.key}
                    href={point.href || undefined}
                    target={point.href?.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={point.label}
                    className={`cp-orb group absolute z-10 flex items-center justify-center w-14 h-14 rounded-full border shadow-sm transition-all duration-300 hover:scale-110 ${colorStyles[point.color]} ${!point.href ? "cursor-default" : "cursor-pointer"}`}
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: "translate(-50%, -50%)",
                      animation: `fadeInScale 0.5s ease-out ${i * 120}ms backwards, cp-float 4s ease-in-out ${600 + i * 800}ms infinite`,
                    }}
                  >
                    <Icon size={20} />
                    <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-full bg-foreground text-background text-[10px] font-semibold opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 pointer-events-none">
                      {point.label}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className={`mt-10 w-full max-w-sm space-y-3 ${fade}`}>
              {contactPoints.map((point) => {
                const Icon = point.icon;
                const row = (
                  <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card/40 border border-border/30 hover:border-border/60 hover:-translate-y-0.5 transition-all duration-200">
                    <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${colorStyles[point.color].split(" group-hover")[0]}`}>
                      <Icon size={14} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-wider font-bold text-foreground/40">{point.label}</p>
                      <p className="text-sm font-medium text-foreground truncate">{point.value}</p>
                    </div>
                  </div>
                );
                return point.href ? (
                  <a key={point.key} href={point.href} target={point.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="block">
                    {row}
                  </a>
                ) : (
                  <div key={point.key}>{row}</div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: form */}
          <form
            onSubmit={handleMessageSubmit}
            className="lg:col-span-7 gradient-border p-8 md:p-10 bg-card border border-border/40 rounded-3xl flex flex-col gap-6 text-left shadow-sm"
          >
            {fields.map((field) => {
              const Icon = field.icon;
              return (
                <div key={field.name} className="relative">
                  <Icon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
                  <input
                    type={field.type}
                    name={field.name}
                    required
                    placeholder=" "
                    id={field.name}
                    className="peer w-full bg-background border border-border/60 hover:border-border rounded-full pl-12 pr-5 pt-4 pb-2 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  />
                  <label
                    htmlFor={field.name}
                    className="absolute left-12 top-1/2 -translate-y-1/2 text-sm text-foreground/50 pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-[13px] peer-focus:scale-[0.72] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-[13px] peer-[:not(:placeholder-shown)]:scale-[0.72]"
                  >
                    {field.label}
                  </label>
                </div>
              );
            })}

            <div className="relative grow flex flex-col">
              <MessageSquare size={16} className="absolute left-5 top-5 text-primary pointer-events-none" />
              <textarea
                name="user_message"
                id="user_message"
                required
                rows={5}
                placeholder=" "
                className="peer w-full bg-background border border-border/60 hover:border-border rounded-3xl pl-12 pr-5 pt-6 pb-3 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none grow min-h-[140px]"
              />
              <label
                htmlFor="user_message"
                className="absolute left-12 top-5 text-sm text-foreground/50 pointer-events-none transition-all duration-200 origin-left peer-focus:-translate-y-2.5 peer-focus:scale-[0.72] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.72]"
              >
                Your message
              </label>
            </div>

            <button
              type="submit"
              disabled={status !== "idle"}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-full transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] cursor-pointer group shrink-0 select-none text-sm uppercase tracking-wider disabled:cursor-default disabled:hover:scale-100"
            >
              {status === "idle" && (
                <>
                  <span>Send Message</span>
                  <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </>
              )}
              {status === "sending" && (
                <>
                  <span>Sending</span>
                  <span className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-bounce [animation-delay:300ms]" />
                  </span>
                </>
              )}
              {status === "sent" && (
                <>
                  <Check size={15} />
                  <span>Message sent, thank you!</span>
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle size={15} />
                  <span>Failed to send</span>
                </>
              )}
            </button>

            {status === "error" && (
              <p className="text-xs text-center text-foreground/70 -mt-2">
                Something went wrong. Please email me directly at{" "}
                <a href={`mailto:${email}`} className="text-primary underline">
                  {email}
                </a>
                .
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};