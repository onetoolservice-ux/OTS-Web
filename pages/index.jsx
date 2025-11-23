import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-5xl mx-auto p-6">
      <section className="py-12 text-center">
        <h1 className="text-5xl font-bold mb-4">One Tool</h1>
        <p className="text-lg opacity-70 mb-6">All the small utilities and AI tools in one place.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/tools"><a className="px-4 py-2 bg-blue-600 text-white rounded">Explore Tools</a></Link>
          <Link href="/ai"><a className="px-4 py-2 border rounded">Open AI</a></Link>
        </div>
      </section>
    </main>
  );
}
