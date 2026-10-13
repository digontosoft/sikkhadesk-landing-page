import { siteConfig } from "@/constants/site"
import { getPageUrl } from "@/lib/metadata"

export const siteStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${getPageUrl()}#organization`,
      name: siteConfig.name,
      url: getPageUrl(),
      logo: `${siteConfig.url}/images/logos/logo.png`,
      email: siteConfig.email,
      telephone: siteConfig.phone,
      parentOrganization: { "@id": `${getPageUrl("/about")}#operator` },
      sameAs: [siteConfig.links.facebook],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Mir Bari Road #05, Sankipara",
        addressLocality: "Mymensingh",
        postalCode: "2200",
        addressCountry: "BD",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: siteConfig.phone,
        email: siteConfig.email,
        hoursAvailable: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"],
          opens: "09:00",
          closes: "19:00",
        },
      },
    },
    {
      "@type": "Organization",
      "@id": `${getPageUrl("/about")}#operator`,
      name: siteConfig.operatorName,
      url: getPageUrl("/about"),
    },
    {
      "@type": "WebSite",
      "@id": `${getPageUrl()}#website`,
      name: siteConfig.name,
      url: getPageUrl(),
      inLanguage: ["bn-BD", "en-BD"],
      publisher: { "@id": `${getPageUrl()}#organization` },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${getPageUrl()}#software`,
      name: siteConfig.name,
      url: getPageUrl(),
      description: siteConfig.description,
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web, Android",
      screenshot: `${siteConfig.url}/images/hero/dashboard-1200.webp`,
      installUrl: siteConfig.androidAppUrl,
      publisher: { "@id": `${getPageUrl()}#organization` },
      offers: {
        "@type": "Offer",
        url: getPageUrl("/pricing"),
        price: "500",
        priceCurrency: "BDT",
        description:
          "Basic subscription for up to 150 students: BDT 500 per month. One-time setup fee and VAT are additional; see the complete pricing breakdown.",
      },
      featureList: [
        "Student and staff records",
        "Student and teacher attendance",
        "Fee collection, invoices and due lists",
        "Exams, results and tabulation sheets",
        "Income and expense management",
        "SMS notifications",
      ],
    },
  ],
}

export function breadcrumbStructuredData(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: getPageUrl(item.path),
    })),
  }
}
