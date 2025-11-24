import Link from "next/link";

const tools = [
      {
            id: "budget-tracker",
                name: "Budget Tracker",
                    desc: "Track income, expenses, breakdowns and insights."
      },
        {
                id: "logo-maker",
                    name: "AI Logo Maker",
                        desc: "Generate logos from your brand theme."
        }
];

export default function ToolsPage() {
      return (
            <div>
                  <h1 className="text-3xl font-bold mb-4">Tools</h1>
                        <p className="text-gray-600 mb-6">Choose a tool to get started.</p>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                      {tools.map((t) => (
                                          <ToolCard key={t.slug} tool={t} />
                                      ))}
                                            </div>
                                                </div>
      );
}
