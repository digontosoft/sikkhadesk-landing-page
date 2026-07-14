import {
  BarChart3,
  CalendarCheck,
  ClipboardCheck,
  GraduationCap,
  IdCard,
  MessageCircle,
  NotebookPen,
  PieChart,
  Scale,
  Smartphone,
  Users,
  Wallet,
} from "lucide-react"

import type { Feature } from "@/types/feature"

export const features: Feature[] = [
  {
    icon: Users,
    title: "শিক্ষার্থী ব্যবস্থাপনা",
    description:
      "ছাত্রদের তথ্য, ক্লাস, রোল, বিভাগসহ সম্পূর্ণ ডিজিটাল ব্যবস্থাপনা।",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "শিক্ষক ও স্টাফ ব্যবস্থাপনা",
    description:
      "শিক্ষক ও স্টাফদের তথ্য, পদবি, বেতন, দায়িত্ব ও অন্যান্য তথ্য সংরক্ষণ।",
    color: "emerald",
  },
  {
    icon: CalendarCheck,
    title: "উপস্থিতি ব্যবস্থাপনা",
    description: "ছাত্র ও শিক্ষকের উপস্থিতি সহজে রেকর্ড ও রিপোর্ট করুন।",
    color: "amber",
  },
  {
    icon: NotebookPen,
    title: "প্রশ্নপত্র তৈরি",
    description: "সহজেই প্রশ্নপত্র তৈরি, সংরক্ষণ ও ব্যবস্থাপনা করুন।",
    color: "blue",
  },
  {
    icon: ClipboardCheck,
    title: "পরীক্ষা ব্যবস্থাপনা",
    description:
      "অ্যাডমিট কার্ড, রুটিন, রেজাল্ট কার্ড ও টেবুলেশন শিট তৈরি করুন সহজেই।",
    color: "rose",
  },
  {
    icon: IdCard,
    title: "আইডি কার্ড তৈরি",
    description:
      "ছাত্র ও শিক্ষকের আইডি কার্ড তৈরি ও প্রিন্ট করুন সফটওয়্যার থেকে।",
    color: "teal",
  },
  {
    icon: BarChart3,
    title: "শিক্ষার্থী প্রগ্রেস রিপোর্ট",
    description:
      "প্রগ্রেস রিপোর্ট, টেস্টিমোনিয়াল, ট্রান্সফার সার্টিফিকেট ও অন্যান্য সনদপত্র।",
    color: "primary",
  },
  {
    icon: Wallet,
    title: "ফি ব্যবস্থাপনা",
    description: "ফি কালেকশন, ফি স্ট্রাকচার, ডিউ তালিকা ও পেমেন্ট রিপোর্ট।",
    color: "amber",
  },
  {
    icon: PieChart,
    title: "হিসাব ব্যবস্থাপনা",
    description:
      "প্রতিষ্ঠানের আয়-ব্যয়, হিসাব সংরক্ষণ ও আর্থিক লেনদেনের পূর্ণাঙ্গ সমাধান।",
    color: "blue",
  },
  {
    icon: Scale,
    title: "ব্যালান্স শীট",
    description:
      "আয়-ব্যয়ের উপর ভিত্তি করে ব্যালান্স শীট তৈরি ও বিশ্লেষণ করুন।",
    color: "emerald",
  },
  {
    icon: MessageCircle,
    title: "এসএমএস / নোটিফিকেশন সুবিধাসমূহ",
    description:
      "এক ক্লিকে SMS ও নোটিফিকেশন পাঠান ছাত্র, অভিভাবক ও শিক্ষকদের কাছে।",
    color: "primary",
  },
  {
    icon: Smartphone,
    title: "মোবাইল অ্যাপ",
    description: "শিক্ষক, ছাত্র ও অ্যাডমিনের জন্য আলাদা মোবাইল অ্যাপ সুবিধা।",
    color: "blue",
  },
]
