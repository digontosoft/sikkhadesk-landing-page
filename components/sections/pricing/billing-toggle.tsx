"use client"

import * as React from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export type BillingPeriod = "monthly" | "yearly"

interface BillingToggleProps {
  value: BillingPeriod
  onChange: (value: BillingPeriod) => void
}

function BillingToggle({ value, onChange }: BillingToggleProps) {
  const monthlyRef = React.useRef<HTMLButtonElement>(null)
  const yearlyRef = React.useRef<HTMLButtonElement>(null)
  const [indicator, setIndicator] = React.useState({ left: 0, width: 0 })

  React.useLayoutEffect(() => {
    const el = value === "monthly" ? monthlyRef.current : yearlyRef.current
    if (el) {
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth })
    }
  }, [value])

  return (
    <div className="relative inline-flex items-center gap-1 rounded-2xl border border-border bg-card p-1.5 shadow-sm">
      <motion.span
        aria-hidden
        className="bg-gradient-primary absolute inset-y-1.5 rounded-xl"
        initial={false}
        animate={{ left: indicator.left, width: indicator.width }}
        transition={{ type: "spring", stiffness: 400, damping: 32 }}
      />

      <button
        ref={monthlyRef}
        type="button"
        onClick={() => onChange("monthly")}
        className={cn(
          "relative z-10 flex cursor-pointer flex-col items-center rounded-xl px-6 py-2 text-sm transition-colors",
          value === "monthly" ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="font-semibold">Monthly</span>
        <span className="text-xs opacity-90">মাসিক</span>
      </button>

      <button
        ref={yearlyRef}
        type="button"
        onClick={() => onChange("yearly")}
        className={cn(
          "relative z-10 flex cursor-pointer flex-col items-center rounded-xl px-6 py-2 text-sm transition-colors",
          value === "yearly" ? "text-white" : "text-muted-foreground hover:text-foreground"
        )}
      >
        <span className="flex items-center gap-2 font-semibold">
          Yearly
          <span className="bg-brand-emerald/15 text-brand-emerald rounded-full px-2 py-0.5 text-[11px] font-bold">
            ১০% ছাড়
          </span>
        </span>
        <span className="text-xs opacity-90">বার্ষিক</span>
      </button>
    </div>
  )
}

export { BillingToggle }
