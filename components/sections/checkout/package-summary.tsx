import { Check } from "lucide-react"

import { PriceText } from "@/components/sections/checkout/price-text"
import { cn } from "@/lib/utils"
import type { OrderBreakdown } from "@/types/checkout"
import type { PricingPlan } from "@/types/pricing"

interface PackageSummaryProps {
  plan: PricingPlan
  rangeLabel: string
  breakdown: OrderBreakdown
}

function PackageSummary({ plan, rangeLabel, breakdown }: PackageSummaryProps) {
  const Icon = plan.icon

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
            <Icon className="size-5" />
          </span>
          <div className="min-w-0">
            <h3 className="font-bold text-foreground">{plan.name}</h3>
            <p className="text-xs text-muted-foreground">{rangeLabel}</p>
          </div>
        </div>
        {plan.badge ? (
          <span
            className={cn(
              "shrink-0 rounded-lg px-2 py-1 text-[10px] font-semibold text-white sm:px-2.5 sm:text-[11px]",
              plan.badge.tone === "green" ? "bg-brand-emerald" : "bg-primary"
            )}
          >
            {plan.badge.label}
          </span>
        ) : null}
      </div>

      <div className="mb-4">
        <div className="flex items-baseline gap-1 text-foreground">
          <PriceText
            amount={breakdown.monthlyPrice}
            className="text-2xl font-bold"
            iconClassName="size-5"
          />
          <span className="text-sm text-muted-foreground">/মাস</span>
        </div>
        {breakdown.isYearly ? (
          <p className="mt-1 text-sm text-muted-foreground">
            বার্ষিক বিলিং (
            <PriceText amount={breakdown.subscriptionTotal} />
            /বছর)
          </p>
        ) : null}
      </div>

      <ul className="flex flex-col gap-2">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2 text-sm text-muted-foreground"
          >
            <Check className="text-primary mt-0.5 size-4 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { PackageSummary }
