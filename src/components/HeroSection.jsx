import { useEffect, useState } from "react";
import { Download, ArrowUpRight } from "lucide-react";
import myResume from "../assets/cv_khadija_chkhichkh.pdf"; 
import myProfileImg from "../assets/profile.jpeg"; 

export const HeroSection = () => {
  const headlineText = "Hi, I'm Khadija";
  const paragraphText = "Data Engineering student passionate about building scalable data solutions and turning raw data into meaningful insights.Interested in Data Engineering, Business Intelligence, Data Analytics, and Web Development. ";

  const [displayedHeadline, setDisplayedHeadline] = useState("");
  const [displayedParagraph, setDisplayedParagraph] = useState("");
  const [isTypingDone, setIsTypingDone] = useState(false);

  useEffect(() => {
    let currentIdx = 0;
    const fullText = headlineText + " " + paragraphText;
    let timeoutId;

    const typeCharacter = () => {
      if (currentIdx < fullText.length) {
        currentIdx++;
        
        if (currentIdx <= headlineText.length) {
          setDisplayedHeadline(fullText.slice(0, currentIdx));
        } else {
          setDisplayedHeadline(headlineText);
          setDisplayedParagraph(fullText.slice(headlineText.length + 1, currentIdx));
        }

        let nextSpeed = 30; 
        const lastChar = fullText[currentIdx - 1];
        
        if (lastChar === "." || lastChar === ",") {
          nextSpeed = 500; 
        } else if (lastChar === " ") {
          nextSpeed = 80;  
        } else {
          nextSpeed = 25 + Math.random() * 15; 
        }

        timeoutId = setTimeout(typeCharacter, nextSpeed);
      } else {
        setIsTypingDone(true);
      }
    };

    typeCharacter();
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12 z-10 w-full">
        
        {/* LEFT COLUMN: Text content & Action items */}
        <div className="flex-1 text-center md:text-left space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground min-h-[50px] md:min-h-[70px]">
            {displayedHeadline}
            {displayedHeadline.length < headlineText.length && (
              <span className="inline-block w-[3px] h-[32px] md:h-[50px] bg-primary ml-1 animate-pulse" />
            )}
          </h1>

          <p className="text-lg md:text-xl text-foreground/80 leading-relaxed min-h-[84px] md:min-h-[60px]">
            {displayedParagraph}
            {displayedHeadline.length === headlineText.length && !isTypingDone && (
              <span className="inline-block w-[2px] h-[20px] bg-primary ml-1 animate-pulse" />
            )}
          </p>

          <div 
            className={`transition-all duration-700 delay-200 transform flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 ${
              isTypingDone 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-4 scale-95 pointer-events-none"
            }`}
          >
            {/* View Projects Button */}
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-foreground bg-background hover:bg-muted border border-border hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center shadow-sm"
            >
              <span>View My Projects</span>
              <ArrowUpRight size={16} />
            </a>

            {/* Download CV Button */}
            <a
              href={myResume}
              download="cv_khadija_chkhichkh.pdf"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm text-primary-foreground bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/30 hover:scale-105 active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <Download size={16} />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Circular Profile Pic with Soft Pastel Indigo Halo */}
        <div className="flex-1 flex justify-center items-center">
          <div 
            className={`transition-all duration-1000 transform ease-out ${
              isTypingDone 
                ? "opacity-100 translate-y-0 scale-100" 
                : "opacity-0 translate-y-8 scale-90 pointer-events-none"
            }`}
          >
            <div className="relative group w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]">
              
              {/* 1. LIGHT PASTEEL BLUEISH-PURPLE HALO EFFECT */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400/30 via-indigo-400/20 to-purple-400/30 blur-3xl group-hover:scale-110 transition-transform duration-700 ease-out" />
              
              {/* 2. ROUNDED IMAGE BORDER CONTAINER */}
              <div className="relative w-full h-full overflow-hidden rounded-full border border-border/40 bg-card p-2 shadow-xl shadow-foreground/5 backdrop-blur-xs transition-transform duration-500 group-hover:scale-[1.01]">
                <img 
                  src={myProfileImg} 
                  alt="Khadija Chkhichkh Portrait" 
                  className="w-full h-full object-cover rounded-full aspect-square"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};