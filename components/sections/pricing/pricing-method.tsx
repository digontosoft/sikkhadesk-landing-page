import { Infinity as InfinityIcon, Users } from "lucide-react"

import { pricingMethod } from "@/constants/pricing"

const icons = [Users, Users, InfinityIcon]

function PricingMethod() {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-8">
      <h3 className="text-brand-emerald mb-6 text-center text-lg font-bold">
        আমাদের মূল্য নির্ধারণ পদ্ধতি
      </h3>
      <div className="grid gap-8 sm:grid-cols-3">
        {pricingMethod.map((item, index) => {
          const Icon = icons[index]

          return (
            <div key={item.range} className="flex items-start gap-3 sm:justify-center">
              <Icon className="text-primary mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{item.range}</p>
                <p className="text-brand-emerald text-sm font-medium">{item.highlight}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { PricingMethod }
