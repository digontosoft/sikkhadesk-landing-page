"use client"

import * as React from "react"
import { Info } from "lucide-react"

import { BillingToggle, type BillingPeriod } from "@/components/sections/pricing/billing-toggle"
import { PricingCard } from "@/components/sections/pricing/pricing-card"
import { pricingPlans } from "@/constants/pricing"

function PricingGrid() {
  const [billingPeriod, setBillingPeriod] = React.useState<BillingPeriod>("monthly")

  return (
    <div>
      <div className="flex flex-col items-center gap-3">
        <BillingToggle value={billingPeriod} onChange={setBillingPeriod} />
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Info className="text-primary size-4" />
          এক বছরের সাবস্ক্রিপশনে ১০% ছাড় প্রযোজ্য হবে।
        </p>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} billingPeriod={billingPeriod} index={index} />
        ))}
      </div>
    </div>
  )
}

export { PricingGrid }
