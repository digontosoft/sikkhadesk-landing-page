import { Infinity as InfinityIcon, Users } from "lucide-react"
import { FaBangladeshiTakaSign } from "react-icons/fa6"

import { pricingMethod } from "@/constants/pricing"

function PricingMethod() {
  return (
    <div className="mt-10 rounded-2xl border border-border bg-card p-8">
      <h3 className="text-brand-emerald mb-6 text-center text-lg font-bold">
        আমাদের মূল্য নির্ধারণ পদ্ধতি
      </h3>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pricingMethod.map((item) => {
          const Icon = item.contactOnly ? InfinityIcon : Users

          return (
            <div key={item.range} className="flex items-start gap-3">
              <Icon className="text-primary mt-0.5 size-5 shrink-0" />
              <div>
                <p className="font-semibold text-foreground">{item.range}</p>
                {item.contactOnly ? (
                  <p className="text-brand-emerald text-sm font-medium">
                    আলোচনা সাপেক্ষে
                  </p>
                ) : (
                  <ul className="mt-1 flex flex-col gap-0.5">
                    {item.prices?.map(({ plan, price }) => (
                      <li
                        key={plan}
                        className="text-brand-emerald inline-flex items-center gap-1 text-sm font-medium"
                      >
                        <span>{plan}:</span>
                        <span className="inline-flex items-center gap-0.5">
                          <FaBangladeshiTakaSign className="size-3 shrink-0" />
                          {price}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export { PricingMethod }
