"use client"

import { CloudUpload, FileText, X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field"

interface ProofUploadProps {
  fileName: string | null
  error?: string
  onChange: (file: File | null) => void
}

const MAX_SIZE = 5 * 1024 * 1024
const ACCEPT = "image/png,image/jpeg,image/jpg,application/pdf"

function ProofUpload({ fileName, error, onChange }: ProofUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleFile(file: File | null) {
    if (!file) {
      onChange(null)
      return
    }

    if (file.size > MAX_SIZE) {
      window.alert("ফাইল সর্বোচ্চ ৫MB হতে হবে।")
      return
    }

    onChange(file)
  }

  return (
    <Field data-invalid={Boolean(error) || undefined}>
      <FieldLabel>
        পেমেন্টের প্রমাণ (স্লিপ / স্ক্রিনশট) আপলোড করুন{" "}
        <span className="text-destructive">*</span>
      </FieldLabel>
      {fileName ? (
        <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/30 p-4">
          <FileText className="text-primary size-5 shrink-0" />
          <p className="flex-1 truncate text-sm font-medium text-foreground">
            {fileName}
          </p>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="ফাইল মুছুন"
            onClick={() => {
              if (inputRef.current) inputRef.current.value = ""
              handleFile(null)
            }}
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-8 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
        >
          <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
            <CloudUpload className="size-5" />
          </span>
          <span className="text-sm font-medium text-foreground">
            ফাইল নির্বাচন করুন
          </span>
          <FieldDescription>JPG, PNG, JPEG, PDF (সর্বোচ্চ 5MB)</FieldDescription>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
      />
      <FieldError>{error}</FieldError>
    </Field>
  )
}

export { ProofUpload }
