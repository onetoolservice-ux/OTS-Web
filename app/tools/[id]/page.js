import BudgetTracker from "@/components/tools/BudgetTracker";
import LogoMaker from "@/components/tools/LogoMaker";

export default function ToolPage({ params }) {
      const { id } = params;

      import Breadcrumbs from "@/components/Breadcrumbs";

      export default function ToolDetail({ params }) {
        const { id } = params;

          const TOOL = {
              "budget-tracker": { name: "Budget Tracker", desc: "Track income and expenses" },
              "logo-maker": { name: "Logo Maker", desc: "Create logos quickly" },
              "screenshot-reader": { name: "Screenshot → Text", desc: "Extract text from images" },
          }[id] || { name: id, desc: "Tool description coming soon." };

            return (
              <div className="container">
                <Breadcrumbs items={[{ href: "/tools", label: "Tools" }, { label: TOOL.name }]} />
                  <h1 className="text-3xl font-bold">{TOOL.name}</h1>
                    <p className="text-gray-600 mt-2">{TOOL.desc}</p>

                      <div className="mt-6 card">
                      <p>This is a static preview of the tool page. The real tool will be loaded here later.</p>
                          <div className="mt-4">
                            <button className="px-4 py-2 bg-blue-600 text-white rounded">Open (placeholder)</button>
                                </div>
                                  </div>
                                  </div>
            );
      }
}
