import Link from "next/link";

export default function ToolsPage() {
  const tools = [
    { name: "OCR Text Extractor", path: "/tools/ocr" },
    { name: "Monthly Budget Planner", path: "/tools/budget" },
    { name: "PDF Tools", path: "/tools/pdf" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Tools</h2>
      <div className="grid grid-cols-1 gap-4">
        {tools.map(tool => (
          <Link
            key={tool.path}
            href={tool.path}
            className="p-4 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
