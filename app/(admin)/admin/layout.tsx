import "../../globals.css"
import type { Metadata } from "next"
import { fontSans } from "@/lib/fonts"

export const metadata: Metadata = {
  title: "Content admin | SikkhaDesk",
  robots: { index: false, follow: false },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`antialiased ${fontSans.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
