import "../styles/globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "One Tool Solutions",
  description: "One Tool - AI & Utility tools"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-gray-900">
        <Navbar />
        <main className="max-w-5xl mx-auto p-6">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
