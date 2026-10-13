import "server-only"
import { cache } from "react"

import {
  loadAboutContent,
  loadProductModules,
  type ContentConnection,
} from "@/lib/supabase-content"

function getConnection(): ContentConnection | null {
  const url = process.env.SUPABASE_URL?.trim()
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim()
  if (!url && !key) return null
  try {
    if (!url || !key || key.startsWith("sb_secret_"))
      throw new Error("Invalid content configuration")
    const parsed = new URL(url)
    if (
      parsed.protocol !== "https:" ||
      parsed.username ||
      parsed.password ||
      parsed.search ||
      parsed.hash
    )
      throw new Error("Invalid project URL")
    if (!key.startsWith("sb_publishable_")) {
      const payload = JSON.parse(
        Buffer.from(key.split(".")[1], "base64url").toString("utf8")
      )
      if (payload.role !== "anon") throw new Error("Use an anon key")
    }
    return { url: parsed.origin, key }
  } catch {
    console.warn(
      "[landing-content] Set a Supabase HTTPS project URL and publishable/anon key; using local content."
    )
    return null
  }
}

export const getProductModules = cache(() =>
  loadProductModules(getConnection())
)
export const getAboutContent = cache(() => loadAboutContent(getConnection()))
