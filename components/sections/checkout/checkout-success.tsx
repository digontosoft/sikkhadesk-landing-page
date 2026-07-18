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
    <div className="mx-auto flex min-h-[70vh] w-full max-w-lg flex-col items-center justify-center gap-4 px-4 py-10 text-center sm:py-16">
      <div className="flex size-40 items-center justify-center sm:size-56 md:size-64">
        {animationData ? (
          <Lottie
            animationData={animationData}
            loop={false}
            autoplay
            className="size-full"
          />
        ) : (
          <div className="bg-muted size-20 animate-pulse rounded-full sm:size-24" />
        )}
      </div>

      <h1 className="text-balance text-xl font-bold text-foreground sm:text-2xl">
        WhatsApp এ তথ্য পাঠানোর জন্য প্রস্তুত
      </h1>
      <p className="text-sm text-balance text-muted-foreground sm:text-base">
        Institution Info ও Payment Info আলাদাভাবে WhatsApp এ খুলে গেছে। মেসেজটি
        পাঠিয়ে দিন, আমরা যাচাই করে শীঘ্রই যোগাযোগ করবো।
      </p>
      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        {onOpenWhatsApp ? (
          <Button
            type="button"
            size="lg"
            className="w-full sm:w-auto"
            onClick={onOpenWhatsApp}
          >
            WhatsApp এ আবার খুলুন
          </Button>
        ) : null}
        <Button
          type="button"
          size="lg"
          variant="outline"
          className="w-full sm:w-auto"
          onClick={onHome}
        >
          হোমে যান
        </Button>
      </div>
    </div>
  )
}

export { CheckoutSuccess }
