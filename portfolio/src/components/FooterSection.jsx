import {
  Phone,
  Mail,
  Heart,
  ArrowUpRight,
  Layers,
  Code2,
  Database,
} from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const contacts = [
    {
      name: "GitHub",
      icon: <FaGithub size={16} />,
      url: "https://github.com/yourusername",
      color: "hover:text-foreground",
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedin size={16} />,
      url: "https://linkedin.com/in/khadija-chkhichkh",
      color: "hover:text-[#0077B5]",
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={16} />,
      url: "https://wa.me/212634761182",
      color: "hover:text-[#25D366]",
    },
    {
      name: "Email",
      icon: <Mail size={16} />,
      url: "mailto:khadijachkhichkh1@gmail.com",
      color: "hover:text-primary",
    },
    {
      name: "Phone",
      icon: <Phone size={16} />,
      url: "tel:+212634761182",
      color: "hover:text-emerald-400",
    },
  ];

  const interestFields = [
    {
      name: "Data Architecture",
      icon: <Database size={14} />,
    },
    {
      name: "ETL / ELT Pipelines",
      icon: <Layers size={14} />,
    },
    {
      name: "Full-Stack Web Apps",
      icon: <Code2 size={14} />,
    },
  ];

  return (
    <footer className="relative w-full bg-card/50 border-t border-border/40 backdrop-blur-md pt-16 pb-8 px-6">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-6xl space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-left">
          
          {/* Focus Areas */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/60">
              Focus Areas
            </h4>

            <div className="flex flex-col gap-3">
              {interestFields.map((field, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm text-foreground/80"
                >
                  <span className="text-primary">{field.icon}</span>
                  <span>{field.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/60">
              Current Status
            </h4>

            <div className="p-4 rounded-xl bg-card border border-border/60 shadow-sm space-y-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative rounded-full h-2 w-2 bg-emerald-500" />
                </span>

                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  Actively Available
                </span>
              </div>

              <p className="text-xs text-foreground/70">
                Open for Data Engineering roles and remote contract projects.
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/60">
              Contact
            </h4>

            <div className="grid grid-cols-2 gap-3">
  {contacts.map((item, idx) => (
    <a
      key={idx}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-between px-4 py-3 rounded-xl border border-border/50 bg-card/50 text-xs font-medium text-foreground/70 transition-all hover:bg-secondary/20 ${item.color}`}
    >
      <div className="flex items-center gap-2">
        {item.icon}
        <span>{item.name}</span>
      </div>

      <ArrowUpRight size={14} className="opacity-50" />
    </a>
  ))}
</div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between text-[11px] text-foreground/40 gap-4">
          <p>© {currentYear} Khadija Chkhichkh. All Rights Reserved.</p>

          <p className="flex items-center gap-1">
            Engineered with{" "}
            <Heart
              size={12}
              className="text-primary fill-primary/30"
            />{" "}
            using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
};