import type { Metadata } from "next"
import Link from "next/link"

import { JsonLd } from "@/components/common/json-ld"
import { Section } from "@/components/layout/section"
import { formatBlogDate, getBlogPosts } from "@/lib/blog"
import { constructMetadata } from "@/lib/metadata"
import { breadcrumbStructuredData } from "@/lib/structured-data"

export const metadata: Metadata = constructMetadata({
  title: "স্কুল ম্যানেজমেন্ট ব্লগ",
  description:
    "বাংলাদেশের স্কুল, মাদ্রাসা ও কোচিং সেন্টারের ফি, উপস্থিতি, ফলাফল ও সফটওয়্যার বাছাই নিয়ে ব্যবহারিক গাইড ও পরামর্শ।",
  path: "/blog",
})

export default function BlogIndexPage() {
  const posts = getBlogPosts()
  return (
    <Section className="py-12 sm:py-16">
      <JsonLd
        data={breadcrumbStructuredData([
          { name: "হোম", path: "/" },
          { name: "ব্লগ", path: "/blog" },
        ])}
      />
      <h1 className="max-w-4xl text-3xl/snug font-bold sm:text-4xl/snug">
        স্কুল ম্যানেজমেন্ট গাইড ও পরামর্শ
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted-foreground">
        স্কুল, মাদ্রাসা ও কোচিং সেন্টারের প্রতিদিনের কাজ—ফি, উপস্থিতি, ফলাফল ও
        সফটওয়্যার বাছাই—নিয়ে ব্যবহারিক লেখা।
      </p>
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col rounded-2xl border border-border bg-card p-6"
          >
            <p className="text-sm font-medium text-primary">{post.category}</p>
            <h2 className="mt-2 text-xl leading-snug font-semibold">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-primary"
              >
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              <time dateTime={post.publishedAt}>
                {formatBlogDate(post.publishedAt)}
              </time>{" "}
              · পড়তে ~{new Intl.NumberFormat("bn-BD").format(post.readingMinutes)}{" "}
              মিনিট
            </p>
          </article>
        ))}
      </div>
    </Section>
  )
}
