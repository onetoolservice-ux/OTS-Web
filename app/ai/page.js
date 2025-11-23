"use client";
import { useState } from "react";

export default function AIPage() {
  const [q, setQ] = useState("");
  const [messages, setMessages] = useState([
    { from: "ai", text: "Hi! I am OTS AI — Ask me anything ✨" }
  ]);

  const sendMessage = () => {
    if (!q.trim()) return;
    setMessages([...messages, { from: "user", text: q }, { from: "ai", text: "Demo Answer: " + q }]);
    setQ("");
  };

  return (
    <div className="container-max flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Ask OTS AI</h1>

      <div className="h-[60vh] overflow-y-auto p-4 bg-white dark:bg-[#07121a] shadow-subtle rounded-xl">
        {messages.map((msg, i) => (
          <div key={i} className={`flex mb-3 ${msg.from === "user" ? "justify-end" : ""}`}>
            <div
              className={`
                px-4 py-3 max-w-[80%] rounded-2xl shadow-subtle
                ${msg.from === "user"
                  ? "bg-brand-blue text-white rounded-br-none"
                  : "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 rounded-bl-none"
                }
              `}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <input
          className="flex-1 p-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900"
          placeholder="Ask anything…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="px-5 bg-brand-blue text-white rounded-xl shadow-soft"
        >
          Send
        </button>
      </div>
    </div>
  );
}
