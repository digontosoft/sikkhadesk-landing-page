import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Section } from "@/components/layout/section"
import { Contact } from "@/components/sections/contact/contact"
import { JsonLd } from "@/components/common/json-ld"
import { breadcrumbStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "ডেমো ও যোগাযোগ",
  description:
    "SikkhaDesk স্কুল ম্যানেজমেন্ট সফটওয়্যারের ডেমো, মূল্য ও সহায়তার জন্য যোগাযোগ করুন। ময়মনসিংহ অফিস; রবি–বৃহস্পতিবার, সকাল ৯টা–সন্ধ্যা ৭টা।",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <Section className="pt-14 sm:pt-20">
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "যোগাযোগ", path: "/contact" },
        ])}
      />
      <Contact />
    </Section>
  )
}
