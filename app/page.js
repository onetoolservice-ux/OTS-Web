export default function Home() {
  return (
    <section className="container-max">
      <div className="hero-card bg-white dark:bg-[#07121a] p-10 md:p-12 hero-card">
        <div className="md:flex md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">One Tool — Your daily AI companion</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">
              Smart, simple tools that help students, creators, and professionals work faster.
            </p>

            <div className="mt-6 flex gap-3">
              <a href="/ai" className="inline-block px-5 py-3 bg-brand-blue text-white rounded-xl shadow-soft">Ask OTS AI</a>
              <a href="/tools" className="inline-block px-5 py-3 border border-gray-200 rounded-xl text-gray-700 dark:text-gray-200">Explore Tools</a>
            </div>
          </div>

          <div className="mt-6 md:mt-0">
            <div className="w-56 h-40 rounded-xl bg-gradient-to-br from-brand-blue to-[#06c2d0] flex items-center justify-center text-white font-bold shadow-subtle">
              <div>
                <div className="text-sm opacity-80">Smart</div>
                <div className="text-xl md:text-2xl font-bold">Tools</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        <div className="p-5 bg-white dark:bg-[#07121a] rounded-xl shadow-subtle">
          <h3 className="font-semibold">Study Smarter</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Summarize notes, create plans and track progress.</p>
        </div>
        <div className="p-5 bg-white dark:bg-[#07121a] rounded-xl shadow-subtle">
          <h3 className="font-semibold">Work Faster</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Resume builder, email drafts, and quick utilities.</p>
        </div>
        <div className="p-5 bg-white dark:bg-[#07121a] rounded-xl shadow-subtle">
          <h3 className="font-semibold">AI Assistant</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Ask questions, generate content, and learn faster.</p>
        </div>
      </section>
    </section>
  );
}
