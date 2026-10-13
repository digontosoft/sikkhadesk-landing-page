import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-brand-200 bg-white px-4 py-2 text-xs font-medium text-brand-700 shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
