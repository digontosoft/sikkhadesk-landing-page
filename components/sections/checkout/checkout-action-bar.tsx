import { Headset, ShieldCheck } from "lucide-react"
import { FaBangladeshiTakaSign } from "react-icons/fa6"

import { Button } from "@/components/ui/button"
import { formatBn } from "@/lib/utils"

interface CheckoutActionBarProps {
  total: number
  onNext?: () => void
  nextLabel?: string
  formId?: string
  showSubmit?: boolean
}

function CheckoutActionBar({
  total,
  onNext,
  nextLabel = "পরবর্তী ধাপ",
  formId,
  showSubmit = true,
}: CheckoutActionBarProps) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm text-muted-foreground">মোট পরিশোধযোগ্য:</p>
          <p className="text-primary inline-flex items-center gap-1 text-2xl font-bold">
            <FaBangladeshiTakaSign className="size-5" />
            {formatBn(total)}
          </p>
        </div>

        <div className="hidden items-center gap-5 text-sm text-muted-foreground md:flex">
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="text-brand-emerald size-4" />
            ১৪ দিনের মানি ব্যাক গ্যারান্টি
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Headset className="text-brand-blue size-4" />
            ২৪/৭ কাস্টমার সাপোর্ট
          </span>
        </div>

        {showSubmit ? (
          <div className="text-right">
            <Button
              type={formId ? "submit" : "button"}
              form={formId}
              size="lg"
              onClick={formId ? undefined : onNext}
            >
              {nextLabel} →
            </Button>
            <p className="mt-1 text-xs text-muted-foreground">
              নিরাপদ পেমেন্টের জন্য এগিয়ে যান
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export { CheckoutActionBar }
