import { revalidatePath, revalidateTag } from "next/cache"
import { z } from "zod"
import {
  AdminError,
  adminFailure,
  adminFetch,
  adminJson,
  requireEditor,
} from "@/lib/admin-server"
import {
  assertSameOrigin,
  boundedBody,
  editorSaveSchema,
} from "@/lib/admin-validation"
import { productModuleSchema } from "@/lib/content-schemas"

const row = z.object({
  slug: z.string(),
  content: z.unknown(),
  is_published: z.boolean(),
  sort_order: z.number(),
  updated_at: z.string(),
})

export async function GET() {
  try {
    const { token } = await requireEditor()
    const read = async (table: string) => {
      const response = await adminFetch(
        `/rest/v1/${table}?select=slug,content,is_published,sort_order,updated_at&order=sort_order.asc,slug.asc`,
        token
      )
      if (!response.ok)
        throw new AdminError(
          503,
          "Content cannot be loaded. Check admin database setup."
        )
      return z
        .array(row)
        .max(200)
        .parse(await response.json())
    }
    const [modules, pages] = await Promise.all([
      read("landing_modules"),
      read("landing_pages"),
    ])
    return adminJson({
      modules,
      about: pages.find((page) => page.slug === "about") ?? null,
    })
  } catch (error) {
    return adminFailure(error)
  }
}

async function save(request: Request, create: boolean) {
  try {
    assertSameOrigin(request)
    const { token } = await requireEditor()
    const data = editorSaveSchema.parse(
      JSON.parse((await boundedBody(request, 150000)).toString("utf8"))
    )
    if (create && data.updated_at !== null)
      throw new AdminError(400, "New records cannot have an update timestamp.")
    if (!create && !data.updated_at)
      throw new AdminError(400, "Reload the record before saving.")
    const table = data.kind === "module" ? "landing_modules" : "landing_pages"
    const query = new URLSearchParams({
      select: "slug,content,is_published,sort_order,updated_at",
    })
    if (!create) {
      query.set("slug", `eq.${data.slug}`)
      query.set("updated_at", `eq.${data.updated_at}`)
    }
    let content = data.content
    if (data.kind === "module") {
      const { slug: _slug, ...validated } = productModuleSchema.parse({
        ...(data.content as Record<string, unknown>),
        slug: data.slug,
      })
      void _slug
      content = validated
    }
    const response = await adminFetch(`/rest/v1/${table}?${query}`, token, {
      method: create ? "POST" : "PATCH",
      headers: {
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        ...(create ? { slug: data.slug } : {}),
        content,
        is_published: data.is_published,
        sort_order: data.sort_order,
      }),
    })
    if (response.status === 409)
      throw new AdminError(
        409,
        "This slug already exists. Choose a different URL slug."
      )
    if (!response.ok)
      throw new AdminError(
        503,
        "Save failed. Your edits remain in this form. Check editor permissions and try again."
      )
    const rows = z.array(row).parse(await response.json())
    if (rows.length !== 1)
      throw new AdminError(
        409,
        "This record changed in another session. Copy your edits, reload, and try again."
      )
    revalidateTag("landing-content", { expire: 0 })
    revalidatePath("/")
    revalidatePath("/features")
    revalidatePath("/features/[slug]", "page")
    revalidatePath("/about")
    revalidatePath("/sitemap.xml")
    return adminJson({ record: rows[0] }, create ? 201 : 200)
  } catch (error) {
    return adminFailure(error)
  }
}

export async function POST(request: Request) {
  return save(request, true)
}
export async function PUT(request: Request) {
  return save(request, false)
}
