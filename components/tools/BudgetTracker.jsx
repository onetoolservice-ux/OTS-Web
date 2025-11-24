"use client";
import dynamic from "next/dynamic";

// const BudgetPlanner = dynamic(() => import("@/app/tools/budget-planner/page"), { ssr: false });

export default function BudgetTracker() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Budget Tracker</h1>
        <p className="text-gray-600">Full Budget Tool integration coming next.</p>
            </div>
  );
}
