"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import type { FeatureColor } from "@/types/feature"

const colorStyles: Record<FeatureColor, string> = {
  primary: "bg-primary/10 text-primary",
  emerald: "bg-brand-emerald/10 text-brand-emerald",
  amber: "bg-brand-amber/10 text-brand-amber",
  blue: "bg-brand-blue/10 text-brand-blue",
  rose: "bg-brand-rose/10 text-brand-rose",
  teal: "bg-brand-teal/10 text-brand-teal",
}

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
  color: FeatureColor
  index: number
}

function FeatureCard({ icon, title, description, color, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.08, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn("flex size-12 items-center justify-center rounded-xl", colorStyles[color])}
        >
          {icon}
        </span>
        <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", colorStyles[color])}>
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  )
}

export { FeatureCard }
