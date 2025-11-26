export default function Home() {
  return (
    <main>
      <section className="bg-white shadow p-8 rounded-xl border mb-10">
        <h1 className="text-4xl font-bold">
          One Tool — Your daily AI companion
        </h1>
        <p className="text-gray-600 mt-3 max-w-xl">
          Smart tools for students, creators and professionals to work faster.
        </p>

        <div className="mt-6 flex gap-4">
          <a href="/ai" className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            Ask OTS AI
          </a>
          <a
            href="/tools"
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            Explore Tools
          </a>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold">Study Smarter</h3>
          <p className="text-gray-600 text-sm mt-2">
            Summaries, plans, notes & progress tracking.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold">Work Faster</h3>
          <p className="text-gray-600 text-sm mt-2">
            Resume builder, email writing & utilities.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="font-semibold">AI Assistant</h3>
          <p className="text-gray-600 text-sm mt-2">
            Ask questions, generate content and learn faster.
          </p>
        </div>
      </section>
    </main>
  );
}
