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
    <ol className="mx-auto grid w-full max-w-4xl grid-cols-2 gap-x-2 gap-y-4 px-3 py-5 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-0 sm:px-4 sm:py-6">
      {checkoutSteps.map((item, index) => {
        const completed =
          index < activeIndex || (step === "institution" && index === 1)
        const active = index === activeIndex
        const showConnector = index < checkoutSteps.length - 1

        return (
          <li
            key={item.id}
            className="flex min-w-0 items-center justify-center sm:justify-start"
          >
            <div className="flex min-w-0 flex-col items-center gap-1.5 sm:flex-row sm:gap-2">
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold sm:size-8 sm:text-sm",
                  completed && !active && "bg-primary text-white",
                  active && "bg-primary text-white ring-4 ring-primary/20",
                  !completed && !active && "bg-muted text-muted-foreground"
                )}
              >
                {completed && !active ? (
                  <Check className="size-3.5 sm:size-4" />
                ) : (
                  index + 1
                )}
              </span>
              <span
                className={cn(
                  "max-w-[7.5rem] text-center text-[11px] leading-tight font-medium sm:max-w-none sm:text-left sm:text-sm sm:leading-normal",
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
                aria-hidden
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
