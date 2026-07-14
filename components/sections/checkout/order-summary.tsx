import { PriceText } from "@/components/sections/checkout/price-text"
import type { OrderBreakdown } from "@/types/checkout"

interface OrderSummaryProps {
  breakdown: OrderBreakdown
}

function OrderSummary({ breakdown }: OrderSummaryProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 font-bold text-foreground">অর্ডার সারসংক্ষেপ</h3>

      <div className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">
            প্যাকেজ মূল্য {breakdown.isYearly ? "(বার্ষিক)" : "(মাসিক)"}
          </span>
          <PriceText
            amount={
              breakdown.isYearly ? breakdown.yearlyFull : breakdown.monthlyPrice
            }
            className="font-medium text-foreground"
          />
        </div>

        {breakdown.isYearly ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">ডিসকাউন্ট (১০%)</span>
            <span className="text-brand-emerald inline-flex items-center gap-0.5 font-medium">
              - <PriceText amount={breakdown.yearlyDiscount} />
            </span>
          </div>
        ) : null}

        {breakdown.oneTimeFee > 0 ? (
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">এককালীন পেমেন্ট</span>
            <PriceText
              amount={breakdown.oneTimeFee}
              className="font-medium text-foreground"
            />
          </div>
        ) : null}

        <div className="flex items-center justify-between gap-3">
          <span className="text-muted-foreground">
            ভ্যাট ({Math.round(breakdown.vatRate * 100)}%)
          </span>
          <PriceText
            amount={breakdown.vatAmount}
            className="font-medium text-foreground"
          />
        </div>

        <div className="border-border mt-1 flex items-center justify-between gap-3 border-t pt-3">
          <span className="font-semibold text-foreground">মোট পরিশোধযোগ্য</span>
          <PriceText
            amount={breakdown.payableTotal}
            className="text-primary text-lg font-bold"
            iconClassName="size-4 text-primary"
          />
        </div>
      </div>
    </div>
  )
}

export { OrderSummary }
