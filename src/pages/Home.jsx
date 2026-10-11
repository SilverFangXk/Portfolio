import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import { Background } from "../components/Background";
import { Navbar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectSection";
import { CertificationsSection } from "../components/CertificationSection";
import { BehindTheDataSection } from "../components/BehindDataSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/FooterSection";
import { AdminShortcut } from "../components/AdminShortcut";
import { CurrentStatus } from "../components/CurrentStatus";
import ChatWidget from "../components/ChatWidget";

export const Home = () => {
    const [chatExpanded, setChatExpanded] = useState(false);

    return (
        <div
            className={`relative min-h-screen text-foreground overflow-x-hidden transition-[padding] duration-300 ${chatExpanded ? "lg:pr-[420px]" : ""}`}
        >
            <ThemeToggle />
            <AdminShortcut />
            <Background />
            <Navbar />
            <main className="relative z-10">
                <HeroSection />
                <ProjectsSection />
                <SkillsSection />
                <ExperienceSection />
                <EducationSection />
                <CertificationsSection />
                {/* <BehindTheDataSection /> */}
                <CurrentStatus /> {/* What's next */}
                <ContactSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
            <ChatWidget
                apiUrl="http://localhost:8000/api/chat"
                ownerName="Doja"
                onExpandedChange={setChatExpanded}
            />
        </div>
    );
};