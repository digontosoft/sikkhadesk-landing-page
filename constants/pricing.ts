import { Building2, Crown, GraduationCap, TrendingUp } from "lucide-react"

import type { PricingPlan, StudentRange } from "@/types/pricing"

export const studentRanges: StudentRange[] = [
  { label: "১ - ১৫০ জন শিক্ষার্থী", price: 500 },
  { label: "১৫০ - ৩০০ জন শিক্ষার্থী", price: 800 },
  {
    label: "৩০০ জনের উপরে",
    price: 1400,
    suffix: "+",
    note: "প্রতি অতিরিক্ত শিক্ষার্থী ২ BDT/মাসিক",
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    icon: GraduationCap,
    name: "Basic Plan",
    color: "blue",
    oneTimePayment: "2000 BDT",
    studentRanges,
    defaultRangeIndex: 0,
    featuresTitle: "ফিচারসমূহ",
    features: ["সফটওয়্যার প্যানেল অ্যাক্সেস", "মোবাইল অ্যাপ (Android/iOS)", "২৪/৭ সাপোর্ট", "ইমেইল সাপোর্ট"],
    cta: "এই প্ল্যান নির্বাচন করুন",
    href: "/contact",
  },
  {
    icon: TrendingUp,
    name: "Standard Plan",
    color: "blue",
    badge: { label: "জনপ্রিয়", tone: "blue" },
    oneTimePayment: "3000 BDT",
    studentRanges,
    defaultRangeIndex: 1,
    featuresTitle: "ফিচারসমূহ",
    features: [
      "সফটওয়্যার প্যানেল অ্যাক্সেস",
      "মোবাইল অ্যাপ (Android/iOS)",
      "ওয়েবসাইট",
      "২৪/৭ সাপোর্ট",
      "SMS ও নোটিফিকেশন সিস্টেম",
    ],
    cta: "এই প্ল্যান নির্বাচন করুন",
    href: "/contact",
    highlight: true,
  },
  {
    icon: Crown,
    name: "Premium Plan",
    color: "amber",
    badge: { label: "সেরা মূল্য", tone: "green" },
    oneTimePayment: "5000 BDT",
    studentRanges,
    defaultRangeIndex: 2,
    featuresTitle: "ফিচারসমূহ",
    features: [
      "সফটওয়্যার প্যানেল অ্যাক্সেস",
      "মোবাইল অ্যাপ (Android/iOS)",
      "ওয়েবসাইট",
      "২৪/৭ প্রায়োরিটি সাপোর্ট",
      "অ্যাডভান্সড রিপোর্ট ও অ্যানালিটিক্স",
      "মাল্টি-ব্রাঞ্চ ব্যবস্থাপনা",
    ],
    cta: "এই প্ল্যান নির্বাচন করুন",
    href: "/contact",
  },
  {
    icon: Building2,
    name: "Custom Plan",
    color: "indigo",
    oneTimePayment: "N/A",
    studentRanges: [],
    defaultRangeIndex: 0,
    featuresTitle: "কাস্টম সুবিধাসমূহ",
    features: [
      "অসীম সংখ্যক শিক্ষার্থী",
      "সমস্ত প্রিমিয়াম ফিচার",
      "ওয়েবসাইট ও মোবাইল অ্যাপ (Android & iOS)",
      "২৪/৭ ডেডিকেটেড সাপোর্ট টিম",
      "প্রিমিয়াম স্কুল ওয়েবসাইট",
      "আপনার নিজের সার্ভার ডিপ্লয়",
      "১ কপি হোয়াইট লেবেল লাইসেন্স",
    ],
    cta: "কোটেশনের জন্য যোগাযোগ করুন",
    href: "/contact",
    isCustom: true,
  },
]

export const pricingMethod = [
  {
    range: "১ - ১৫০ জন শিক্ষার্থী",
    highlight: "শুধুমাত্র 500 BDT/মাস",
    description: "ছোট প্রতিষ্ঠানের জন্য পারফেক্ট",
  },
  {
    range: "১৫০ - ৩০০ জন শিক্ষার্থী",
    highlight: "শুধুমাত্র 800 BDT/মাস",
    description: "বর্ধিত সুবিধা ও পারফরম্যান্স",
  },
  {
    range: "৩০০+ জন শিক্ষার্থী",
    highlight: "প্রতি অতিরিক্ত শিক্ষার্থী মাত্র 2 BDT",
    description: "যত বেশি শিক্ষার্থী, তত কম খরচ",
  },
]
