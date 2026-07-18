import { z } from "zod"

const phoneRegex = /^(01[3-9]\d{8})?$/

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "নাম অন্তত ২ অক্ষরের হতে হবে")
    .max(80, "নাম খুব বড়"),
  email: z.string().trim().email("সঠিক ইমেইল ঠিকানা দিন"),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => value === "" || phoneRegex.test(value),
      "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)"
    ),
  subject: z.string().min(1, "বিষয় নির্বাচন করুন"),
  message: z
    .string()
    .trim()
    .min(10, "বার্তা অন্তত ১০ অক্ষরের হতে হবে")
    .max(2000, "বার্তা খুব বড়"),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>

export const contactFormDefaults: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
}
