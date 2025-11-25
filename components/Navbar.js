"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-black/90 text-white px-6 py-4 shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="text-xl font-bold tracking-wide">
          OTS
        </Link>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>

        {/* Links */}
        <div className={`md:flex gap-6 text-sm ${open ? "block mt-4" : "hidden md:flex"}`}>
          <Link href="/" className="hover:text-yellow-300">Home</Link>
          <Link href="/tools" className="hover:text-yellow-300">Tools</Link>
          <Link href="/ai" className="hover:text-yellow-300">AI</Link>
          <Link href="/learning" className="hover:text-yellow-300">Learning</Link>
          <Link href="/about" className="hover:text-yellow-300">About</Link>
          <Link href="/contact" className="hover:text-yellow-300">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
