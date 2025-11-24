"use client";
import Link from "next/link";

export default function ToolCard({ tool }) {
      return (
            <Link href={`/tools/${tool.slug}`} className="block border rounded-lg p-4 hover:shadow transition bg-white">
                  <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#0f6fff] to-[#00b5d8] text-white flex items-center justify-center font-bold">
                                    {tool.icon || tool.name.slice(0,2).toUpperCase()}
                                            </div>
                                                    <div>
                                                              <div className="font-semibold">{tool.name}</div>
                                                                        <div className="text-sm text-gray-500">{tool.desc}</div>
                                                                                </div>
                                                                                      </div>
                                                                                          </Link>
      );
}
