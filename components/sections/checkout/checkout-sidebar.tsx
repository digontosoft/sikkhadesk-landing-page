import { OrderSummary } from "@/components/sections/checkout/order-summary"
import { OrganizationSummary } from "@/components/sections/checkout/organization-summary"
import { PackageSummary } from "@/components/sections/checkout/package-summary"
import { SecureBadge } from "@/components/sections/checkout/secure-badge"
import type { InstitutionFormData, OrderBreakdown } from "@/types/checkout"
import type { PricingPlan } from "@/types/pricing"

interface CheckoutSidebarProps {
  plan: PricingPlan
  rangeLabel: string
  breakdown: OrderBreakdown
  institution?: InstitutionFormData
  showOrganization?: boolean
}

function CheckoutSidebar({
  plan,
  rangeLabel,
  breakdown,
  institution,
  showOrganization = false,
}: CheckoutSidebarProps) {
  return (
    <aside className="flex flex-col gap-4 lg:sticky lg:top-6">
      <PackageSummary
        plan={plan}
        rangeLabel={rangeLabel}
        breakdown={breakdown}
      />
      <OrderSummary breakdown={breakdown} />
      {showOrganization && institution ? (
        <OrganizationSummary data={institution} />
      ) : null}
      <SecureBadge />
    </aside>
  )
}

export { CheckoutSidebar }
