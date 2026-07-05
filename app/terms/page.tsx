import type { Metadata } from "next"

import { constructMetadata } from "@/lib/metadata"
import { Section } from "@/components/layout/section"
import { siteConfig } from "@/constants/site"

export const metadata: Metadata = constructMetadata({
  title: "Terms of Service",
  description: `The terms and conditions for using ${siteConfig.name}.`,
  path: "/terms",
})

const sections = [
  {
    title: "Acceptance of terms",
    body: "By creating an account or using SikkhaDesk, your institution agrees to be bound by these Terms of Service and our Privacy Policy.",
  },
  {
    title: "Use of the service",
    body: "SikkhaDesk is licensed for use by educational institutions to manage attendance, classes, exams, fees, and related administrative records. You are responsible for the accuracy of data your staff enters into the platform.",
  },
  {
    title: "Accounts and access",
    body: "Institution administrators are responsible for managing user roles and permissions within their account, including revoking access for staff who leave the institution.",
  },
  {
    title: "Payment & billing",
    body: "Subscription fees are billed in advance on a monthly or annual basis. Fees collected from students through SikkhaDesk are subject to the payment processor's terms and settlement schedule.",
  },
  {
    title: "Cancellation",
    body: "You may cancel your subscription at any time. Access continues until the end of the current billing period, and you may export your data before your account is closed.",
  },
  {
    title: "Limitation of liability",
    body: "SikkhaDesk is provided on an \"as is\" basis. We are not liable for indirect or consequential damages arising from use of the platform, to the extent permitted by law.",
  },
  {
    title: "Governing law",
    body: "These terms are governed by the laws of the People's Republic of Bangladesh.",
  },
  {
    title: "Contact us",
    body: `Questions about these terms can be sent to ${siteConfig.email}.`,
  },
]

export default function TermsPage() {
  return (
    <Section className="pt-20 sm:pt-28">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-heading text-3xl font-semibold text-foreground sm:text-4xl">
          Terms of Service
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
