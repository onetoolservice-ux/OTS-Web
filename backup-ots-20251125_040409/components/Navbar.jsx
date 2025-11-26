"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="text-blue-600 font-bold text-lg">One Tool</Link>

        <div className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/ai">AI</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/learn">Learn</Link>
          <Link href="/about">About</Link>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden">☰</button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-4 space-y-2">
          <Link href="/">Home</Link>
          <Link href="/ai">AI</Link>
          <Link href="/tools">Tools</Link>
          <Link href="/learn">Learn</Link>
          <Link href="/about">About</Link>
        </div>
      )}
    </nav>
  );
}
