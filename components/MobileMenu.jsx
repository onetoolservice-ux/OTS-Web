"use client";
import Link from "next/link";

export default function MobileMenu({ open, setOpen }) {
  return (
    <div className={`fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}>
      <div
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-black/30 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside className={`absolute left-0 top-0 h-full w-[82%] max-w-xs bg-white dark:bg-gray-900 p-6 transform transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center gap-3 mb-6">
          <img src="/logo.svg" width="42" height="42" className="rounded-md" alt="OT" />
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">One Tool</div>
            <div className="text-xs text-gray-500 dark:text-gray-300">Solutions</div>
          </div>
        </div>

        <nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-200">
          <Link href="/" onClick={() => setOpen(false)} className="py-2">Home</Link>
          <Link href="/ai" onClick={() => setOpen(false)} className="py-2">Ask AI</Link>
          <Link href="/tools" onClick={() => setOpen(false)} className="py-2">Tools</Link>
          <Link href="/learn" onClick={() => setOpen(false)} className="py-2">Learn</Link>
          <Link href="/about" onClick={() => setOpen(false)} className="py-2">About</Link>

          <div className="mt-6 border-t pt-4 text-sm text-gray-500 dark:text-gray-400">
            <a href="/privacy" className="block py-1">Privacy</a>
            <a href="/terms" className="block py-1">Terms</a>
            <a href="/contact" className="block py-1">Support</a>
          </div>
        </nav>
      </aside>
    </div>
  );
}
