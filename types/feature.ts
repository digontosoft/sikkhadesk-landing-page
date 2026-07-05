import type { LucideIcon } from "lucide-react"

export type FeatureColor = "primary" | "emerald" | "amber" | "blue" | "rose" | "teal"

export interface Feature {
  icon: LucideIcon
  title: string
  description: string
  color: FeatureColor
}
