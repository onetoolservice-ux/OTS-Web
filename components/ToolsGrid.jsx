
import Footer from "@/components/Footer";
import BudgetTracker from "@/components/tools/BudgetTracker";

export default function ToolsGrid() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold mb-6">Tools</h1>
        <div className="w-full max-w-2xl grid grid-cols-1 gap-6">
          <BudgetTracker />
        </div>
      </main>
      <Footer />
    </div>
  );
}
