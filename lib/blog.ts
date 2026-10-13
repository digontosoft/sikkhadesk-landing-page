import { blogPosts } from "@/constants/blog"
import type { BlogPost } from "@/types/blog"

export function getBlogPosts(): BlogPost[] {
  return [...blogPosts].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt)
  )
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function formatBlogDate(isoDate: string) {
  return new Intl.DateTimeFormat("bn-BD", {
    dateStyle: "long",
    timeZone: "Asia/Dhaka",
  }).format(new Date(`${isoDate}T00:00:00+06:00`))
}
