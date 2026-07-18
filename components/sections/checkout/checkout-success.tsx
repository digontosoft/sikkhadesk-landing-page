"use client"

import Lottie from "lottie-react"
import * as React from "react"

import { Button } from "@/components/ui/button"

interface CheckoutSuccessProps {
  onHome: () => void
  onOpenWhatsApp?: () => void
}

function CheckoutSuccess({ onHome, onOpenWhatsApp }: CheckoutSuccessProps) {
  const [animationData, setAnimationData] = React.useState<object | null>(null)

  React.useEffect(() => {
    let active = true

    void fetch("/animation/Successful.json")
      .then((response) => response.json())
      .then((data: object) => {
        if (active) setAnimationData(data)
      })
      .catch(() => {
        if (active) setAnimationData(null)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="mx-auto flex min-h-[60vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <div className="flex size-56 items-center justify-center sm:size-64">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            className="size-full"
          />
        ) : (
          <div className="bg-muted size-24 animate-pulse rounded-full" />
        )}
      </div>

      <h1 className="text-2xl font-bold text-foreground">
        WhatsApp এ তথ্য পাঠানোর জন্য প্রস্তুত
      </h1>
      <p className="text-muted-foreground">
        Institution Info ও Payment Info আলাদাভাবে WhatsApp এ খুলে গেছে। মেসেজটি
        পাঠিয়ে দিন, আমরা যাচাই করে শীঘ্রই যোগাযোগ করবো।
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        {onOpenWhatsApp ? (
          <Button type="button" size="lg" onClick={onOpenWhatsApp}>
            WhatsApp এ আবার খুলুন
          </Button>
        ) : null}
        <Button type="button" size="lg" variant="outline" onClick={onHome}>
          হোমে যান
        </Button>
      </div>
    </div>
  )
}

export { CheckoutSuccess }
