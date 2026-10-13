import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"

import { CtaButton } from "@/components/common/cta-button"
import { JsonLd } from "@/components/common/json-ld"
import { Section } from "@/components/layout/section"
import { formatBlogDate, getBlogPost, getBlogPosts } from "@/lib/blog"
import { getProductModules } from "@/lib/landing-content"
import { constructMetadata } from "@/lib/metadata"
import {
  articleStructuredData,
  breadcrumbStructuredData,
} from "@/lib/structured-data"

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }))
}

export const dynamicParams = false
export const dynamic = "force-static"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()
  return constructMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    article: {
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
    },
  })
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  // Module pages come from the content source; link only to ones that exist.
  const modules = await getProductModules()
  const related = post.relatedModules
    .map((moduleSlug) => modules.find((item) => item.slug === moduleSlug))
    .filter((item) => item !== undefined)
  const morePosts = getBlogPosts().filter((item) => item.slug !== slug)

  return (
    <Section className="py-12 sm:py-16">
      <JsonLd data={articleStructuredData(post)} />
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "ব্লগ", path: "/blog" },
          { name: post.title, path: `/blog/${slug}` },
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
        <Link href="/blog" className="hover:text-primary">
          ব্লগ
        </Link>
        <span aria-hidden> / </span>
        <span aria-current="page">{post.category}</span>
      </nav>

      <article className="max-w-3xl">
        <header>
          <p className="text-sm font-medium text-primary">{post.category}</p>
          <h1 className="mt-2 text-3xl/snug font-bold sm:text-4xl/snug">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            SikkhaDesk টিম · প্রকাশিত{" "}
            <time dateTime={post.publishedAt}>
              {formatBlogDate(post.publishedAt)}
            </time>
            {post.updatedAt !== post.publishedAt ? (
              <>
                {" "}
                · হালনাগাদ{" "}
                <time dateTime={post.updatedAt}>
                  {formatBlogDate(post.updatedAt)}
                </time>
              </>
            ) : null}
          </p>
        </header>

        <p className="mt-8 text-lg leading-relaxed text-muted-foreground">
          {post.intro}
        </p>

        <div className="mt-10 space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold">{section.heading}</h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph}
                  className="mt-4 leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {post.faq?.length ? (
          <section className="mt-12">
            <h2 className="text-2xl font-bold">সাধারণ প্রশ্ন</h2>
            <div className="mt-6 space-y-4">
              {post.faq.map((item) => (
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
          </section>
        ) : null}

        <aside className="mt-12 rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
          <h2 className="text-xl font-bold">
            আপনার প্রতিষ্ঠানে SikkhaDesk যাচাই করে দেখুন
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            ১৪ দিনের ফ্রি ট্রায়ালে আপনার নিজের উদাহরণ নিয়ে সফটওয়্যারটি পরীক্ষা
            করুন।
          </p>
          <div className="mt-5">
            <CtaButton href="/contact" size="lg">
              ফ্রি ডেমো নিন
            </CtaButton>
          </div>
        </aside>

        {related.length ? (
          <aside className="mt-12">
            <h2 className="text-xl font-bold">সম্পর্কিত ফিচার</h2>
            <div className="mt-4 flex flex-wrap gap-6">
              {related.map((item) => (
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
        ) : null}

        {morePosts.length ? (
          <aside className="mt-12">
            <h2 className="text-xl font-bold">আরও পড়ুন</h2>
            <ul className="mt-4 space-y-3">
              {morePosts.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/blog/${item.slug}`}
                    className="font-semibold text-primary underline underline-offset-4"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </article>
    </Section>
  )
}
