import React from "react";
import { 
  Database, Code2, Cloud, Terminal, 
  Cpu, Layers, GitBranch, HardDrive, 
  Braces, Server, Network, ShieldCheck, 
  Activity, Globe, Infinity, FolderGit
} from "lucide-react";

export const SkillsSection = () => {
  // 1. Core Data structure containing your fields, icons, and individual skills
  const skillTreeData = [
    {
      field: "BIG DATA & ENGINEERING",
      icon: <Database className="h-5 w-5 text-sky-400" />,
      glowColor: "shadow-sky-500/20",
      skills: [
        { name: "Apache Spark", icon: <Cpu className="h-4 w-4 text-orange-400" /> },
        { name: "Hadoop", icon: <Layers className="h-4 w-4 text-yellow-500" /> },
        { name: "Airflow", icon: <GitBranch className="h-4 w-4 text-teal-400" /> },
        { name: "ETL Pipelines", icon: <Terminal className="h-4 w-4 text-emerald-400" /> },
        { name: "SQL Data bases", icon: <HardDrive className="h-4 w-4 text-indigo-400" /> },
        { name: "NoSQL Architectures", icon: <Network className="h-4 w-4 text-purple-400" /> },
        { name: "Data Warehousing", icon: <Database className="h-4 w-4 text-blue-400" /> }
      ]
    },
    {
      field: "WEB DEVELOPMENT",
      icon: <Code2 className="h-5 w-5 text-blue-400" />,
      glowColor: "shadow-blue-500/20",
      skills: [
        { name: "React.js Stack", icon: <Code2 className="h-4 w-4 text-sky-400" /> },
        { name: "Tailwind CSS", icon: <Layers className="h-4 w-4 text-cyan-400" /> },
        { name: "Node.js Services", icon: <Server className="h-4 w-4 text-green-500" /> },
        { name: "REST APIs", icon: <Terminal className="h-4 w-4 text-orange-400" /> },
        { name: "Zustand State", icon: <Activity className="h-4 w-4 text-amber-400" /> },
        { name: "JWT / OAuth", icon: <ShieldCheck className="h-4 w-4 text-purple-400" /> },
        { name: "Next.js Engine", icon: <Globe className="h-4 w-4 text-foreground" /> }
      ]
    },
    {
      field: "CLOUD & DEVOPS",
      icon: <Cloud className="h-5 w-5 text-indigo-400" />,
      glowColor: "shadow-indigo-500/20",
      skills: [
        { name: "AWS (S3/EC2/EMR)", icon: <Cloud className="h-4 w-4 text-orange-500" /> },
        { name: "Docker Containers", icon: <Layers className="h-4 w-4 text-blue-400" /> },
        { name: "Git Workflow", icon: <FolderGit className="h-4 w-4 text-neutral-300" /> },
        { name: "GitHub Spaces", icon: <GitBranch className="h-4 w-4 text-foreground" /> },
        { name: "Linux Kernels", icon: <Terminal className="h-4 w-4 text-stone-400" /> },
        { name: "CI/CD Automations", icon: <Infinity className="h-4 w-4 text-red-400" /> },
        { name: "Data Lake Systems", icon: <HardDrive className="h-4 w-4 text-teal-400" /> }
      ]
    }
  ];

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

        {/* ==================== SVG CONNECTING LINES (Desktop) ==================== */}
        {/* These draw glowing paths behind the elements linking them like a digital tree blueprint */}
        <div className="absolute top-[80px] left-0 w-full h-[120px] hidden md:block pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="glowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.4)" />
                <stop offset="50%" stopColor="rgba(99, 102, 241, 0.6)" />
                <stop offset="100%" stopColor="rgba(139, 92, 246, 0.4)" />
              </linearGradient>
            </defs>
            {/* Left Branch */}
            <path d="M 576 0 Q 576 40, 192 40 T 192 110" fill="none" stroke="url(#glowGrad)" strokeWidth="2.5" className="animate-pulse" />
            {/* Center Branch */}
            <path d="M 576 0 L 576 110" fill="none" stroke="url(#glowGrad)" strokeWidth="2.5" />
            {/* Right Branch */}
            <path d="M 576 0 Q 576 40, 960 40 T 960 110" fill="none" stroke="url(#glowGrad)" strokeWidth="2.5" className="animate-pulse" />
          </svg>
        </div>

        {/* ==================== LEVEL 2 & 3: BRANCHES AND LEAVES ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 lg:gap-8 w-full items-start">
          {skillTreeData.map((branch, bIdx) => (
            <div key={bIdx} className="flex flex-col items-center space-y-8 w-full relative">
              
              {/* BRANCH FIELD HUB TITLE */}
              <div className={`relative px-5 py-3 bg-card border border-border/60 rounded-xl shadow-lg ${branch.glowColor} transition-transform duration-300 hover:scale-105 w-full max-w-[280px] text-center z-20`}>
                <div className="flex items-center justify-center gap-3">
                  <div className="shrink-0 p-1.5 rounded-lg bg-foreground/5">
                    {branch.icon}
                  </div>
                  <h3 className="font-bold text-sm tracking-wide text-foreground">
                    {branch.field}
                  </h3>
                </div>
                {/* Micro SVG line extending from title down to individual skills list below it */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-border/60 to-primary/30 hidden md:block" />
              </div>

              {/* SKILLS PILLS CLUSTER (LEAVES) */}
              <div className="flex flex-col gap-3 w-full max-w-[260px] pt-2">
                {branch.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="group flex items-center gap-3 px-4 py-2.5 bg-card/40 backdrop-blur-xs border border-border/40 rounded-xl shadow-xs transition-all duration-300 hover:bg-primary/5 hover:border-primary/40 hover:-translate-y-0.5"
                  >
                    {/* Icon container */}
                    <div className="p-2 rounded-lg bg-background border border-border/50 group-hover:border-primary/30 shadow-xs shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    {/* Text Label */}
                    <span className="font-medium text-sm text-foreground/85 group-hover:text-foreground transition-colors tracking-tight text-left">
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