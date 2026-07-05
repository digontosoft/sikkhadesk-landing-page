import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Features } from "@/components/sections/features/features"

export const metadata: Metadata = constructMetadata({
  title: "Features",
  description: "Explore every SikkhaDesk module — attendance, classes, exams, fees, and more.",
  path: "/features",
})

export default function FeaturesPage() {
  return <Features />
}
