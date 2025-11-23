import { Lightbulb, Brain, BookOpenCheck, PenLine } from "lucide-react";

const topics = [
  { title: "Smart Study", icon: Lightbulb, text: "Revision, summaries, notes & plans." },
  { title: "Skill Upgrade", icon: Brain, text: "Coding, logic, computer skills." },
  { title: "AI Learning", icon: BookOpenCheck, text: "Prompts, workflows & automation." },
  { title: "Creative Writing", icon: PenLine, text: "Story, article & content help." }
];

export default function Learn() {
  return (
    <div className="container-max">
      <h1 className="text-3xl font-bold mb-6">Learn</h1>

      <div className="grid gap-5 md:grid-cols-2">
        {topics.map(({ title, icon: Icon, text }) => (
          <div
            key={title}
            className="p-6 bg-white dark:bg-[#07121a] rounded-xl shadow-subtle hover:shadow-soft transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
                <Icon className="text-brand-blue" size={22} />
              </div>
              <div>
                <div className="font-semibold text-lg">{title}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{text}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
