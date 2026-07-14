import type { InstitutionFormData } from "@/types/checkout"

interface OrganizationSummaryProps {
  data: InstitutionFormData
}

function OrganizationSummary({ data }: OrganizationSummaryProps) {
  const rows = [
    { label: "প্রতিষ্ঠানের নাম", value: data.name },
    { label: "প্রতিষ্ঠান কোড", value: data.code },
    { label: "ফোন", value: data.phone },
    { label: "ইমেইল", value: data.email },
    { label: "ঠিকানা", value: data.address },
    { label: "জেলা", value: data.districtBn || data.district },
    { label: "উপজেলা", value: data.upazilaBn || data.upazila },
    { label: "পোস্ট কোড", value: data.postCode },
  ]

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 font-bold text-foreground">প্রতিষ্ঠানের তথ্য</h3>
      <dl className="flex flex-col gap-2.5 text-sm">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-start justify-between gap-3"
          >
            <dt className="shrink-0 text-muted-foreground">{row.label}</dt>
            <dd className="text-right font-medium text-foreground">
              {row.value || "—"}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export { OrganizationSummary }
