import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "ACHIEVEMENTS", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { key: "whatsapp", href: "https://wa.me/212634761182", icon: FaWhatsapp, size: 18, hover: "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10" },
  { key: "github", href: "https://github.com/SilverFangXk", icon: FaGithub, size: 16, hover: "hover:text-primary hover:border-primary/40 hover:bg-primary/10" },
  { key: "linkedin", href: "https://linkedin.com/in/khadija-chkhichkh", icon: FaLinkedin, size: 18, hover: "hover:text-primary hover:border-primary/40 hover:bg-primary/10" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "py-5"
      )}
    >
      <div className="w-full mx-auto flex justify-between items-center px-6">

        {/* 1. DESKTOP MENU (LEFT SIDE) */}
        <div className="hidden md:flex flex-1 items-center gap-1.5">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="group relative px-3.5 py-1.5 rounded-full border border-transparent text-xs font-mono uppercase tracking-wide text-foreground/70 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* 2. NAME (CENTER PIECE) — monospace now, echoing the code/terminal
            accents used across the rest of the site (git-log, JSON, pills) */}
        <div className="flex flex-1 justify-center">
          <a
            href="#hero"
            className="flex items-center tracking-tight select-none"
          >
            <span className="relative z-10 font-mono font-black text-xl md:text-3xl tracking-tighter">
  <span className="text-foreground/40">{"<"}</span>
  <span className="text-foreground">Khadija</span>
  <span className="text-foreground/40">.</span>
  <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
    Chkhichkh
  </span>
  <span className="text-foreground/40">{" />"}</span>
</span>
          </a>
        </div>

        {/* 3. SOCIALS (RIGHT SIDE) */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
          {socialLinks.map(({ key, href, icon: Icon, size, hover }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full border border-border/40 text-foreground/70 transition-all duration-300",
                hover
              )}
            >
              <Icon size={size} />
            </a>
          ))}
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 text-foreground z-50 hover:bg-primary/10 hover:border-primary/20 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE MENU ACCORDION OVERLAY */}
        <div
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8",
            "transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          <div className="flex flex-col items-center gap-2 w-full max-w-xs">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="w-full text-center text-sm font-mono uppercase tracking-wide px-6 py-3 rounded-full border border-transparent text-foreground/80 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          <hr className="w-1/3 border-border" />

          <div className="flex gap-3">
            {socialLinks.map(({ key, href, icon: Icon, size, hover }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  "flex items-center justify-center w-11 h-11 rounded-full border border-border/40 text-foreground/70 transition-all duration-300",
                  hover
                )}
              >
                <Icon size={size + 2} />
              </a>
            ))}
          </div>
        </div>

      </div>
    </nav>
  );
};