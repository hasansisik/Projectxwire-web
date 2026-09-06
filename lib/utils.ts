import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getPlanThumbnailUrl(url?: string | string[]): string {
  if (!url) return "";
  const targetUrl = Array.isArray(url) ? url[0] : url;
  if (typeof targetUrl === "string" && targetUrl.includes("/upload/") && !targetUrl.includes("/pg_")) {
    return targetUrl.replace("/upload/", "/upload/pg_1/").replace(/\.pdf$/i, ".jpg");
  }
  return targetUrl || "";
}
