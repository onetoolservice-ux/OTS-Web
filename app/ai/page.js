"use client";
import { useState } from "react";

export default function AIPage() {
  const [q, setQ] = useState("");
  const [ans, setAns] = useState("Ask any question…");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Ask OTS AI</h2>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="border p-2 rounded w-full"
        placeholder="Ask anything…"
      />

      <button
        onClick={() => setAns("Demo Answer: " + q)}
        className="mt-4 px-4 py-2 bg-brand-blue text-white rounded"
      >
        Ask
      </button>

      <div className="mt-4 p-3 bg-gray-100 dark:bg-gray-800 rounded">
        {ans}
      </div>
    </div>
  );
}
