import { 
  Cpu, Edit, FileText, Languages, Calculator, BookOpen, PenTool 
} from "lucide-react";

const tools = [
  { name: "AI Writer", icon: Edit },
  { name: "PDF Tools", icon: FileText },
  { name: "Translator", icon: Languages },
  { name: "Calculator", icon: Calculator },
  { name: "Study Helper", icon: BookOpen },
  { name: "Content Rewriter", icon: PenTool },
  { name: "Ask AI", icon: Cpu }
];

export default function Tools() {
  return (
    <div className="container-max">
      <h1 className="text-3xl font-bold mb-6">Tools</h1>

      <div className="grid gap-5 md:grid-cols-3">
        {tools.map(({ name, icon: Icon }) => (
          <div
            key={name}
            className="p-5 bg-white dark:bg-[#07121a] rounded-xl shadow-subtle hover:shadow-soft transition-all cursor-pointer group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:scale-110 transition-transform">
                <Icon className="text-brand-blue" size={22} />
              </div>
              <div className="font-semibold">{name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
