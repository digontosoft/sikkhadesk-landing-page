import { cn } from "@/lib/utils"

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "border-brand-200 text-brand-700 inline-flex w-fit shrink-0 items-center gap-2 rounded-full border bg-white px-4 py-2 text-xs font-medium shadow-sm",
        className
      )}
      {...props}
    />
  )
}

export { Badge }
