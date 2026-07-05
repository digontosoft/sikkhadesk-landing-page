"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/common/badge"
import { HeroButtons } from "@/components/sections/hero/hero-buttons"

const avatarColors = ["bg-brand-teal", "bg-brand-blue", "bg-brand-emerald", "bg-brand-amber"]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

function HeroContent() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="flex flex-col items-center gap-6 text-center xl:items-start xl:text-left"
    >
      <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
        <Badge>
          <Star className="fill-brand-700 text-brand-700 size-3.5" />
          স্মার্ট শিক্ষা ব্যবস্থাপনার আধুনিক প্ল্যাটফর্ম
        </Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-heading text-3xl font-bold text-balance text-foreground sm:text-4xl md:text-5xl"
      >
        আপনার শিক্ষা প্রতিষ্ঠান পরিচালনা এখন{" "}
        <span className="text-gradient-hero">আরও সহজ, স্মার্ট ও নির্ভুল</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-xl text-balance text-lg text-muted-foreground xl:mx-0"
      >
        ভর্তি থেকে ফি, উপস্থিতি থেকে ফলাফল— সবকিছু এক প্ল্যাটফর্মে, এক ক্লিকে।
      </motion.p>

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-center xl:justify-start"
      >
        <HeroButtons />
      </motion.div>

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex items-center justify-center gap-3 xl:justify-start"
      >
        <div className="flex -space-x-3">
          {avatarColors.map((color, index) => (
            <span
              key={color}
              className={cn(
                "flex size-9 items-center justify-center rounded-full border-2 border-background text-xs font-semibold text-white",
                color
              )}
            >
              {String.fromCharCode(65 + index)}
            </span>
          ))}
          <span className="flex h-9 min-w-9 items-center justify-center rounded-full border-2 border-background bg-primary px-1.5 text-[11px] font-semibold text-primary-foreground">
            ২০০+
          </span>
        </div>
        <p className="text-sm text-muted-foreground">শিক্ষা প্রতিষ্ঠান আমাদের সাথে</p>
      </motion.div>
    </motion.div>
  )
}

export { HeroContent }
