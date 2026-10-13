"use client"

import { useEffect } from "react"

import { siteConfig } from "@/constants/site"
import { trackEvent } from "@/lib/analytics"

export function AnalyticsLinkEvents() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as Element | null)?.closest("a[href]")
      if (!(anchor instanceof HTMLAnchorElement)) return

      const url = new URL(anchor.href)
      const pagePath = window.location.pathname
      const parameters = { page_path: pagePath }

      if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") {
        trackEvent("contact_click", {
          ...parameters,
          contact_method: "whatsapp",
        })
      } else if (url.protocol === "tel:" || url.protocol === "mailto:") {
        trackEvent("contact_click", {
          ...parameters,
          contact_method: url.protocol === "tel:" ? "phone" : "email",
        })
      } else if (url.hostname === new URL(siteConfig.demoUrl).hostname) {
        trackEvent("demo_click", parameters)
      } else if (url.hostname === "play.google.com") {
        trackEvent("app_download_click", { ...parameters, platform: "android" })
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return null
}
