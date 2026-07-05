"use client"

import Link from "next/link"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface CtaButtonProps extends Omit<React.ComponentProps<typeof Button>, "render" | "type"> {
  href?: string
  type?: "button" | "submit"
  onClick?: () => void
  fullWidth?: boolean
  tone?: "gradient" | "light"
}

function CtaButton({
  href,
  type = "button",
  onClick,
  className,
  children,
  fullWidth,
  tone = "gradient",
  ...props
}: CtaButtonProps) {
  return (
    <motion.div
      className={cn("inline-block", fullWidth && "w-full")}
      initial="rest"
      animate="rest"
      whileHover="hover"
      whileTap={{ scale: 0.96 }}
    >
      <Button
        className={cn(
          "relative overflow-hidden border-0 shadow-md",
          tone === "gradient"
            ? "bg-gradient-primary shadow-brand-700/20 text-white"
            : "bg-white text-primary shadow-black/10 hover:bg-white/90",
          className
        )}
        {...(href
          ? { render: <Link href={href} onClick={onClick} /> }
          : { type, onClick })}
        {...props}
      >
        <motion.span
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-0",
            tone === "gradient"
              ? "bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.45)_50%,transparent_80%)]"
              : "bg-[linear-gradient(115deg,transparent_20%,rgba(91,79,207,0.15)_50%,transparent_80%)]"
          )}
          variants={{ rest: { x: "-100%" }, hover: { x: "100%" } }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        />
        <motion.span
          className="relative z-10 flex items-center gap-2"
          variants={{ rest: { x: 0 }, hover: { x: 3 } }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {children}
        </motion.span>
      </Button>
    </motion.div>
  )
}

export { CtaButton }
