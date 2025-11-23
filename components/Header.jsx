import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center font-bold text-white">OT</div>
          <div>
            <Link href="/"><a className="font-bold text-lg">One Tool</a></Link>
            <div className="text-xs opacity-60">Tools & Utilities</div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/tools"><a className="hover:underline">Tools</a></Link>
          <Link href="/ai"><a className="hover:underline">AI</a></Link>
          <Link href="/about"><a className="hover:underline">About</a></Link>
          <Link href="/contact"><a className="hover:underline">Contact</a></Link>
          <Link href="/admin/tools"><a className="hover:underline">Admin</a></Link>
        </nav>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="menu">☰</button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white p-4 border-t">
          <Link href="/tools"><a className="block py-2">Tools</a></Link>
          <Link href="/ai"><a className="block py-2">AI</a></Link>
          <Link href="/about"><a className="block py-2">About</a></Link>
          <Link href="/contact"><a className="block py-2">Contact</a></Link>
          <Link href="/admin/tools"><a className="block py-2">Admin</a></Link>
        </div>
      )}
    </header>
  );
}
