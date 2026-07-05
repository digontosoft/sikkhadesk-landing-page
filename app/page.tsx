import { Hero } from "@/components/sections/hero/hero"
import { Brands } from "@/components/sections/brands/brands"
import { Features } from "@/components/sections/features/features"
import { Pricing } from "@/components/sections/pricing/pricing"
import { Testimonials } from "@/components/sections/testimonials/testimonials"
import { Faq } from "@/components/sections/faq/faq"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Brands />
      <Features />
      <Pricing />
      <Testimonials />
      <Faq />
    </>
  )
}
