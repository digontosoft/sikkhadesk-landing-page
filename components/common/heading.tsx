import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const headingVariants = cva("font-heading font-semibold tracking-tight text-foreground", {
  variants: {
    size: {
      sm: "text-xl sm:text-2xl",
      md: "text-2xl sm:text-3xl",
      lg: "text-3xl sm:text-4xl md:text-5xl",
      xl: "text-4xl sm:text-5xl md:text-6xl",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

interface HeadingProps
  extends Omit<React.ComponentProps<"h2">, "color">,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4"
}

function Heading({ as: Comp = "h2", size, className, ...props }: HeadingProps) {
  return <Comp className={cn(headingVariants({ size }), className)} {...props} />
}

export { Heading, headingVariants }
