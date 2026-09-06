import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlanThumbnailUrl(url?: string): string {
  if (!url) return "";
  if (typeof url === "string" && url.includes("/upload/") && !url.includes("/pg_")) {
    return url.replace("/upload/", "/upload/pg_1/").replace(/\.pdf$/i, ".jpg");
  }
  return url;
}
