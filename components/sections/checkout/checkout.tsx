"use client"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import * as React from "react"

import type { BillingPeriod } from "@/components/sections/pricing/billing-toggle"
import { CheckoutActionBar } from "@/components/sections/checkout/checkout-action-bar"
import { CheckoutSidebar } from "@/components/sections/checkout/checkout-sidebar"
import { CheckoutStepper } from "@/components/sections/checkout/checkout-stepper"
import { CheckoutSuccess } from "@/components/sections/checkout/checkout-success"
import { InstitutionForm } from "@/components/sections/checkout/institution-form"
import { PaymentForm } from "@/components/sections/checkout/payment-form"
import { Button } from "@/components/ui/button"
import {
  emptyInstitutionForm,
  emptyPaymentForm,
} from "@/constants/checkout"
import { calculateOrderBreakdown, getPlanById } from "@/lib/checkout"
import {
  buildCheckoutWhatsAppMessage,
  openCheckoutWhatsApp,
} from "@/lib/checkout-whatsapp"
import type {
  CheckoutStep,
  InstitutionFormData,
  PaymentFormData,
} from "@/types/checkout"

function CheckoutEmptyState({
  title,
  description,
  href,
  actionLabel,
}: {
  title: string
  description: string
  href: string
  actionLabel: string
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <h1 className="text-2xl font-bold text-foreground">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
      <Button render={<Link href={href} />}>{actionLabel}</Button>
    </div>
  )
}

function Checkout() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planId = searchParams.get("plan")
  const rangeIndex = Number(searchParams.get("range") ?? "0")
  const billing = (searchParams.get("billing") ?? "monthly") as BillingPeriod

  const plan = getPlanById(planId)
  const [step, setStep] = React.useState<CheckoutStep>("institution")
  const [institution, setInstitution] =
    React.useState<InstitutionFormData>(emptyInstitutionForm)
  const [payment, setPayment] =
    React.useState<PaymentFormData>(emptyPaymentForm)
  const [submitted, setSubmitted] = React.useState(false)

  if (!plan || plan.isCustom) {
    return (
      <CheckoutEmptyState
        title="প্ল্যান নির্বাচন করুন"
        description="চেকআউট শুরু করতে প্রাইসিং পেজ থেকে একটি প্ল্যান বেছে নিন।"
        href="/pricing"
        actionLabel="প্রাইসিং দেখুন"
      />
    )
  }

  const safeRangeIndex = Number.isFinite(rangeIndex)
    ? Math.min(
        Math.max(rangeIndex, 0),
        Math.max(plan.studentRanges.length - 1, 0)
      )
    : plan.defaultRangeIndex
  const activeRange = plan.studentRanges[safeRangeIndex]
  const breakdown = calculateOrderBreakdown(plan, safeRangeIndex, billing)

  if (activeRange?.contactOnly) {
    return (
      <CheckoutEmptyState
        title="আলোচনা সাপেক্ষে প্ল্যান"
        description="এই স্টুডেন্ট রেঞ্জের জন্য কাস্টম কোটেশন প্রয়োজন। আমাদের সাথে যোগাযোগ করুন।"
        href="/contact"
        actionLabel="যোগাযোগ করুন"
      />
    )
  }

  function handleInstitutionSubmit(data: InstitutionFormData) {
    setInstitution(data)
    setStep("payment")
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function handlePaymentSubmit(data: PaymentFormData) {
    if (!plan) return

    setPayment(data)

    const message = buildCheckoutWhatsAppMessage({
      institution,
      payment: data,
      plan,
      rangeLabel: activeRange?.label ?? "",
      billing,
      breakdown,
    })

    openCheckoutWhatsApp(message)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function reopenWhatsApp() {
    if (!plan) return

    const message = buildCheckoutWhatsAppMessage({
      institution,
      payment,
      plan,
      rangeLabel: activeRange?.label ?? "",
      billing,
      breakdown,
    })
    openCheckoutWhatsApp(message)
  }

  if (submitted) {
    return (
      <CheckoutSuccess
        onHome={() => router.push("/")}
        onOpenWhatsApp={reopenWhatsApp}
      />
    )
  }

  return (
    <div className="bg-background pt-4 sm:pt-6">
      <CheckoutStepper step={step} />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 pb-8 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {step === "institution" ? (
            <InstitutionForm
              formId="institution-form"
              value={institution}
              onChange={setInstitution}
              onSubmit={handleInstitutionSubmit}
            />
          ) : (
            <PaymentForm
              formId="payment-form"
              value={payment}
              onChange={setPayment}
              onBack={() => setStep("institution")}
              onSubmit={handlePaymentSubmit}
            />
          )}
        </div>

        <CheckoutSidebar
          plan={plan}
          rangeLabel={activeRange?.label ?? ""}
          breakdown={breakdown}
          institution={institution}
          showOrganization={step === "payment"}
        />
      </div>

      {step === "institution" ? (
        <CheckoutActionBar
          total={breakdown.payableTotal}
          formId="institution-form"
          nextLabel="পরবর্তী ধাপ"
        />
      ) : null}
    </div>
  )
}

export { Checkout }
