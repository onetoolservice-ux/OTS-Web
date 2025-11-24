import LoadingScreen from "../components/LoadingScreen";

export const dynamic = "force-dynamic";
export const loading = () => <LoadingScreen />;
import "./globals.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export const metadata = {
                  title: "OTS — One Tool Solutions",
                        description: "Tools • AI • Productivity — all in one place.",
                              icons: { icon: "/icon.png" },
                                    metadataBase: new URL("https://onetool.co.in")
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <head>
                        <script type="application/ld+json">
                          {`
                          {
                                "@context": "https://schema.org",
                                  "@type": "WebSite",
                                    "name": "One Tool Solutions",
                                      "url": "https://onetool.co.in",
                                        "description": "All tools in one place — AI, utilities, productivity."
                          }
                          `}
                        </script>
                  </head>
                  <body className="min-h-screen bg-white text-slate-900">
                          <div className="flex min-h-screen">
                                    <Sidebar />
                                              <div className="flex-1 flex flex-col">
                                                          <Navbar />
                                                                      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">{children}</main>
                                                                      <footer className="border-t p-4 text-center text-sm text-gray-500">
                                                                        © 2025 One Tool Solutions — All rights reserved.
                                                                      </footer>
                                                                                </div>
                                                                                        </div>
                                                                                              </body>
                                                                                                  </html>
      );
}
