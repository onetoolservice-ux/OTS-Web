import ToolCard from "../components/ToolCard";

const FEATURE_TOOLS = [
      { slug: "budget-tracker", name: "Budget Tracker", desc: "Track income, expenses & insights" },
        { slug: "logo-maker", name: "AI Logo Maker", desc: "Generate brand logos quickly" },
          { slug: "screenshot-reader", name: "Screenshot → Text", desc: "Extract text from images" },
];

export default function Home() {
      return (
            <div className="container">
                  <section className="mb-8">
                          <div className="flex items-center justify-between">
                                    <div>
                                                <h1 className="text-4xl font-bold">One Tool — Everything in one place</h1>
                                                            <p className="text-gray-600 mt-2">A smart, modular platform of productivity tools and AI utilities.</p>
                                                                      </div>
                                                                              </div>
                                                                                    </section>

                                                                                          <section>
                                                                                                  <h2 className="text-2xl font-semibold mb-4">Featured Tools</h2>
                                                                                                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                                                                                    {FEATURE_TOOLS.map((t) => <ToolCard key={t.slug} tool={t} />)}
                                                                                                                            </div>
                                                                                                                                  </section>

                                                                                                                                        <section className="mt-10">
                                                                                                                                                <h2 className="text-2xl font-semibold mb-4">Why One Tool?</h2>
                                                                                                                                                        <div className="grid md:grid-cols-3 gap-4">
                                                                                                                                                                  <div className="card">
                                                                                                                                                                              <h3 className="font-semibold">Save time</h3>
                                                                                                                                                                                          <p className="text-gray-500 text-sm mt-2">All essential utilities in one place.</p>
                                                                                                                                                                                                    </div>
                                                                                                                                                                                                              <div className="card">
                                                                                                                                                                                                                          <h3 className="font-semibold">Easy to use</h3>
                                                                                                                                                                                                                                      <p className="text-gray-500 text-sm mt-2">Minimal setup, instant results.</p>
                                                                                                                                                                                                                                                </div>
                                                                                                                                                                                                                                                          <div className="card">
                                                                                                                                                                                                                                                                      <h3 className="font-semibold">Privacy first</h3>
                                                                                                                                                                                                                                                                                  <p className="text-gray-500 text-sm mt-2">Most data stays on-device by default.</p>
                                                                                                                                                                                                                                                                                            </div>
                                                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                                                          </section>
                                                                                                                                                                                                                                                                                                              </div>
      );
}
