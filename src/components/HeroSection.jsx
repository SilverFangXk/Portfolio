
import { useEffect, useMemo, useState } from "react";
import {
  Download,
  ArrowRight,
  FolderKanban,
  Award,
  Layers,
} from "lucide-react";

import myResume from "../assets/cv_khadija_chkhichkh.pdf";
import myProfileImg from "../assets/profile.jpeg";

import { useSiteSettings } from "../lib/useSiteSettings";
import { listProjects } from "../lib/projectsDb";
import { listItems } from "../lib/contentDb";

import {
  HeroPhoto,
  HeroBackdrop,
  Reveal,
  ShimmerText,
  SparkleText,
  StatCards,
} from "./HeroEffects";

// Default content
const DEFAULT_TITLE = "Data & AI Engineer";

const DEFAULT_HERO_TEXT =
  "Final-year Data Science & AI Engineering student building data pipelines and intelligent solutions. Seeking a 6-month PFE internship in Data or AI Engineering from February 2027.";

export const HeroSection = () => {
  const settings = useSiteSettings();

  // Dynamic statistics
  const [counts, setCounts] = useState({
    projects: 0,
    certifications: 0,
    skills: 0,
  });

  useEffect(() => {
    let mounted = true;
    let requestId = 0;

    const refreshCounts = async () => {
      const currentRequest = ++requestId;

      try {
        const [
          projects,
          certifications,
          skills,
        ] = await Promise.all([
          listProjects(),
          listItems("certifications"),
          listItems("skills"),
        ]);

        if (!mounted || currentRequest !== requestId) {
          return;
        }

        const countVisible = (items) =>
          (Array.isArray(items) ? items : []).filter(
            (item) => item.visible !== false
          ).length;

        setCounts({
          projects: countVisible(projects),
          certifications: countVisible(certifications),
          skills: countVisible(skills),
        });
      } catch (error) {
        console.error(
          "Could not load portfolio statistics:",
          error
        );
      }
    };

    // Refresh when returning from admin or another tab
    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshCounts();
      }
    };

    refreshCounts();

    window.addEventListener("focus", refreshCounts);
    window.addEventListener("pageshow", refreshCounts);
    window.addEventListener(
      "portfolio-content-updated",
      refreshCounts
    );

    document.addEventListener(
      "visibilitychange",
      onVisibilityChange
    );

    return () => {
      mounted = false;

      window.removeEventListener("focus", refreshCounts);
      window.removeEventListener("pageshow", refreshCounts);
      window.removeEventListener(
        "portfolio-content-updated",
        refreshCounts
      );

      document.removeEventListener(
        "visibilitychange",
        onVisibilityChange
      );
    };
  }, []);

  const stats = useMemo(
    () => [
      {
        value: counts.projects,
        label: "Projects",
        icon: FolderKanban,
      },
      {
        value: counts.certifications,
        label: "Certifications",
        icon: Award,
      },
      {
        value: counts.skills,
        label: "Skills",
        icon: Layers,
      },
    ],
    [counts]
  );

  // Editable admin settings
  const resumeHref = settings.cvUrl || myResume;
  const showBadge = settings.badgeShow !== false;
  const badgeText = settings.badgeText || "open_to_work";

  const heroImage = settings.heroImage || myProfileImg;
  const heroName =
    settings.heroName || "Khadija Chkhichkh";
  const heroSubtitle =
    settings.heroSubtitle ||
    "Data Engineering / AI · ENSA Fès";

  // Hero title animation
  const titleWords = (
    settings.heroTitle || DEFAULT_TITLE
  )
    .trim()
    .split(/\s+/);

  const titleLast = titleWords.pop();
  const titleFirst = titleWords.join(" ");

  const fade = `transition-opacity duration-500 ${
    settings.loaded ? "opacity-100" : "opacity-0"
  }`;

  return (
    <section
      id="about"
      className="relative min-h-screen px-6 py-24 md:px-12 lg:px-20 flex flex-col justify-center items-center overflow-hidden"
    >
      <HeroBackdrop />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 text-center lg:text-left">
        {/* Text column */}
        <div className="max-w-3xl flex flex-col items-center lg:items-start">
          <Reveal
            delay={0.1}
            className="flex flex-wrap items-center justify-center gap-2 lg:justify-start"
          >
            <div className="inline-flex w-fit items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-foreground/80">
              Hey, I'm&nbsp;
              <ShimmerText>Khadija</ShimmerText>
            </div>

            {showBadge && (
              <div
                className={`inline-flex w-fit items-center gap-2.5 rounded-full border border-primary/50 bg-primary/15 px-5 py-2 font-mono text-sm font-bold text-primary shadow-[0_0_24px_-4px_var(--color-primary)] ${fade}`}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
                </span>
                {badgeText}
              </div>
            )}
          </Reveal>

          <Reveal delay={0.25}>
            <h1
              className={`mt-6 text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight text-foreground ${fade}`}
            >
              {titleFirst && `${titleFirst} `}

              <SparkleText>
                <ShimmerText>{titleLast}</ShimmerText>
              </SparkleText>
            </h1>
          </Reveal>

          <Reveal delay={0.4}>
            <p
              className={`mt-6 whitespace-pre-line text-foreground/70 leading-relaxed ${fade}`}
            >
              {settings.heroText || DEFAULT_HERO_TEXT}
            </p>
          </Reveal>

          <Reveal
            delay={0.55}
            className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <a
              href={resumeHref}
              {...(settings.cvUrl
                ? {
                    target: "_blank",
                    rel: "noreferrer",
                  }
                : {
                    download:
                      "resume_khadija_chkhichkh.pdf",
                  })}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium tracking-wide text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:brightness-110"
            >
              Download Resume
              <Download
                size={15}
                className="transition-transform duration-300 group-hover:translate-y-0.5"
              />
            </a>

            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3 text-sm font-medium tracking-wide text-foreground/80 transition-all duration-300 hover:border-foreground/50 hover:text-foreground"
            >
              View projects
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </Reveal>
        </div>

        {/* Hero photo */}
        <Reveal
          delay={0.3}
          className="relative w-full max-w-sm mx-auto"
        >
          <div className={`pt-20 pb-4 ${fade}`}>
            <HeroPhoto
              src={heroImage}
              alt={heroName}
              size={350}
              pandaScale={0.52}
            />
          </div>

          <div className="text-center">
            <div className="font-bold text-foreground">
              {heroName}
            </div>
            <div className="text-sm text-foreground/60">
              {heroSubtitle}
            </div>
          </div>

          {/* Automatic statistics */}
          <StatCards
            className="mt-5"
            stats={stats}
          />
        </Reveal>
      </div>
    </section>
  );
};
