export default function Header() {
  return (
    <header className="w-full bg-white dark:bg-black shadow p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">OTS</h1>
      <nav className="flex gap-4 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/tools" className="hover:underline">Tools</a>
        <a href="/about" className="hover:underline">About</a>
      </nav>
    </header>
  );
}
