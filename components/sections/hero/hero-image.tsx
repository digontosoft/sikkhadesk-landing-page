"use client"

import { motion } from "framer-motion"

function HeroImage() {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="relative mx-auto w-full max-w-md sm:max-w-xl xl:max-w-none"
    >
      <div
        aria-hidden
        className="absolute -top-4 -right-4 -z-10 grid grid-cols-6 gap-1.5 opacity-40 sm:-top-6 sm:-right-6"
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} className="size-1.5 rounded-full bg-brand-400" />
        ))}
      </div>

      <div className="rotate-2 rounded-2xl border border-border bg-card p-2 shadow-2xl shadow-brand-700/10 transition-transform duration-500 hover:rotate-0">
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl">
          {/* Static export: prebuilt responsive files avoid a runtime image service. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/hero/dashboard-800.webp"
            srcSet="/images/hero/dashboard-480.webp 480w, /images/hero/dashboard-800.webp 800w, /images/hero/dashboard-1200.webp 1200w, /images/hero/dashboard-1536.webp 1536w"
            alt="SikkhaDesk স্কুল ম্যানেজমেন্ট সফটওয়্যারের শিক্ষার্থী, উপস্থিতি ও ফি ড্যাশবোর্ড"
            width={1536}
            height={1024}
            fetchPriority="high"
            sizes="(min-width: 1280px) 600px, (min-width: 640px) 576px, calc(100vw - 48px)"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}

export { HeroImage }
