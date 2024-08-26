"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Icons from "lucide-react";
import { useContext } from "react";
import { DrawerContext } from "@/components/ui/drawer";

type Props = {
  children: string;
  href: string;
  icon?: keyof typeof Icons;
  className?: string;
};

export default function MenuItem({ children, href, icon, className }: Props) {
  const { onClose } = useContext(DrawerContext);
  const pathName = usePathname();
  const isActive = pathName === href;
  const IconComponent = icon ? (Icons[icon] as React.ElementType) : null;

  return (
    <li>
      <Link
        className={cn(
          "px-3 py-2 hover:bg-white dark:hover:bg-zinc-700 rounded-md text-foreground hover:text-foreground flex items-center gap-x-2 font-medium text-sm",
          isActive &&
            "bg-primary hover:bg-primary dark:hover:bg-primary hover:text-primary-foreground text-primary-foreground",
          className
        )}
        href={href}
        onClick={onClose}
      >
        {IconComponent ? <IconComponent className="inline-block mr-2" /> : null}
        {children}
      </Link>
    </li>
  );
}
