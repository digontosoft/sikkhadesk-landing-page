import Link from "next/link"
import { ArrowRight, PlayCircle } from "lucide-react"

import { CtaButton } from "@/components/common/cta-button"
import { Button } from "@/components/ui/button"

function HeroButtons() {
  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row">
      <CtaButton href="/pricing" size="lg">
        ফ্রি ডেমো নিন
        <ArrowRight className="size-5" data-icon="inline-end" />
      </CtaButton>
      <Button size="lg" variant="outline" render={<Link href="/contact" />}>
        <PlayCircle className="size-5" data-icon="inline-start" />
        লাইভ ডেমো দেখুন
      </Button>
    </div>
  )
}

export { HeroButtons }
