import "server-only"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { z } from "zod"

const ACCESS = "sd_admin_access"
const REFRESH = "sd_admin_refresh"
const sessionSchema = z.object({
  access_token: z.string().min(1),
  refresh_token: z.string().min(1),
  expires_in: z.number().positive().max(86400),
})
const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
})
export type EditorUser = z.infer<typeof userSchema>

export class AdminError extends Error {
  constructor(
    public status: number,
    message: string
  ) {
    super(message)
  }
}

function settings() {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url || !key || key.startsWith("sb_secret_"))
    throw new AdminError(503, "Supabase connection is not configured.")
  const parsed = new URL(url)
  if (parsed.protocol !== "https:" || parsed.username || parsed.password)
    throw new AdminError(503, "Invalid Supabase connection.")
  if (!key.startsWith("sb_publishable_")) {
    try {
      const claims = JSON.parse(
        Buffer.from(key.split(".")[1], "base64url").toString("utf8")
      )
      if (claims.role !== "anon") throw new Error("Elevated key")
    } catch {
      throw new AdminError(503, "Use a Supabase publishable key.")
    }
  }
  return { url: parsed.origin, key }
}

export function projectOrigin() {
  return settings().url
}

export async function adminFetch(
  path: string,
  token?: string,
  init: RequestInit = {}
) {
  const { url, key } = settings()
  const headers = new Headers(init.headers)
  headers.set("apikey", key)
  if (token) headers.set("Authorization", `Bearer ${token}`)
  try {
    return await fetch(`${url}${path}`, {
      ...init,
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(10000),
    })
  } catch {
    throw new AdminError(503, "Supabase is unavailable. Please try again.")
  }
}

async function rememberSession(data: unknown) {
  const session = sessionSchema.parse(data)
  const jar = await cookies()
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    path: "/api/admin",
    priority: "high" as const,
  }
  jar.set(ACCESS, session.access_token, {
    ...options,
    maxAge: session.expires_in,
  })
  jar.set(REFRESH, session.refresh_token, {
    ...options,
    maxAge: 60 * 60 * 24 * 7,
  })
  return session.access_token
}

export async function clearSession() {
  const jar = await cookies()
  for (const name of [ACCESS, REFRESH])
    jar.set(name, "", {
      path: "/api/admin",
      maxAge: 0,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
}

async function checkEditor(token: string) {
  const userResponse = await adminFetch("/auth/v1/user", token)
  if (!userResponse.ok)
    throw new AdminError(401, "Your session expired. Please sign in again.")
  const user = userSchema.parse(await userResponse.json())
  const permission = await adminFetch("/rest/v1/rpc/is_landing_editor", token, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{}",
  })
  if (!permission.ok)
    throw new AdminError(
      503,
      "Admin database setup is required. See ADMIN-CMS.md."
    )
  if ((await permission.json()) !== true)
    throw new AdminError(
      403,
      "This account does not have content editor access."
    )
  return user
}

export async function signIn(email: string, password: string) {
  const response = await adminFetch(
    "/auth/v1/token?grant_type=password",
    undefined,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }
  )
  if (!response.ok)
    throw new AdminError(
      response.status === 429 ? 429 : 401,
      response.status === 429
        ? "Too many attempts. Please wait before trying again."
        : "Sign-in failed. Check your email and password."
    )
  const session = sessionSchema.parse(await response.json())
  try {
    const user = await checkEditor(session.access_token)
    await rememberSession(session)
    return user
  } catch (error) {
    await adminFetch("/auth/v1/logout?scope=local", session.access_token, {
      method: "POST",
    }).catch(() => undefined)
    throw error
  }
}

export async function requireEditor() {
  const jar = await cookies()
  let token = jar.get(ACCESS)?.value
  const refresh = jar.get(REFRESH)?.value
  if (!token && !refresh)
    throw new AdminError(401, "Please sign in to continue.")
  if (token) {
    try {
      return { token, user: await checkEditor(token) }
    } catch (error) {
      if (!(error instanceof AdminError) || error.status !== 401) throw error
    }
  }
  if (!refresh) {
    await clearSession()
    throw new AdminError(401, "Please sign in again.")
  }
  const response = await adminFetch(
    "/auth/v1/token?grant_type=refresh_token",
    undefined,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    }
  )
  if (!response.ok) {
    await clearSession()
    throw new AdminError(401, "Your session expired. Please sign in again.")
  }
  const session = sessionSchema.parse(await response.json())
  const user = await checkEditor(session.access_token)
  token = await rememberSession(session)
  return { token, user }
}

export async function signOut() {
  const jar = await cookies()
  let token = jar.get(ACCESS)?.value
  let revoked = true
  if (!token && jar.get(REFRESH)?.value) {
    try {
      token = (await requireEditor()).token
    } catch {
      revoked = false
    }
  }
  if (token) {
    try {
      const response = await adminFetch("/auth/v1/logout?scope=local", token, {
        method: "POST",
      })
      revoked = response.ok || response.status === 401
    } catch {
      revoked = false
    }
  }
  await clearSession()
  return revoked
}

export function adminJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
      "X-Content-Type-Options": "nosniff",
    },
  })
}

export function adminFailure(error: unknown) {
  if (error instanceof AdminError)
    return adminJson({ error: error.message }, error.status)
  if (error instanceof Error && error.message === "CROSS_ORIGIN")
    return adminJson({ error: "Request origin rejected." }, 403)
  if (error instanceof Error && error.message === "TOO_LARGE")
    return adminJson({ error: "Request is too large." }, 413)
  if (error instanceof z.ZodError)
    return adminJson(
      {
        error: "Check the highlighted content fields.",
        issues: error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        })),
      },
      400
    )
  if (error instanceof SyntaxError)
    return adminJson({ error: "Invalid request body." }, 400)
  return adminJson(
    { error: "Unable to complete this request. Please try again." },
    500
  )
}
