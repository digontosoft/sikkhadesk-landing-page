import "../globals.css"

import type { Metadata } from "next"

import { fontSans } from "@/lib/fonts"
import { constructMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { GoogleAnalytics } from "@/components/google-analytics"

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", fontSans.variable)}
    >
      <body suppressHydrationWarning>
        <ThemeProvider>
          <SmoothScrollProvider>
            <a
              href="#main-content"
              className="sr-only z-50 rounded bg-card p-3 focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
            >
              মূল কনটেন্টে যান
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
        <GoogleAnalytics />
      </body>
    </html>
  )
}
