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
  { label: "ডেমো", href: "https://demo.sikkhadesk.com/", external: true },
  { label: "যোগাযোগ", href: "/contact" },
]

export const footerNav: FooterNavGroup[] = [
  {
    title: "প্ল্যাটফর্ম",
    items: [
      { label: "ফিচার", href: "/features" },
      { label: "মূল্য পরিকল্পনা", href: "/pricing" },
      { label: "ডেমো", href: "https://demo.sikkhadesk.com/", external: true },
      { label: "যোগাযোগ", href: "/contact" },
      { label: "আপডেট", href: "/" },
    ],
  },
  {
    title: "প্রতিষ্ঠানের জন্য",
    items: [
      { label: "স্কুল", href: "/contact" },
      { label: "কলেজ", href: "/contact" },
      { label: "মাদ্রাসা", href: "/contact" },
      { label: "কোচিং সেন্টার", href: "/contact" },
      { label: "বিশ্ববিদ্যালয়", href: "/contact" },
    ],
  },
  {
    title: "সহায়তা",
    items: [
      { label: "হেল্প সেন্টার", href: "/contact" },
      { label: "ব্যবহার নির্দেশিকা", href: "/contact" },
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
