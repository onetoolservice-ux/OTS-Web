export const metadata = {
  title: "JSON Formatter | One Tool Solutions",
  description: "Format your JSON instantly.",
};

export default function JSONFormatter() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">JSON Formatter</h1>
      <p className="text-neutral-600 mb-8">Paste JSON — formatted output UI coming soon.</p>

      <div className="border rounded-lg p-6 bg-white shadow-sm">
        <p className="text-neutral-500">JSON editor will be displayed here.</p>
      </div>
    </main>
  );
}
