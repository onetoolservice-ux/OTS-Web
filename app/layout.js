import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'One Tool Solutions (OTS)',
  description: 'A unified platform for AI Tools, Utility Tools and Productivity',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="ots-root bg-gray-50 text-slate-800">
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
