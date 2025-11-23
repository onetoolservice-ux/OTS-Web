import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function ToolPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [tool, setTool] = useState(null);

  useEffect(() => {
    if (!slug) return;
    fetch('/api/tools').then(r=>r.json()).then(d => {
      const f = (d.items || []).find(t => t.slug === slug);
      setTool(f || null);
    });
  }, [slug]);

  if (!tool) return <div className="p-6">Loading...</div>;

  if (tool.type === "client") {
    return <iframe src={`/tools-client/${tool.slug}`} className="w-full h-[80vh] border-0" />;
  }

  if (tool.type === "ai") {
    return <div className="p-6">Use AI page instead.</div>;
  }

  return (
    <div className="p-6">
      <a href={tool.externalUrl} className="text-blue-600 underline">Open external tool</a>
    </div>
  );
}
