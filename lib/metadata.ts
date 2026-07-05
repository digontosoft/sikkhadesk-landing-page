import type { Metadata } from "next"

import { siteConfig } from "@/constants/site"

interface ConstructMetadataOptions {
  title?: string
  description?: string
  path?: string
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
}: ConstructMetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: pageTitle,
      description,
      url: `${siteConfig.url}${path}`,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
  }
}
