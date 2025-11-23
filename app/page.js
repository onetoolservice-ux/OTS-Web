export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">One Tool — Your Daily AI Companion</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        One platform for every task. Study, work and do more with AI.
      </p>
      <div className="mt-6 flex gap-4">
        <a href="/ai" className="px-4 py-2 bg-brand-blue text-white rounded">Ask AI</a>
        <a href="/tools" className="px-4 py-2 bg-brand-teal text-white rounded">Tools</a>
      </div>
    </div>
  );
}
