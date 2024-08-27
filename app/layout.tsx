"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Provider } from "react-redux";
import { SpeedInsights } from "@vercel/speed-insights/next";
import store from "../redux/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={cn(poppins.className, "light")}>
        <Provider store={store}>{children}</Provider>
      </body>
      <SpeedInsights />
    </html>
  );
}
