import type { LucideIcon } from "lucide-react"

export interface FaqQuestion {
  question: string
  answer: string
}

export interface FaqCategory {
  icon: LucideIcon
  color: "blue" | "emerald"
  title: string
  description: string
  items: FaqQuestion[]
}
