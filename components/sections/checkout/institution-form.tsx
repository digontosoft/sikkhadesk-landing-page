"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, Hash, Info, Mail, MapPinned, Phone } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { LocationSelects } from "@/components/sections/checkout/location-selects"
import { LogoUpload } from "@/components/sections/checkout/logo-upload"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  institutionSchema,
  type InstitutionSchema,
} from "@/lib/checkout-schemas"
import type { InstitutionFormData } from "@/types/checkout"

interface InstitutionFormProps {
  value: InstitutionFormData
  onChange: (value: InstitutionFormData) => void
  onSubmit: (value: InstitutionFormData) => void
  formId?: string
}

function InstitutionForm({
  value,
  onChange,
  onSubmit,
  formId = "institution-form",
}: InstitutionFormProps) {
  const form = useForm<InstitutionSchema>({
    resolver: zodResolver(institutionSchema),
    defaultValues: value,
    mode: "onChange",
    reValidateMode: "onChange",
  })

  function sync(next: InstitutionSchema) {
    onChange(next as InstitutionFormData)
  }

  function updateField<K extends keyof InstitutionSchema>(
    name: K,
    nextValue: InstitutionSchema[K],
    onFieldChange: (value: InstitutionSchema[K]) => void
  ) {
    onFieldChange(nextValue)
    sync({ ...form.getValues(), [name]: nextValue })
  }

  return (
    <form
      id={formId}
      className="rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-6"
      onSubmit={form.handleSubmit((data) => {
        const payload = data as InstitutionFormData
        onChange(payload)
        onSubmit(payload)
      })}
    >
      <div className="mb-6 flex items-start gap-3">
        <span className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
          <Building2 className="size-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold text-foreground">প্রতিষ্ঠানের তথ্য</h2>
          <p className="text-sm text-muted-foreground">
            আপনার প্রতিষ্ঠানের সঠিক তথ্য দিন
          </p>
        </div>
      </div>

      <FieldGroup>
        <LogoUpload
          preview={form.watch("logoPreview") ?? null}
          onChange={(file, preview) => {
            form.setValue("logo", file, { shouldDirty: true })
            form.setValue("logoPreview", preview, { shouldDirty: true })
            sync({
              ...form.getValues(),
              logo: file,
              logoPreview: preview,
            })
          }}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="name">
                প্রতিষ্ঠানের নাম <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Building2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  id="name"
                  placeholder="যেমন: মডার্ন আইডিয়াল স্কুল"
                  className="h-11 pl-10"
                  aria-invalid={fieldState.invalid || undefined}
                  onChange={(event) => {
                    updateField("name", event.target.value, field.onChange)
                  }}
                />
              </div>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <Controller
          name="code"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="code">
                প্রতিষ্ঠান কোড <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <Hash className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  id="code"
                  placeholder="যেমন: SD12345"
                  className="h-11 pl-10"
                  aria-invalid={fieldState.invalid || undefined}
                  onChange={(event) => {
                    updateField("code", event.target.value, field.onChange)
                  }}
                />
              </div>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid || undefined}>
                <FieldLabel htmlFor="phone">
                  ফোন নাম্বার <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <Phone className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...field}
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    className="h-11 pl-10"
                    aria-invalid={fieldState.invalid || undefined}
                    onChange={(event) => {
                      updateField("phone", event.target.value, field.onChange)
                    }}
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
                  ইমেইল <span className="text-destructive">*</span>
                </FieldLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    {...field}
                    id="email"
                    type="email"
                    placeholder="info@school.edu.bd"
                    className="h-11 pl-10"
                    aria-invalid={fieldState.invalid || undefined}
                    onChange={(event) => {
                      updateField("email", event.target.value, field.onChange)
                    }}
                  />
                </div>
                <FieldError>{fieldState.error?.message}</FieldError>
              </Field>
            )}
          />
        </div>

        <Controller
          name="address"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="address">
                ঠিকানা <span className="text-destructive">*</span>
              </FieldLabel>
              <div className="relative">
                <MapPinned className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  id="address"
                  placeholder="বাড়ি/রোড, এলাকা"
                  className="h-11 pl-10"
                  aria-invalid={fieldState.invalid || undefined}
                  onChange={(event) => {
                    updateField("address", event.target.value, field.onChange)
                  }}
                />
              </div>
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <LocationSelects
          district={form.watch("district")}
          upazila={form.watch("upazila")}
          districtError={form.formState.errors.district?.message}
          upazilaError={form.formState.errors.upazila?.message}
          onDistrictChange={(name, bnName) => {
            form.setValue("district", name, { shouldValidate: true })
            form.setValue("districtBn", bnName)
            form.setValue("upazila", "", { shouldValidate: true })
            form.setValue("upazilaBn", "")
            sync({
              ...form.getValues(),
              district: name,
              districtBn: bnName,
              upazila: "",
              upazilaBn: "",
            })
          }}
          onUpazilaChange={(name, bnName) => {
            form.setValue("upazila", name, { shouldValidate: true })
            form.setValue("upazilaBn", bnName)
            sync({
              ...form.getValues(),
              upazila: name,
              upazilaBn: bnName,
            })
          }}
        />

        <Controller
          name="postCode"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid || undefined}>
              <FieldLabel htmlFor="postCode">
                পোস্ট কোড <span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id="postCode"
                placeholder="যেমন: 1216"
                className="h-11"
                aria-invalid={fieldState.invalid || undefined}
                onChange={(event) => {
                  updateField("postCode", event.target.value, field.onChange)
                }}
              />
              <FieldError>{fieldState.error?.message}</FieldError>
            </Field>
          )}
        />

        <div className="bg-primary/5 text-primary flex items-start gap-2 rounded-xl px-4 py-3 text-sm">
          <Info className="mt-0.5 size-4 shrink-0" />
          <p>
            নোট: সঠিক তথ্য প্রদান করুন যাতে আমরা আপনাকে সর্বোত্তম সেবা দিতে পারি।
          </p>
        </div>
      </FieldGroup>
    </form>
  )
}

export { InstitutionForm }
