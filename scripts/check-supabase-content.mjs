import { existsSync } from "node:fs"

if (existsSync(".env.local")) process.loadEnvFile(".env.local")

const projectUrl = process.env.SUPABASE_URL?.trim()
const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY?.trim()

if (!projectUrl || !publicKey || publicKey.startsWith("sb_secret_")) {
  console.error("Set SUPABASE_URL and a publishable key in .env.local first.")
  process.exit(1)
}

const project = new URL(projectUrl)
if (project.protocol !== "https:" || project.username || project.password) {
  console.error("Use the HTTPS Supabase project URL without credentials.")
  process.exit(1)
}

const headers = { apikey: publicKey }
if (!publicKey.startsWith("sb_publishable_")) {
  try {
    const claims = JSON.parse(
      Buffer.from(publicKey.split(".")[1], "base64url").toString("utf8")
    )
    if (claims.role !== "anon") throw new Error("Not an anon key")
    headers.Authorization = `Bearer ${publicKey}`
  } catch {
    console.error(
      "Use a publishable key or legacy anon key, never an elevated key."
    )
    process.exit(1)
  }
}

for (const table of ["landing_modules", "landing_pages"]) {
  try {
    const url = new URL(`/rest/v1/${table}`, project.origin)
    url.searchParams.set("select", "slug,is_published")
    url.searchParams.set("order", "slug.asc")
    // Intentionally omit a publication filter to check what the public key can read.
    const response = await fetch(url, {
      headers,
      signal: AbortSignal.timeout(10000),
    })
    const body = await response.json()
    if (!response.ok) {
      console.error(
        `${table}: HTTP ${response.status}, API code ${body.code ?? "unknown"}.`
      )
      if (body.code === "PGRST205")
        console.error(
          "Run the schema migration and starter seed in the project's SQL Editor."
        )
      process.exitCode = 1
      continue
    }
    if (
      !Array.isArray(body) ||
      body.some(
        (row) => typeof row.slug !== "string" || row.is_published !== true
      )
    ) {
      console.error(
        `${table}: unexpected data or unpublished rows exposed to the public key.`
      )
      process.exitCode = 1
      continue
    }
    console.log(
      `${table}: connected; ${body.length} published rows visible to the public key.`
    )
    if (body.length === 0)
      console.log(
        "No published content yet; run the starter seed for initial content."
      )
  } catch (error) {
    console.error(
      `${table}: request failed (${error.cause?.code ?? error.name}).`
    )
    process.exitCode = 1
  }
}

if (process.argv.includes("--admin")) {
  try {
    const response = await fetch(
      new URL("/rest/v1/rpc/is_landing_editor", project.origin),
      {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: "{}",
        signal: AbortSignal.timeout(10000),
      }
    )
    const body = await response.json()
    if ([401, 403].includes(response.status) && body.code === "42501") {
      console.log(
        "Admin permission function exists; the public role cannot execute it."
      )
      console.log(
        "Sign in privately through /admin/ to verify your allowlisted Auth account."
      )
    } else {
      console.error(
        `Admin setup check: unexpected HTTP ${response.status}, API code ${body.code ?? "none"}.`
      )
      process.exitCode = 1
    }
  } catch (error) {
    console.error(
      `Admin setup check failed (${error.cause?.code ?? error.name}).`
    )
    process.exitCode = 1
  }
}
