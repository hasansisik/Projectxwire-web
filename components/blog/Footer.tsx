"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Container } from "@/components/blog/Container";
import { StoreButtons } from "@/components/blog/StoreButtons";

export function Footer() {
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const productLinks = [
    { name: "Özellikler", href: "/#features" },
    { name: "Tanıtım Videosu", href: "/#video" },
    { name: "Müşteri Yorumları", href: "/#testimonials" },
    { name: "Sıkça Sorulan Sorular", href: "/#faq" },
  ];

  const legalLinks = [
    { name: "Hakkımızda", href: "/politcy/about-us" },
    { name: "Gizlilik Politikası", href: "/politcy/privacy" },
    { name: "Kullanım Koşulları", href: "/politcy/terms" },
    { name: "Çerez Politikası", href: "/politcy/cookie" },
  ];

  return (
    <footer className="w-full mt-16 border-t border-gray-200/70 dark:border-zinc-800/80 bg-gray-50/50 dark:bg-zinc-950/40">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          {/* Sütun 1: Logo, Açıklama ve Mağaza Butonları */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src={isDarkMode ? "/img/logo-white.png" : "/img/logo-black.png"}
                width={190}
                height={55}
                alt="Projectxwire"
                className="h-10 w-auto object-contain"
              />
            </Link>

            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 max-w-sm">
              İnşaat sahalarında sorun bildirimlerini hızlandıran, ekipler arası iletişimi ve
              dijital belge akışını optimize eden yeni nesil yönetim platformu.
            </p>

            <div className="pt-2">
              <StoreButtons idPrefix="footer" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5" />
            </div>
          </div>

          {/* Sütun 2: Ürün */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-gray-100 uppercase mb-4">
              Ürün
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sütun 3: Kurumsal & Yasal */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-gray-100 uppercase mb-4">
              Kurumsal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sütun 4: Sosyal Medya & Geliştirici */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-gray-900 dark:text-gray-100 uppercase mb-4">
              Bizi Takip Edin
            </h3>
            <div className="flex items-center space-x-3 text-gray-500 dark:text-gray-400">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 dark:bg-zinc-800 hover:bg-orange-50 dark:hover:bg-orange-950/40 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
              >
                <Linkedin size={18} />
              </a>
            </div>

          </div>
        </div>

        {/* Alt Telif Çubuğu */}
        <div className="py-6 border-t border-gray-200/60 dark:border-zinc-800/70 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 dark:text-gray-400 gap-4">
          <div>
            © {new Date().getFullYear()}{" "}
            <strong className="font-semibold text-gray-700 dark:text-gray-300">Projectxwire</strong>. Tüm hakları saklıdır.
          </div>
          <div>
            <a
              href="https://gegify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block opacity-85 hover:opacity-100 transition-opacity"
            >
              <Image
                src="/img/gegify.svg"
                alt="Gegify"
                width={125}
                height={26}
                className="h-6 w-auto object-contain"
              />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

const Twitter = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 4.37a9.6 9.6 0 0 1-2.83.8 5.04 5.04 0 0 0 2.17-2.8c-.95.58-2 1-3.13 1.22A4.86 4.86 0 0 0 16.61 2a4.99 4.99 0 0 0-4.79 6.2A13.87 13.87 0 0 1 1.67 2.92 5.12 5.12 0 0 0 3.2 9.67a4.82 4.82 0 0 1-2.23-.64v.07c0 2.44 1.7 4.48 3.95 4.95a4.84 4.84 0 0 1-2.22.08c.63 2.01 2.45 3.47 4.6 3.51A9.72 9.72 0 0 1 0 19.74 13.68 13.68 0 0 0 7.55 22c9.06 0 14-7.7 14-14.37v-.65c.96-.71 1.79-1.6 2.45-2.61z" />
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.5c-1.5 0-1.96.93-1.96 1.89v2.26h3.32l-.53 3.5h-2.8V24C19.62 23.1 24 18.1 24 12.07" />
  </svg>
);
const Instagram = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M16.98 0a6.9 6.9 0 0 1 5.08 1.98A6.94 6.94 0 0 1 24 7.02v9.96c0 2.08-.68 3.87-1.98 5.13A7.14 7.14 0 0 1 16.94 24H7.06a7.06 7.06 0 0 1-5.03-1.89A6.96 6.96 0 0 1 0 16.94V7.02C0 2.8 2.8 0 7.02 0h9.96zm.05 2.23H7.06c-1.45 0-2.7.43-3.53 1.25a4.82 4.82 0 0 0-1.3 3.54v9.92c0 1.5.43 2.7 1.3 3.58a5 5 0 0 0 3.53 1.25h9.88a5 5 0 0 0 3.53-1.25 4.73 4.73 0 0 0 1.4-3.54V7.02a5 5 0 0 0-1.3-3.49 4.82 4.82 0 0 0-3.54-1.3zM12 5.76c3.39 0 6.2 2.8 6.2 6.2a6.2 6.2 0 0 1-12.4 0 6.2 6.2 0 0 1 6.2-6.2zm0 2.22a3.99 3.99 0 0 0-3.97 3.97A3.99 3.99 0 0 0 12 15.92a3.99 3.99 0 0 0 3.97-3.97A3.99 3.99 0 0 0 12 7.98zm6.44-3.77a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8z" />
  </svg>
);

const Linkedin = ({ size = 24 }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87 0-1.06.8-1.87 2.05-1.87 1.24 0 2 .8 2.02 1.87 0 1.04-.78 1.87-2.05 1.87zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.39 0 4.18 1.56 4.18 4.89v6.21z" />
  </svg>
);
