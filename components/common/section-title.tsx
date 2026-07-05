import { cn } from "@/lib/utils"
import { Badge } from "@/components/common/badge"
import { Heading } from "@/components/common/heading"

interface SectionTitleProps {
  eyebrow?: string
  title: string
  description?: string
  align?: "center" | "left"
  className?: string
}

function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className
      )}
    >
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <Heading size="lg" className="max-w-2xl text-balance">
        {title}
      </Heading>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-balance text-muted-foreground sm:text-lg",
            align === "center" && "mx-auto"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  )
}

export { SectionTitle }
