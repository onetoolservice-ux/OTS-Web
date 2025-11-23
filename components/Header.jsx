"use client";
import { useState, useEffect } from "react";
import MobileMenu from "./MobileMenu";
import Link from "next/link";

export default function Header() {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const v = !dark;
    setDark(v);
    if (v) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", v ? "dark" : "light");
  };

  return (
    <>
      <header className="w-full bg-white dark:bg-transparent/20 border-b border-transparent dark:border-neutral-700/20">
        <div className="container-max flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} aria-label="menu" className="text-2xl md:hidden">☰</button>

            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="One Tool" width="40" height="40" className="rounded-md" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">One Tool</div>
                <div className="text-xs text-gray-500 dark:text-gray-300">Solutions</div>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-sm text-gray-700 dark:text-gray-200">Home</Link>
            <Link href="/ai" className="text-sm text-gray-700 dark:text-gray-200">AI</Link>
            <Link href="/tools" className="text-sm text-gray-700 dark:text-gray-200">Tools</Link>
            <Link href="/learn" className="text-sm text-gray-700 dark:text-gray-200">Learn</Link>
            <Link href="/about" className="text-sm text-gray-700 dark:text-gray-200">About</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/contact" className="hidden md:inline text-sm px-3 py-1 rounded-md border border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-gray-200">Contact</Link>
            <button onClick={toggleTheme} aria-label="toggle-theme" className="px-3 py-1 rounded-md bg-gray-100 dark:bg-neutral-800">
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={open} setOpen={setOpen} />
    </>
  );
}
