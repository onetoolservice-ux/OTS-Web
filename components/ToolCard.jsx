import Link from "next/link";

export default function ToolCard({ tool }) {
  const href = tool.type === "external" ? (tool.externalUrl || "#") : `/tools/${tool.slug}`;
  return (
    <Link href={href}>
      <a className="p-5 bg-white rounded-2xl shadow hover:shadow-lg transition block">
        <div className="text-3xl mb-3">{tool.icon || "🔧"}</div>
        <div className="font-semibold text-lg">{tool.name}</div>
        <p className="text-sm opacity-70 mt-2">{tool.description}</p>
      </a>
    </Link>
  );
}
