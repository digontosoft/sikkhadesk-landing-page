import { z } from "zod"

const phoneRegex = /^01[3-9]\d{8}$/
const postCodeRegex = /^\d{4}$/

export const institutionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "প্রতিষ্ঠানের নাম অন্তত ২ অক্ষরের হতে হবে")
    .max(120, "প্রতিষ্ঠানের নাম খুব বড়"),
  code: z
    .string()
    .trim()
    .min(2, "প্রতিষ্ঠান কোড অন্তত ২ অক্ষরের হতে হবে")
    .max(40, "প্রতিষ্ঠান কোড খুব বড়"),
  phone: z
    .string()
    .trim()
    .regex(phoneRegex, "সঠিক বাংলাদেশি মোবাইল নম্বর দিন (যেমন: 017XXXXXXXX)"),
  email: z
    .string()
    .trim()
    .email("সঠিক ইমেইল ঠিকানা দিন"),
  address: z
    .string()
    .trim()
    .min(5, "ঠিকানা অন্তত ৫ অক্ষরের হতে হবে")
    .max(200, "ঠিকানা খুব বড়"),
  district: z.string().min(1, "জেলা নির্বাচন করুন"),
  districtBn: z.string(),
  upazila: z.string().min(1, "উপজেলা নির্বাচন করুন"),
  upazilaBn: z.string(),
  postCode: z
    .string()
    .trim()
    .regex(postCodeRegex, "পোস্ট কোড ৪ সংখ্যার হতে হবে (যেমন: 1216)"),
  logo: z.custom<File | null>().nullable().optional(),
  logoPreview: z.string().nullable().optional(),
})

export const paymentSchema = z.object({
  method: z.enum(["bkash", "bank"], {
    message: "পেমেন্ট পদ্ধতি নির্বাচন করুন",
  }),
  transactionId: z
    .string()
    .trim()
    .min(6, "ট্রানজ্যাকশন আইডি অন্তত ৬ অক্ষরের হতে হবে")
    .max(64, "ট্রানজ্যাকশন আইডি খুব বড়"),
  transferredAt: z.string().min(1, "ট্রান্সফারের তারিখ ও সময় দিন"),
  proof: z
    .custom<File | null>((value) => value instanceof File, {
      message: "পেমেন্টের প্রমাণ (স্লিপ/স্ক্রিনশট) আপলোড করুন",
    }),
  proofName: z.string().nullable().optional(),
})

export type InstitutionSchema = z.infer<typeof institutionSchema>
export type PaymentSchema = z.infer<typeof paymentSchema>
