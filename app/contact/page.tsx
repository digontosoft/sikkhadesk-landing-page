import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Section } from "@/components/layout/section"
import { Contact } from "@/components/sections/contact/contact"

export const metadata: Metadata = constructMetadata({
  title: "Contact",
  description: "Get in touch with the SikkhaDesk team to book a demo or ask a question.",
  path: "/contact",
})

export default function ContactPage() {
  return (
    <Section className="pt-14 sm:pt-20">
      <Contact />
    </Section>
  )
}
