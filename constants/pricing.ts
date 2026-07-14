import { Building2, Crown, GraduationCap, TrendingUp } from "lucide-react"

import type { PricingMethodItem, PricingPlan, StudentRange } from "@/types/pricing"

const basicStudentRanges: StudentRange[] = [
  { label: "০ - ১৫০ জন", price: 500 },
  { label: "১৫১ - ৩০০ জন", price: 800 },
  { label: "৩০১ - ৫০০ জন", price: 1000 },
  { label: "৫০১ - ৮০০ জন", price: 1200 },
  { label: "৮০১ - ১০০০ জন", price: 1500 },
  { label: "১০০১ - ১৫০০ জন", price: 2000 },
  {
    label: "১৫০১+ জন",
    price: 0,
    contactOnly: true,
    note: "আলোচনা সাপেক্ষে",
  },
]

const standardStudentRanges: StudentRange[] = [
  { label: "০ - ১৫০ জন", price: 800 },
  { label: "১৫১ - ৩০০ জন", price: 1000 },
  { label: "৩০১ - ৫০০ জন", price: 1200 },
  { label: "৫০১ - ৮০০ জন", price: 1500 },
  { label: "৮০১ - ১০০০ জন", price: 1800 },
  { label: "১০০১ - ১৫০০ জন", price: 2500 },
  {
    label: "১৫০১+ জন",
    price: 0,
    contactOnly: true,
    note: "আলোচনা সাপেক্ষে",
  },
]

const premiumStudentRanges: StudentRange[] = [
  { label: "০ - ১৫০ জন", price: 1000 },
  { label: "১৫১ - ৩০০ জন", price: 1200 },
  { label: "৩০১ - ৫০০ জন", price: 1500 },
  { label: "৫০১ - ৮০০ জন", price: 1800 },
  { label: "৮০১ - ১০০০ জন", price: 2000 },
  { label: "১০০১ - ১৫০০ জন", price: 2500 },
  {
    label: "১৫০১+ জন",
    price: 0,
    contactOnly: true,
    note: "আলোচনা সাপেক্ষে",
  },
]

export const pricingPlans: PricingPlan[] = [
  {
    id: "basic",
    icon: GraduationCap,
    name: "বেসিক প্ল্যান",
    color: "blue",
    oneTimePayment: "২০০০",
    oneTimeFee: 2000,
    studentRanges: basicStudentRanges,
    defaultRangeIndex: 0,
    featuresTitle: "ফিচারসমূহ",
    features: [
      "সফটওয়্যার প্যানেল অ্যাক্সেস",
      "মোবাইল অ্যাপ (Android/iOS)",
      "রবি-বৃহঃ সাপোর্ট",
      "হোয়াটসঅ্যাপ সাপোর্ট",
      "সকল ফিচার অ্যাক্সেস",
    ],
    cta: "এই প্ল্যান নির্বাচন করুন",
    href: "/checkout",
  },
  {
    id: "standard",
    icon: TrendingUp,
    name: "স্ট্যান্ডার্ড প্ল্যান",
    color: "blue",
    badge: { label: "জনপ্রিয়", tone: "blue" },
    oneTimePayment: "৩০০০",
    oneTimeFee: 3000,
    studentRanges: standardStudentRanges,
    defaultRangeIndex: 0,
    featuresTitle: "ফিচারসমূহ",
    features: [
      "সফটওয়্যার প্যানেল অ্যাক্সেস",
      "মোবাইল অ্যাপ (Android/iOS)",
      "ওয়েবসাইট",
      "২৪/৭ সাপোর্ট",
      "গুগল মিট ওয়ান টু ওয়ান সাপোর্ট",
      "সকল ফিচার অ্যাক্সেস",
    ],
    cta: "এই প্ল্যান নির্বাচন করুন",
    href: "/checkout",
    highlight: true,
  },
  {
    id: "premium",
    icon: Crown,
    name: "প্রিমিয়াম প্ল্যান",
    color: "amber",
    badge: { label: "সেরা মূল্য", tone: "green" },
    oneTimePayment: "৫০০০",
    oneTimeFee: 5000,
    studentRanges: premiumStudentRanges,
    defaultRangeIndex: 0,
    featuresTitle: "ফিচারসমূহ",
    features: [
      "সফটওয়্যার প্যানেল অ্যাক্সেস",
      "মোবাইল অ্যাপ (Android/iOS)",
      "ওয়েবসাইট",
      "২৪/৭ প্রায়োরিটি সাপোর্ট",
      "গুগল মিট ওয়ান টু ওয়ান সাপোর্ট",
      "মাল্টি-ব্রাঞ্চ ব্যবস্থাপনা",
      "সকল ফিচার অ্যাক্সেস",
    ],
    cta: "এই প্ল্যান নির্বাচন করুন",
    href: "/checkout",
  },
  {
    id: "custom",
    icon: Building2,
    name: "কাস্টম প্ল্যান",
    color: "indigo",
    oneTimePayment: "N/A",
    oneTimeFee: 0,
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

const pricingMethodDescriptions = [
  "ছোট প্রতিষ্ঠানের জন্য পারফেক্ট",
  "কিছুটা বড় প্রতিষ্ঠানের জন্য উপযুক্ত",
  "মাঝারি প্রতিষ্ঠানের জন্য সঠিক পছন্দ",
  "বর্ধিত সুবিধা ও পারফরম্যান্স",
  "বড় প্রতিষ্ঠানের জন্য উপযুক্ত",
  "এন্টারপ্রাইজ স্তরের সুবিধা",
]

export const pricingMethod: PricingMethodItem[] = basicStudentRanges.map(
  (range, index) => {
    if (range.contactOnly) {
      return {
        range: `${range.label} শিক্ষার্থী`,
        contactOnly: true,
        description: "বড় প্রতিষ্ঠানের জন্য কাস্টম সমাধান",
      }
    }

    return {
      range: `${range.label} শিক্ষার্থী`,
      prices: [
        { plan: "বেসিক", price: basicStudentRanges[index].price },
        { plan: "স্ট্যান্ডার্ড", price: standardStudentRanges[index].price },
        { plan: "প্রিমিয়াম", price: premiumStudentRanges[index].price },
      ],
      description: pricingMethodDescriptions[index] ?? "",
    }
  }
)
