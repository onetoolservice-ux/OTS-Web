"use client";
import Link from "next/link";

export default function Sidebar() {
      const tools = [
            { slug: "budget-tracker", name: "Budget Tracker" },
                { slug: "logo-maker", name: "Logo Maker" },
                    { slug: "screenshot-reader", name: "Screenshot → Text" },
                        { slug: "url-metadata", name: "URL Metadata" },
                            { slug: "text-utilities", name: "Text Utilities" },
                                { slug: "calculator", name: "Calculator" },
                                    { slug: "image-compressor", name: "Image Compressor" },
                                        { slug: "pdf-tools", name: "PDF Tools" },
      ];

        return (
                <aside data-sidebar className="fixed md:static left-0 top-0 h-full w-72 bg-white border-r shadow-md z-50 transform -translate-x-full md:translate-x-0 transition-transform duration-300">
                      <div className="p-4 space-y-4 sticky top-0">
                              <div className="text-sm text-gray-500">Tools</div>
                                      <div className="flex flex-col gap-1">
                                                {tools.map((t) => {
                                                    const active = typeof window !== "undefined" && window.location.pathname.includes(t.slug);
                                                    return (
                                                        <Link
                                                            key={t.slug}
                                                            href={`/tools/${t.slug}`}
                                                            className={`px-3 py-2 rounded hover:bg-slate-100 ${active ? "bg-sky-100 text-sky-700 font-medium" : ""}`}
                                                        >
                                                            {t.name}
                                                        </Link>
                                                    );
                                                })}
                                                        </div>

                                                                <div className="pt-4 border-t mt-4">
                                                                          <Link href="/admin" className="block px-3 py-2 rounded hover:bg-slate-100">Admin</Link>
                                                                                    <Link href="/learn" className="block px-3 py-2 rounded hover:bg-slate-100">Learn</Link>
                                                                                            </div>
                                                                                                  </div>
                                                                                                      </aside>
        );
}
