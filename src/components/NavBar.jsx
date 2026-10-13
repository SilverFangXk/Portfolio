import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { name: "About", href: "#hero" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#certifications" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    key: "whatsapp",
    href: "https://wa.me/212634761182",
    icon: FaWhatsapp,
    size: 18,
    hover:
      "hover:text-emerald-500 hover:border-emerald-500/40 hover:bg-emerald-500/10",
  },
  {
    key: "github",
    href: "https://github.com/SilverFangXk",
    icon: FaGithub,
    size: 16,
    hover:
      "hover:text-primary hover:border-primary/40 hover:bg-primary/10",
  },
  {
    key: "linkedin",
    href: "https://linkedin.com/in/khadija-chkhichkh",
    icon: FaLinkedin,
    size: 18,
    hover:
      "hover:text-primary hover:border-primary/40 hover:bg-primary/10",
  },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-40 transition-all duration-300",
        isScrolled
          ? "py-2 bg-background/80 backdrop-blur-md border-b border-border/40 shadow-sm"
          : "py-5"
      )}
    >
      <div className="w-full mx-auto flex justify-between items-center px-6">
        {/* 1. DESKTOP MENU — LEFT SIDE */}
        <div className="hidden md:flex flex-1 items-center gap-1.5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="group relative px-3.5 py-1.5 rounded-full border border-transparent text-foreground/70 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all duration-300 text-xs font-mono uppercase tracking-wide whitespace-nowrap"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* 2. NAME — CENTER */}
        <div className="flex flex-1 justify-center">
          <a
            href="#hero"
            aria-label="Khadija Chkhichkh - Home"
            className="flex items-center tracking-tight select-none"
          >
            <span className="relative z-10 font-mono font-black text-xl md:text-3xl tracking-tighter whitespace-nowrap">
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

        {/* 3. SOCIAL LINKS — RIGHT SIDE */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-2">
          {socialLinks.map(({ key, href, icon: Icon, size, hover }) => (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={key}
              className={cn(
                "flex items-center justify-center w-9 h-9 rounded-full border border-border/40 text-foreground/70 transition-all duration-300",
                hover
              )}
            >
              <Icon size={size} />
            </a>
          ))}
        </div>

        {/* 4. MOBILE MENU TOGGLE */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-border/40 text-foreground z-50 hover:bg-primary/10 hover:border-primary/20 transition-colors"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 5. MOBILE MENU OVERLAY */}
        <div
          id="mobile-navigation"
          aria-hidden={!isMenuOpen}
          className={cn(
            "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center gap-8 md:hidden",
            "transition-all duration-300",
            isMenuOpen
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          )}
        >
          <div className="flex flex-col items-center gap-2 w-full max-w-xs px-4">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                tabIndex={isMenuOpen ? 0 : -1}
                onClick={() => setIsMenuOpen(false)}
                className="w-full text-center text-sm font-mono uppercase tracking-wide px-6 py-3 rounded-full border border-transparent text-foreground/80 hover:text-primary hover:bg-primary/10 hover:border-primary/20 transition-all"
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
                rel="noopener noreferrer"
                aria-label={key}
                tabIndex={isMenuOpen ? 0 : -1}
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