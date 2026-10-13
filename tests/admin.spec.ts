import { test, expect } from "@playwright/test"
import { mkdir } from "node:fs/promises"
import sharp from "sharp"
import { productModules } from "@/constants/modules"

const origin = "http://127.0.0.1:4174"
const editorCookies =
  "sd_admin_access=fixture-editor-access; sd_admin_refresh=fixture-editor-refresh"
const writeHeaders = { Origin: origin, Cookie: editorCookies }
const draftBody = (slug: string) => ({
  kind: "module",
  slug,
  content: productModules[0],
  is_published: false,
  sort_order: 4,
  updated_at: null,
})

test("unauthenticated, cross-origin and non-editor requests cannot change content", async ({
  request,
}) => {
  expect((await request.get("/api/admin/content/")).status()).toBe(401)
  expect(
    (
      await request.post("/api/admin/content/", {
        headers: { Origin: origin },
        data: draftBody("forbidden"),
      })
    ).status()
  ).toBe(401)
  expect(
    (
      await request.post("/api/admin/session/", {
        headers: { Origin: "https://untrusted.example" },
        data: { email: "editor@example.test", password: "fixture-password" },
      })
    ).status()
  ).toBe(403)
  expect(
    (
      await request.post("/api/admin/session/", {
        headers: { Origin: origin },
        data: { email: "viewer@example.test", password: "fixture-password" },
      })
    ).status()
  ).toBe(403)
  expect(
    (
      await request.post("/api/admin/media/", {
        headers: { Origin: origin },
        data: "image",
      })
    ).status()
  ).toBe(401)
})

test("approved login sets private cookies, refreshes expired access and signs out", async ({
  request,
}) => {
  const login = await request.post("/api/admin/session/", {
    headers: { Origin: origin },
    data: { email: "editor@example.test", password: "fixture-password" },
  })
  expect(login.status()).toBe(200)
  expect(await login.json()).toEqual({
    user: {
      id: "11111111-1111-4111-8111-111111111111",
      email: "editor@example.test",
    },
  })
  const cookies = login
    .headersArray()
    .filter((header) => header.name.toLowerCase() === "set-cookie")
    .map((header) => header.value)
  expect(cookies).toHaveLength(2)
  for (const cookie of cookies) {
    expect(cookie).toContain("HttpOnly")
    expect(cookie).toContain("Secure")
    expect(cookie).toContain("SameSite=strict")
    expect(cookie).toContain("Path=/api/admin")
  }
  const refresh = await request.get("/api/admin/session/", {
    headers: {
      Cookie:
        "sd_admin_access=expired-fixture; sd_admin_refresh=fixture-editor-refresh",
    },
  })
  expect(refresh.status()).toBe(200)
  expect(refresh.headers()["cache-control"]).toContain("no-store")
  expect(
    (
      await request.delete("/api/admin/session/", { headers: writeHeaders })
    ).status()
  ).toBe(200)
  expect(
    (
      await request.get("/api/admin/session/", {
        headers: { Cookie: editorCookies },
      })
    ).status()
  ).toBe(401)
})

test("draft save, publication, sitemap refresh and conflict handling work through protected APIs", async ({
  request,
}) => {
  await request.post("/api/admin/session/", {
    headers: { Origin: origin },
    data: { email: "editor@example.test", password: "fixture-password" },
  })
  const invalid = await request.post("/api/admin/content/", {
    headers: writeHeaders,
    data: { ...draftBody("admin-fixture"), content: { title: "Incomplete" } },
  })
  expect(invalid.status()).toBe(400)
  const create = await request.post("/api/admin/content/", {
    headers: writeHeaders,
    data: draftBody("admin-fixture"),
  })
  expect(create.status()).toBe(201)
  const { record } = await create.json()
  expect((await request.get("/features/admin-fixture/")).status()).toBe(404)
  const publish = { kind: "module", ...record, is_published: true }
  expect(
    (
      await request.put("/api/admin/content/", {
        headers: writeHeaders,
        data: publish,
      })
    ).status()
  ).toBe(200)
  expect((await request.get("/features/admin-fixture/")).status()).toBe(200)
  expect(await (await request.get("/sitemap.xml")).text()).toContain(
    "/features/admin-fixture/"
  )
  expect(
    (
      await request.put("/api/admin/content/", {
        headers: writeHeaders,
        data: publish,
      })
    ).status()
  ).toBe(409)
  expect(
    (
      await request.post("/api/admin/content/", {
        headers: writeHeaders,
        data: draftBody("admin-fixture"),
      })
    ).status()
  ).toBe(409)
  const current = (
    await (
      await request.get("/api/admin/content/", {
        headers: { Cookie: editorCookies },
      })
    ).json()
  ).modules.find((row: { slug: string }) => row.slug === "admin-fixture")
  expect(
    (
      await request.put("/api/admin/content/", {
        headers: writeHeaders,
        data: { kind: "module", ...current, is_published: false },
      })
    ).status()
  ).toBe(200)
  expect((await request.get("/features/admin-fixture/")).status()).toBe(404)
})

test("uploads verify real image data and reject unsupported or oversized files", async ({
  request,
}) => {
  const image = await sharp({
    create: { width: 120, height: 80, channels: 3, background: "#7466db" },
  })
    .png()
    .toBuffer()
  const upload = await request.post("/api/admin/media/", {
    headers: { ...writeHeaders, "Content-Type": "image/png" },
    data: image,
  })
  expect(upload.status()).toBe(200)
  const result = await upload.json()
  expect(result.width).toBe(120)
  expect(result.height).toBe(80)
  expect(result.src).toMatch(
    /^https:\/\/admin-test\.supabase\.co\/storage\/v1\/object\/public\/landing-media\/modules\/[a-f0-9-]+\.webp$/
  )
  expect(
    (
      await request.post("/api/admin/media/", {
        headers: writeHeaders,
        data: "<svg>not a raster image</svg>",
      })
    ).status()
  ).toBe(400)
  expect(
    (
      await request.post("/api/admin/media/", {
        headers: writeHeaders,
        data: Buffer.alloc(5 * 1024 * 1024 + 1),
      })
    ).status()
  ).toBe(413)
})

test("admin form edits without JSON, previews, saves and fits desktop/mobile", async ({
  page,
  context,
  request,
}) => {
  await context.route("**/*", (route) =>
    new URL(route.request().url()).hostname === "127.0.0.1"
      ? route.continue()
      : route.abort()
  )
  await page.goto("/admin/")
  await expect(
    page.getByRole("heading", { name: "Content admin" })
  ).toBeVisible()
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, nofollow"
  )
  await page.getByLabel("Email", { exact: true }).fill("editor@example.test")
  await page.getByLabel("Password", { exact: true }).fill("fixture-password")
  await page.getByRole("button", { name: "Sign in", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Content library" })
  ).toBeVisible()
  await mkdir("test-results-admin/visual", { recursive: true })
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 1000 })
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth
      )
    ).toBe(true)
    if (width === 390) {
      const urlLine = await page.getByText("/features/fee-management/ · Order 0", { exact: true }).boundingBox()
      expect(urlLine?.width).toBeGreaterThan(200)
    }
    await page.screenshot({
      path: `test-results-admin/visual/library-${width}.png`,
      fullPage: true,
    })
  }
  await page.getByRole("button", { name: "New module" }).click()
  await page.getByLabel("URL slug", { exact: true }).fill("ui-fixture")
  await page
    .getByLabel("Page title", { exact: true })
    .fill("Admin UI test module")
  await page.getByRole("button", { name: "Preview", exact: true }).click()
  await expect(
    page.getByRole("heading", { name: "Admin UI test module" })
  ).toBeVisible()
  await page.getByRole("button", { name: "Back to editor" }).click()
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    )
  ).toBe(true)
  await page.screenshot({
    path: "test-results-admin/visual/editor-390.png",
    fullPage: true,
  })
  await page.getByRole("button", { name: "Save draft", exact: true }).click()
  await expect(page.getByRole("status")).toContainText("Draft saved")
  expect((await request.get("/features/ui-fixture/")).status()).toBe(404)
  await page
    .getByRole("button", { name: "Content library", exact: false })
    .click()
  await page.getByRole("button", { name: "Edit About", exact: true }).click()
  await page
    .getByLabel("Introduction", { exact: true })
    .fill("About content updated by approved editor")
  await page.getByRole("button", { name: "Save & publish" }).click()
  await expect(page.getByRole("status")).toContainText("Saved and published")
  await page.getByRole("button", { name: "Sign out" }).click()
  await expect(
    page.getByRole("heading", { name: "Content admin" })
  ).toBeVisible()
})
