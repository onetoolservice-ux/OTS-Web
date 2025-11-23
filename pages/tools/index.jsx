import { useEffect, useState } from "react";
import ToolCard from "../../components/ToolCard";

export default function ToolsPage() {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetch('/api/tools')
      .then(r => r.json())
      .then(d => setTools(d.items || []));
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">Tools</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(t => <ToolCard key={t.id} tool={t} />)}
      </div>
    </div>
  );
}
