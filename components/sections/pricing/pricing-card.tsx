"use client"

import { motion } from "framer-motion"
import { Check, Gem, Users } from "lucide-react"
import * as React from "react"
import { FaBangladeshiTakaSign } from "react-icons/fa6"

import { CtaButton } from "@/components/common/cta-button"
import type { BillingPeriod } from "@/components/sections/pricing/billing-toggle"
import { buildCheckoutHref } from "@/lib/checkout"
import { cn } from "@/lib/utils"
import type { PricingPlan } from "@/types/pricing"

const iconStyles: Record<PricingPlan["color"], string> = {
  blue: "bg-brand-blue/10 text-brand-blue",
  teal: "bg-brand-teal/10 text-brand-teal",
  amber: "bg-brand-amber/10 text-brand-amber",
  indigo: "bg-primary/10 text-primary",
}

const nameStyles: Record<PricingPlan["color"], string> = {
  blue: "text-brand-blue",
  teal: "text-brand-teal",
  amber: "text-brand-amber",
  indigo: "text-primary",
}

const badgeStyles = {
  blue: "bg-primary text-white",
  green: "bg-brand-emerald text-white",
}

interface PricingCardProps {
  plan: PricingPlan
  billingPeriod: BillingPeriod
  index: number
}

function PricingCard({ plan, billingPeriod, index }: PricingCardProps) {
  const [selectedRange, setSelectedRange] = React.useState(
    plan.defaultRangeIndex
  )
  const Icon = plan.icon
  const activeRange = plan.studentRanges[selectedRange]
  const isYearly = billingPeriod === "yearly"

  function getRangePrice(price: number) {
    return isYearly ? Math.round(price * 12 * 0.9) : price
  }

  const displayPrice = activeRange?.contactOnly
    ? null
    : activeRange
      ? getRangePrice(activeRange.price)
      : null
  const priceUnitLabel = isYearly ? "/ বছর" : null

  const isGreenAccent = plan.badge?.tone === "green"

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={cn(
        "relative flex flex-col gap-5 rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg",
        plan.highlight
          ? "border-primary shadow-lg shadow-primary/10"
          : "border-border"
      )}
    >
      {plan.badge ? (
        <span
          className={cn(
            "absolute top-4 right-4 rounded-lg px-2.5 py-1 text-xs font-semibold",
            badgeStyles[plan.badge.tone]
          )}
        >
          {plan.badge.label}
        </span>
      ) : null}

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-xl",
            iconStyles[plan.color]
          )}
        >
          <Icon className="size-5" />
        </span>
        <h3 className={cn("text-lg font-bold", nameStyles[plan.color])}>
          {plan.name}
        </h3>
      </div>

      <div>
        {plan.isCustom ? (
          <>
            <span className="text-4xl font-bold text-foreground">Custom</span>
            <p className="mt-1 text-sm text-muted-foreground">
              প্রয়োজন অনুযায়ী সমাধান
            </p>
          </>
        ) : activeRange?.contactOnly ? (
          <>
            <span className="text-3xl font-bold text-foreground">
              আলোচনা সাপেক্ষে
            </span>
            <p className="mt-1 text-sm text-muted-foreground">
              কাস্টম মূল্য নির্ধারণ
            </p>
          </>
        ) : (
          <>
            <div className="flex items-baseline gap-1">
              <FaBangladeshiTakaSign className="size-7 shrink-0 text-foreground" />
              <span className="text-4xl font-bold text-foreground">
                {displayPrice}
                {activeRange?.suffix}
              </span>
            </div>
            {priceUnitLabel ? (
              <p className="mt-1 text-sm text-muted-foreground">
                {priceUnitLabel}
                {isYearly ? " (১০% ছাড়)" : null}
              </p>
            ) : null}
          </>
        )}
      </div>

      <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2.5 text-sm font-medium text-foreground">
        <Gem className="size-4 shrink-0 text-primary" />
        <span className="inline-flex items-center gap-1 font-semibold">
          এককালিন প্যামেন্ট:
          {plan.oneTimePayment === "N/A" ? (
            plan.oneTimePayment
          ) : (
            <>
              <FaBangladeshiTakaSign className="size-3 shrink-0" />
              {plan.oneTimePayment}
            </>
          )}
        </span>
      </div>

      {!plan.isCustom ? (
        <div>
          <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
            <Users className="size-4 text-primary" />
            স্টুডেন্ট রেঞ্জ
          </p>
          <div className="flex flex-col gap-2">
            {plan.studentRanges.map((range, rangeIndex) => {
              const selected = rangeIndex === selectedRange

              return (
                <button
                  key={range.label}
                  type="button"
                  onClick={() => setSelectedRange(rangeIndex)}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-colors",
                    selected
                      ? isGreenAccent
                        ? "border-brand-emerald bg-brand-emerald/5"
                        : "border-primary bg-primary/5"
                      : "border-border hover:border-primary/40"
                  )}
                >
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded-full border-2 text-white",
                      selected
                        ? isGreenAccent
                          ? "border-brand-emerald bg-brand-emerald"
                          : "border-primary bg-primary"
                        : "border-border"
                    )}
                  >
                    {selected ? <Check className="size-3" /> : null}
                  </span>
                  <div className="flex flex-1 items-center justify-between gap-3">
                    <p className="text-sm font-medium text-foreground">
                      {range.label}
                    </p>
                    {range.contactOnly ? (
                      <p className="shrink-0 text-xs text-muted-foreground">
                        {range.note ?? "আলোচনা সাপেক্ষে"}
                      </p>
                    ) : range.note ? (
                      <p className="shrink-0 text-xs text-muted-foreground">
                        {range.note}
                      </p>
                    ) : (
                      <span className="inline-flex shrink-0 items-center gap-0.5 text-sm font-medium text-muted-foreground">
                        <FaBangladeshiTakaSign className="size-3" />
                        {getRangePrice(range.price)}
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      ) : null}

      <div>
        <p className="mb-3 text-sm font-semibold text-foreground">
          {plan.featuresTitle}
        </p>
        <ul className="flex flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex justify-center">
        <CtaButton
          href={buildCheckoutHref(plan, selectedRange, billingPeriod)}
          size="lg"
          className="justify-center"
        >
          {plan.cta}
        </CtaButton>
      </div>
    </motion.div>
  )
}

export { PricingCard }
