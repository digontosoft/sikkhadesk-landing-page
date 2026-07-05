"use client"

import Image from "next/image"
import { motion } from "framer-motion"

import { institutionLogos } from "@/constants/logos"
import { Container } from "@/components/common/container"
import { Badge } from "@/components/common/badge"
import { Heading } from "@/components/common/heading"

function Brands() {
  const items = [...institutionLogos, ...institutionLogos]

  return (
    <section className="border-y border-border/60 bg-muted/20 py-10 sm:py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center gap-4 text-center"
        >
          <Badge>পার্টনার প্রতিষ্ঠান</Badge>
          <Heading size="lg" className="max-w-2xl text-balance">
            আমাদের টপ প্রতিষ্ঠানের সমূহ
          </Heading>
        </motion.div>
      </Container>

      <div className="group relative mt-10 overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee items-center gap-8 group-hover:paused sm:gap-10 lg:gap-14">
          {items.map((logo, index) => (
            <div
              key={`${logo.file}-${index}`}
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-sm sm:h-24 sm:w-24"
            >
              <div className="relative h-full w-full p-3">
                <Image
                  src={`/images/logos/${logo.file}`}
                  alt={logo.name}
                  fill
                  sizes="96px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export { Brands }
