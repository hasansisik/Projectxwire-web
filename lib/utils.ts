import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCloudinaryUrl(url?: string | string[], pageNum: number = 1): string {
  if (!url) return "";
  const targetUrl = Array.isArray(url) ? url[0] : url;
  if (typeof targetUrl !== "string") return "";
  let formatted = targetUrl.trim();
  if (formatted.includes("/upload/")) {
    if (!formatted.includes("/pg_")) {
      formatted = formatted.replace("/upload/", `/upload/pg_${pageNum}/`);
    }
    if (formatted.endsWith(".pdf")) {
      formatted = formatted.replace(/\.pdf$/i, ".jpg");
    } else if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(formatted)) {
      formatted = formatted + ".jpg";
    }
  }
  return formatted;
}

export function getPlanThumbnailUrl(url?: string | string[]): string {
  return formatCloudinaryUrl(url, 1);
}

export function getAllPlanPageUrls(url?: string | string[], pageCount: number = 1): string[] {
  if (!url) return [];
  if (Array.isArray(url) && url.length > 0) {
    return url.map((u, idx) => formatCloudinaryUrl(u, idx + 1));
  }
  if (typeof url === "string" && url.trim() !== "") {
    const pCount = pageCount > 0 ? pageCount : 1;
    const urls: string[] = [];
    for (let i = 1; i <= pCount; i++) {
      urls.push(formatCloudinaryUrl(url, i));
    }
    return urls;
  }
  return [];
}
