export const metadata = {
  title: "Tools | One Tool Solutions",
  description: "Explore all AI, utility, productivity, and business tools.",
};

export default function ToolsHome() {
  const tools = [
    { name: "Budget Tracker", slug: "budget-tracker", desc: "Track income, expenses, and monthly budgets." },
    { name: "OCR Enhancer", slug: "ocr-enhancer", desc: "Extract and enhance text from images." },
    { name: "AI Writer", slug: "ai-writer", desc: "Generate content, summaries, scripts and blogs." },
    { name: "PDF Tools", slug: "pdf-tools", desc: "PDF merge, convert, compress, watermark." },
    { name: "Code Formatter", slug: "code-formatter", desc: "Format JSON, XML, HTML, JS, CSS." },
  ];

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">Tools</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md bg-white dark:bg-neutral-900 transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-600">{tool.name}</h2>
            <p className="text-neutral-600 text-sm">{tool.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
