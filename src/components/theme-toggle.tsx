"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check initial theme
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-accent"
      aria-label="Toggle theme"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        {theme === "light" ? (
          <Moon className="h-5 w-5 text-muted-foreground" />
        ) : (
          <Sun className="h-5 w-5 text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 text-left">
        <p className="font-medium">Theme</p>
        <p className="text-sm text-muted-foreground">
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </p>
      </div>
    </button>
  );
}
