"use client"

import Lottie from "lottie-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ContactSuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

function ContactSuccessModal({ open, onOpenChange }: ContactSuccessModalProps) {
  const [animationData, setAnimationData] = React.useState<object | null>(null)

  React.useEffect(() => {
    if (!open) return

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
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton
      >
        <DialogHeader className="items-center text-center">
          <div className="mx-auto flex size-44 items-center justify-center sm:size-52">
            {animationData ? (
              <Lottie
                animationData={animationData}
                loop={false}
                autoplay
                className="size-full"
              />
            ) : (
              <div className="bg-muted size-20 animate-pulse rounded-full" />
            )}
          </div>
          <DialogTitle className="text-xl">
            মেসেজ সফলভাবে পাঠানো হয়েছে
          </DialogTitle>
          <DialogDescription className="text-center">
            ধন্যবাদ! আমরা আপনার বার্তা পেয়েছি এবং শীঘ্রই আপনার সাথে যোগাযোগ করব।
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button type="button" size="lg" onClick={() => onOpenChange(false)}>
            ঠিক আছে
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export { ContactSuccessModal }
