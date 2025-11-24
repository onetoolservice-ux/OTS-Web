export const metadata = {
  title: "One Tool – OTS",
  description: "Unified tools for everyone."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
