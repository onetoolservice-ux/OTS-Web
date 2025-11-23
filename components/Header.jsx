"use client";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const v = !dark;
    setDark(v);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", v ? "dark" : "light");
  };

  return (
    <>
      <header className="w-full shadow-sm bg-white dark:bg-[#0c111c] py-4 px-4 flex items-center justify-between">
        <button onClick={() => setOpen(true)} className="text-2xl">☰</button>
        <h1 className="font-semibold text-lg">One Tool</h1>
        <button onClick={toggleTheme}>{dark ? "🌙" : "☀️"}</button>
      </header>

      <MobileMenu open={open} setOpen={setOpen} />
    </>
  );
}
