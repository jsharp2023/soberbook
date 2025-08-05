import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"


/**
 * Combine class names using clsx and tailwind-merge
 * to avoid duplicate/conflicting Tailwind classes.
 */
export function cn(...inputs: any[]) {
  return twMerge(clsx(inputs))
}
