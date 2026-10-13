import type { Metadata } from "next"

export const revalidate = 300

import { constructMetadata } from "@/lib/metadata"
import { Features } from "@/components/sections/features/features"
import { ModuleLinks } from "@/components/sections/module-links"
import { GettingStarted } from "@/components/sections/getting-started"
import { JsonLd } from "@/components/common/json-ld"
import { breadcrumbStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "স্কুল ম্যানেজমেন্ট সফটওয়্যারের ফিচার",
  description:
    "SikkhaDesk দিয়ে শিক্ষার্থী, উপস্থিতি, ফি, হিসাব, পরীক্ষা, ফলাফল ও SMS পরিচালনা করুন। বাংলাদেশের স্কুল, মাদ্রাসা ও কোচিং সেন্টারের জন্য সমন্বিত ফিচার।",
  path: "/features",
})

export default function FeaturesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "ফিচার", path: "/features" },
        ])}
      />
      <Features page />
      <ModuleLinks />
      <GettingStarted />
    </>
  )
}
