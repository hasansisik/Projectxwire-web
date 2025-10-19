"use client";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";

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
      <head>
        <Script
          id="chat-init"
          src="https://app.dialogfusion.com/account/js/init.js?id=6601422"
          strategy="afterInteractive"
        />
      </head>
      <body className={cn(poppins.className, "light")}>
        <Provider store={store}>{children}</Provider>
        <SpeedInsights />
      </body>
    </html>
  );
}
