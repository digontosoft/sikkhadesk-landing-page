"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, Info, Send } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { PaymentMethods } from "@/components/sections/checkout/payment-methods"
import { ProofUpload } from "@/components/sections/checkout/proof-upload"
import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { paymentSchema, type PaymentSchema } from "@/lib/checkout-schemas"
import type { PaymentFormData } from "@/types/checkout"

interface PaymentFormProps {
  value: PaymentFormData
  onChange: (value: PaymentFormData) => void
  onBack: () => void
  onSubmit: (value: PaymentFormData) => void
  formId?: string
}

function PaymentForm({
  value,
  onChange,
  onBack,
  onSubmit,
  formId = "payment-form",
}: PaymentFormProps) {
  const form = useForm<PaymentSchema>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      ...value,
      proof: value.proof,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  })

  function sync(next: PaymentSchema) {
    onChange({
      ...next,
      proof: next.proof instanceof File ? next.proof : null,
      proofName:
        next.proof instanceof File ? next.proof.name : (next.proofName ?? null),
    })
  }

  function updateField<K extends keyof PaymentSchema>(
    name: K,
    nextValue: PaymentSchema[K],
    onFieldChange: (value: PaymentSchema[K]) => void
  ) {
    onFieldChange(nextValue)
    sync({ ...form.getValues(), [name]: nextValue })
  }

  return (
    <form
      id={formId}
      className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6"
      onSubmit={form.handleSubmit((data) => {
        const payload: PaymentFormData = {
          method: data.method,
          transactionId: data.transactionId,
          transferredAt: data.transferredAt,
          proof: data.proof instanceof File ? data.proof : null,
          proofName:
            data.proof instanceof File
              ? data.proof.name
              : (data.proofName ?? null),
        }
        onChange(payload)
        onSubmit(payload)
      })}
    >
      <div className="mb-6 flex items-start gap-3">
        <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
          <CreditCard className="size-5" />
        </span>
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-foreground sm:text-xl">
            পেমেন্ট করুন
          </h2>
          <p className="text-sm text-muted-foreground">
            নিচের যেকোনো মাধ্যমে পেমেন্ট করে ট্রানজ্যাকশন তথ্য জমা দিন
          </p>
        </div>
      </div>

      <FieldGroup>
        <Controller
          name="method"
          control={form.control}
          render={({ field }) => (
            <PaymentMethods
              value={field.value}
              onChange={(method) => {
                field.onChange(method)
                sync({ ...form.getValues(), method })
              }}
            />
          )}
        />

        <Controller
          name="transactionId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="transactionId">
                ট্রানজ্যাকশন আইডি / রেফারেন্স নম্বর{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="transactionId"
                placeholder="যেমন: 8N7A2XYZ9Q"
                className="h-11"
                aria-invalid={fieldState.invalid || undefined}
                onChange={(event) => {
                  updateField(
                    "transactionId",
                    event.target.value,
                    field.onChange
                  )
                }}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="transferredAt"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="transferredAt">
                ট্রান্সফারের তারিখ ও সময়{" "}
                <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="transferredAt"
                type="datetime-local"
                className="h-11"
                aria-invalid={fieldState.invalid || undefined}
                onChange={(event) => {
                  updateField(
                    "transferredAt",
                    event.target.value,
                    field.onChange
                  )
                }}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="proof"
          control={form.control}
          render={({ field, fieldState }) => (
            <ProofUpload
              fileName={
                field.value instanceof File
                  ? field.value.name
                  : (form.watch("proofName") ?? null)
              }
              error={fieldState.error?.message}
              onChange={(file) => {
                field.onChange(file)
                form.setValue("proofName", file?.name ?? null, {
                  shouldValidate: true,
                })
                void form.trigger("proof")
                sync({
                  ...form.getValues(),
                  proof: file as File,
                  proofName: file?.name ?? null,
                })
              }}
            />
          )}
        />

        <div className="bg-primary/5 flex items-start gap-2 rounded-xl px-4 py-3 text-sm text-foreground">
          <Info className="text-primary mt-0.5 size-4 shrink-0" />
          <ul className="list-disc space-y-1 pl-4 text-muted-foreground">
            <li>পেমেন্ট যাচাই হতে সাধারণত ১২–২৪ ঘণ্টা সময় লাগে।</li>
            <li>
              সঠিক ট্রানজ্যাকশন আইডি দিন, নাহলে অ্যাকাউন্ট অ্যাক্টিভ হবে না।
            </li>
            <li>প্রয়োজনে সাপোর্টে যোগাযোগ করুন।</li>
          </ul>
        </div>

        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onBack}
          >
            পূর্ববর্তী ধাপ
          </Button>
          <Button type="submit" size="lg" className="w-full gap-2 sm:w-auto">
            <Send className="size-4 shrink-0" />
            <span className="sm:hidden">যাচাইকরণে পাঠান</span>
            <span className="hidden sm:inline">
              পেমেন্ট যাচাইকরণের জন্য পাঠান
            </span>
          </Button>
        </div>
      </FieldGroup>
    </form>
  )
}

export { PaymentForm }
