"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-medium text-blue-600 text-lg">One Tool <span className="text-slate-600">Solutions</span></Link>

        <div className="hidden md:flex items-center gap-6 text-slate-700">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <Link href="/ai" className="hover:text-blue-600">AI</Link>
          <Link href="/tools" className="hover:text-blue-600">Tools</Link>
          <Link href="/learn" className="hover:text-blue-600">Learn</Link>
          <Link href="/about" className="hover:text-blue-600">About</Link>
        </div>

        <button className="md:hidden text-slate-700" onClick={() => setOpen(!open)}>
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          <Link href="/" className="block px-4 py-2">Home</Link>
          <Link href="/ai" className="block px-4 py-2">AI</Link>
          <Link href="/tools" className="block px-4 py-2">Tools</Link>
          <Link href="/learn" className="block px-4 py-2">Learn</Link>
          <Link href="/about" className="block px-4 py-2">About</Link>
        </div>
      )}
    </nav>
  );
}
