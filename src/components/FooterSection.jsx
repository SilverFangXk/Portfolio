import { 
  Send, Phone, Mail, 
  MessageCircle, Heart, ArrowUpRight, 
  Layers, Code2, Database 
} from "lucide-react";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // 1. Socials & Contact Methods Array
  const contacts = [
    { name: "LinkedIn", icon: <FaLinkedin size={16} />, url: "https://linkedin.com/in/khadija-chkhichkh", color: "hover:text-[#0077B5]" },
    { name: "Telegram", icon: <Send size={16} />, url: "https://t.me/silverFangKD", color: "hover:text-[#0088cc]" },
    { name: "WhatsApp", icon: <FaWhatsapp size={16} />, url: "https://wa.me/212634761182", color: "hover:text-[#25D366]" },
    { name: "Email", icon: <Mail size={16} />, url: "mailto:khadijachkhichkh1@gmail.com", color: "hover:text-primary" },
    { name: "Phone", icon: <Phone size={16} />, url: "tel:+212634761182", color: "hover:text-emerald-400" },
  ];

  // 2. Core Technical Domain Focus Fields
  const interestFields = [
    { name: "Data Architecture", icon: <Database size={13} /> },
    { name: "ETL / ELT Pipelines", icon: <Layers size={13} /> },
    { name: "Full-Stack Web Apps", icon: <Code2 size={13} /> },
  ];

  return (
    <footer className="w-full bg-card/30 border-t border-border/40 backdrop-blur-md pt-16 pb-8 px-6 relative overflow-hidden">
      
      {/* Visual Separation Accent Gradient Top Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-linear-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto max-w-6xl space-y-12">
        
        {/* UPPER GRID PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-left">
          
          {/* Column 1: Core Narrative & Collaboration Openness */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tight text-foreground">
              Let's Build Something <span className="text-primary">Together</span>
            </h3>
            <p className="text-sm text-foreground/75 leading-relaxed">
              I am always excited to connect with other engineering minds, contribute to open-source systems, or jump onto challenging new building sprints. If you have an innovative pipeline puzzle or application idea, let's talk!
            </p>
          </div>

          {/* Column 2: Core Focus Areas (Interest Fields) */}
          <div className="space-y-4 md:pl-6">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
              Fields of Interest
            </h4>
            <div className="flex flex-col gap-2.5">
              {interestFields.map((field, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2.5 text-sm text-foreground/80 hover:text-primary transition-colors cursor-default"
                >
                  <div className="text-primary opacity-80">{field.icon}</div>
                  <span>{field.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Live Professional Status Pulse Plate */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-foreground/90">
              Current Status
            </h4>
            <div className="p-4 rounded-xl bg-background/50 border border-border/60 space-y-3 shadow-xs">
              
              {/* Dynamic Pulse Ingest Node */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                </span>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                  Actively Available
                </span>
              </div>

              <p className="text-xs text-foreground/80 leading-relaxed">
                Currently open and seeking full-time **Data Engineer** opportunities, professional **Internships**, or freelance remote contract roles.
              </p>
            </div>
          </div>

        </div>

        {/* MID STRIP: Core Communication Directories */}
        <div className="pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          {/* Quick Connect Channels */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {contacts.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-foreground/80 transition-all duration-200 bg-background/40 border border-border/40 cursor-pointer select-none group ${item.color}`}
              >
                {item.icon}
                <span>{item.name}</span>
                <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity translate-y-0.5 -translate-x-0.5 group-hover:translate-x-0 group-hover:translate-y-0" />
              </a>
            ))}
          </div>


        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="pt-6 border-t border-border/10 flex flex-col sm:flex-row items-center justify-between text-xs text-foreground/50 gap-4">
          <p>© {currentYear} All Rights Reserved.</p>
          <p className="inline-flex items-center gap-1">
            Engineered with <Heart size={11} className="text-primary fill-primary/30" /> using React & Tailwind
          </p>
        </div>

      </div>
    </footer>
  );
};