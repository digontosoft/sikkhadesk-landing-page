import { expect, test } from "@playwright/test"
import { existsSync } from "node:fs"

import { aboutContentSchema, productModuleSchema } from "@/lib/content-schemas"

if (existsSync(".env.local")) process.loadEnvFile(".env.local")

const projectUrl = process.env.SUPABASE_URL?.trim()
const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim()

test.use({ javaScriptEnabled: false })

test("live published Supabase content validates and matches server-rendered pages and sitemap", async ({ request, page, context }) => {
  test.skip(!projectUrl || !publicKey, "No Supabase connection configured")
  const headers: Record<string, string> = { apikey: publicKey! }
  if (!publicKey?.startsWith("sb_publishable_")) {
    const claims = JSON.parse(Buffer.from(publicKey!.split(".")[1], "base64url").toString("utf8"))
    expect(claims.role).toBe("anon")
    headers.Authorization = `Bearer ${publicKey}`
  }
  await context.route("**/*", route => new URL(route.request().url()).hostname === "127.0.0.1" ? route.continue() : route.abort())

  async function readTable(table: string) {
    const url = new URL(`/rest/v1/${table}`, projectUrl)
    url.searchParams.set("select", "slug,content,is_published")
    // No publication filter: inspect what the actual public role can read.
    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(10000),
    })
    expect(response.status, `${table} public read`).toBe(200)
    const rows: Array<{ slug: string; content: Record<string, unknown>; is_published: boolean }> = await response.json()
    expect(Array.isArray(rows)).toBe(true)
    expect(rows.every(row => row.is_published === true)).toBe(true)
    return rows
  }

  const sitemapResponse = await request.get("/sitemap.xml")
  expect(sitemapResponse.status()).toBe(200)
  const sitemap = await sitemapResponse.text()
  const modules = await readTable("landing_modules")
  for (const row of modules) {
    const content = productModuleSchema.parse({ ...row.content, slug: row.slug })
    const path = `/features/${content.slug}/`
    const response = await page.goto(path)
    expect(response?.status(), path).toBe(200)
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(`${content.title} SikkhaDesk`)
    expect(sitemap).toContain(`https://www.sikkhadesk.com${path}`)
  }
  const aboutRow = (await readTable("landing_pages")).find(row => row.slug === "about")
  expect(aboutRow, "Published About starter content").toBeDefined()
  const about = aboutContentSchema.parse(aboutRow!.content)
  const response = await page.goto("/about/")
  expect(response?.status()).toBe(200)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(about.title)
})
