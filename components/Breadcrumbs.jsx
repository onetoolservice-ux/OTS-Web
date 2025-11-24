"use client";
import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
      return (
            <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
                  <ol className="flex gap-2">
                          {items.map((it, i) => (
                                      <li key={i}>
                                                  {it.href ? <Link href={it.href} className="hover:underline">{it.label}</Link> : <span>{it.label}</span>}
                                                              {i < items.length - 1 && <span className="mx-2">/</span>}
                                                                        </li>
                          ))}
                                </ol>
                                    </nav>
      );
}
