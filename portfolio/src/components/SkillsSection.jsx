import React from "react";
import { IoStatsChart, IoLogoTableau } from "react-icons/io5";
import { FaJava, FaGitAlt, FaLinux, FaReact, FaAws, FaCss3Alt, FaHtml5, FaPhp } from "react-icons/fa";
import { FiServer } from "react-icons/fi";
import {
  SiApachespark,
  SiApachehadoop,
  SiApachekafka,
  SiPython,
  SiTensorflow,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiScikitlearn,
  SiMongodb,
  SiNodedotjs
} from "react-icons/si";

import {
  Database,
  Brain,
  Cloud,
  Globe,
  BarChart3,
  Terminal,
  Network
} from "lucide-react";
import { IoLogoJavascript } from "react-icons/io";

export const SkillsSection = () => {
  // 1. Core data structure containing your fields, icons, and individual skills.
  // Each field now carries a `color` key ("primary" | "secondary" | "accent" | "purple" | "rose")
  // instead of a hardcoded Tailwind color, so the whole tree follows the site palette.
  // Individual skill icons keep their real brand colors (Java orange, Docker blue, etc.) —
  // those are recognizable logos, not decorative accents, so they're left as-is.
  const skillTreeData = [
    {
      field: "DATA ENGINEERING",
      color: "primary",
      icon: <Database className="h-5 w-5" />,
      skills: [
        { name: "Java", icon: <FaJava className="text-orange-400" /> },
        { name: "Apache Spark", icon: <SiApachespark className="text-orange-500" /> },
        { name: "Hadoop", icon: <SiApachehadoop className="text-yellow-500" /> },
        { name: "Kafka", icon: <SiApachekafka className="text-purple-400" /> },
        { name: "ETL Pipelines", icon: <Terminal className="text-emerald-400" /> }
      ]
    },
    {
      field: "ARTIFICIAL INTELLIGENCE",
      color: "accent",
      icon: <Brain className="h-5 w-5" />,
      skills: [
        { name: "Python", icon: <SiPython className="text-yellow-400" /> },
        { name: "NumPy / Pandas", icon: <IoStatsChart className="text-blue-400" /> },
        { name: "Matplotlib / Seaborn", icon: <IoStatsChart className="text-purple-400" /> },
        { name: "Scikit-learn", icon: <SiScikitlearn className="text-green-400" /> },
        { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },
        { name: "Deep Learning", icon: <Network className="text-pink-400" /> },
        { name: "Machine Learning Models", icon: <Brain className="text-emerald-400" /> }
      ]
    },
    {
      field: "CLOUD & DEVOPS",
      color: "purple",
      icon: <Cloud className="h-5 w-5" />,
      skills: [
        { name: "AWS", icon: <FaAws className="text-orange-400" /> },
        { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
        { name: "Git", icon: <FaGitAlt className="text-red-400" /> },
        { name: "Linux", icon: <FaLinux className="text-gray-400" /> }
      ]
    },
    {
      field: "DATABASES",
      color: "secondary",
      icon: <Database className="h-5 w-5" />,
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
        { name: "MySQL", icon: <SiMysql className="text-yellow-400" /> },
        { name: "SQL Server", icon: <Database className="text-red-400" /> },
        { name: "Oracle", icon: <Database className="text-red-600" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> }
      ]
    },
    {
      field: "BUSINESS INTELLIGENCE",
      color: "rose",
      icon: <BarChart3 className="h-5 w-5" />,
      skills: [
        { name: "Power BI", icon: <IoStatsChart className="text-yellow-500" /> },
        { name: "Tableau", icon: <IoLogoTableau className="text-indigo-400" /> }
      ]
    },
    {
      field: "WEB DEVELOPMENT",
      color: "primary",
      icon: <Globe className="h-5 w-5" />,
      skills: [
        { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
        { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
        { name: "Flask", icon: <FiServer className="text-gray-300" /> },
        { name: "HTML", icon: <FaHtml5 className="text-orange-400" /> },
        { name: "CSS", icon: <FaCss3Alt className="text-blue-300" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
        { name: "PHP", icon: <FaPhp className="text-purple-400" /> }
      ]
    }
  ];

  // Maps each color key to the Tailwind classes the branch card + icon badge need.
  // Written explicitly (not string-interpolated) so Tailwind's compiler picks up every class.
  const colorStyles = {
    primary: { icon: "text-primary", ring: "border-primary/50 shadow-primary/10", iconBg: "bg-primary/10", hover: "hover:bg-primary/5 hover:border-primary/40" },
    secondary: { icon: "text-secondary", ring: "border-secondary/50 shadow-secondary/10", iconBg: "bg-secondary/10", hover: "hover:bg-secondary/5 hover:border-secondary/40" },
    accent: { icon: "text-accent", ring: "border-accent/50 shadow-accent/10", iconBg: "bg-accent/10", hover: "hover:bg-accent/5 hover:border-accent/40" },
    purple: { icon: "text-purple", ring: "border-purple/50 shadow-purple/10", iconBg: "bg-purple/10", hover: "hover:bg-purple/5 hover:border-purple/40" },
    rose: { icon: "text-rose", ring: "border-rose/50 shadow-rose/10", iconBg: "bg-rose/10", hover: "hover:bg-rose/5 hover:border-rose/40" }
  };

  // Actual hex values matching the current palette's HSL tokens, used only for the SVG
  // gradient stops below (SVG stop-color doesn't reliably resolve CSS custom properties
  // across all renderers, so this stays as a literal gradient tied to the same hues).
  const svgGradientStops = [
    { offset: "0%", color: "hsl(19, 100%, 62%)" },   // primary
    { offset: "35%", color: "hsl(33, 86%, 63%)" },    // accent
    { offset: "70%", color: "hsl(265, 40%, 55%)" },   // purple
    { offset: "100%", color: "hsl(335, 55%, 55%)" }   // rose
  ];

  return (
    <section id="skills" className="py-24 px-4 relative overflow-hidden w-full min-h-screen flex items-center justify-center">

      {/* Background ambient glow, now pulling from primary/accent instead of hardcoded blue */}
      <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">

        {/* ==================== SECTION HEADER — matches Hero / About / Experience / Education ==================== */}
        <div className="flex flex-col items-center text-center mb-20 md:mb-28">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 font-mono text-[11px] text-foreground/80">
            <span className="h-1.5 w-1.5 animate-pulse-subtle rounded-full bg-primary" />
            MySkills.renderer()
          </div>

          <h2 className="mt-6 text-3xl md:text-4xl font-black tracking-tight text-foreground">
            My{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Skills
            </span>
          </h2>
        </div>

        {/* ==================== LEVEL 2 & 3: BRANCHES AND LEAVES ==================== */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          {skillTreeData.map((branch, bIdx) => {
            const c = colorStyles[branch.color];
            return (
              <div key={bIdx} className="flex flex-col items-center space-y-6 w-full">

                {/* FIELD TITLE — border/shadow now driven by branch.color instead of the
                    undefined branch.glowColor that was silently doing nothing before */}
                <div className={`relative px-5 py-3 bg-card border rounded-xl shadow-lg ${c.ring} transition-transform duration-300 hover:scale-105 w-full max-w-[240px] text-center z-20`}>
                  <div className="flex items-center justify-center gap-3">
                    <div className={`shrink-0 p-1.5 rounded-lg ${c.iconBg} ${c.icon}`}>
                      {branch.icon}
                    </div>
                    <h3 className="font-bold text-xs tracking-wide text-foreground">
                      {branch.field}
                    </h3>
                  </div>
                </div>

                {/* SKILLS */}
                <div className="flex flex-col gap-3 w-full max-w-[240px]">
                  {branch.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      className={`group flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-xs border border-border/40 rounded-xl shadow-xs transition-all duration-300 ${c.hover} hover:-translate-y-0.5`}
                    >
                      <div className="p-2 rounded-lg bg-background border border-border/50">
                        {skill.icon}
                      </div>
                      <span className="text-sm text-foreground/85">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};