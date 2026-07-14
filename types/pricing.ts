import type { LucideIcon } from "lucide-react"

export type PricingBadgeTone = "blue" | "green"

export interface StudentRange {
  label: string
  price: number
  suffix?: string
  note?: string
  contactOnly?: boolean
}

export interface PricingPlan {
  id: "basic" | "standard" | "premium" | "custom"
  icon: LucideIcon
  name: string
  color: "blue" | "teal" | "amber" | "indigo"
  badge?: { label: string; tone: PricingBadgeTone }
  oneTimePayment: string
  oneTimeFee: number
  studentRanges: StudentRange[]
  defaultRangeIndex: number
  features: string[]
  featuresTitle: string
  cta: string
  href: string
  isCustom?: boolean
  highlight?: boolean
}

export interface PricingMethodPrice {
  plan: string
  price: number
}

export interface PricingMethodItem {
  range: string
  description: string
  contactOnly?: boolean
  prices?: PricingMethodPrice[]
}
