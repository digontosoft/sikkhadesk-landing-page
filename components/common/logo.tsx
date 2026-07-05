import Link from "next/link"
import { BookOpen } from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/constants/site"

function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2 font-heading text-lg font-bold text-foreground", className)}
    >
      <span className="bg-gradient-primary flex size-9 items-center justify-center rounded-xl text-white shadow-sm">
        <BookOpen className="size-4.5" />
      </span>
      {siteConfig.name}
    </Link>
  )
}

export { Logo }
