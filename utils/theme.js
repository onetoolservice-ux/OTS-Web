export function getInitialTheme() {
      if (typeof window === "undefined") return "light";
        return localStorage.getItem("ots_theme") || "light";
}