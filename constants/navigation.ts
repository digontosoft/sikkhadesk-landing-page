import { siteConfig } from "@/constants/site"

export interface NavItem {
  label: string
  href: string
  external?: boolean
}

export interface FooterNavGroup {
  title: string
  items: NavItem[]
}

export const mainNav: NavItem[] = [
  { label: "হোম", href: "/" },
  { label: "ফিচার", href: "/features" },
  { label: "মূল্য পরিকল্পনা", href: "/pricing" },
  { label: "ডেমো", href: siteConfig.demoUrl, external: true },
  { label: "যোগাযোগ", href: "/contact" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "English", href: "/en" },
]

export const footerNav: FooterNavGroup[] = [
  {
    title: "প্ল্যাটফর্ম",
    items: [
      { label: "ফিচার", href: "/features" },
      { label: "মূল্য পরিকল্পনা", href: "/pricing" },
      { label: "ডেমো", href: siteConfig.demoUrl, external: true },
      { label: "যোগাযোগ", href: "/contact" },
      { label: "আমাদের সম্পর্কে", href: "/about" },
      {
        label: "Android অ্যাপ",
        href: siteConfig.androidAppUrl,
        external: true,
      },
    ],
  },
  {
    title: "মূল মডিউল",
    items: [
      {
        label: "শিক্ষার্থী ব্যবস্থাপনা",
        href: "/features/student-management",
      },
      { label: "ফি ব্যবস্থাপনা", href: "/features/fee-management" },
      {
        label: "উপস্থিতি ব্যবস্থাপনা",
        href: "/features/attendance-management",
      },
      { label: "পরীক্ষা ও ফলাফল", href: "/features/exam-results" },
      { label: "সব ফিচার", href: "/features" },
      { label: "English", href: "/en" },
    ],
  },
  {
    title: "সহায়তা",
    items: [
      {
        label: "হেল্প সেন্টার",
        href: `https://${siteConfig.supportCenter}`,
        external: true,
      },
      { label: "ডেমো বুক করুন", href: "/contact" },
      { label: "সাপোর্ট", href: "/contact" },
      { label: "প্রশ্ন ও উত্তর", href: "/pricing#faq" },
      { label: "গোপনীয়তা নীতি", href: "/privacy-policy" },
    ],
  },
]

export const footerLegalLinks: NavItem[] = [
  { label: "গোপনীয়তা নীতি", href: "/privacy-policy" },
  { label: "ব্যবহারের শর্তাবলী", href: "/terms" },
]
