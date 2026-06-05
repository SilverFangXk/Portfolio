import { ThemeToggle } from "../components/ThemeToggle";
import { Background } from "../components/Background";
import { Navbar } from "../components/NavBar";
import {HeroSection} from "../components/HeroSection"
import { AboutSection } from "../components/AboutSection";
import { EducationSection } from "../components/EducationSection";
import { SkillsSection } from "../components/SkillsSection";
import {CertificationsSection} from "../components/CertificationSection";
import { Footer } from "../components/FooterSection";
import { ContactSection} from "../components/ContactSection";
import { ProjectsSection } from "../components/ProjectSection";
export const Home = () => {
    return(
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <ThemeToggle />
            <Background />
            <Navbar />
            <main>
                <HeroSection />
                <AboutSection />
                <EducationSection />
                <SkillsSection />
                <CertificationsSection />
                <ProjectsSection />
                <ContactSection />
            </main>
            <Footer />
        </div>
    );
}