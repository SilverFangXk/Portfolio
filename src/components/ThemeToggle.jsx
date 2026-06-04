import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react"; 
import { cn } from "@/lib/utils.js";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []); // Added missing dependency array here to stop infinite re-renders

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  return (
    <button 
      onClick={toggleTheme} 
      className={cn(
        // Changes applied below for the floating action look
        "fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg transition-all duration-300",
        "bg-background border border-border/40 hover:scale-110 active:scale-95",
        "focus:outline-none" // Fixed the typo here
      )}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400 animate-spin-slow" />
      ) : (
        <Moon className="h-5 w-5 text-foreground" />
      )}
    </button>
  );
};