import { cn } from "@/lib/utils"
import { Container } from "@/components/common/container"

interface SectionProps extends React.ComponentProps<"section"> {
  containerClassName?: string
}

function Section({ className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn("scroll-mt-20 py-14 sm:py-20", className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export { Section }
