import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/constants/site"
import { cn } from "@/lib/utils"

function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/images/logos/logo.png"
        alt={siteConfig.name}
        width={740}
        height={194}
        priority
        className="h-9 w-auto"
      />
    </Link>
  )
}

export { Logo }
