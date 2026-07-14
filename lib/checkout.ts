import {
  VAT_RATE,
  YEARLY_DISCOUNT_RATE,
} from "@/constants/checkout"
import { pricingPlans } from "@/constants/pricing"
import type { BillingPeriod } from "@/components/sections/pricing/billing-toggle"
import type { OrderBreakdown } from "@/types/checkout"
import type { PricingPlan } from "@/types/pricing"

export function getPlanById(planId: string | null | undefined) {
  return pricingPlans.find((plan) => plan.id === planId) ?? null
}

export function buildCheckoutHref(
  plan: PricingPlan,
  rangeIndex: number,
  billing: BillingPeriod
) {
  if (plan.isCustom) {
    return "/contact"
  }

  const range = plan.studentRanges[rangeIndex]
  if (range?.contactOnly) {
    return "/contact"
  }

  const params = new URLSearchParams({
    plan: plan.id,
    range: String(rangeIndex),
    billing,
  })

  return `/checkout?${params.toString()}`
}

export function calculateOrderBreakdown(
  plan: PricingPlan,
  rangeIndex: number,
  billing: BillingPeriod
): OrderBreakdown {
  const range = plan.studentRanges[rangeIndex] ?? plan.studentRanges[0]
  const monthlyPrice = range?.price ?? 0
  const contactOnly = Boolean(range?.contactOnly)
  const isYearly = billing === "yearly"
  const yearlyFull = monthlyPrice * 12
  const yearlyDiscount = isYearly
    ? Math.round(yearlyFull * YEARLY_DISCOUNT_RATE)
    : 0
  const subscriptionTotal = isYearly
    ? yearlyFull - yearlyDiscount
    : monthlyPrice
  const oneTimeFee = plan.oneTimeFee
  const taxable = contactOnly ? oneTimeFee : subscriptionTotal + oneTimeFee
  const vatAmount = Math.round(taxable * VAT_RATE)
  const payableTotal = taxable + vatAmount

  return {
    monthlyPrice,
    yearlyFull,
    yearlyDiscount,
    subscriptionTotal,
    oneTimeFee,
    vatRate: VAT_RATE,
    vatAmount,
    payableTotal,
    isYearly,
    contactOnly,
  }
}
