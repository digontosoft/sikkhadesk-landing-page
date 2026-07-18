import { paymentAccounts } from "@/constants/checkout"
import { siteConfig } from "@/constants/site"
import { formatBn } from "@/lib/utils"
import type {
  InstitutionFormData,
  OrderBreakdown,
  PaymentFormData,
} from "@/types/checkout"
import type { BillingPeriod } from "@/components/sections/pricing/billing-toggle"
import type { PricingPlan } from "@/types/pricing"

function getWhatsAppNumber() {
  const digits = siteConfig.whatsapp.replace(/\D/g, "")
  if (digits.startsWith("880")) return digits
  if (digits.startsWith("0")) return `88${digits}`
  return digits
}

function formatTransferredAt(value: string) {
  if (!value) return "—"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleString("bn-BD", {
    dateStyle: "medium",
    timeStyle: "short",
  })
}

interface BuildCheckoutWhatsAppMessageOptions {
  institution: InstitutionFormData
  payment: PaymentFormData
  plan: PricingPlan
  rangeLabel: string
  billing: BillingPeriod
  breakdown: OrderBreakdown
}

export function buildCheckoutWhatsAppMessage({
  institution,
  payment,
  plan,
  rangeLabel,
  billing,
  breakdown,
}: BuildCheckoutWhatsAppMessageOptions) {
  const methodLabel =
    payment.method === "bkash"
      ? paymentAccounts.bkash.label
      : paymentAccounts.bank.label

  const billingLabel = billing === "yearly" ? "বার্ষিক" : "মাসিক"

  return [
    `*${siteConfig.name} — নতুন চেকআউট অর্ডার*`,
    "",
    "*Institution Info ------>*",
    `প্রতিষ্ঠানের নাম: ${institution.name}`,
    `প্রতিষ্ঠান কোড: ${institution.code}`,
    `ফোন: ${institution.phone}`,
    `ইমেইল: ${institution.email}`,
    `ঠিকানা: ${institution.address}`,
    `জেলা: ${institution.districtBn || institution.district}`,
    `উপজেলা: ${institution.upazilaBn || institution.upazila}`,
    `পোস্ট কোড: ${institution.postCode}`,
    `লোগো: ${institution.logo?.name ?? "নেই"}`,
    "",
    "*Payment Info ------>*",
    `প্ল্যান: ${plan.name}`,
    `স্টুডেন্ট রেঞ্জ: ${rangeLabel}`,
    `বিলিং: ${billingLabel}`,
    `মোট পরিশোধযোগ্য: ৳ ${formatBn(breakdown.payableTotal)}`,
    `পেমেন্ট পদ্ধতি: ${methodLabel}`,
    `ট্রানজ্যাকশন আইডি: ${payment.transactionId}`,
    `ট্রান্সফারের তারিখ ও সময়: ${formatTransferredAt(payment.transferredAt)}`,
    `পেমেন্ট প্রমাণ: ${payment.proofName ?? payment.proof?.name ?? "নেই"}`,
  ].join("\n")
}

export function getCheckoutWhatsAppUrl(message: string) {
  const number = getWhatsAppNumber()
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

export function openCheckoutWhatsApp(message: string) {
  const url = getCheckoutWhatsAppUrl(message)
  window.open(url, "_blank", "noopener,noreferrer")
  return url
}
