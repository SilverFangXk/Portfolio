import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
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
      {/* Changed to flex and justify-between for immaculate distribution */}
      <div className="w-100%  mx-auto flex  justify-between px-6">

        {/* 1. DESKTOP MENU (LEFT SIDE) */}
        {/* LEFT MENU */}
        <       div className="hidden md:flex flex-1 items-center gap-3">
          {navItems.map((item, key) => (
            <a
              key={key}
              href={item.href}
              className="group relative px-4 py-2 rounded-md text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
            >
              {item.name}
              {/* Animated bottom indicator line */}
              <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </a>
          ))}
        </div>

        {/* 2. NAME (CENTER PIECE) */}
        <div className="flex flex-1 justify-center">
          <a
            href="#hero"
            className="text-xl font-bold text-primary flex items-center tracking-tight select-none"
          >
            <span className="relative z-10">
              <span className="text-glow font-carter text-4xl">Khadija Chkhichkh</span>
            </span>
          </a>
        </div>


        {/* 3. SOCIALS (RIGHT SIDE) */}
        <div className="hidden md:flex flex-1 items-center justify-end gap-4">
          <a href="https://wa.me/212634761182" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-emerald-500 transition-colors p-2 hover:bg-emerald-500/10 rounded-full">
            <FaWhatsapp size={24} />
          </a>
          <a href="https://github.com/SilverFangXk" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
            <FaGithub size={19} />
          </a>
          <a href="https://linkedin.com/in/khadija-chkhichkh" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
            <FaLinkedin size={24} />
          </a>

        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 text-foreground z-50 rounded-md hover:bg-primary/10 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          {/* Mobile Links */}
          <div className="flex flex-col space-y-4 text-center w-full max-w-xs">
            {navItems.map((item, key) => (
              <a
                key={key}
                href={item.href}
                className="block text-2xl font-semibold px-6 py-3 rounded-xl text-foreground/80 hover:text-primary hover:bg-primary/10 transition-all"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
          </div>

          <hr className="w-1/3 border-border" />

          {/* Mobile Socials */}
          <div className="flex space-x-6">
            <a href="https://wa.me/212634761182" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-emerald-500 transition-colors p-2 hover:bg-emerald-500/10 rounded-full">
              <FaWhatsapp size={24} />
            </a>
            <a href="https://github.com/SilverFangXk" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
              <FaGithub size={19} />
            </a>
            <a href="https://linkedin.com/in/khadija-chkhichkh" target="_blank" rel="noreferrer" className="text-foreground/70 hover:text-primary transition-colors p-2 hover:bg-primary/10 rounded-full">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

      </div>
    </nav>
  );
};