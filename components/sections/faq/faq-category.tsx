"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronRight, Minus, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import type { FaqCategory as FaqCategoryData } from "@/types/faq"

const colorStyles = {
  blue: {
    icon: "bg-brand-blue/10 text-brand-blue",
    title: "text-brand-blue",
    activeCircle: "bg-brand-blue text-white",
    activeBorder: "border-brand-blue bg-brand-blue/5",
  },
  emerald: {
    icon: "bg-brand-emerald/10 text-brand-emerald",
    title: "text-brand-emerald",
    activeCircle: "bg-brand-emerald text-white",
    activeBorder: "border-brand-emerald bg-brand-emerald/5",
  },
} as const

interface FaqCategoryCardProps {
  category: FaqCategoryData
  index: number
}

function FaqCategoryCard({ category, index }: FaqCategoryCardProps) {
  const [openIndex, setOpenIndex] = React.useState(0)
  const Icon = category.icon
  const styles = colorStyles[category.color]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="flex flex-col gap-5 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-2xl",
            styles.icon
          )}
        >
          <Icon className="size-6" />
        </span>
        <div>
          <p className={cn("text-lg font-bold", styles.title)}>{category.title}</p>
          <p className="text-sm text-muted-foreground">{category.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {category.items.map((item, itemIndex) => {
          const isOpen = itemIndex === openIndex

          return (
            <div
              key={item.question}
              className={cn(
                "rounded-2xl border transition-colors",
                isOpen ? styles.activeBorder : "border-border"
              )}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : itemIndex)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-center justify-between gap-3 p-4 text-left"
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      "flex size-6 shrink-0 items-center justify-center rounded-full transition-colors",
                      isOpen ? styles.activeCircle : "bg-muted text-muted-foreground"
                    )}
                  >
                    {isOpen ? <Minus className="size-3.5" /> : <Plus className="size-3.5" />}
                  </span>
                  <span className="text-sm font-semibold text-foreground sm:text-base">
                    {item.question}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0"
                >
                  <ChevronRight className="text-muted-foreground size-4" />
                </motion.span>
              </button>

              <motion.div
                initial={false}
                animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="px-4 pb-4 text-sm text-muted-foreground sm:px-[3.25rem]">
                  {item.answer}
                </p>
              </motion.div>
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

export { FaqCategoryCard }
