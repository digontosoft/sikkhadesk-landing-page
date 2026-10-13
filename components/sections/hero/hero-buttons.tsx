import Link from "next/link"
import { ArrowRight, PlayCircle } from "lucide-react"

import { CtaButton } from "@/components/common/cta-button"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/constants/site"

function HeroButtons() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <CtaButton href="/contact" size="lg">
        ফ্রি ডেমো নিন
        <ArrowRight className="size-5" data-icon="inline-end" />
      </CtaButton>
      <Button
        size="lg"
        variant="outline"
        render={
          <Link
            href={siteConfig.demoUrl}
            role="link"
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <PlayCircle className="size-5" data-icon="inline-start" />
        লাইভ ডেমো দেখুন
      </Button>
    </div>
  )
}

export { HeroButtons }
