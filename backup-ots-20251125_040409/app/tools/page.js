export default function ToolsPage() {
  const tools = [
    {
      name: "OCR Scanner",
      desc: "Extract text from images instantly.",
      link: "/tools/ocr",
    },
    {
      name: "Budget Planner",
      desc: "Track income, expenses, and savings.",
      link: "/tools/budget",
    },
    {
      name: "Resume Builder",
      desc: "Generate professional resumes instantly.",
      link: "/tools/resume",
    },
    {
      name: "PDF Tools",
      desc: "Merge, compress, convert PDF files.",
      link: "/tools/pdf",
    },
    {
      name: "AI Writer",
      desc: "Write blogs, essays & messages instantly.",
      link: "/tools/ai-writer",
    },
    {
      name: "Calculator Suite",
      desc: "EMI, GST, Interest & business calculators.",
      link: "/tools/calculators",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Tools</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.link}
            className="bg-white p-6 rounded-xl shadow border hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{tool.name}</h2>
            <p className="text-gray-600 text-sm mt-2">{tool.desc}</p>
          </a>
        ))}
      </div>

      <p className="text-gray-400 text-sm mt-10 text-center">
        More tools added every week.
      </p>
    </div>
  );
}
