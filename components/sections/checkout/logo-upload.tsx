"use client"

import { CloudUpload, ImageIcon, X } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

interface LogoUploadProps {
  preview: string | null
  onChange: (file: File | null, preview: string | null) => void
}

const MAX_SIZE = 2 * 1024 * 1024
const ACCEPT = "image/png,image/jpeg,image/jpg,image/svg+xml"

function LogoUpload({ preview, onChange }: LogoUploadProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)

  function handleFile(file: File | null) {
    if (!file) {
      onChange(null, null)
      return
    }

    if (file.size > MAX_SIZE) {
      window.alert("লোগো সর্বোচ্চ ২MB হতে হবে।")
      return
    }

    const url = URL.createObjectURL(file)
    onChange(file, url)
  }

  return (
    <Field>
      <FieldLabel>প্রতিষ্ঠানের লোগো</FieldLabel>
      {preview ? (
        <div className="flex items-center gap-4 rounded-xl border border-border bg-muted/30 p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Institution logo preview"
            className="size-16 rounded-lg bg-white object-contain"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">লোগো নির্বাচিত</p>
            <FieldDescription>PNG, JPG, SVG (সর্বোচ্চ 2MB)</FieldDescription>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="লোগো মুছুন"
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
          className={cn(
            "flex w-full cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/20 px-4 py-8 text-center transition-colors hover:border-primary/40 hover:bg-primary/5"
          )}
        >
          <span className="bg-primary/10 text-primary flex size-11 items-center justify-center rounded-full">
            <CloudUpload className="size-5" />
          </span>
          <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
            <ImageIcon className="size-4" />
            লোগো নির্বাচন করুন
          </span>
          <FieldDescription>PNG, JPG, SVG (সর্বোচ্চ 2MB)</FieldDescription>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT}
        className="sr-only"
        onChange={(event) => handleFile(event.target.files?.[0] ?? null)}
      />
    </Field>
  )
}

export { LogoUpload }
