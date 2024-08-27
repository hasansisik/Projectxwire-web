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
        src={isDarkMode ? "/img/planwireWhite.png" : "/img/planwireBlack.png"}
        width="140"
        height="35"
        alt="Planwire"
        style={{ width: "140px", height: "35px" }}
      />
    </div>
  );
}
