"use client";

import Link from "next/link";

const tools = [
  {
    name: "Budget Tracker",
    description: "Track your monthly income, expenses, and savings.",
    route: "/tools/budget-tracker",
    icon: "💰",
  },
  {
    name: "OCR Text Extractor",
    description: "Extract readable text from images using OCR.",
    route: "/tools/ocr",
    icon: "🖼️",
  },
  {
    name: "PDF Tools",
    description: "Merge, split, compress, convert PDFs.",
    route: "/tools/pdf-suite",
    icon: "📄",
  },
  {
    name: "AI Chat",
    description: "Chat with your intelligent AI assistant.",
    route: "/tools/ai-chat",
    icon: "🤖",
  },
  {
    name: "Image Tools",
    description: "Resize, compress & convert images online.",
    route: "/tools/image-tools",
    icon: "🖌️",
  },
  {
    name: "Calculators",
    description: "EMI, interest, percentage and finance calculators.",
    route: "/tools/calculators",
    icon: "🧮",
  }
];

export default function ToolsPage() {
  return (
    <div className="max-w-6xl mx-auto pt-28 px-6 pb-20">
      
      <h1 className="text-3xl font-bold mb-4">All Tools</h1>
      <p className="text-gray-600 mb-10">
        Explore all available tools inside One Tool Solutions.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.route}
            href={tool.route}
            className="border rounded-xl p-6 bg-white hover:shadow-lg transition flex flex-col gap-2"
          >
            <div className="text-4xl">{tool.icon}</div>

            <h3 className="text-xl font-semibold">{tool.name}</h3>

            <p className="text-gray-500 text-sm">{tool.description}</p>

            <span className="mt-3 text-blue-600 text-sm font-medium">
              Open →
            </span>
          </Link>
        ))}
      </div>

    </div>
  );
}
