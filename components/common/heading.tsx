import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva(
  "font-heading font-semibold text-foreground",
  {
    variants: {
      size: {
        sm: "text-xl/snug sm:text-2xl/snug",
        md: "text-2xl/snug sm:text-3xl/snug",
        lg: "text-3xl/snug sm:text-4xl/snug md:text-5xl/snug",
        xl: "text-4xl/snug sm:text-5xl/snug md:text-6xl/snug",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

interface HeadingProps
  extends
    Omit<React.ComponentProps<"h2">, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4"
}

function Heading({ as: Comp = "h2", size, className, ...props }: HeadingProps) {
  return (
    <Comp className={cn(headingVariants({ size }), className)} {...props} />
  )
}

export { Heading, headingVariants }
