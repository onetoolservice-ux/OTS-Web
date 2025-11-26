import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "One Tool Solutions",
  description: "Unified platform for AI & Utility Tools",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
