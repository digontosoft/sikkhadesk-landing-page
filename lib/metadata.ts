import type { Metadata } from "next"

import { siteConfig } from "@/constants/site"

interface ConstructMetadataOptions {
  title?: string
  description?: string
  path?: string
  locale?: "bn_BD" | "en_BD"
  noIndex?: boolean
  languages?: Record<string, string>
  article?: { publishedTime: string; modifiedTime: string }
}

export function getPageUrl(path = "/") {
  const url = new URL(path || "/", siteConfig.url)
  url.search = ""
  url.hash = ""
  url.pathname = `${url.pathname.replace(/\/+$/, "")}/`
  return url.href
}

export const homeLanguages = {
  "bn-BD": getPageUrl(),
  "en-BD": getPageUrl("/en"),
  "x-default": getPageUrl(),
}

export function constructMetadata({
  title,
  description = siteConfig.description,
  path = "",
  locale = "bn_BD",
  noIndex = false,
  languages,
  article,
}: ConstructMetadataOptions = {}): Metadata {
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title
  const pageUrl = getPageUrl(path)

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl,
      ...(languages ? { languages } : {}),
    },
    robots: {
      index: !noIndex,
      follow: true,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: pageUrl,
      siteName: siteConfig.name,
      locale,
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
          }
        : { type: "website" as const }),
      images: [
        {
          url: siteConfig.shareImage,
          width: 1200,
          height: 630,
          alt: "SikkhaDesk — School Management Software in Bangladesh",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [siteConfig.shareImage],
    },
  }
}
