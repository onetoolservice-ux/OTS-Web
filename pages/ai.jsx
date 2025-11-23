import { useState } from "react";

export default function AIPage() {
  const [prompt, setPrompt] = useState('');
  const [res, setRes] = useState('');

  async function run() {
    const r = await fetch('/api/ai', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ prompt })
    });
    const j = await r.json();
    setRes(JSON.stringify(j, null, 2));
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">AI Assistant</h1>
      <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full border p-3" rows={6} />
      <button onClick={run} className="px-4 py-2 bg-blue-600 text-white rounded mt-3">Run</button>
      <pre className="mt-4 bg-gray-100 p-3 rounded">{res}</pre>
    </div>
  );
}
