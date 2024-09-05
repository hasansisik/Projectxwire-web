"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [navigationHref, setNavigationHref] = useState("/");

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
        setNavigationHref("/projects");
      } else {
        setNavigationHref("/welcome");
      }
    } else {
      setNavigationHref("/company");
    }
  }, []);

  return (
    <div className="w-full">
      <nav className="container relative flex items-center justify-between p-8 mx-auto">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src={isDarkMode ? "/img/logo-white.png" : "/img/logo-black.png"}
              width="240"
              height="75"
              alt="Projectxwire"
              style={{ width: "240", height: "75px" }}
            />
          </Link>
        </div>
        {/* Buton */}
        <div className="ml-auto">
          <Link href={navigationHref}>
            <span className="px-6 py-2 text-white bg-orange-600 rounded-md">
              Panele Git
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
