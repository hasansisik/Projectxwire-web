"use client";
import MainMenu from "./components/main-menu";
import { Toaster } from "@/components/ui/toaster";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="md:grid md:grid-cols-[250px_1fr] h-screen">
      <MainMenu className="hidden md:flex" />
      <div className="overflow-auto px-10 py-5">
        {children}
        <Toaster />
      </div>
    </div>
  );
}
