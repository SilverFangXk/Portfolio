import { Mail, Phone, MapPin, Send, MessageSquare, User, AtSign } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";

export const ContactSection = () => {

  // Form submission handler logic
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    
    // Extracting user input data values
    const formData = new FormData(e.currentTarget);
    const name = formData.get("user_name");
    const email = formData.get("user_email");
    const message = formData.get("user_message");

    // Form validation check
    if (!name || !email || !message) return;

    // Generates an automated mailto client window fallback if backend hooks aren't set up yet
    const mailtoUri = `mailto:your.email@example.com?subject=Portfolio Message from ${encodeURIComponent(name)}&body=Sender Email: ${encodeURIComponent(email)}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
    
    window.location.href = mailtoUri;
  };

  return (
    <section id="contact" className="py-24 px-6 relative bg-background">
      
      {/* Background Soft Ambient Light Ring */}
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-5xl relative z-10">
        
        {/* Section Header Layout */}
        <div className="text-center mb-16 space-y-3">
          <div className="p-3 rounded-full bg-primary/10 text-primary inline-flex">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-foreground/70 max-w-md mx-auto text-sm md:text-base">
            Have an open role, an internship project opportunity, or just want to discuss data pipelines? Drop a message!
          </p>
        </div>

        {/* Two Column Split Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* ==================== LEFT COLUMN: PERSONAL METADATA DIRECTORIES ==================== */}
          <div className="md:col-span-5 flex flex-col justify-between gap-4 h-full">
            
            {/* Email Contact Plate */}
            <div className="gradient-border p-5 bg-card/40 border border-border/40 rounded-2xl flex items-center gap-4 text-left card-hover group w-full">
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <Mail size={20} />
              </div>
              <div className="space-y-0.5 overflow-hidden">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">Email Me</p>
                <a href="mailto:khadijachkhichkh1@gmail.com" className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors block truncate">
                  khadijachkhichkh1@gmail.com
                </a>
              </div>
            </div>

            {/* Phone Mobile Plate */}
            <div className="gradient-border p-5 bg-card/40 border border-border/40 rounded-2xl flex items-center gap-4 text-left card-hover group w-full">
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <Phone size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">Call Me</p>
                <a href="tel:+212634761182" className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors block">
                  +212634761182
                </a>
              </div>
            </div>
            <div className="gradient-border p-5 bg-card/40 border border-border/40 rounded-2xl flex items-center gap-4 text-left card-hover group w-full">
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <FaLinkedin size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">DM Me</p>
                <a href="https://linkedin.com/in/khadija-chkhichkh" className="text-sm md:text-base font-semibold text-foreground hover:text-primary transition-colors block">
                  Khadija Chkhichkh
                </a>
              </div>
            </div>

            {/* Location Geolocation Plate */}
            <div className="gradient-border p-5 bg-card/40 border border-border/40 rounded-2xl flex items-center gap-4 text-left card-hover group w-full grow justify-start">
              <div className="p-3.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shrink-0">
                <MapPin size={20} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold uppercase tracking-wider text-foreground/50">Location</p>
                <p className="text-sm md:text-base font-semibold text-foreground">
                  Khémisset, Morocco
                </p>
              </div>
            </div>

          </div>

          {/* ==================== RIGHT COLUMN: EMAIL INTERACTIVE CONSOLE FORM ==================== */}
          <form 
            onSubmit={handleMessageSubmit}
            className="md:col-span-7 gradient-border p-8 bg-card border border-border/40 rounded-2xl flex flex-col gap-5 text-left h-full shadow-xs"
          >
            {/* Input Element: Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-1.5">
                <User size={12} className="text-primary" /> Name
              </label>
              <input 
                type="text" 
                name="user_name"
                required
                placeholder="Your Name" 
                className="w-full bg-background border border-border/60 hover:border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>

            {/* Input Element: Email Address */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-1.5">
                <AtSign size={12} className="text-primary" /> Email Address
              </label>
              <input 
                type="email" 
                name="user_email"
                required
                placeholder="yourname@example.com" 
                className="w-full bg-background border border-border/60 hover:border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
              />
            </div>

            {/* Input Element: Large Textarea Body Message */}
            <div className="space-y-2 grow flex flex-col">
              <label className="text-xs font-bold uppercase tracking-wider text-foreground/70 flex items-center gap-1.5">
                <MessageSquare size={12} className="text-primary" /> Message
              </label>
              <textarea 
                name="user_message"
                required
                rows={4}
                placeholder="Hey Khadija, I reviewed your data pipeline portfolio models and would love to chat about an open internship track position on our engineering team..." 
                className="w-full bg-background border border-border/60 hover:border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-hidden focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none grow min-h-[120px]"
              />
            </div>

            {/* Interactive Action Submission Trigger Button */}
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl transition-all duration-300 shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 hover:scale-[1.01] cursor-pointer group shrink-0 select-none text-sm uppercase tracking-wider"
            >
              <span>Transmit Message</span>
              <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
};