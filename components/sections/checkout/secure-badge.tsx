import { ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"

function SecureBadge({ className }: { className?: string }) {
  return (
    <div
        className={cn(
          "flex items-start gap-2 rounded-xl border border-border bg-muted/50 px-3 py-3 text-sm text-muted-foreground sm:items-center sm:px-4",
          className
        )}
      >
      <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary sm:mt-0" />
      <span className="leading-snug">
        SSL এনক্রিপ্টেড পেমেন্ট · নিরাপদ লেনদেন
      </span>
    </div>
  )
}

export { SecureBadge }
