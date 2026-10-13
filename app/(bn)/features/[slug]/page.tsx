import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/common/json-ld"
import { CtaButton } from "@/components/common/cta-button"
import { Section } from "@/components/layout/section"
import { ModuleWorkflow } from "@/components/sections/module-workflow"
import { siteConfig } from "@/constants/site"
import { getProductModules } from "@/lib/landing-content"
import { constructMetadata } from "@/lib/metadata"
import { breadcrumbStructuredData } from "@/lib/structured-data"

export async function generateStaticParams() {
  const productModules = await getProductModules()
  return productModules.map(({ slug }) => ({ slug }))
}

export const dynamicParams = true
export const dynamic = "force-static"
export const revalidate = 300

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const productModules = await getProductModules()
  const productModule = productModules.find((item) => item.slug === slug)
  if (!productModule) notFound()
  return constructMetadata({
    title: productModule.title,
    description: productModule.description,
    path: `/features/${slug}`,
  })
}

export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const productModules = await getProductModules()
  const productModule = productModules.find((item) => item.slug === slug)
  if (!productModule) notFound()
  return (
    <Section className="py-12 sm:py-16">
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "ফিচার", path: "/features" },
          { name: productModule.shortTitle, path: `/features/${slug}` },
        ])}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex flex-wrap gap-2 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        <span aria-hidden> / </span>
        <Link href="/features" className="hover:text-primary">
          ফিচার
        </Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{productModule.shortTitle}</span>
      </nav>
      <h1 className="max-w-4xl text-3xl leading-snug font-bold sm:text-4xl">
        {productModule.title} <span className="text-primary">SikkhaDesk</span>
      </h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        {productModule.description}
      </p>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <CtaButton href="/contact" size="lg">
          এই মডিউলের ডেমো নিন
        </CtaButton>
        <Link
          href="#example"
          className="font-semibold text-primary underline underline-offset-4"
        >
          কাজের উদাহরণ দেখুন ↓
        </Link>
      </div>

      <article className="mt-12 space-y-12">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold">কোন কাজটি সহজ করবে?</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {productModule.problem}
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">মডিউলে কী কী কাজ করতে পারবেন</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {productModule.capabilities.map((item) => (
              <section
                key={item.title}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </section>
            ))}
          </div>
        </div>
        {productModule.screenshot && (
          <figure className="rounded-2xl border border-border bg-card p-4 sm:p-6">
            <Image
              src={productModule.screenshot.src}
              alt={productModule.screenshot.alt}
              width={productModule.screenshot.width}
              height={productModule.screenshot.height}
              className="h-auto w-full rounded-xl"
              unoptimized
            />
            <figcaption className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {productModule.screenshot.caption}
            </figcaption>
          </figure>
        )}
        <ModuleWorkflow productModule={productModule} />
        <div className="max-w-3xl">
          <h2 className="text-2xl font-bold">
            শুরু করার আগে যা প্রস্তুত রাখবেন
          </h2>
          <ul className="mt-4 list-disc space-y-3 pl-6 text-muted-foreground">
            {productModule.preparation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-2xl font-bold">ডেমোতে যা যাচাই করবেন</h2>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
            {productModule.demo}
          </p>
          <a
            href={siteConfig.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block font-semibold text-primary underline underline-offset-4"
          >
            লাইভ সফটওয়্যার ডেমো দেখুন ↗
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            ১৪ দিনের ফ্রি ট্রায়াল রয়েছে। শিক্ষার্থীসংখ্যা অনুযায়ী প্ল্যান,
            সেটআপ ফি ও ভ্যাটসহ মোট খরচ{" "}
            <Link
              href="/pricing"
              className="font-medium text-primary underline"
            >
              প্রাইসিং পেজে
            </Link>{" "}
            দেখুন।
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">সাধারণ প্রশ্ন</h2>
          <div className="mt-6 space-y-4">
            {productModule.questions.map((item) => (
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
        </div>
        <aside>
          <h2 className="text-2xl font-bold">সম্পর্কিত মডিউল</h2>
          <div className="mt-4 flex flex-wrap gap-6">
            {productModules
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/features/${item.slug}`}
                  className="font-semibold text-primary underline underline-offset-4"
                >
                  {item.shortTitle} →
                </Link>
              ))}
          </div>
        </aside>
      </article>
    </Section>
  )
}
