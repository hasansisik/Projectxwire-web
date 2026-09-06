"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navigationHref, setNavigationHref] = useState("/login");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const className = document.body.className;
    setIsDarkMode(className.includes("dark"));

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const className = document.body.className;
          setIsDarkMode(className.includes("dark"));
        }
      });
    });

    observer.observe(document.body, {
      attributes: true,
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const companyId = localStorage.getItem("companyId");
    const user = localStorage.getItem("accessToken");

    if (companyId) {
      if (user) {
        setNavigationHref("/sites");
      } else {
        setNavigationHref("/welcome");
      }
    } else {
      setNavigationHref("/login");
    }
  }, []);

  const navLinks = [
    { name: "Özellikler", href: "/#features" },
    { name: "Nasıl Çalışır?", href: "/#video" },
    { name: "Yorumlar", href: "/#testimonials" },
    { name: "SSS", href: "/#faq" },
    { name: "Hakkımızda", href: "/politcy/about-us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-gray-100 dark:border-zinc-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center focus:outline-none">
              <Image
                src={isDarkMode ? "/img/logo-white.png" : "/img/logo-black.png"}
                width={190}
                height={55}
                alt="Projectxwire"
                priority
                className="h-10 w-auto object-contain transition-opacity duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3.5 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 rounded-lg hover:bg-orange-50/50 dark:hover:bg-zinc-800/50 transition-all duration-150"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href={navigationHref}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-sm shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Panele Git</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none"
              aria-label="Menüyü aç/kapat"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-100 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-lg px-4 pt-2 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-zinc-800/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="pt-2">
            <Link
              href={navigationHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md shadow-orange-500/25 transition-all"
            >
              <span>Panele Git</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

