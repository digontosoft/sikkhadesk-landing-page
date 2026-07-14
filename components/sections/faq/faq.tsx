"use client"

import { motion } from "framer-motion"
import {
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  Mail,
  MessageCircleQuestion,
  MessageCircleWarning,
  Phone,
  Send,
} from "lucide-react"
import Image from "next/image"

import { Badge } from "@/components/common/badge"
import { CtaButton } from "@/components/common/cta-button"
import { Heading } from "@/components/common/heading"
import { Section } from "@/components/layout/section"
import { FaqCategoryCard } from "@/components/sections/faq/faq-category"
import { faqCategories } from "@/constants/faq"
import { siteConfig } from "@/constants/site"

const supportPoints = [
  { icon: Clock, label: "দ্রুত উত্তর", value: "২৪ ঘন্টার মধ্যে" },
  { icon: Phone, label: "লাইভ সাপোর্ট", value: "সকাল ৯টা - রাত ৯টা" },
  { icon: Mail, label: "ইমেইল সাপোর্ট", value: siteConfig.supportCenter },
]

function Faq() {
  return (
    <Section id="faq" className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute top-4 left-8 -z-10 hidden opacity-10 md:left-16 lg:block"
      >
        <MessageCircleQuestion className="size-28 text-brand-blue" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 left-24 -z-10 hidden opacity-10 md:left-36 lg:block"
      >
        <MessageCircleWarning className="size-14 text-brand-blue" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-4 right-8 -z-10 hidden opacity-10 md:right-16 lg:block"
      >
        <GraduationCap className="size-28 text-brand-blue" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-36 right-24 -z-10 hidden opacity-10 md:right-36 lg:block"
      >
        <BookOpen className="size-14 text-brand-blue" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute top-6 left-6 -z-10 hidden grid-cols-6 gap-1.5 opacity-40 sm:grid"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="size-1.5 rounded-full bg-brand-400" />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Badge>
          <HelpCircle className="size-3.5 fill-brand-emerald/20 text-brand-emerald" />
          সাধারণ প্রশ্নাবলী (FAQ)
        </Badge>
        <Heading size="lg" className="max-w-2xl text-balance">
          আপনার যেকোনো{" "}
          <span className="text-gradient-hero">প্রশ্নের উত্তর</span> এখানে
        </Heading>
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          SikkhaDesk সম্পর্কে আমাদের গ্রাহকদের করা কিছু সাধারণ প্রশ্ন ও তার
          উত্তর দেওয়া হলো। তাও না পেলে, আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন।
        </p>
        <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
          <div className="bg-gradient-primary h-full w-1/3 rounded-full" />
        </div>
      </motion.div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {faqCategories.map((category, index) => (
          <FaqCategoryCard
            key={category.title}
            category={category}
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mt-8 flex flex-col items-center gap-6 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:justify-between sm:p-8"
      >
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <span className="relative flex size-16 shrink-0 items-center justify-center">
            <motion.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.15, 0.6] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <div className="relative size-16 overflow-hidden rounded-full ring-2 ring-primary/20">
              <Image
                src="/images/logos/help-center.png"
                alt="সাপোর্ট এজেন্ট"
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>
          </span>
          <div>
            <p className="text-lg font-bold text-foreground">
              আপনার প্রশ্নের উত্তর খুঁজে পাচ্ছেন না?
            </p>
            <p className="text-sm text-muted-foreground">
              আমাদের সাপোর্ট টিম সবসময় আপনার পাশে আছে।
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:justify-start">
              {supportPoints.map((point) => {
                const Icon = point.icon

                return (
                  <div key={point.label} className="flex items-center gap-2">
                    <Icon className="size-4 shrink-0 text-primary" />
                    <div>
                      <p className="text-xs font-semibold text-foreground">
                        {point.label}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {point.value}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <CtaButton href="/contact" size="lg">
            <Send className="size-4" />
            আমাদের সাথে যোগাযোগ করুন
          </CtaButton>
          <a
            href={`https://${siteConfig.supportCenter}`}
            target="_blank"
            className="text-sm font-medium text-primary hover:underline"
          >
            অথবা সাপোর্ট সেন্টারে যান →
          </a>
        </div>
      </motion.div>
    </Section>
  )
}

export { Faq }
