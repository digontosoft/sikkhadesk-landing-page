import type { Metadata } from "next"

import { constructMetadata, homeLanguages } from "@/lib/metadata"
import { siteStructuredData } from "@/lib/structured-data"
import { JsonLd } from "@/components/common/json-ld"
import { Hero } from "@/components/sections/hero/hero"
import { Brands } from "@/components/sections/brands/brands"
import { Features } from "@/components/sections/features/features"
import { Pricing } from "@/components/sections/pricing/pricing"
import { GettingStarted } from "@/components/sections/getting-started"
import { ModuleLinks } from "@/components/sections/module-links"
import { Faq } from "@/components/sections/faq/faq"

export const revalidate = 300

export const metadata: Metadata = constructMetadata({
  title: "বাংলাদেশের স্কুল ম্যানেজমেন্ট সফটওয়্যার",
  description:
    "SikkhaDesk দিয়ে বাংলাদেশের স্কুল, কলেজ, মাদ্রাসা ও কোচিং সেন্টারের শিক্ষার্থী, উপস্থিতি, ফি, পরীক্ষা ও ফলাফল পরিচালনা করুন। ১৪ দিনের ফ্রি ট্রায়াল নিন।",
  path: "/",
  languages: homeLanguages,
})

export default function HomePage() {
  return (
    <>
      <JsonLd data={siteStructuredData} />
      <Hero />
      <Brands />
      <Features />
      <ModuleLinks />
      <Pricing />
      <GettingStarted />
      <Faq />
    </>
  )
}
