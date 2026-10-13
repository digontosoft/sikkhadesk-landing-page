"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"

import { Badge } from "@/components/common/badge"
import { HeroButtons } from "@/components/sections/hero/hero-buttons"
import { siteConfig } from "@/constants/site"

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
      initial={false}
      animate="show"
      variants={staggerContainer}
      className="flex flex-col items-center gap-6 text-center xl:items-start xl:text-left"
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Badge>
          <Star className="size-3.5 fill-brand-700 text-brand-700" />
          বাংলাদেশের শিক্ষা প্রতিষ্ঠানের জন্য
        </Badge>
      </motion.div>

      <motion.h1
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-heading text-3xl font-bold text-balance text-foreground sm:text-4xl md:text-5xl"
      >
        বাংলাদেশের স্কুল ম্যানেজমেন্ট সফটওয়্যার{" "}
        <span className="text-gradient-hero">SikkhaDesk</span>
      </motion.h1>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-xl text-lg text-balance text-muted-foreground xl:mx-0"
      >
        স্কুল, কলেজ, মাদ্রাসা ও কোচিং সেন্টারের শিক্ষার্থী, উপস্থিতি, ফি,
        পরীক্ষা ও ফলাফল পরিচালনা করুন এক প্ল্যাটফর্মে। SikkhaDesk School
        Management Software দিয়ে প্রতিদিনের কাজ রাখুন গুছিয়ে।
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
        <p className="rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground">
          {new Intl.NumberFormat("bn-BD").format(siteConfig.trialDays)} দিনের
          ফ্রি ট্রায়ালে শুরু করুন
        </p>
      </motion.div>
    </motion.div>
  )
}

export { HeroContent }
