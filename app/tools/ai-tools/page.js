export const metadata = {
  title: "AI Tools | One Tool Solutions",
  description: "AI-powered tools to write, summarize, and enhance content.",
};

export default function AITools() {
  const tools = [
    { name: "AI Writer", slug: "ai-writer", desc: "Generate blogs, scripts, essays, and more." },
    { name: "AI Assistant", slug: "ai-assistant", desc: "Chat with an AI helper for any task." },
    { name: "Summarizer", slug: "text-summarizer", desc: "Summarize long text into short insights." },
    { name: "Email Writer", slug: "email-writer", desc: "Write professional emails instantly." },
    { name: "Blog Generator", slug: "blog-generator", desc: "Auto-generate SEO optimized blogs." },
  ];

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">AI Tools</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="border rounded-xl p-5 shadow-sm hover:shadow-md bg-white dark:bg-neutral-900 transition"
          >
            <h2 className="text-xl font-semibold mb-2 text-blue-500">{tool.name}</h2>
            <p className="text-neutral-600 text-sm">{tool.desc}</p>
          </a>
        ))}
      </div>
    </main>
  );
}
