"use client";

import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";
import { MoonIcon, SunIcon } from "lucide-react";

type Props = {
    className?: string;
}

export function LightDarkToggle({ className }: Props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger 
        className={className}
        onClick={()=>{
            setIsDarkMode((prevValue) => !prevValue);
            document.body.classList.toggle("dark");
        }}>
            {isDarkMode ? <MoonIcon /> : <SunIcon />}
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>
          {isDarkMode ? "Aydınlık Tema" : "Karanlık Tema"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
