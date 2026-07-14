"use client"

import Lottie from "lottie-react"
import * as React from "react"

import { Button } from "@/components/ui/button"

interface CheckoutSuccessProps {
  onHome: () => void
}

function CheckoutSuccess({ onHome }: CheckoutSuccessProps) {
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
        পেমেন্ট যাচাইকরণে পাঠানো হয়েছে
      </h1>
      <p className="text-muted-foreground">
        আমরা আপনার পেমেন্ট যাচাই করে শীঘ্রই ইমেইল/ফোনে জানাবো। ধন্যবাদ!
      </p>
      <Button type="button" size="lg" onClick={onHome}>
        হোমে যান
      </Button>
    </div>
  )
}

export { CheckoutSuccess }
