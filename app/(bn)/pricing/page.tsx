import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Pricing } from "@/components/sections/pricing/pricing"
import { Faq } from "@/components/sections/faq/faq"
import { PlanComparison } from "@/components/sections/pricing/plan-comparison"
import { JsonLd } from "@/components/common/json-ld"
import { breadcrumbStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "স্কুল ম্যানেজমেন্ট সফটওয়্যারের মূল্য ও প্ল্যান",
  description:
    "SikkhaDesk-এর মাসিক সাবস্ক্রিপশন ৳৫০০ থেকে, সঙ্গে এককালীন সেটআপ ফি ও প্রযোজ্য ভ্যাট। শিক্ষার্থীসংখ্যা অনুযায়ী প্ল্যান ও মোট খরচ দেখুন।",
  path: "/pricing",
})

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "মূল্য পরিকল্পনা", path: "/pricing" },
        ])}
      />
      <Pricing page />
      <PlanComparison />
      <Faq />
    </>
  )
}
