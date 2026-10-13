import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/common/json-ld"
import { Section } from "@/components/layout/section"
import { siteConfig } from "@/constants/site"
import { productModules } from "@/constants/modules"
import { pricingPlans } from "@/constants/pricing"
import { calculateOrderBreakdown } from "@/lib/checkout"
import { constructMetadata, homeLanguages } from "@/lib/metadata"
import { siteStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "School Management Software in Bangladesh",
  description: siteConfig.description,
  path: "/en",
  locale: "en_BD",
  languages: homeLanguages,
})

const capabilities = [
  {
    title: "Student records",
    body: "Keep student details, classes, rolls and sections together instead of maintaining separate lists for each administrative task.",
  },
  {
    title: "Teachers and staff",
    body: "Maintain teacher and staff details, designations, salary information and responsibilities in the same institution management platform.",
  },
  {
    title: "Attendance",
    body: "Record student and teacher attendance and review attendance reports alongside the institution's other records.",
  },
  {
    title: "Fees and dues",
    body: "Manage fee structures, collections, invoices, due lists and payment reports. Keep track of what has been collected and what remains outstanding.",
  },
  {
    title: "Exams and results",
    body: "Prepare exam routines, admit cards, result cards and tabulation sheets. SikkhaDesk also includes question paper and student progress report features.",
  },
  {
    title: "Accounts and communication",
    body: "Maintain income and expense records, review financial reports, and use SMS and notification features to communicate with students, parents and teachers.",
  },
]

const questions = [
  {
    question: "What is school management software?",
    answer:
      "School management software helps an institution maintain its student, staff, attendance, fee and examination records in one system. SikkhaDesk brings these tasks together so the office and teachers can work from a shared set of records.",
  },
  {
    question: "Who is SikkhaDesk for?",
    answer:
      "SikkhaDesk is designed for schools, colleges, madrasas and coaching centers in Bangladesh. Discuss your class structure, fee rules and exam formats with our team to check that the product fits your institution's workflow.",
  },
  {
    question: "How much does SikkhaDesk cost?",
    answer:
      "The Basic plan starts at BDT 500 per month for up to 150 students, with a BDT 2,000 one-time setup fee. The current checkout adds 15% VAT: the first monthly payment is BDT 2,875 and later monthly subscriptions are BDT 575 including VAT. Prices depend on student count and plan.",
  },
  {
    question: "Is a free trial available?",
    answer:
      "Yes. SikkhaDesk offers a 14-day free trial. Contact our team to arrange a demo and discuss how to start your trial.",
  },
  {
    question: "Can I use SikkhaDesk on mobile?",
    answer:
      "SikkhaDesk has a web platform and an official Android app on Google Play. Follow the Android download link on this page to view the app listing.",
  },
  {
    question: "Does it support multiple branches?",
    answer:
      "Multi-branch management is included in the Premium and Custom plans. Ask our team to demonstrate how your campuses or branches would be set up before choosing a plan.",
  },
  {
    question: "Where is SikkhaDesk based, and when is support available?",
    answer: `Our office is at ${siteConfig.address}. Support is available ${siteConfig.supportHoursEn}. You can contact us by phone, email or WhatsApp.`,
  },
]

export default function EnglishHomePage() {
  return (
    <>
      <JsonLd data={siteStructuredData} />
      <Section className="py-14 sm:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="mb-5 text-sm font-semibold text-primary">
              For education institutions in Bangladesh
            </p>
            <h1 className="text-4xl leading-tight font-bold text-balance sm:text-5xl">
              School management software in Bangladesh:{" "}
              <span className="text-gradient-hero">SikkhaDesk</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Manage students, attendance, fees, exams and results in one
              platform. SikkhaDesk helps schools, colleges, madrasas and
              coaching centers keep their everyday administrative work
              organized.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="bg-gradient-primary rounded-xl px-6 py-3 font-semibold text-white"
              >
                Book a demo
              </a>
              <a
                href={siteConfig.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-border bg-card px-6 py-3 font-semibold"
              >
                View live demo ↗
              </a>
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              14-day free trial · Bangla support · Web and Android
            </p>
          </div>
          <figure className="rounded-2xl border border-border bg-card p-3 shadow-xl">
            {/* Prebuilt responsive images work on the static host without an image API. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/hero/dashboard-800.webp"
              srcSet="/images/hero/dashboard-480.webp 480w, /images/hero/dashboard-800.webp 800w, /images/hero/dashboard-1200.webp 1200w, /images/hero/dashboard-1536.webp 1536w"
              sizes="(min-width: 1024px) 580px, calc(100vw - 72px)"
              width={1536}
              height={1024}
              fetchPriority="high"
              alt="SikkhaDesk school management dashboard with institution records and reports"
              className="aspect-3/2 w-full rounded-xl object-cover"
            />
            <figcaption className="mt-3 text-center text-sm text-muted-foreground">
              A preview of the SikkhaDesk dashboard.
            </figcaption>
          </figure>
        </div>
      </Section>

      <Section id="features" className="bg-muted/20">
        <h2 className="text-3xl font-bold">
          What can your institution manage?
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          School administration involves more than storing a student list. Fees,
          attendance and exams depend on the same student and class information.
          SikkhaDesk provides modules for these connected tasks, with records
          and reports available in one platform.
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-5">
          {productModules.map((module) => (
            <Link
              key={module.slug}
              href={`/features/${module.slug}`}
              className="text-sm font-semibold text-primary underline underline-offset-4"
            >
              {module.englishTitle} (বাংলা) →
            </Link>
          ))}
        </div>
        <Link
          href="/features"
          className="mt-5 inline-block font-semibold text-primary"
        >
          Explore all features (বাংলা) →
        </Link>
      </Section>

      <Section>
        <h2 className="text-3xl font-bold">
          Check the software against your institution&apos;s daily work
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          Bring a sample student list, your fee structure and an exam report to
          the demo. Ask the team to show a fee collection, an attendance record
          and a result card using the kind of information your office handles.
          This helps you assess whether the setup and reports fit your needs.
        </p>
        <ul className="mt-6 grid gap-5 md:grid-cols-3">
          <li className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Schools and colleges</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Review your classes, sections, student rolls, regular fees and
              examination formats together.
            </p>
          </li>
          <li className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Madrasas</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Discuss your departments, subjects and reporting requirements so
              the team can demonstrate the relevant setup.
            </p>
          </li>
          <li className="rounded-2xl border border-border p-6">
            <h3 className="font-semibold">Coaching centers</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Check how student records, attendance, fees and test results fit
              your classes and student groups.
            </p>
          </li>
        </ul>
        <p className="mt-6 text-sm text-muted-foreground">
          For biometric devices, payment gateways, SMS charges or other
          integrations, confirm availability and cost with our team before
          subscribing.
        </p>
      </Section>

      <Section id="pricing" className="bg-muted/20">
        <h2 className="text-3xl font-bold">
          School management software pricing
        </h2>
        <p className="mt-4 max-w-3xl text-muted-foreground">
          Choose a plan by student count and required features. These examples
          are for up to 150 students with monthly billing. First payments
          include the subscription, one-time setup and 15% VAT.
        </p>
        <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              Monthly prices and first payment totals for up to 150 students in
              Bangladeshi taka
            </caption>
            <thead className="bg-muted">
              <tr>
                {[
                  "Plan",
                  "Monthly subscription",
                  "One-time setup",
                  "First payment, incl. VAT",
                ].map((heading) => (
                  <th key={heading} scope="col" className="p-4">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pricingPlans
                .filter((plan) => !plan.isCustom)
                .map((plan) => {
                  const order = calculateOrderBreakdown(plan, 0, "monthly")
                  return (
                    <tr key={plan.id} className="border-t border-border">
                      <th scope="row" className="p-4 capitalize">
                        {plan.id}
                      </th>
                      <td className="p-4">
                        BDT {order.monthlyPrice.toLocaleString("en-BD")}
                      </td>
                      <td className="p-4">
                        BDT {order.oneTimeFee.toLocaleString("en-BD")}
                      </td>
                      <td className="p-4 font-semibold">
                        BDT {order.payableTotal.toLocaleString("en-BD")}
                      </td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          Annual subscriptions receive a 10% subscription discount; setup and
          VAT are additional. Standard and Premium include a website; Premium
          and Custom include multi-branch management. Custom plans require a
          quotation.
        </p>
        <Link
          href="/pricing"
          className="mt-6 inline-block font-semibold text-primary"
        >
          Compare student ranges and complete payment totals (বাংলা) →
        </Link>
      </Section>

      <Section id="faq">
        <h2 className="text-3xl font-bold">Questions about SikkhaDesk</h2>
        <div className="mt-8 space-y-4">
          {questions.map((item) => (
            <details
              key={item.question}
              className="rounded-xl border border-border bg-card p-5"
            >
              <summary className="cursor-pointer font-semibold">
                {item.question}
              </summary>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </Section>

      <Section id="contact" className="bg-muted/20">
        <h2 className="text-3xl font-bold">
          Arrange your demo and 14-day free trial
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tell us your institution type, student count and the tasks you want to
          manage. We can walk you through the relevant modules and explain setup
          and pricing.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-primary rounded-xl px-6 py-3 font-semibold text-white"
          >
            Contact us on WhatsApp ↗
          </a>
          <a
            href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}
            className="rounded-xl border border-border bg-card px-6 py-3 font-semibold"
          >
            Call {siteConfig.phone}
          </a>
          <a
            href={`mailto:${siteConfig.email}`}
            className="rounded-xl border border-border bg-card px-6 py-3 font-semibold"
          >
            Email our team
          </a>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          {siteConfig.supportHoursEn}
          <br />
          {siteConfig.address}
        </p>
        <a
          href={siteConfig.androidAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block font-semibold text-primary"
        >
          Download the official Android app from Google Play ↗
        </a>
      </Section>
    </>
  )
}
