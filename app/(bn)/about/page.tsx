import type { Metadata } from "next"
import Link from "next/link"

import { CtaButton } from "@/components/common/cta-button"
import { JsonLd } from "@/components/common/json-ld"
import { Section } from "@/components/layout/section"
import { siteConfig } from "@/constants/site"
import { getAboutContent } from "@/lib/landing-content"
import { constructMetadata, getPageUrl } from "@/lib/metadata"
import { breadcrumbStructuredData } from "@/lib/structured-data"

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAboutContent()
  return constructMetadata({
    title: content.title,
    description: content.description,
    path: "/about",
  })
}

export default async function AboutPage() {
  const content = await getAboutContent()
  return (
    <Section className="py-12 sm:py-16">
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "আমাদের সম্পর্কে", path: "/about" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": `${getPageUrl("/about")}#page`,
          url: getPageUrl("/about"),
          name: content.title,
          description: content.description,
          inLanguage: "bn-BD",
          about: { "@id": `${getPageUrl()}#organization` },
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">আমাদের সম্পর্কে</span>
      </nav>
      <p className="mb-3 font-semibold text-primary">
        {siteConfig.operatorName}-এর শিক্ষা ব্যবস্থাপনা সফটওয়্যার
      </p>
      <h1 className="max-w-4xl text-3xl leading-snug font-bold sm:text-4xl">
        {content.title}
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        {content.intro}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <CtaButton href="/contact" size="lg">
          ডেমো ও ট্রায়ালের জন্য যোগাযোগ করুন
        </CtaButton>
        <a
          href={siteConfig.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center font-semibold text-primary underline underline-offset-4"
        >
          লাইভ ডেমো দেখুন ↗
        </a>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {content.sections.map((section) => (
          <section
            key={section.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <section
        className="mt-12 rounded-2xl border border-border bg-card p-6 sm:p-8"
        aria-labelledby="company-facts"
      >
        <h2 id="company-facts" className="text-2xl font-bold">
          SikkhaDesk এক নজরে
        </h2>
        <dl className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["সফটওয়্যার", siteConfig.name],
            ["প্রতিষ্ঠান", siteConfig.operatorName],
            ["ব্যবহারের মাধ্যম", "ওয়েব ব্রাউজার ও Android অ্যাপ"],
            ["ফ্রি ট্রায়াল", "১৪ দিন"],
            ["অফিস", `${siteConfig.addressBn}, ময়মনসিংহ ২২০০`],
            ["সাপোর্ট সময়", `${siteConfig.supportHours} (বাংলাদেশ সময়)`],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-sm text-muted-foreground">{label}</dt>
              <dd className="mt-2 font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-primary">
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          <a href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}>
            {siteConfig.phone}
          </a>
          <a
            href={siteConfig.androidAppUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Play-তে Android অ্যাপ ↗
          </a>
        </div>
      </section>
      <nav
        aria-label="আরও জানুন"
        className="mt-8 flex flex-wrap gap-6 font-semibold text-primary"
      >
        <Link href="/features" className="underline underline-offset-4">
          সব ফিচার →
        </Link>
        <Link href="/pricing" className="underline underline-offset-4">
          প্ল্যান ও মোট খরচ →
        </Link>
        <Link href="/contact" className="underline underline-offset-4">
          আমাদের সাথে কথা বলুন →
        </Link>
      </nav>
    </Section>
  )
}
