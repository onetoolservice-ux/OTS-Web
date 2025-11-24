import Link from "next/link";

const tools = [
  { id: "budget-tracker", name: "Budget Tracker" },
  { id: "logo-maker", name: "Logo Maker" },
  { id: "screenshot-reader", name: "Screenshot → Text" },
  { id: "url-metadata", name: "URL Metadata Extractor" },
  { id: "text-utilities", name: "Text Utilities" },
  { id: "calculator", name: "Calculator" },
  { id: "image-compressor", name: "Image Compressor" },
  { id: "pdf-tools", name: "PDF Tools" },
];

export default function ToolsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {tools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.id}`}
            className="block border rounded-lg p-4 bg-white hover:shadow transition"
          >
            <span className="font-semibold text-lg">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
