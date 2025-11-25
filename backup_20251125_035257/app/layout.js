export const metadata = {
  title: "One Tool Solutions",
  description: "A unified platform for AI tools & utilities.",
};

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white text-otsDark">
        <Navbar />
        <main className="min-h-screen px-4 pt-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
