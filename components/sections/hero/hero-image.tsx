"use client"

import Image from "next/image"
import { motion } from "framer-motion"

function HeroImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
      className="relative mx-auto w-full max-w-md sm:max-w-xl xl:max-w-none"
    >
      <div
        aria-hidden
        className="absolute -top-4 -right-4 -z-10 grid grid-cols-6 gap-1.5 opacity-40 sm:-top-6 sm:-right-6"
      >
        {Array.from({ length: 24 }).map((_, index) => (
          <span key={index} className="bg-brand-400 size-1.5 rounded-full" />
        ))}
      </div>

      <div className="shadow-brand-700/10 rotate-2 rounded-2xl border border-border bg-card p-2 shadow-2xl transition-transform duration-500 hover:rotate-0">
        <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl">
          <Image
            src="/images/hero/dashboard.png"
            alt="SikkhaDesk ড্যাশবোর্ড প্রিভিউ"
            fill
            priority
            sizes="(min-width: 1280px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </motion.div>
  )
}

export { HeroImage }
