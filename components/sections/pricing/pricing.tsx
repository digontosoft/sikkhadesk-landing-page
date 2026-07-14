"use client"

import { motion } from "framer-motion"

import { Badge } from "@/components/common/badge"
import { Heading } from "@/components/common/heading"
import { Section } from "@/components/layout/section"
import { PricingGrid } from "@/components/sections/pricing/pricing-grid"

function Pricing() {
  return (
    <Section id="pricing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Badge>মূল্য পরিকল্পনা</Badge>
        <Heading size="lg" className="max-w-2xl text-balance">
          আপনার প্রতিষ্ঠানের জন্য সঠিক প্ল্যান বেছে নিন
        </Heading>
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          শিক্ষার্থী সংখ্যা অনুযায়ী সবচেয়ে উপযুক্ত প্ল্যানটি বেছে নিন। কোনো
          লুকানো খরচ নেই, যেকোনো সময় প্ল্যান পরিবর্তন করা যাবে।
        </p>
      </motion.div>

      <div className="mt-12">
        <PricingGrid />
      </div>

      {/* <PricingMethod />

      <p className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <Info className="text-primary size-4 shrink-0" />
        উপরোক্ত সকল প্ল্যানে রয়েছে ২৪/৭ সাপোর্ট, নিয়মিত আপডেট এবং নিরাপদ ডেটা ব্যাকআপ সুবিধা।
      </p> */}
    </Section>
  )
}

export { Pricing }
