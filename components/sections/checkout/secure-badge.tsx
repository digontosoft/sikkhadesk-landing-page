import { ShieldCheck } from "lucide-react"

import { cn } from "@/lib/utils"

function SecureBadge({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-xl border border-border bg-muted/50 px-4 py-3 text-sm text-muted-foreground",
        className
      )}
    >
      <ShieldCheck className="size-4 shrink-0 text-primary" />
      <span>SSL এনক্রিপ্টেড পেমেন্ট · নিরাপদ লেনদেন</span>
    </div>
  )
}

export { SecureBadge }
