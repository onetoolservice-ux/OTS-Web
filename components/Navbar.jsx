"use client";
import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
      const [open, setOpen] = useState(false);

        return (
                <header className="bg-white bg-opacity-80 backdrop-blur border-b sticky top-0 z-40">
                      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                        <button
                                                    aria-label="open menu"
                                                                className="md:hidden p-2 rounded hover:bg-slate-100"
                                                                            onClick={() => {
                                                                                              const el = document.querySelector("[data-sidebar]");
                                                                                                            if (el) el.classList.toggle("hidden");
                                                                            }}
                                                                                      >
                                                                                                  ☰
                                                                                                            </button>

                                                                                                                      <Link href="/" className="flex items-center gap-2">
                                                                                                                                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0f6fff] to-[#00b5d8] flex items-center justify-center text-white font-bold">
                                                                                                                                                OT
                                                                                                                                                            </div>
                                                                                                                                                                        <div>
                                                                                                                                                                                      <div className="font-semibold text-lg">One Tool</div>
                                                                                                                                                                                                    <div className="text-sm text-gray-500">Tools • AI • Productivity</div>
                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                          </Link>
                                                                                                                                                                                                                                  </div>

                                                                                                                                                                                                                                          <nav className="hidden md:flex gap-6 items-center">
                                                                                                                                                                                                                                                    <Link href="/" className="text-sm hover:text-sky-600">Home</Link>
                                                                                                                                                                                                                                                              <Link href="/tools" className="text-sm hover:text-sky-600">Tools</Link>
                                                                                                                                                                                                                                                                        <Link href="/about" className="text-sm hover:text-sky-600">About</Link>
                                                                                                                                                                                                                                                                                  <Link href="/contact" className="text-sm hover:text-sky-600">Contact</Link>
                                                                                                                                                                                                                                                                                          </nav>

                                                                                                                                                                                                                                                                                                  <div className="flex items-center gap-3">
                                                                                                                                                                                                                                                                                                            <ThemeToggle />
                                                                                                                                                                                                                                                                                                                      <button className="hidden md:inline-block bg-sky-600 text-white px-3 py-1 rounded">Get Started</button>
                                                                                                                                                                                                                                                                                                                              </div>
                                                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                                                        </header>
        );
}
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
      const [open, setOpen] = useState(false);

        return (
                <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
                      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
                              
                                      <Link href="/" className="text-xl font-bold tracking-tight">
                                                OTS
                                                        </Link>

                                                                <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
                                                                          ☰
                                                                                  </button>

                                                                                          <div className={`md:flex gap-6 font-medium ${open ? "block" : "hidden"}`}>
                                                                                                    <Link href="/" className="hover:text-blue-600 block py-2">Home</Link>
                                                                                                              <Link href="/tools" className="hover:text-blue-600 block py-2">Tools</Link>
                                                                                                                        <Link href="/about" className="hover:text-blue-600 block py-2">About</Link>
                                                                                                                                  <Link href="/contact" className="hover:text-blue-600 block py-2">Contact</Link>
                                                                                                                                          </div>

                                                                                                                                                </div>
                                                                                                                                                    </nav>
        );
}
