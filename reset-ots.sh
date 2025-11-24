#!/bin/bash

echo "🧹 Cleaning old folders..."
rm -rf app components lib public/ots-budget

echo "📁 Creating folders..."
mkdir -p app tools admin budget-tracker
mkdir -p components lib public
mkdir -p components/ui

######################################
# 1. APP LAYOUT (root)
######################################
cat << 'LAYOUT' > app/layout.jsx
export const metadata = {
  title: "One Tool – OTS",
  description: "Unified tools for everyone."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
LAYOUT

######################################
# 2. HOME PAGE
######################################
cat << 'HOME' > app/page.jsx
"use client";

import Link from "next/link";
import ToolsGrid from "@/components/ToolsGrid";

export default function HomePage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">One Tool (OTS)</h1>
      <p className="opacity-70 mt-2">
        All your productivity tools in one place.
      </p>

      <div className="mt-8">
        <ToolsGrid />
      </div>
    </div>
  );
}
HOME

######################################
# 3. TOOLS PAGE
######################################
cat << 'TOOLS' > app/tools/page.jsx
import ToolsGrid from "@/components/ToolsGrid";

export default function ToolsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Available Tools</h1>
      <ToolsGrid />
    </div>
  );
}
TOOLS

######################################
# 4. ADMIN PAGE
######################################
cat << 'ADMIN' > app/admin/page.jsx
"use client";
import { useState } from "react";

export default function AdminPage() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">Admin – Add Tool</h1>

      <div className="space-y-4 mt-6">
        <input
          className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="Tool Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-2 rounded bg-zinc-900 border border-zinc-700"
          placeholder="Tool URL / Slug"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button className="px-4 py-2 bg-blue-600 rounded">
          Save Tool (Coming Soon)
        </button>
      </div>
    </div>
  );
}
ADMIN

######################################
# 5. BUDGET TRACKER PAGE
######################################
cat << 'BUDGET' > app/budget-tracker/page.jsx
"use client";

import BudgetTracker from "@/components/tools/BudgetTracker";

export default function BudgetPage() {
  return (
    <div className="p-4">
      <BudgetTracker />
    </div>
  );
}
BUDGET

######################################
# 6. COMPONENT – Tools Grid
######################################
mkdir -p components/tools

cat << 'GRID' > components/ToolsGrid.jsx
import Link from "next/link";

const tools = [
  { name: "Budget Tracker", slug: "/budget-tracker" },
  { name: "Logo Generator", slug: "/logo-tool-soon" },
  { name: "PDF Tools", slug: "/pdf-soon" },
];

export default function ToolsGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 mt-4">
      {tools.map((t) => (
        <Link
          key={t.slug}
          href={t.slug}
          className="p-4 rounded bg-zinc-900 border border-zinc-700 hover:bg-zinc-800"
        >
          {t.name}
        </Link>
      ))}
    </div>
  );
}
GRID

######################################
# 7. COMPONENT – Budget Tracker (JS pasted)
######################################
cat << 'BT' > components/tools/BudgetTracker.jsx
"use client";

// TEMPORARY: Simple placeholder until full HTML->React conversion
export default function BudgetTracker() {
  return (
    <div className="text-white">
      <p className="opacity-70">Budget Tracker tool will be fully ported soon.</p>
    </div>
  );
}
BT

echo "✅ OTS App Router structure installed."
echo "Run:  npm install  &&  npm run dev"
