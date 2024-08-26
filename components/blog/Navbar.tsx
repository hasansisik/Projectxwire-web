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
      <nav className="container relative flex flex-wrap items-center justify-between p-8 mx-auto lg:justify-between xl:px-0">
        {/* Logo  */}
        <>
          <div className="flex flex-wrap items-center justify-between w-full lg:w-auto">
            <Link href="/">
              <Image
                src={isDarkMode ? "/planwireWhite.png" : "/planwireBlack.png"}
                width="140"
                height="35"
                alt="Planwire"
                style={{ width: "140px", height: "35px" }}
              />
            </Link>
          </div>
        </>
        <div className="hidden mr-3 space-x-4 lg:flex nav__item">
          <Link href={navigationHref}>
            <span className="px-6 py-2 text-white bg-orange-600 rounded-md md:ml-5">
              Panele Git
            </span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
