import "./globals.css"

import type { Metadata } from "next"

import { fontSans } from "@/lib/fonts"
import { constructMetadata } from "@/lib/metadata"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import { SmoothScrollProvider } from "@/components/smooth-scroll-provider"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export const metadata: Metadata = constructMetadata()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", "font-sans", fontSans.variable)}
    >
      <body>
        <ThemeProvider>
          <SmoothScrollProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
