import React from "react";
import { IoStatsChart, IoLogoTableau } from "react-icons/io5";
import { FaJava, FaGitAlt, FaLinux, FaReact, FaAws, FaCss3Alt, FaHtml5, FaPhp } from "react-icons/fa";
import { FiServer } from "react-icons/fi";
import {
  SiApachespark,
  SiApachehadoop,
  SiApachekafka,
  SiPython,
  SiR,
  SiTensorflow,
  SiDocker,
  SiPostgresql,
  SiMysql,
  SiScikitlearn,
  SiMongodb
} from "react-icons/si";

import {
  Database,
  Brain,
  Cloud,
  Globe,
  BarChart3,
  Server,
  Terminal
} from "lucide-react";
import { IoLogoJavascript } from "react-icons/io";
export const SkillsSection = () => {
  // 1. Core Data structure containing your fields, icons, and individual skills
  const skillTreeData = [
    {
      field: "DATA ENGINEERING",
      icon: <Database className="h-5 w-5 text-sky-400" />,
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
      icon: <Brain className="h-5 w-5 text-emerald-400" />,
      skills: [
        { name: "Python", icon: <SiPython className="text-yellow-400" /> },

        // Python Data Stack (grouped cleanly)
        { name: "NumPy / Pandas", icon: <IoStatsChart className="text-blue-400" /> },
        { name: "Matplotlib / Seaborn", icon: <IoStatsChart className="text-purple-400" /> },

        // ML & AI
        { name: "Scikit-learn", icon: <SiScikitlearn className="text-green-400" /> },
        { name: "TensorFlow", icon: <SiTensorflow className="text-orange-400" /> },

        // Concept-level skill (important for recruiters)
        { name: "Machine Learning Models", icon: <Brain className="text-emerald-400" /> }
      ]
    },

    {
      field: "CLOUD & DEVOPS",
      icon: <Cloud className="h-5 w-5 text-indigo-400" />,
      skills: [
        { name: "AWS", icon: <FaAws className="text-orange-400" /> },
        { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
        { name: "Git", icon: <FaGitAlt className="text-red-400" /> },
        { name: "Linux", icon: <FaLinux className="text-gray-400" /> }
      ]
    },
    {
      field: "DATABASES",
      icon: <Database className="h-5 w-5 text-amber-400" />,
      skills: [
        { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
        { name: "MySQL", icon: <SiMysql className="text-yellow-400" /> },
        { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> }
      ]
    },

    {
      field: "BUSINESS INTELLIGENCE",
      icon: <BarChart3 className="h-5 w-5 text-purple-400" />,
      skills: [
        { name: "Power BI", icon: <IoStatsChart className="text-yellow-500" /> },
        { name: "Tableau", icon: <IoLogoTableau className="text-indigo-400" /> }
      ]
    }, {
      field: "WEB DEVELOPMENT",
      icon: <Globe className="h-5 w-5 text-blue-400" />,
      skills: [
        { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
        { name: "Flask", icon: <FiServer className="text-gray-300" /> },
        { name: "HTML", icon: <FaHtml5 className="text-orange-400" /> },
        { name: "CSS", icon: <FaCss3Alt className="text-blue-300" /> },
        { name: "JavaScript", icon: <IoLogoJavascript className="text-yellow-400" /> },
        { name: "PHP", icon: <FaPhp className="text-purple-400" /> }
      ]
    }
  ];;
  return (
    <section id="skills" className="py-24 px-4 relative bg-background overflow-hidden w-full min-h-screen flex items-center justify-center">

      {/* Background Soft Blue/Purple Ambient Glow */}
      <div className="absolute inset-0 bg-radial from-blue-500/5 via-transparent to-transparent pointer-events-none blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10 flex flex-col items-center">

        {/* ==================== LEVEL 1: ROOT NODE ==================== */}
        <div className="relative mb-20 md:mb-28 group">
          <div className="absolute inset-0 rounded-xl bg-linear-to-r from-blue-500 to-indigo-500 opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500" />
          <div className="relative px-8 py-4 bg-card/60 backdrop-blur-md border border-primary/50 rounded-xl shadow-xl shadow-primary/10 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-widest text-foreground uppercase">
              My <span className="text-primary">Skills</span>
            </h2>
          </div>
        </div>

        {/* These draw glowing paths behind the elements linking them like a digital tree blueprint */}
        {/* ==================== SVG CONNECTOR (UPDATED FOR 5 NODES) ==================== */}
       <div className="absolute top-[-90px] left-0 w-full h-[270px] hidden md:block pointer-events-none z-30">
  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.7)" />
        <stop offset="50%" stopColor="rgba(99, 102, 241, 0.7)" />
        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.7)" />
      </linearGradient>
    </defs>

    {/* 6 branches — une par colonne */}
    <path d="M 576 160 L 80  280" stroke="url(#glowGrad)" strokeWidth="2.2" fill="none"/>
    <path d="M 576 160 L 260 290" stroke="url(#glowGrad)" strokeWidth="2.2" fill="none"/>
    <path d="M 576 160 L 480 290" stroke="url(#glowGrad)" strokeWidth="2.2" fill="none"/>
    <path d="M 576 160 L 690 290" stroke="url(#glowGrad)" strokeWidth="2.2" fill="none"/>
    <path d="M 576 160 L 920 290" stroke="url(#glowGrad)" strokeWidth="2.2" fill="none"/>
    <path d="M 576 160 L 1160 290" stroke="url(#glowGrad)" strokeWidth="2.2" fill="none"/>
  </svg>
</div>

        {/* ==================== LEVEL 2 & 3: BRANCHES AND LEAVES ==================== */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          {skillTreeData.map((branch, bIdx) => (
            <div key={bIdx} className="flex flex-col items-center space-y-6 w-full">

              {/* FIELD TITLE */}
              <div className={`relative px-5 py-3 bg-card border border-border/60 rounded-xl shadow-lg ${branch.glowColor} transition-transform duration-300 hover:scale-105 w-full max-w-[240px] text-center z-20`}>
                <div className="flex items-center justify-center gap-3">
                  <div className="shrink-0 p-1.5 rounded-lg bg-foreground/5">
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
                    className="group flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-xs border border-border/40 rounded-xl shadow-xs transition-all duration-300 hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5"
                  >
                    <div className="p-2 rounded-lg bg-background border border-border/50 group-hover:border-primary/30">
                      {skill.icon}
                    </div>
                    <span className="text-sm text-foreground/85">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
