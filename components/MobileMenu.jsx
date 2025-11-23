"use client";

export default function MobileMenu({ open, setOpen }) {
  return (
    <div
      className={`fixed inset-0 bg-black/40 ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 p-4 shadow transform 
          ${open ? "translate-x-0" : "-translate-x-full"} transition-transform`}
      >
        <h2 className="text-lg font-bold mb-4">Menu</h2>

        <nav className="flex flex-col gap-3">
          <a href="/" onClick={() => setOpen(false)}>Home</a>
          <a href="/ai" onClick={() => setOpen(false)}>AI</a>
          <a href="/tools" onClick={() => setOpen(false)}>Tools</a>
          <a href="/learn" onClick={() => setOpen(false)}>Learn</a>
          <a href="/about" onClick={() => setOpen(false)}>About</a>
          <a href="/privacy" onClick={() => setOpen(false)}>Privacy</a>
          <a href="/terms" onClick={() => setOpen(false)}>Terms</a>
        </nav>
      </div>
    </div>
  );
}
