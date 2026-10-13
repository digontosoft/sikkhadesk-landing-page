import "../globals.css"

import type { Metadata } from "next"
import Link from "next/link"

import { GoogleAnalytics } from "@/components/google-analytics"
import { Logo } from "@/components/common/logo"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { fontSans } from "@/lib/fonts"
import { constructMetadata } from "@/lib/metadata"
import { siteConfig } from "@/constants/site"

export const metadata: Metadata = constructMetadata({
  path: "/en",
  locale: "en_BD",
})

export default function EnglishLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`font-sans antialiased ${fontSans.variable}`}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only z-50 rounded bg-card p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
          >
            Skip to content
          </a>
          <header className="sticky top-0 z-40 border-b border-border bg-card">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
              <Logo href="/en" />
              <div className="flex items-center gap-3">
                <Link
                  href="/"
                  lang="bn"
                  className="text-sm font-medium text-primary"
                >
                  বাংলা
                </Link>
                <ThemeToggle />
              </div>
              <nav
                aria-label="Main navigation"
                className="flex w-full flex-wrap gap-x-6 gap-y-3 text-sm font-medium sm:order-2 sm:w-auto sm:flex-1 sm:justify-center"
              >
                <Link href="/en#features">Features</Link>
                <Link href="/en#pricing">Pricing</Link>
                <Link href="/en#faq">FAQ</Link>
                <Link href="/en#contact">Contact</Link>
                <a
                  href={siteConfig.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  Live demo ↗
                </a>
              </nav>
            </div>
          </header>
          <main id="main-content">{children}</main>
          <footer className="border-t border-border bg-card">
            <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-3">
              <div>
                <Logo href="/en" />
                <p className="mt-4 text-sm text-muted-foreground">
                  {siteConfig.description}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">
                  A product of {siteConfig.operatorName}.
                </p>
              </div>
              <nav
                aria-label="Footer navigation"
                className="flex flex-col gap-3 text-sm"
              >
                <Link href="/features">All features (বাংলা)</Link>
                <Link href="/about">
                  About SikkhaDesk and DigontoSoft (বাংলা)
                </Link>
                <Link href="/pricing">All pricing plans (বাংলা)</Link>
                <Link href="/privacy-policy">Privacy policy</Link>
                <Link href="/terms">Terms of service</Link>
                <a
                  href={siteConfig.androidAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get the Android app ↗
                </a>
              </nav>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>{siteConfig.address}</p>
                <p>{siteConfig.supportHoursEn}</p>
                <a
                  className="block text-primary"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </a>
                <a
                  className="block text-primary"
                  href={`tel:${siteConfig.phone.replace(/[\s-]/g, "")}`}
                >
                  {siteConfig.phone}
                </a>
              </div>
            </div>
            <p className="border-t border-border px-6 py-5 text-center text-xs text-muted-foreground">
              © {new Date().getFullYear()} SikkhaDesk. All rights reserved.
            </p>
          </footer>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
