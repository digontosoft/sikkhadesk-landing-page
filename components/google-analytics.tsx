import Script from "next/script"

import { AnalyticsLinkEvents } from "@/components/analytics-link-events"
import { siteConfig } from "@/constants/site"

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.ga4Id}`}
        strategy="afterInteractive"
      />
      <Script id="sikkhadesk-ga4" strategy="afterInteractive">
        {`
          if (['www.sikkhadesk.com', 'sikkhadesk.com'].includes(window.location.hostname)) {
            window.dataLayer = window.dataLayer || [];
            window.gtag = function() { window.dataLayer.push(arguments); };
            window.gtag('js', new Date());
            window.gtag('config', '${siteConfig.ga4Id}');
            (window.sikkhadeskAnalyticsQueue || []).forEach(function(event) {
              window.gtag('event', event[0], event[1]);
            });
            window.sikkhadeskAnalyticsQueue = [];
          }
        `}
      </Script>
      <AnalyticsLinkEvents />
    </>
  )
}
