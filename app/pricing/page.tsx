import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Pricing } from "@/components/sections/pricing/pricing"
import { Faq } from "@/components/sections/faq/faq"

export const metadata: Metadata = constructMetadata({
  title: "Pricing",
  description: "Simple, transparent pricing for schools and coaching centers of every size.",
  path: "/pricing",
})

export default function PricingPage() {
  return (
    <>
      <Pricing />
      <Faq />
    </>
  )
}
