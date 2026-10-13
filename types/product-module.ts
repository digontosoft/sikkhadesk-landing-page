export interface ProductModule {
  slug: string
  title: string
  shortTitle: string
  englishTitle: string
  description: string
  problem: string
  capabilities: { title: string; body: string }[]
  workflow: { title: string; body: string }[]
  example: {
    title: string
    context: string
    caption: string
    columns: string[]
    rows: string[][]
    takeaway: string
  }
  preparation: string[]
  demo: string
  questions: { question: string; answer: string }[]
  screenshot?: {
    src: string
    alt: string
    caption: string
    width: number
    height: number
  }
}
