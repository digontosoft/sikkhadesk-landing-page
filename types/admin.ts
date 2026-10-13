import type { ProductModule } from "@/types/product-module"
import type { AboutContent } from "@/types/about"

export interface ContentRecord<T> {
  slug: string
  content: T
  is_published: boolean
  sort_order: number
  updated_at: string
}
export interface ContentIndex {
  modules: ContentRecord<Omit<ProductModule, "slug">>[]
  about: ContentRecord<AboutContent> | null
}
export type EditorDraft = {
  kind: "module" | "about"
  slug: string
  content: Omit<ProductModule, "slug"> | AboutContent
  is_published: boolean
  sort_order: number
  updated_at: string | null
}
