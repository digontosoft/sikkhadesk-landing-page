import { Check } from "lucide-react"

import { checkoutSteps } from "@/constants/checkout"
import { cn } from "@/lib/utils"
import type { CheckoutStep } from "@/types/checkout"

interface CheckoutStepperProps {
  step: CheckoutStep
}

function CheckoutStepper({ step }: CheckoutStepperProps) {
  const activeIndex = step === "institution" ? 0 : 3

  return (
    <ol className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 px-4 py-6 sm:gap-0">
      {checkoutSteps.map((item, index) => {
        // Package is already selected from pricing, so mark it done on step 1.
        const completed =
          index < activeIndex || (step === "institution" && index === 1)
        const active = index === activeIndex
        const showConnector = index < checkoutSteps.length - 1

        return (
          <li key={item.id} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
              <span
                className={cn(
                  "flex size-8 items-center justify-center rounded-full text-sm font-semibold",
                  completed && !active && "bg-primary text-white",
                  active && "bg-primary text-white ring-4 ring-primary/20",
                  !completed && !active && "bg-muted text-muted-foreground"
                )}
              >
                {completed && !active ? (
                  <Check className="size-4" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "max-w-24 text-center text-xs font-medium sm:max-w-none sm:text-sm",
                  active || completed
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </div>
            {showConnector ? (
              <span
                className={cn(
                  "mx-2 hidden h-px w-8 sm:block md:w-14",
                  completed || index < activeIndex ? "bg-primary" : "bg-border"
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

export { CheckoutStepper }
