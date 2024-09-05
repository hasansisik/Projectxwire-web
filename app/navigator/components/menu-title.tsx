import { useEffect, useState } from "react";
import Image from "next/image";

export default function MenuTitle() {
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

  return (
    <div className="flex items-center p-4 justify-center">
      <Image
        src={isDarkMode ? "/img/logo-white.png" : "/img/logo-black.png"}
        width="180"
        height="50"
        alt="Projectxwire"
        style={{ width: "180px", height: "50px" }}
      />
    </div>
  );
}
