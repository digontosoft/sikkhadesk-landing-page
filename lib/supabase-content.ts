import { z } from "zod"

import { aboutContent } from "@/constants/about"
import { productModules } from "@/constants/modules"
import {
  aboutContentSchema,
  contentSlug,
  productModuleSchema,
} from "@/lib/content-schemas"
import type { AboutContent } from "@/types/about"
import type { ProductModule } from "@/types/product-module"

export interface ContentConnection {
  url: string
  key: string
}

type ContentFetch = typeof fetch
const rowSchema = z.object({
  slug: contentSlug,
  content: z.unknown(),
  is_published: z.boolean(),
})

// Native fetch keeps these reads in Next's server cache; no browser client or
// elevated database key is required to read published marketing content.
async function readRows(
  table: "landing_modules" | "landing_pages",
  connection: ContentConnection,
  fetcher: ContentFetch
) {
  const url = new URL(`/rest/v1/${table}`, connection.url)
  url.searchParams.set("select", "slug,content,is_published")
  url.searchParams.set("is_published", "eq.true")
  url.searchParams.set("order", "sort_order.asc,slug.asc")
  if (table === "landing_pages") url.searchParams.set("slug", "eq.about")
  const headers: Record<string, string> = {
    apikey: connection.key,
    Accept: "application/json",
  }
  // Legacy anon keys are JWTs; new publishable keys are not bearer tokens.
  if (!connection.key.startsWith("sb_publishable_"))
    headers.Authorization = `Bearer ${connection.key}`
  const response = await fetcher(url, {
    headers,
    next: { revalidate: 300, tags: ["landing-content"] },
    signal: AbortSignal.timeout(5000),
  })
  if (!response.ok) throw new Error("Content request failed")
  return z
    .array(rowSchema)
    .max(200)
    .parse(await response.json())
    .filter((row) => row.is_published)
}

export async function loadProductModules(
  connection: ContentConnection | null,
  fetcher: ContentFetch = fetch
): Promise<ProductModule[]> {
  if (!connection) return productModules
  try {
    const rows = await readRows("landing_modules", connection, fetcher)
    const modules: ProductModule[] = []
    for (const row of rows) {
      const content =
        row.content &&
        typeof row.content === "object" &&
        !Array.isArray(row.content)
          ? row.content
          : {}
      const result = productModuleSchema.safeParse({
        ...content,
        slug: row.slug,
      })
      if (result.success) modules.push(result.data)
      else console.warn(`[landing-content] Skipped invalid module: ${row.slug}`)
    }
    // A successful empty response is intentionally empty: unpublished modules
    // must not be restored from the local defaults.
    return modules
  } catch {
    console.warn(
      "[landing-content] Module service unavailable; using local starter content."
    )
    return productModules
  }
}

export async function loadAboutContent(
  connection: ContentConnection | null,
  fetcher: ContentFetch = fetch
): Promise<AboutContent> {
  if (!connection) return aboutContent
  try {
    const rows = await readRows("landing_pages", connection, fetcher)
    const result = aboutContentSchema.safeParse(
      rows.find((row) => row.slug === "about")?.content
    )
    if (result.success) return result.data
    console.warn(
      "[landing-content] About content missing or invalid; using the confirmed starter copy."
    )
  } catch {
    console.warn(
      "[landing-content] About service unavailable; using the confirmed starter copy."
    )
  }
  return aboutContent
}
