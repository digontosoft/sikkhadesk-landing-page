"use client"

import Image from "next/image"
import { Building2, Check, Copy } from "lucide-react"
import * as React from "react"

import { paymentAccounts } from "@/constants/checkout"
import { cn } from "@/lib/utils"
import type { PaymentFormData } from "@/types/checkout"

interface PaymentMethodsProps {
  value: PaymentFormData["method"]
  onChange: (method: PaymentFormData["method"]) => void
}

function PaymentMethods({ value, onChange }: PaymentMethodsProps) {
  const [copied, setCopied] = React.useState<string | null>(null)

  async function copyText(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text.replace(/\s/g, ""))
      setCopied(key)
      window.setTimeout(() => setCopied(null), 1500)
    } catch {
      window.alert("কপি করা যায়নি। ম্যানুয়ালি কপি করুন।")
    }
  }

  function selectMethod(method: PaymentFormData["method"]) {
    onChange(method)
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        role="radio"
        aria-checked={value === "bkash"}
        tabIndex={0}
        onClick={() => selectMethod("bkash")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            selectMethod("bkash")
          }
        }}
        className={cn(
          "cursor-pointer rounded-2xl border p-4 text-left transition-colors",
          value === "bkash"
            ? "border-[#E2136E] bg-[#E2136E]/5"
            : "border-border hover:border-[#E2136E]/40"
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-[#E2136E]/25">
              <Image
                src="/icons/bKash.png"
                alt="bKash"
                width={40}
                height={40}
                className="size-full rounded-full object-cover"
              />
            </span>
            <div>
              <p className="font-semibold text-foreground">
                {paymentAccounts.bkash.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {paymentAccounts.bkash.accountType}
              </p>
            </div>
          </div>
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full border-2",
              value === "bkash"
                ? "border-[#E2136E] bg-[#E2136E] text-white"
                : "border-border"
            )}
          >
            {value === "bkash" ? <Check className="size-3" /> : null}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 rounded-xl bg-background px-3 py-2">
          <span className="font-mono text-sm font-semibold text-foreground">
            {paymentAccounts.bkash.number}
          </span>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              void copyText(paymentAccounts.bkash.number, "bkash")
            }}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs"
          >
            <Copy className="size-3.5" />
            {copied === "bkash" ? "কপি হয়েছে" : "কপি"}
          </button>
        </div>
        <p className="mt-2 rounded-lg bg-[#E2136E]/10 px-3 py-2 text-xs text-[#E2136E]">
          {paymentAccounts.bkash.instruction}
        </p>
      </div>

      <div
        role="radio"
        aria-checked={value === "bank"}
        tabIndex={0}
        onClick={() => selectMethod("bank")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault()
            selectMethod("bank")
          }
        }}
        className={cn(
          "cursor-pointer rounded-2xl border p-4 text-left transition-colors",
          value === "bank"
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/40"
        )}
      >
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-xl">
              <Building2 className="size-5" />
            </span>
            <div>
              <p className="font-semibold text-foreground">
                {paymentAccounts.bank.label}
              </p>
              <p className="text-xs text-muted-foreground">কর্পোরেট</p>
            </div>
          </div>
          <span
            className={cn(
              "flex size-5 items-center justify-center rounded-full border-2",
              value === "bank"
                ? "border-primary bg-primary text-white"
                : "border-border"
            )}
          >
            {value === "bank" ? <Check className="size-3" /> : null}
          </span>
        </div>

        <dl className="grid gap-2 text-sm">
          <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3">
            <dt className="shrink-0 text-muted-foreground">ব্যাংক</dt>
            <dd className="min-w-0 break-words font-medium text-foreground sm:text-right">
              {paymentAccounts.bank.bankName}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3">
            <dt className="shrink-0 text-muted-foreground">অ্যাকাউন্ট নাম</dt>
            <dd className="min-w-0 break-words font-medium text-foreground sm:text-right">
              {paymentAccounts.bank.accountName}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <dt className="shrink-0 text-muted-foreground">অ্যাকাউন্ট নম্বর</dt>
            <dd className="flex min-w-0 items-center gap-2 font-medium text-foreground sm:justify-end">
              <span className="break-all">
                {paymentAccounts.bank.accountNumber}
              </span>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation()
                  void copyText(paymentAccounts.bank.accountNumber, "bank")
                }}
                className="text-muted-foreground hover:text-foreground shrink-0"
                aria-label="অ্যাকাউন্ট নম্বর কপি"
              >
                <Copy className="size-3.5" />
              </button>
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3">
            <dt className="shrink-0 text-muted-foreground">শাখা</dt>
            <dd className="min-w-0 break-words font-medium text-foreground sm:text-right">
              {paymentAccounts.bank.branch}
            </dd>
          </div>
          <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-3">
            <dt className="shrink-0 text-muted-foreground">রাউটিং নম্বর</dt>
            <dd className="min-w-0 font-medium text-foreground sm:text-right">
              {paymentAccounts.bank.routingNumber}
            </dd>
          </div>
        </dl>
        <p className="bg-primary/10 text-primary mt-2 rounded-lg px-3 py-2 text-xs">
          {paymentAccounts.bank.instruction}
        </p>
      </div>
    </div>
  )
}

export { PaymentMethods }
