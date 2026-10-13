import Image from "next/image"
import Link from "next/link"

import { siteConfig } from "@/constants/site"
import { cn } from "@/lib/utils"

function Logo({
  className,
  href = "/",
}: {
  className?: string
  href?: string
}) {
  return (
    <Link href={href} className={cn("flex items-center", className)}>
      <Image
        src="/images/logos/optimized/logo.webp"
        alt={siteConfig.name}
        width={740}
        height={194}
        className="h-9 w-auto"
      />
    </Link>
  )
}

export { Logo }
