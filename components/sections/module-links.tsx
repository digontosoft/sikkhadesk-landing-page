import Link from "next/link"

import { Section } from "@/components/layout/section"
import { getProductModules } from "@/lib/landing-content"

export async function ModuleLinks() {
  const productModules = await getProductModules()
  if (productModules.length === 0) return null
  return (
    <Section className="bg-muted/20">
      <h2 className="text-center text-2xl/snug font-bold sm:text-3xl/snug">
        প্রতিদিনের কাজ কীভাবে পরিচালনা করবেন
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
        শিক্ষার্থীর তথ্য, ফি, উপস্থিতি ও পরীক্ষার কাজ কীভাবে গুছিয়ে রাখবেন,
        মডিউলের বিস্তারিত ও উদাহরণ দেখুন।
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {productModules.map((module) => (
          <Link
            key={module.slug}
            href={`/features/${module.slug}`}
            className="rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary"
          >
            <h3 className="text-xl font-semibold text-foreground">
              {module.shortTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {module.description}
            </p>
            <span className="mt-5 block font-medium text-primary">
              বিস্তারিত জানুন →
            </span>
          </Link>
        ))}
      </div>
    </Section>
  )
}
