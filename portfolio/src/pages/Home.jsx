import { ThemeToggle } from "../components/ThemeToggle";
import { Background } from "../components/Background";
import { Navbar } from "../components/NavBar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { EducationSection } from "../components/EducationSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectSection";
import { CertificationsSection } from "../components/CertificationSection";
import { BehindTheDataSection } from "../components/BehindDataSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/FooterSection";

export const Home = () => {
    return (
        <div className="relative min-h-screen text-foreground overflow-x-hidden">
            <ThemeToggle />
            <Background />
            <Navbar />
            <main className="relative z-10">
                <HeroSection />
                <AboutSection />
                <ExperienceSection />
                <EducationSection />
                <SkillsSection />
                <ProjectsSection />
                <CertificationsSection />
                <BehindTheDataSection />
                <ContactSection />
            </main>
            <div className="relative z-10">
                <Footer />
            </div>
        </div>
    );
}