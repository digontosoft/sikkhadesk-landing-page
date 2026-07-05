import type { LucideIcon } from "lucide-react"

export type PricingBadgeTone = "blue" | "green"

export interface StudentRange {
  label: string
  price: number
  suffix?: string
  note?: string
}

export interface PricingPlan {
  icon: LucideIcon
  name: string
  color: "blue" | "teal" | "amber" | "indigo"
  badge?: { label: string; tone: PricingBadgeTone }
  oneTimePayment: string
  studentRanges: StudentRange[]
  defaultRangeIndex: number
  features: string[]
  featuresTitle: string
  cta: string
  href: string
  isCustom?: boolean
  highlight?: boolean
}
