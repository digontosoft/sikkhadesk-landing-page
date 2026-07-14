import { FaBangladeshiTakaSign } from "react-icons/fa6"

import { cn, formatBn } from "@/lib/utils"

interface PriceTextProps {
  amount: number
  className?: string
  iconClassName?: string
}

function PriceText({ amount, className, iconClassName }: PriceTextProps) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)}>
      <FaBangladeshiTakaSign className={cn("size-3.5 shrink-0", iconClassName)} />
      {formatBn(amount)}
    </span>
  )
}

export { PriceText }
