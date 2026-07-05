"use client"

import * as React from "react"
import { Send } from "lucide-react"

function NewsletterForm() {
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="email"
          required
          placeholder="আপনার ইমেইল লিখুন"
          className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background px-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        />
        <button
          type="submit"
          aria-label="সাবস্ক্রাইব করুন"
          className="bg-gradient-primary flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-xl text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <Send className="size-4" />
        </button>
      </div>
      {submitted ? (
        <p className="text-primary text-xs">ধন্যবাদ! আপনি সফলভাবে সাবস্ক্রাইব করেছেন।</p>
      ) : null}
    </form>
  )
}

export { NewsletterForm }
