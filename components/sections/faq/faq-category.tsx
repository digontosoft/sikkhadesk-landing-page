import { Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FaqCategory as FaqCategoryData } from "@/types/faq"

const colorStyles = {
  blue: "bg-brand-blue/10 text-brand-blue",
  emerald: "bg-brand-emerald/10 text-brand-emerald",
} as const

function FaqCategoryCard({
  category,
}: {
  category: FaqCategoryData
  index: number
}) {
  const Icon = category.icon

  return (
    <div className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl",
            colorStyles[category.color]
          )}
        >
          <Icon className="size-6" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-foreground">
            {category.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {category.description}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        {category.items.map((item, index) => (
          <details
            key={item.question}
            open={index === 0}
            className="group rounded-2xl border border-border open:border-primary/30 open:bg-primary/5"
          >
            <summary className="flex cursor-pointer list-none items-center gap-3 p-4 text-sm font-semibold text-foreground sm:text-base [&::-webkit-details-marker]:hidden">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-primary">
                <Plus aria-hidden className="size-3.5 group-open:hidden" />
                <Minus
                  aria-hidden
                  className="hidden size-3.5 group-open:block"
                />
              </span>
              {item.question}
            </summary>
            <p className="px-4 pb-4 text-sm leading-relaxed text-muted-foreground sm:px-[3.25rem]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  )
}

export { FaqCategoryCard }
