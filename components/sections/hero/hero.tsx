"use client"

import { motion } from "framer-motion"
import {
  BarChart3,
  Bell,
  BookOpen,
  Cloud,
  CreditCard,
  Database,
  GraduationCap,
  Headphones,
  MessageSquare,
  ShieldCheck,
  Smartphone,
  Wifi,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Section } from "@/components/layout/section"
import { HeroContent } from "@/components/sections/hero/hero-content"
import { HeroImage } from "@/components/sections/hero/hero-image"

const bgIcons = [
  { icon: Cloud, className: "top-6 -left-6 size-9 -rotate-12 text-brand-blue" },
  { icon: Database, className: "top-44 -left-10 size-8 rotate-6 text-primary" },
  { icon: ShieldCheck, className: "bottom-28 -left-4 size-9 -rotate-6 text-brand-emerald" },
  { icon: Wifi, className: "top-1/2 -left-8 size-7 rotate-3 text-brand-amber" },
  { icon: GraduationCap, className: "top-4 -right-6 size-10 rotate-12 text-brand-amber" },
  { icon: BarChart3, className: "top-44 -right-10 size-8 -rotate-6 text-brand-blue" },
  { icon: BookOpen, className: "bottom-28 -right-4 size-9 rotate-6 text-primary" },
  { icon: CreditCard, className: "top-1/2 -right-8 size-7 -rotate-3 text-brand-emerald" },
  { icon: MessageSquare, className: "bottom-6 -right-12 size-8 rotate-12 text-brand-amber" },
  { icon: Bell, className: "bottom-8 -left-12 size-7 -rotate-12 text-brand-blue" },
]

const strip = [
  {
    icon: Cloud,
    title: "ক্লাউড ভিত্তিক",
    description: "যেকোনো সময়, যেকোনো জায়গা",
    color: "text-brand-blue",
    bg: "bg-brand-blue/10",
  },
  {
    icon: ShieldCheck,
    title: "নিরাপদ ও নির্ভরযোগ্য",
    description: "আপনার ডেটা ১০০% সুরক্ষিত",
    color: "text-brand-emerald",
    bg: "bg-brand-emerald/10",
  },
  {
    icon: Smartphone,
    title: "মোবাইল অ্যাপ",
    description: "Android অ্যাপের মাধ্যমে সহজ নিয়ন্ত্রণ",
    color: "text-brand-amber",
    bg: "bg-brand-amber/10",
  },
  {
    icon: Headphones,
    title: "২৪/৭ সাপোর্ট",
    description: "আমরা আছি সবসময় আপনার সাথে",
    color: "text-primary",
    bg: "bg-primary/10",
  },
]

function Hero() {
  return (
    <Section className="overflow-hidden pt-12 pb-14 sm:pt-16 sm:pb-16">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 hidden lg:block"
        >
          {bgIcons.map(({ icon: Icon, className }, index) => (
            <Icon key={index} className={cn("absolute opacity-10", className)} />
          ))}
        </div>

        <div className="grid items-center gap-12 xl:grid-cols-2 xl:gap-10">
          <HeroContent />
          <HeroImage />
        </div>
      </div>

      <div className="mt-20 grid gap-5 sm:mt-24 sm:grid-cols-2 xl:grid-cols-4">
        {strip.map((item, index) => {
          const Icon = item.icon

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: "easeOut" }}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <span
                className={cn(
                  "flex size-14 shrink-0 items-center justify-center rounded-xl",
                  item.bg,
                  item.color
                )}
              >
                <Icon className="size-6" />
              </span>
              <div>
                <p className="text-base font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </Section>
  )
}

export { Hero }
