export interface BlogSection {
  heading: string
  paragraphs: string[]
  bullets?: string[]
}

export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  /** ISO date, YYYY-MM-DD */
  publishedAt: string
  /** ISO date, YYYY-MM-DD */
  updatedAt: string
  readingMinutes: number
  intro: string
  sections: BlogSection[]
  faq?: { question: string; answer: string }[]
  /** Slugs of product module pages to link from the post. */
  relatedModules: string[]
}
