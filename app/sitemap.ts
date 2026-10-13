import type { MetadataRoute } from "next"

import { getPageUrl, homeLanguages } from "@/lib/metadata"
import { getProductModules } from "@/lib/landing-content"

export const dynamic = "force-static"
export const revalidate = 300

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productModules = await getProductModules()
  // Checkout is intentionally omitted because it is a noindex transaction page.
  return [
    "/",
    "/en",
    "/features",
    "/pricing",
    "/contact",
    "/about",
    "/privacy-policy",
    "/terms",
    ...productModules.map(({ slug }) => `/features/${slug}`),
  ].map((path) => ({
    url: getPageUrl(path),
    ...(["/", "/en"].includes(path)
      ? { alternates: { languages: homeLanguages } }
      : {}),
  }))
}
