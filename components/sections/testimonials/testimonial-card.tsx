"use client"

import { motion } from "framer-motion"
import { Building2, Quote, Star } from "lucide-react"

import { cn } from "@/lib/utils"
import type { Testimonial, TestimonialColor } from "@/types/testimonial"

const iconStyles: Record<TestimonialColor, string> = {
  blue: "bg-brand-blue/10 text-brand-blue",
  emerald: "bg-brand-emerald/10 text-brand-emerald",
  amber: "bg-brand-amber/10 text-brand-amber",
  primary: "bg-primary/10 text-primary",
  teal: "bg-brand-teal/10 text-brand-teal",
}

const textStyles: Record<TestimonialColor, string> = {
  blue: "text-brand-blue",
  emerald: "text-brand-emerald",
  amber: "text-brand-amber",
  primary: "text-primary",
  teal: "text-brand-teal",
}

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className={cn(
        "flex h-full flex-col justify-between gap-6 rounded-2xl border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg",
        testimonial.featured ? "border-primary shadow-lg shadow-primary/10" : "border-border"
      )}
    >
      <div>
        <div className="flex items-center justify-between">
          <span
            className={cn(
              "flex size-9 shrink-0 items-center justify-center rounded-full",
              iconStyles[testimonial.color]
            )}
          >
            <Quote className="size-4" />
          </span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={
                  i < testimonial.rating
                    ? "fill-brand-amber text-brand-amber size-3.5"
                    : "size-3.5 text-muted"
                }
              />
            ))}
          </div>
        </div>
        <p className="mt-4 text-sm text-foreground">{testimonial.content}</p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
            iconStyles[testimonial.color]
          )}
        >
          {testimonial.avatar}
        </span>
        <div className="min-w-0">
          <p
            className={cn(
              "text-sm font-semibold",
              testimonial.featured ? textStyles[testimonial.color] : "text-foreground"
            )}
          >
            {testimonial.name}
          </p>
          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
          <p
            className={cn(
              "mt-0.5 flex items-center gap-1 text-xs font-medium",
              textStyles[testimonial.color]
            )}
          >
            <Building2 className="size-3 shrink-0" />
            <span className="truncate">{testimonial.institution}</span>
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export { TestimonialCard }
