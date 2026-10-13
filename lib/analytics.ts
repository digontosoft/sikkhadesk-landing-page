type AnalyticsParameters = Record<string, string | number | boolean>

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    sikkhadeskAnalyticsQueue?: [string, AnalyticsParameters][]
  }
}

/** Only pass product/event details, never form values or personal information. */
export function trackEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (typeof window === "undefined") return
  if (window.gtag) {
    try {
      window.gtag("event", name, parameters)
    } catch {
      // Measurement failures must never interrupt a form or navigation.
    }
  } else if (
    ["www.sikkhadesk.com", "sikkhadesk.com"].includes(window.location.hostname)
  ) {
    // A visitor can act before the afterInteractive script has loaded.
    window.sikkhadeskAnalyticsQueue ??= []
    window.sikkhadeskAnalyticsQueue.push([name, parameters])
  }
}
