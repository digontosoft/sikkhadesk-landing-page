import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const bnNumberFormat = new Intl.NumberFormat("bn-BD")

export function formatBn(value: number) {
  return bnNumberFormat.format(value)
}
