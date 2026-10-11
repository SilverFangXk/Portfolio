import { IoStatsChart, IoLogoTableau } from "react-icons/io5";
import { IoLogoJavascript } from "react-icons/io";
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
  SiNodedotjs,
} from "react-icons/si";
import { Brain, Database, Network, Terminal } from "lucide-react";

// Built-in logos a skill can use (admin -> Skills -> "Built-in icon").
// Brand colors are literal Tailwind classes so the compiler can see them.
// To add one: import the icon above and add a line here.
export const SKILL_ICONS = {
  "java": { label: "Java", Icon: FaJava, color: "text-orange-400" },
  "spark": { label: "Apache Spark", Icon: SiApachespark, color: "text-orange-500" },
  "hadoop": { label: "Hadoop", Icon: SiApachehadoop, color: "text-yellow-500" },
  "kafka": { label: "Kafka", Icon: SiApachekafka, color: "text-purple-400" },
  "etl": { label: "ETL / Terminal", Icon: Terminal, color: "text-emerald-400" },
  "python": { label: "Python", Icon: SiPython, color: "text-yellow-400" },
  "chart-blue": { label: "Chart (blue)", Icon: IoStatsChart, color: "text-blue-400" },
  "chart-purple": { label: "Chart (purple)", Icon: IoStatsChart, color: "text-purple-400" },
  "chart-yellow": { label: "Chart (yellow)", Icon: IoStatsChart, color: "text-yellow-500" },
  "scikit-learn": { label: "Scikit-learn", Icon: SiScikitlearn, color: "text-green-400" },
  "tensorflow": { label: "TensorFlow", Icon: SiTensorflow, color: "text-orange-400" },
  "deep-learning": { label: "Deep Learning (network)", Icon: Network, color: "text-pink-400" },
  "brain": { label: "Machine Learning (brain)", Icon: Brain, color: "text-emerald-400" },
  "aws": { label: "AWS", Icon: FaAws, color: "text-orange-400" },
  "docker": { label: "Docker", Icon: SiDocker, color: "text-blue-400" },
  "git": { label: "Git", Icon: FaGitAlt, color: "text-red-400" },
  "linux": { label: "Linux", Icon: FaLinux, color: "text-gray-400" },
  "postgresql": { label: "PostgreSQL", Icon: SiPostgresql, color: "text-blue-400" },
  "mysql": { label: "MySQL", Icon: SiMysql, color: "text-yellow-400" },
  "database-red": { label: "Database (red)", Icon: Database, color: "text-red-400" },
  "database-dark-red": { label: "Database (dark red)", Icon: Database, color: "text-red-600" },
  "mongodb": { label: "MongoDB", Icon: SiMongodb, color: "text-green-400" },
  "tableau": { label: "Tableau", Icon: IoLogoTableau, color: "text-indigo-400" },
  "react": { label: "React", Icon: FaReact, color: "text-cyan-400" },
  "nodejs": { label: "Node.js", Icon: SiNodedotjs, color: "text-green-500" },
  "flask": { label: "Flask / Server", Icon: FiServer, color: "text-gray-300" },
  "html": { label: "HTML", Icon: FaHtml5, color: "text-orange-400" },
  "css": { label: "CSS", Icon: FaCss3Alt, color: "text-blue-300" },
  "javascript": { label: "JavaScript", Icon: IoLogoJavascript, color: "text-yellow-400" },
  "php": { label: "PHP", Icon: FaPhp, color: "text-purple-400" },
};

// For the admin <select>. The empty value means "no built-in icon".
export const SKILL_ICON_OPTIONS = [
  { value: "", label: "None (default icon)" },
  ...Object.entries(SKILL_ICONS).map(([value, { label }]) => ({ value, label })),
];

// An uploaded image wins; otherwise the built-in icon; otherwise a neutral default.
export const SkillIcon = ({ skill, size = 18 }) => {
  if (skill.icon) {
    return <img src={skill.icon} alt="" style={{ width: size, height: size }} className="object-contain" />;
  }
  const entry = SKILL_ICONS[skill.iconKey];
  if (entry) {
    const { Icon, color } = entry;
    return <Icon size={size} className={color} />;
  }
  return <Terminal size={size} className="text-foreground/50" />;
};