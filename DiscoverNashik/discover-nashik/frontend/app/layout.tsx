import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/i18n";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingAiBot from "@/components/FloatingAiBot";

export const metadata: Metadata = {
  title: "Discover Nashik — Digital Companion for Every Pilgrim",
  description:
    "Map-based digital companion for pilgrims visiting Nashik and Trimbakeshwar during Kumbh Mela 2027.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <I18nProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <FloatingAiBot />
        </I18nProvider>
      </body>
    </html>
  );
}
