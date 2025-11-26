"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">OT</div>
          <div className="text-sm font-semibold">One Tool</div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm">Home</Link>
          <Link href="/ai" className="text-sm">AI</Link>
          <Link href="/tools" className="text-sm">Tools</Link>
          <Link href="/learn" className="text-sm">Learn</Link>
          <Link href="/about" className="text-sm">About</Link>
        </div>

        <div className="md:hidden">
          <button aria-label="menu" onClick={() => setOpen(!open)} className="px-2 py-1 border rounded">Menu</button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/" className="block">Home</Link>
          <Link href="/ai" className="block">AI</Link>
          <Link href="/tools" className="block">Tools</Link>
          <Link href="/learn" className="block">Learn</Link>
          <Link href="/about" className="block">About</Link>
        </div>
      )}
    </nav>
  );
}
