"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
  Clock,
  Loader2,
  Mail,
  PenLine,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react"
import * as React from "react"
import { Controller, useForm } from "react-hook-form"

import { CtaButton } from "@/components/common/cta-button"
import { ContactSuccessModal } from "@/components/sections/contact/contact-success-modal"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { contactSubjects } from "@/constants/contact"
import {
  contactFormDefaults,
  contactFormSchema,
  type ContactFormValues,
} from "@/lib/contact-schema"
import { sendContactEmail } from "@/lib/emailjs"
import { cn } from "@/lib/utils"

const trustPoints = [
  {
    icon: Clock,
    color: "text-brand-emerald",
    title: "দ্রুত উত্তর",
    description: "২৪ ঘন্টার মধ্যে উত্তর",
  },
  {
    icon: ShieldCheck,
    color: "text-brand-blue",
    title: "নিরাপদ ও গোপনীয়",
    description: "আপনার তথ্য নিরাপদ",
  },
  {
    icon: Sparkles,
    color: "text-primary",
    title: "সহায়তায় আমরা সদা প্রস্তুত",
    description: "আপনার সাফল্য আমাদের লক্ষ্য",
  },
]

function ContactForm() {
  const [successOpen, setSuccessOpen] = React.useState(false)
  const [submitError, setSubmitError] = React.useState<string | null>(null)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: contactFormDefaults,
    mode: "onChange",
    reValidateMode: "onChange",
  })

  const isSubmitting = form.formState.isSubmitting

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null)

    try {
      await sendContactEmail(values)
      form.reset(contactFormDefaults)
      setSuccessOpen(true)
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "মেসেজ পাঠানো যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।"
      setSubmitError(message)
    }
  }

  return (
    <>
      <p className="text-base font-semibold text-foreground">আমাকে মেসেজ পাঠান</p>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-6 flex flex-col gap-5"
        noValidate
      >
        <FieldGroup>
          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="name">
                    আপনার নাম <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <User className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      id="name"
                      placeholder="আপনার পূর্ণ নাম লিখুন"
                      className="h-11 pl-10"
                      aria-invalid={fieldState.invalid || undefined}
                    />
                  </div>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="email">
                    ইমেইল ঠিকানা <span className="text-destructive">*</span>
                  </FieldLabel>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="আপনার ইমেইল লিখুন"
                      className="h-11 pl-10"
                      aria-invalid={fieldState.invalid || undefined}
                    />
                  </div>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="phone">ফোন নম্বর</FieldLabel>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="আপনার ফোন নম্বর লিখুন"
                      className="h-11 pl-10"
                      aria-invalid={fieldState.invalid || undefined}
                    />
                  </div>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />

            <Controller
              name="subject"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid || undefined}>
                  <FieldLabel htmlFor="subject">
                    বিষয় <span className="text-destructive">*</span>
                  </FieldLabel>
                  <Select
                    value={field.value || null}
                    onValueChange={(value) => {
                      if (value == null) return
                      field.onChange(value)
                    }}
                  >
                    <SelectTrigger
                      id="subject"
                      className="h-11 w-full"
                      aria-invalid={fieldState.invalid || undefined}
                    >
                      <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {contactSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FieldError>{fieldState.error?.message}</FieldError>
                </Field>
              )}
            />
          </div>

          <Controller
            name="message"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel htmlFor="message">
                  বার্তা <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <PenLine className="pointer-events-none absolute top-3.5 left-3 size-4 text-muted-foreground" />
                  <Textarea
                    {...field}
                    id="message"
                    rows={5}
                    placeholder="আপনার বার্তা লিখুন..."
                    className="min-h-32 py-3 pl-10"
                    aria-invalid={fieldState.invalid || undefined}
                  />
                </div>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </FieldGroup>

        <div className="grid gap-3 rounded-xl bg-muted/40 p-4 sm:grid-cols-3">
          {trustPoints.map((point) => {
            const Icon = point.icon

            return (
              <div key={point.title} className="flex items-start gap-2">
                <Icon className={cn("mt-0.5 size-4 shrink-0", point.color)} />
                <div>
                  <p className="text-xs font-semibold text-foreground">
                    {point.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <CtaButton
          type="submit"
          size="lg"
          fullWidth
          disabled={isSubmitting}
          className="justify-center"
        >
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Send className="size-4" />
          )}
          {isSubmitting ? "পাঠানো হচ্ছে..." : "মেসেজ পাঠান"}
        </CtaButton>

        {submitError ? (
          <p className="text-destructive text-center text-sm">{submitError}</p>
        ) : null}
      </form>

      <ContactSuccessModal open={successOpen} onOpenChange={setSuccessOpen} />
    </>
  )
}

export { ContactForm }
