import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Section } from "@/components/layout/section"
import { siteConfig } from "@/constants/site"

export const metadata: Metadata = constructMetadata({
  title: "Privacy Policy",
  description: `Learn how ${siteConfig.name} collects, uses, and protects your data.`,
  path: "/privacy-policy",
})

const sections = [
  {
    title: "Information we collect",
    body: "We collect account information (name, email, phone, institution name) and usage data such as attendance, exam, and fee records that your institution enters into SikkhaDesk.",
  },
  {
    title: "How we use your information",
    body: "We use collected data to operate and improve SikkhaDesk, provide customer support, send service notifications, and process payments on your institution's behalf.",
  },
  {
    title: "Data sharing",
    body: "We do not sell your data. Information is shared only with service providers that help us run SikkhaDesk, such as payment processors and cloud hosting, under strict confidentiality agreements.",
  },
  {
    title: "Data security",
    body: "All data is encrypted in transit and at rest. Access to student and financial records is restricted based on institution-defined roles and permissions.",
  },
  {
    title: "Data retention",
    body: "Institution data is retained for as long as your account is active. You may request export or deletion of your data at any time by contacting support.",
  },
  {
    title: "Your rights",
    body: "You may access, correct, or request deletion of your personal data by contacting us at the email address below.",
  },
  {
    title: "Changes to this policy",
    body: "We may update this policy from time to time. Material changes will be communicated to institution administrators by email.",
  },
  {
    title: "Contact us",
    body: `Questions about this policy can be sent to ${siteConfig.email}.`,
  },
]

export default function PrivacyPolicyPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: July 5, 2026</p>

        <div className="mt-10 flex flex-col gap-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-lg font-semibold text-foreground">{section.title}</h2>
              <p className="mt-2 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
