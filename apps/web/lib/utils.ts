import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_URL } from "./constants";

export const capitalize = (s: string) =>
  s.charAt(0).toUpperCase() + s.slice(1).split("-").join(" ") || "";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function apiFetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      `Failed to fetch: ${errorData.message || response.statusText}`
    );
  }
  return response.json();
}
