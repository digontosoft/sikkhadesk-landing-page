"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Heart, MessageCircle, Star, Users } from "lucide-react"
import * as React from "react"

import { Badge } from "@/components/common/badge"
import { Heading } from "@/components/common/heading"
import { Section } from "@/components/layout/section"
import { TestimonialCard } from "@/components/sections/testimonials/testimonial-card"
import { testimonials } from "@/constants/testimonials"
import { cn } from "@/lib/utils"

const PER_PAGE = 4
const AUTOPLAY_MS = 6000

const stats = [
  {
    icon: Users,
    color: "bg-brand-blue/10 text-brand-blue",
    value: "৫০+",
    label: "সন্তুষ্ট প্রতিষ্ঠান",
  },
  {
    icon: MessageCircle,
    color: "bg-brand-emerald/10 text-brand-emerald",
    value: "৩,৩০০+",
    label: "সন্তুষ্ট ব্যবহারকারী",
  },
  {
    icon: Star,
    color: "bg-brand-amber/10 text-brand-amber",
    value: "৪.৮/৫",
    label: "গড় রেটিং",
  },
  {
    icon: Heart,
    color: "bg-primary/10 text-primary",
    value: "৯৫%",
    label: "পুনরায় ব্যবহার হার",
  },
]

function Testimonials() {
  const pageCount = Math.ceil(testimonials.length / PER_PAGE)
  const [page, setPage] = React.useState(0)
  const [paused, setPaused] = React.useState(false)

  React.useEffect(() => {
    if (paused || pageCount <= 1) return

    const timer = setInterval(() => {
      setPage((current) => (current + 1) % pageCount)
    }, AUTOPLAY_MS)

    return () => clearInterval(timer)
  }, [paused, pageCount])

  const items = testimonials.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  return (
    <Section id="testimonials" className="relative overflow-hidden bg-muted/20">
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 left-0 hidden font-serif text-[10rem] leading-none text-primary/5 select-none sm:block"
      >
        &ldquo;
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-6 right-0 hidden font-serif text-[10rem] leading-none text-primary/5 select-none sm:block"
      >
        &rdquo;
      </span>
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 left-6 -z-10 hidden grid-cols-6 gap-1.5 opacity-40 sm:grid"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="size-1.5 rounded-full bg-brand-400" />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 text-center">
        <Badge>
          <Star className="size-3.5 fill-primary text-primary" />
          গ্রাহকদের ভালোবাসা
        </Badge>
        <Heading size="lg" className="max-w-2xl text-balance">
          আমাদের গ্রাহকদের মুখে
          <br />
          <span className="text-gradient-hero">
            SikkhaDesk এর সাফল্যের গল্প
          </span>
        </Heading>
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          দেশের নামকরা শিক্ষা প্রতিষ্ঠান আমাদের উপর আস্থা রেখেছে। তাদের
          অভিজ্ঞতাই আমাদের সবচেয়ে বড় প্রেরণা।
        </p>

        {pageCount > 1 ? (
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
            <motion.div
              key={page}
              className="bg-gradient-primary h-full rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
            />
          </div>
        ) : null}
      </div>

      <div
        className="mt-12"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
          >
            {items.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${testimonial.institution}`}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {pageCount > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-2">
            {Array.from({ length: pageCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                aria-label={`পেজ ${index + 1}`}
                onClick={() => setPage(index)}
                className={cn(
                  "h-2.5 cursor-pointer rounded-full transition-all",
                  index === page
                    ? "w-8 bg-primary"
                    : "w-2.5 bg-border hover:bg-primary/40"
                )}
              />
            ))}
          </div>
        ) : null}
      </div>

      <div className="mt-14 grid grid-cols-2 gap-y-8 rounded-2xl border border-border bg-card p-8 sm:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.label}
              className="flex items-center justify-center gap-3"
            >
              <span
                className={cn(
                  "flex size-11 shrink-0 items-center justify-center rounded-full",
                  stat.color
                )}
              >
                <Icon className="size-5" />
              </span>
              <div>
                <p className="text-lg font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export { Testimonials }
