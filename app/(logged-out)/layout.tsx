import type { Metadata } from "next";
import "../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/blog/Navbar";
import { Footer } from "@/components/blog/Footer";
import { LightDarkToggle } from "@/components/ui/light-dark-toggle";

export const metadata: Metadata = {
  title: "Planwire",
  description: "Şantiye Yönetim Sistemi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center gap-5 sm:p-20">
        {children}
      </div>
      <Toaster />
      <Footer />
      <LightDarkToggle className="fixed top-[calc(50%-12px)] right-2" />
    </div>
  );
}
