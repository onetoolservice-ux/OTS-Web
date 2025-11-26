export const metadata = {
  title: "Utility Tools | One Tool Solutions",
  description: "PDF tools, image tools, formatting tools and more.",
};

export default function UtilityTools() {
  const tools = [
    { name: "PDF Merger", slug: "pdf-merge", desc: "Merge multiple PDFs into one." },
    { name: "PDF to Word", slug: "pdf-to-word", desc: "Convert PDF files to editable Word." },
    { name: "PDF Compressor", slug: "pdf-compress", desc: "Reduce PDF size while maintaining quality." },

    { name: "Image Compressor", slug: "image-compress", desc: "Compress images to smaller size." },
    { name: "Image Resizer", slug: "image-resize", desc: "Resize images to any dimension." },
    { name: "Image Converter", slug: "image-convert", desc: "Convert between JPG, PNG, WebP." },

    { name: "JSON Formatter", slug: "json-formatter", desc: "Format JSON with proper indentation." },
    { name: "Code Formatter", slug: "code-formatter", desc: "Format code for readability." },
    { name: "UUID Generator", slug: "uuid-generator", desc: "Generate secure random UUIDs." },
  ];

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Utility Tools</h1>

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
