import type { Metadata } from "next"
import { Suspense } from "react"

import { Checkout } from "@/components/sections/checkout/checkout"
import { constructMetadata } from "@/lib/metadata"

export const metadata: Metadata = constructMetadata({
  title: "চেকআউট",
  description: "প্ল্যান নির্বাচন সম্পন্ন করে প্রতিষ্ঠানের তথ্য ও পেমেন্ট সম্পন্ন করুন।",
  path: "/checkout",
})

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-muted-foreground">
          লোড হচ্ছে...
        </div>
      }
    >
      <Checkout />
    </Suspense>
  )
}
