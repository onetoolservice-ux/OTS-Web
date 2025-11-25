export default function Home() {
  return (
    <main className="pt-28 px-6 max-w-6xl mx-auto pb-16">

      {/* HERO */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to <span className="text-yellow-500">One Tool Solutions</span>
        </h1>
        <p className="text-gray-600 text-lg">
          A unified platform offering AI tools, productivity utilities,
          converters, calculators, and automation services — all in one place.
        </p>
      </section>

      {/* FEATURE GRID */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">What You Can Do Here</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="border rounded-xl p-6 shadow bg-white hover:shadow-xl transition">
            <h3 className="font-bold text-xl mb-2">AI Tools</h3>
            <p className="text-gray-600">Chatbots, summarizers, generators and more.</p>
          </div>

          <div className="border rounded-xl p-6 shadow bg-white hover:shadow-xl transition">
            <h3 className="font-bold text-xl mb-2">Utility Tools</h3>
            <p className="text-gray-600">PDF utilities, image tools, format converters.</p>
          </div>

          <div className="border rounded-xl p-6 shadow bg-white hover:shadow-xl transition">
            <h3 className="font-bold text-xl mb-2">Financial Tools</h3>
            <p className="text-gray-600">Budget trackers, EMI calculators, planners.</p>
          </div>

        </div>
      </section>

    </main>
  );
}
