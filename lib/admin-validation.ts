import { z } from "zod"
import {
  aboutContentSchema,
  contentSlug,
  productModuleSchema,
} from "@/lib/content-schemas"

export const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(1).max(256),
})

const common = {
  is_published: z.boolean(),
  sort_order: z.number().int().min(0).max(10000),
  updated_at: z.string().datetime({ offset: true }).nullable(),
}

export const editorSaveSchema = z
  .discriminatedUnion("kind", [
    z.object({
      kind: z.literal("module"),
      slug: contentSlug,
      content: z.unknown(),
      ...common,
    }),
    z.object({
      kind: z.literal("about"),
      slug: z.literal("about"),
      content: aboutContentSchema,
      ...common,
    }),
  ])
  .superRefine((value, context) => {
    if (value.kind === "module") {
      const content =
        value.content && typeof value.content === "object" ? value.content : {}
      const result = productModuleSchema.safeParse({
        ...content,
        slug: value.slug,
      })
      if (!result.success)
        for (const issue of result.error.issues)
          context.addIssue({ ...issue, path: ["content", ...issue.path] })
    }
    if (value.kind === "about" && !value.is_published)
      context.addIssue({
        code: "custom",
        path: ["is_published"],
        message: "The About page is permanent and must remain published.",
      })
  })

export function assertSameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")
  let matches = false
  try {
    const parsed = new URL(origin ?? "")
    // Next's internal Request URL may use the bound server hostname. Compare
    // the browser Origin with the actual inbound Host, while retaining protocol checks.
    matches =
      parsed.origin === origin &&
      parsed.host === host &&
      parsed.protocol === new URL(request.url).protocol
  } catch {
    matches = false
  }
  if (!matches || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new Error("CROSS_ORIGIN")
  }
}

export async function boundedBody(request: Request, maxBytes: number) {
  if (Number(request.headers.get("content-length")) > maxBytes)
    throw new Error("TOO_LARGE")
  const reader = request.body?.getReader()
  if (!reader) return Buffer.alloc(0)
  const chunks: Uint8Array[] = []
  let length = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      length += value.byteLength
      if (length > maxBytes) {
        await reader.cancel()
        throw new Error("TOO_LARGE")
      }
      chunks.push(value)
    }
  } finally {
    reader.releaseLock()
  }
  return Buffer.concat(chunks)
}
