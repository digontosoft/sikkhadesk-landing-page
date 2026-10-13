"use client"

import { motion } from "framer-motion"
import {
  CheckCircle2,
  Headphones,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Monitor,
  Smartphone,
} from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { Badge } from "@/components/common/badge"
import { Logo } from "@/components/common/logo"
import {
  FacebookIcon,
  // LinkedinIcon,
  WhatsappIcon,
} from "@/components/common/social-icons"
import { footerLegalLinks, footerNav } from "@/constants/navigation"
import { siteConfig } from "@/constants/site"

const trustBadges = ["নিরাপদ", "সহজ", "দ্রুত", "স্মার্ট"]

const socialLinks = [
  { label: "Facebook", href: siteConfig.links.facebook, icon: FacebookIcon },
  { label: "WhatsApp", href: siteConfig.links.whatsapp, icon: WhatsappIcon },
  // { label: "YouTube", href: siteConfig.links.youtube, icon: YoutubeIcon },
  // { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedinIcon },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: Mail },
]

const contactItems = [
  {
    icon: Phone,
    value: siteConfig.phone,
    caption: siteConfig.supportHours,
    href: `tel:${siteConfig.phone.replace(/[\s-]/g, "")}`,
  },
  {
    icon: WhatsappIcon,
    value: siteConfig.whatsapp,
    caption: "WhatsApp-এ মেসেজ করুন",
    href: siteConfig.links.whatsapp,
  },
  {
    icon: Mail,
    value: siteConfig.email,
    caption: "আমাদের ইমেইল করুন",
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: MapPin,
    value: siteConfig.addressBn,
    caption: siteConfig.addressCaptionBn,
    href: undefined,
  },
]

const trustStats = [
  { icon: Monitor, value: "ওয়েব", label: "ব্রাউজারে ব্যবহার করুন" },
  { icon: Smartphone, value: "Android", label: "মোবাইল অ্যাপ" },
  { icon: ShieldCheck, value: "১৪ দিন", label: "ফ্রি ট্রায়াল" },
  {
    icon: Headphones,
    value: "রবি–বৃহঃ",
    label: "সকাল ৯টা–সন্ধ্যা ৭টা সাপোর্ট",
  },
]

function Footer() {
  const year = new Intl.NumberFormat("bn-BD").format(new Date().getFullYear())

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8"
        >
          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-4">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground">
              SikkhaDesk হলো একটি স্মার্ট শিক্ষা ব্যবস্থাপনা প্ল্যাটফর্ম যা
              শিক্ষা প্রতিষ্ঠানকে করে তোলে আরও সংগঠিত, স্বচ্ছ এবং ডিজিটাল।
            </p>

            <Link
              href="/about"
              className="text-sm text-primary hover:underline"
            >
              {siteConfig.operatorName}-এর একটি সফটওয়্যার →
            </Link>

            <div className="flex flex-wrap gap-2">
              {trustBadges.map((label) => (
                <Badge key={label}>
                  <CheckCircle2 className="size-3.5" />
                  {label}
                </Badge>
              ))}
            </div>

            <div className="mt-2 flex flex-col gap-2">
              <p className="text-sm font-semibold text-foreground">
                নতুন ফিচার ও আপডেট
              </p>
              <p className="text-xs text-muted-foreground">
                SikkhaDesk-এর খবর ও নতুন ফিচার জানতে আমাদের ফেসবুক পেজ দেখুন।
              </p>
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                ফেসবুকে আপডেট দেখুন →
              </a>
              <a
                href={siteConfig.androidAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Google Play থেকে Android অ্যাপ ডাউনলোড করুন →
              </a>
            </div>
          </div>

          {footerNav.map((group) => (
            <div
              key={group.title}
              className="flex min-w-0 flex-col gap-4 lg:col-span-2"
            >
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {group.title}
                </p>
                <span className="bg-gradient-primary mt-2 block h-0.5 w-6 rounded-full" />
              </div>
              <div className="flex flex-col gap-3">
                {group.items.map((item) =>
                  item.external ? (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </div>
            </div>
          ))}

          <div className="flex min-w-0 flex-col gap-4 lg:col-span-2">
            <div>
              <p className="text-sm font-semibold text-foreground">
                যোগাযোগ করুন
              </p>
              <span className="bg-gradient-primary mt-2 block h-0.5 w-6 rounded-full" />
            </div>
            <div className="flex flex-col gap-4">
              {contactItems.map((item, index) => {
                const Icon = item.icon
                const content = (
                  <div className="flex items-start gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium wrap-break-word text-foreground">
                        {item.value}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                )

                return item.href ? (
                  <a key={index} href={item.href}>
                    {content}
                  </a>
                ) : (
                  <div key={index}>{content}</div>
                )
              })}
            </div>
          </div>
        </motion.div>

        <div className="my-10 border-t border-border" />

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
        >
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-foreground">
              আমাদের সাথে যুক্ত থাকুন
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    aria-label={social.label}
                    className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {trustStats.map((stat) => {
              const Icon = stat.icon

              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 px-4 py-3"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <div className="my-10 border-t border-border" />

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px 100px 0px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row"
        >
          <p>© {year} SikkhaDesk. সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-2">
            {footerLegalLinks.map((link, index) => (
              <Fragment key={link.href}>
                {index > 0 ? <span className="text-border">|</span> : null}
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </Fragment>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export { Footer }
