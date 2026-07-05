"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  Clock,
  Headphones,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  PenLine,
  Send,
  ShieldCheck,
  Sparkles,
  User,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/constants/site"
import { Badge } from "@/components/common/badge"
import { Heading } from "@/components/common/heading"
import { CtaButton } from "@/components/common/cta-button"
import { Button } from "@/components/ui/button"
import {
  FacebookIcon,
  LinkedinIcon,
  MessengerIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "@/components/common/social-icons"

const contactInfo = [
  {
    icon: Phone,
    color: "bg-brand-blue/10 text-brand-blue",
    label: "ফোন নম্বর",
    value: siteConfig.phone,
    caption: "সকাল ৯টা - রাত ৮টা (শুক্রবার বন্ধ)",
    href: `tel:${siteConfig.phone.replace(/[\s-]/g, "")}`,
  },
  {
    icon: Mail,
    color: "bg-brand-emerald/10 text-brand-emerald",
    label: "ইমেইল",
    value: siteConfig.email,
    caption: "আমরা সাধারণত ২৪ ঘন্টার মধ্যে উত্তর দেই",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    color: "bg-primary/10 text-primary",
    label: "অফিস ঠিকানা",
    value: "বাড়ি: ১২৩, রোড: ৮, সেক্টর: ১০",
    caption: "উত্তরা, ঢাকা-১২৩০, বাংলাদেশ",
  },
  {
    icon: Headphones,
    color: "bg-brand-amber/10 text-brand-amber",
    label: "সাপোর্ট সেন্টার",
    value: siteConfig.supportCenter,
    caption: "টিকেট করুন, আমরা সহায়তা করবো",
    href: `https://${siteConfig.supportCenter}`,
  },
]

const socialLinks = [
  { label: "Facebook", href: siteConfig.links.facebook, icon: FacebookIcon, bg: "bg-[#1877F2]" },
  { label: "YouTube", href: siteConfig.links.youtube, icon: YoutubeIcon, bg: "bg-[#FF0000]" },
  { label: "Linkedin", href: siteConfig.links.linkedin, icon: LinkedinIcon, bg: "bg-[#0A66C2]" },
  { label: "Messenger", href: siteConfig.links.messenger, icon: MessengerIcon, bg: "bg-[#00B2FF]" },
  { label: "WhatsApp", href: siteConfig.links.whatsapp, icon: WhatsappIcon, bg: "bg-[#25D366]" },
]

const trustPoints = [
  { icon: Clock, color: "text-brand-emerald", title: "দ্রুত উত্তর", description: "২৪ ঘন্টার মধ্যে উত্তর" },
  { icon: ShieldCheck, color: "text-brand-blue", title: "নিরাপদ ও গোপনীয়", description: "আপনার তথ্য নিরাপদ" },
  { icon: Sparkles, color: "text-primary", title: "সহায়তায় আমরা সদা প্রস্তুত", description: "আপনার সাফল্য আমাদের লক্ষ্য" },
]

const subjects = [
  "সাধারণ জিজ্ঞাসা",
  "ডেমো অনুরোধ",
  "প্রযুক্তিগত সহায়তা",
  "মূল্য সম্পর্কিত",
  "অন্যান্য",
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0 },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.5 },
  show: { opacity: 1, scale: 1 },
}

function Contact() {
  const [submitted, setSubmitted] = React.useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-4 right-6 -z-10 hidden grid-cols-6 gap-1.5 opacity-40 sm:grid"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="bg-brand-400 size-1.5 rounded-full" />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-24 left-6 -z-10 hidden grid-cols-6 gap-1.5 opacity-40 sm:grid"
      >
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} className="bg-brand-400 size-1.5 rounded-full" />
        ))}
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4 text-center"
      >
        <Badge>
          <MessageSquareText className="fill-brand-700/20 text-brand-700 size-3.5" />
          যোগাযোগ করুন
        </Badge>
        <Heading size="lg" className="max-w-2xl text-balance">
          আমরা আছি{" "}
          <span className="relative inline-block">
            <span className="text-gradient-hero">আপনার পাশে</span>
            <svg
              aria-hidden
              viewBox="0 0 200 12"
              className="text-brand-emerald absolute -bottom-2 left-0 w-full"
            >
              <path
                d="M2 8c30-8 60-8 98-4s70 4 98-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </Heading>
        <p className="max-w-2xl text-balance text-muted-foreground sm:text-lg">
          SikkhaDesk সম্পর্কে যেকোনো তথ্য, পরামর্শ অথবা সহায়তার জন্য আমাদের সাথে যোগাযোগ করুন।
          আমরা দ্রুত আপনার সাথে থাকব।
        </p>
      </motion.div>

      <div className="mt-12 grid overflow-hidden rounded-3xl border border-border bg-card shadow-sm lg:grid-cols-[1fr_1.3fr] lg:divide-x lg:divide-border">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="flex flex-col gap-8 p-6 sm:p-8"
        >
          <motion.div variants={fadeUp}>
            <p className="relative w-fit pb-2 text-base font-semibold text-foreground">
              যোগাযোগের তথ্য
              <span className="bg-gradient-primary absolute inset-x-0 bottom-0 h-0.5 rounded-full" />
            </p>

            <div className="mt-5 flex flex-col gap-5">
              {contactInfo.map((item) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "flex size-11 shrink-0 items-center justify-center rounded-xl",
                        item.color
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-sm font-medium wrap-break-word text-foreground">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground">{item.caption}</p>
                    </div>
                  </div>
                )

                return (
                  <motion.div key={item.label} variants={fadeLeft}>
                    {item.href ? (
                      <a href={item.href} className="block transition-opacity hover:opacity-80">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="relative w-fit pb-2 text-base font-semibold text-foreground">
              আমাদের সাথে যুক্ত থাকুন
              <span className="bg-gradient-primary absolute inset-x-0 bottom-0 h-0.5 rounded-full" />
            </p>
            <motion.div
              variants={staggerContainer}
              className="mt-5 grid grid-cols-5 gap-2 sm:gap-3"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    variants={scaleIn}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.92 }}
                    className="flex flex-col items-center gap-1.5"
                  >
                    <span
                      className={cn(
                        "flex size-10 items-center justify-center rounded-full text-white shadow-sm sm:size-12",
                        social.bg
                      )}
                    >
                      <Icon className="size-4.5 sm:size-5" />
                    </span>
                    <span className="text-center text-[11px] text-muted-foreground">
                      {social.label}
                    </span>
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-auto flex items-center gap-4 rounded-2xl bg-primary/5 p-4"
          >
            <span className="relative flex size-11 shrink-0 items-center justify-center">
              <motion.span
                aria-hidden
                className="bg-primary/20 absolute inset-0 rounded-full"
                animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0.15, 0.6] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="bg-primary relative flex size-11 items-center justify-center rounded-full text-white">
                <Headphones className="size-5" />
              </span>
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground">জরুরি সহায়তা প্রয়োজন?</p>
              <p className="text-xs text-muted-foreground">
                আমাদের সাপোর্ট টিম লাইভ চ্যাটে আপনার জন্য প্রস্তুত।
              </p>
            </div>
            <Button size="sm" render={<Link href="/contact" />} className="shrink-0">
              লাইভ চ্যাট
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="p-6 sm:p-8"
        >
          <p className="text-base font-semibold text-foreground">আমাকে মেসেজ পাঠান</p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-foreground">
                  আপনার নাম <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <User className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    className="h-11 w-full rounded-xl border border-input bg-background pr-3 pl-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  ইমেইল ঠিকানা <span className="text-destructive">*</span>
                </label>
                <div className="relative">
                  <Mail className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="আপনার ইমেইল লিখুন"
                    className="h-11 w-full rounded-xl border border-input bg-background pr-3 pl-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  ফোন নম্বর
                </label>
                <div className="relative">
                  <Phone className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                  <input
                    id="phone"
                    name="phone"
                    placeholder="আপনার ফোন নম্বর লিখুন"
                    className="h-11 w-full rounded-xl border border-input bg-background pr-3 pl-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">
                  বিষয় <span className="text-destructive">*</span>
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  defaultValue=""
                  className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  <option value="" disabled>
                    বিষয় নির্বাচন করুন
                  </option>
                  {subjects.map((subject) => (
                    <option key={subject} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                বার্তা <span className="text-destructive">*</span>
              </label>
              <div className="relative">
                <PenLine className="text-muted-foreground absolute top-3.5 left-3 size-4" />
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="আপনার বার্তা লিখুন..."
                  className="w-full rounded-xl border border-input bg-background py-3 pr-3 pl-10 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                />
              </div>
            </div>

            <div className="grid gap-3 rounded-xl bg-muted/40 p-4 sm:grid-cols-3">
              {trustPoints.map((point) => {
                const Icon = point.icon

                return (
                  <div key={point.title} className="flex items-start gap-2">
                    <Icon className={cn("mt-0.5 size-4 shrink-0", point.color)} />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{point.title}</p>
                      <p className="text-xs text-muted-foreground">{point.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <CtaButton type="submit" size="lg" fullWidth className="justify-center">
              <Send className="size-4" />
              মেসেজ পাঠান
            </CtaButton>

            {submitted ? (
              <p className="text-primary text-center text-sm">
                ধন্যবাদ! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
              </p>
            ) : null}
          </form>
        </motion.div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="mt-8 flex items-center justify-center gap-2 text-center text-sm text-muted-foreground"
      >
        <span>সাধারণ কিছু প্রশ্নের উত্তর পেতে আমাদের</span>
        <Link
          href="/pricing#faq"
          className="group text-primary inline-flex items-center gap-1 font-medium hover:underline"
        >
          FAQ পেজ দেখুন
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </div>
  )
}

export { Contact }
