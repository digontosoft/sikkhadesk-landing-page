import { z } from "zod"

import type { AboutContent } from "@/types/about"
import type { ProductModule } from "@/types/product-module"

const text = z.string().trim().min(1).max(3000)
const title = z.string().trim().min(1).max(180)
const paragraph = z.object({ title, body: text })

export const contentSlug = z
  .string()
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  .max(80)

const imageSource = z
  .string()
  .max(2000)
  .refine((value) => {
    if (
      value.startsWith("/images/") &&
      !value.includes("..") &&
      !value.includes("\\")
    )
      return true
    try {
      const url = new URL(value)
      return url.protocol === "https:" && !url.username && !url.password
    } catch {
      return false
    }
  }, "Use an /images/ path or a public HTTPS image URL")

export const productModuleSchema: z.ZodType<ProductModule> = z.object({
  slug: contentSlug,
  title,
  shortTitle: title,
  englishTitle: title,
  description: text,
  problem: text,
  capabilities: z.array(paragraph).min(1).max(16),
  workflow: z.array(paragraph).min(1).max(12),
  example: z
    .object({
      title,
      context: text,
      caption: title,
      columns: z.array(title).min(2).max(8),
      rows: z.array(z.array(text).min(2).max(8)).min(1).max(30),
      takeaway: text,
    })
    .superRefine((example, context) => {
      const identifiers = new Set<string>()
      example.rows.forEach((row, index) => {
        if (row.length !== example.columns.length || identifiers.has(row[0])) {
          context.addIssue({
            code: "custom",
            path: ["rows", index],
            message: "Rows must match the columns and have unique first cells",
          })
        }
        identifiers.add(row[0])
      })
    }),
  preparation: z.array(text).min(1).max(16),
  demo: text,
  questions: z
    .array(z.object({ question: title, answer: text }))
    .min(1)
    .max(20),
  screenshot: z
    .object({
      src: imageSource,
      alt: title,
      caption: text,
      width: z.number().int().min(1).max(8000),
      height: z.number().int().min(1).max(8000),
    })
    .optional(),
})

export const aboutContentSchema: z.ZodType<AboutContent> = z.object({
  title,
  description: text,
  intro: text,
  sections: z.array(paragraph).min(1).max(12),
})
