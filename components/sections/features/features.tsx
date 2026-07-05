"use client"

import { motion } from "framer-motion"
import { ArrowRight, Star } from "lucide-react"

import { Section } from "@/components/layout/section"
import { Badge } from "@/components/common/badge"
import { Heading } from "@/components/common/heading"
import { CtaButton } from "@/components/common/cta-button"
import { FeatureCard } from "@/components/sections/features/feature-card"
import { features } from "@/constants/features"

function Features() {
  return (
    <Section id="features" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-6 right-4 -z-10 hidden grid-cols-6 gap-1.5 opacity-40 sm:right-10 sm:grid"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="bg-brand-400 size-1.5 rounded-full" />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-6 left-4 -z-10 hidden grid-cols-6 gap-1.5 opacity-40 sm:left-10 sm:grid"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="bg-brand-400 size-1.5 rounded-full" />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Badge>
          <Star className="fill-brand-700 text-brand-700 size-3.5" />
          ফিচারসমূহ
        </Badge>
        <Heading size="lg" className="max-w-2xl text-balance">
          সব প্রয়োজন, <span className="text-gradient-hero">এক প্ল্যাটফর্মে</span>
        </Heading>
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          শিক্ষা প্রতিষ্ঠানের প্রতিদিনের কাজগুলোকে সহজ, দ্রুত ও ডিজিটাল করতে আমাদের রয়েছে
          অত্যাধুনিক ও সমন্বিত সব ফিচার।
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon

          return (
            <FeatureCard
              key={feature.title}
              icon={<Icon className="size-6" />}
              title={feature.title}
              description={feature.description}
              color={feature.color}
              index={index}
            />
          )
        })}
      </div>

      <div className="mt-10 flex flex-col items-center justify-between gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <span className="bg-gradient-primary hidden size-12 shrink-0 items-center justify-center rounded-full text-white sm:flex">
            <Star className="size-5" />
          </span>
          <div>
            <p className="font-semibold text-foreground">এছাড়াও রয়েছে আরও অনেক ছোট-বড় ফিচার!</p>
            <p className="text-sm text-muted-foreground">
              আপনার প্রতিষ্ঠানকে স্মার্ট ও ডিজিটাল করতে SikkhaDesk আছে আপনার পাশে।
            </p>
          </div>
        </div>
        <CtaButton href="/pricing" size="lg" className="shrink-0">
          সব ফিচার দেখুন
          <ArrowRight className="size-5" data-icon="inline-end" />
        </CtaButton>
      </div>
    </Section>
  )
}

export { Features }
