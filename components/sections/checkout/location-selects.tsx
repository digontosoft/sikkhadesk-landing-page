"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { getBdDistricts, getBdUpazilas } from "@/lib/bd-geo"

interface LocationSelectsProps {
  district: string
  upazila: string
  districtError?: string
  upazilaError?: string
  onDistrictChange: (name: string, bnName: string) => void
  onUpazilaChange: (name: string, bnName: string) => void
}

function LocationSelects({
  district,
  upazila,
  districtError,
  upazilaError,
  onDistrictChange,
  onUpazilaChange,
}: LocationSelectsProps) {
  const districts = React.useMemo(() => getBdDistricts(), [])
  const upazilas = React.useMemo(
    () => (district ? getBdUpazilas(district) : []),
    [district]
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field data-invalid={Boolean(districtError) || undefined}>
        <FieldLabel htmlFor="district">
          জেলা <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={district || null}
          onValueChange={(value) => {
            if (value == null) return
            const selected = districts.find((item) => item.name === value)
            onDistrictChange(selected?.name ?? "", selected?.bn_name ?? "")
          }}
        >
          <SelectTrigger
            id="district"
            className="h-11 w-full"
            aria-invalid={Boolean(districtError) || undefined}
          >
            <SelectValue placeholder="জেলা নির্বাচন করুন" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.bn_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError>{districtError}</FieldError>
      </Field>

      <Field data-invalid={Boolean(upazilaError) || undefined}>
        <FieldLabel htmlFor="upazila">
          উপজেলা <span className="text-destructive">*</span>
        </FieldLabel>
        <Select
          value={upazila || null}
          disabled={!district}
          onValueChange={(value) => {
            if (value == null) return
            const selected = upazilas.find((item) => item.name === value)
            onUpazilaChange(selected?.name ?? "", selected?.bn_name ?? "")
          }}
        >
          <SelectTrigger
            id="upazila"
            className="h-11 w-full"
            aria-invalid={Boolean(upazilaError) || undefined}
          >
            <SelectValue
              placeholder={
                district ? "উপজেলা নির্বাচন করুন" : "আগে জেলা নির্বাচন করুন"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {upazilas.map((item) => (
              <SelectItem key={item.id} value={item.name}>
                {item.bn_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError>{upazilaError}</FieldError>
      </Field>
    </div>
  )
}

export { LocationSelects }
