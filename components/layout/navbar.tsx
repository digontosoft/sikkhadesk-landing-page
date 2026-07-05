"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { mainNav } from "@/constants/navigation"
import { Container } from "@/components/common/container"
import { Logo } from "@/components/common/logo"
import { CtaButton } from "@/components/common/cta-button"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { MobileMenu } from "@/components/layout/mobile-menu"

function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-card">
      <Container className="flex h-20 items-center justify-between">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex">
          {mainNav.map((item) => {
            const isActive = !item.external && pathname === item.href
            const linkClassName = cn(
              "relative pb-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              isActive &&
                "text-primary after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-primary"
            )

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  {item.label}
                </a>
              )
            }

            return (
              <Link key={item.label} href={item.href} className={linkClassName}>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <ThemeToggle />
          <Link
            href="/contact"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            লগইন
          </Link>
          <CtaButton href="/contact" size="lg" className="rounded-xl">
            ফ্রি ডেমো নিন
            <ArrowRight className="size-5" data-icon="inline-end" />
          </CtaButton>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <MobileMenu />
        </div>
      </Container>
    </header>
  )
}

export { Navbar }
