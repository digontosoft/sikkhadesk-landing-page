"use client"

import * as React from "react"
import Link from "next/link"
import { Drawer } from "@base-ui/react/drawer"
import { Menu, X } from "lucide-react"

import { mainNav } from "@/constants/navigation"
import { Logo } from "@/components/common/logo"
import { CtaButton } from "@/components/common/cta-button"
import { Button } from "@/components/ui/button"

function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="right">
      <Drawer.Trigger render={<Button variant="ghost" size="icon" aria-label="Open menu" />}>
        <Menu className="size-5" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Drawer.Viewport className="fixed inset-0 z-50 flex justify-end">
          <Drawer.Popup className="flex h-full w-full max-w-xs flex-col gap-8 border-l border-border bg-card p-6 shadow-xl outline-none transition-transform duration-300 data-ending-style:translate-x-full data-starting-style:translate-x-full">
            <div className="flex items-center justify-between">
              <Logo />
              <Drawer.Close render={<Button variant="ghost" size="icon" aria-label="Close menu" />}>
                <X className="size-5" />
              </Drawer.Close>
            </div>

            <nav className="flex flex-col gap-1">
              {mainNav.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>

            <div className="mt-auto flex flex-col gap-2">
              <Button
                variant="outline"
                size="lg"
                render={<Link href="/contact" onClick={() => setOpen(false)} />}
              >
                লগইন
              </Button>
              <CtaButton
                href="/contact"
                onClick={() => setOpen(false)}
                size="lg"
                fullWidth
                className="w-full justify-center"
              >
                ফ্রি ডেমো নিন
              </CtaButton>
            </div>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export { MobileMenu }
