export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="bg-white rounded-xl shadow-sm p-8 mb-8 border">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-slate-900">One Tool — Your daily AI companion</h1>
            <p className="mt-3 text-slate-600 max-w-xl">
              Smart, simple tools that help students, creators, and professionals work faster.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="/ai" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg">Ask OTS AI</a>
              <a href="/tools" className="inline-block px-4 py-2 border border-slate-200 rounded-lg">Explore Tools</a>
            </div>
          </div>
          <div className="w-48 h-32 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg shadow" />
        </div>
      </section>

      {/* FEATURE CARDS */}
      <section className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="font-semibold">Study Smarter</h3>
          <p className="mt-2 text-slate-600 text-sm">Summarize notes, create plans and track progress.</p>
        </div>
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="font-semibold">Work Faster</h3>
          <p className="mt-2 text-slate-600 text-sm">Resume builder, email drafts, and quick utilities.</p>
        </div>
        <div className="p-6 bg-white rounded-lg border shadow-sm">
          <h3 className="font-semibold">AI Assistant</h3>
          <p className="mt-2 text-slate-600 text-sm">Ask questions, generate content, and learn faster.</p>
        </div>
      </section>
    </main>
  );
}
