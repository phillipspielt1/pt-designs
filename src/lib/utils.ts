import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * shadcn-style className combiner: clsx for conditional classes, then
 * tailwind-merge to resolve conflicting Tailwind utilities (e.g.
 * "px-2 px-4" -> "px-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
