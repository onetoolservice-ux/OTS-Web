"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
      const [theme, setTheme] = useState(() => {
            if (typeof window === "undefined") return "light";
                return localStorage.getItem("ots_theme") || "light";
      });

        useEffect(() => {
                document.documentElement.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
                    localStorage.setItem("ots_theme", theme);
        }, [theme]);

          return (
                <button
                      aria-label="Toggle theme"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                  className="p-2 rounded hover:bg-slate-100"
                                      >
                                            {theme === "dark" ? "🌙" : "☀️"}
                                                </button>
          );
}
