// Test-only preload. Intercepts one fictional origin and never sends credentials to a real project.
import { readFile } from "node:fs/promises"
import ts from "typescript"

if (process.env.SUPABASE_URL !== "https://admin-test.supabase.co")
  throw new Error("Admin mock requires its fictional Supabase origin")
const root = new URL("../../", import.meta.url)
async function data(path, name) {
  const source = await readFile(new URL(path, root), "utf8")
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  })
  return (
    await import(
      `data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`
    )
  )[name]
}
const modules = await data("constants/modules.ts", "productModules")
const about = await data("constants/about.ts", "aboutContent")
let clock = Date.parse("2026-10-11T10:00:00Z")
const stamp = () => new Date((clock += 1000)).toISOString()
const tables = {
  landing_modules: modules.map(({ slug, ...content }, index) => ({
    slug,
    content,
    is_published: true,
    sort_order: index,
    updated_at: stamp(),
  })),
  landing_pages: [
    {
      slug: "about",
      content: about,
      is_published: true,
      sort_order: 0,
      updated_at: stamp(),
    },
  ],
}
let revoked = false
const originalFetch = globalThis.fetch
const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  })
const session = {
  access_token: "fixture-editor-access",
  refresh_token: "fixture-editor-refresh",
  expires_in: 3600,
}
globalThis.fetch = async (input, init = {}) => {
  const url = new URL(
    typeof input === "string" || input instanceof URL
      ? String(input)
      : input.url
  )
  if (url.origin !== "https://admin-test.supabase.co")
    return originalFetch(input, init)
  const headers = new Headers(init.headers)
  const token = headers.get("Authorization")?.replace(/^Bearer /, "")
  const editor = token === session.access_token && !revoked
  const viewer = token === "fixture-viewer-access"
  const method = init.method ?? "GET"
  if (url.pathname === "/auth/v1/token") {
    const body = JSON.parse(init.body)
    if (url.searchParams.get("grant_type") === "refresh_token")
      return body.refresh_token === session.refresh_token && !revoked
        ? json(session)
        : json({}, 401)
    if (body.password !== "fixture-password") return json({}, 400)
    if (body.email === "editor@example.test") {
      revoked = false
      return json(session)
    }
    if (body.email === "viewer@example.test")
      return json({
        ...session,
        access_token: "fixture-viewer-access",
        refresh_token: "fixture-viewer-refresh",
      })
    return json({}, 400)
  }
  if (url.pathname === "/auth/v1/user")
    return editor || viewer
      ? json({
          id: "11111111-1111-4111-8111-111111111111",
          email: editor ? "editor@example.test" : "viewer@example.test",
        })
      : json({}, 401)
  if (url.pathname === "/auth/v1/logout") {
    if (editor) revoked = true
    return json({})
  }
  if (url.pathname === "/rest/v1/rpc/is_landing_editor")
    return editor || viewer ? json(editor) : json({}, 401)
  if (url.pathname.startsWith("/storage/v1/object/landing-media/modules/"))
    return editor ? json({ Key: "fixture-image.webp" }) : json({}, 403)
  const table = url.pathname.split("/").at(-1)
  if (!(table in tables)) return json({ code: "PGRST205" }, 404)
  if (method === "GET") {
    let rows = tables[table].filter((row) => editor || row.is_published)
    if (url.searchParams.get("is_published") === "eq.true")
      rows = rows.filter((row) => row.is_published)
    if (url.searchParams.has("slug"))
      rows = rows.filter(
        (row) => `eq.${row.slug}` === url.searchParams.get("slug")
      )
    return json(rows.sort((a, b) => a.sort_order - b.sort_order))
  }
  if (!editor) return json({}, 403)
  const body = JSON.parse(init.body)
  if (method === "POST") {
    if (tables[table].some((row) => row.slug === body.slug))
      return json({}, 409)
    const row = { ...body, updated_at: stamp() }
    tables[table].push(row)
    return json([row], 201)
  }
  if (method === "PATCH") {
    const index = tables[table].findIndex(
      (row) =>
        `eq.${row.slug}` === url.searchParams.get("slug") &&
        `eq.${row.updated_at}` === url.searchParams.get("updated_at")
    )
    if (index < 0) return json([])
    tables[table][index] = {
      ...tables[table][index],
      ...body,
      updated_at: stamp(),
    }
    return json([tables[table][index]])
  }
  return json({}, 405)
}
