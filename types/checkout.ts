export type CheckoutStep = "institution" | "payment"

export type CheckoutStepId =
  | "institution"
  | "package"
  | "payment-method"
  | "confirmation"

export interface InstitutionFormData {
  logo: File | null
  logoPreview: string | null
  name: string
  code: string
  phone: string
  email: string
  address: string
  district: string
  districtBn: string
  upazila: string
  upazilaBn: string
  postCode: string
}

export interface PaymentFormData {
  method: "bkash" | "bank"
  transactionId: string
  transferredAt: string
  proof: File | null
  proofName: string | null
}

export interface CheckoutSelection {
  planId: string
  rangeIndex: number
  billing: "monthly" | "yearly"
}

export interface OrderBreakdown {
  monthlyPrice: number
  yearlyFull: number
  yearlyDiscount: number
  subscriptionTotal: number
  oneTimeFee: number
  vatRate: number
  vatAmount: number
  payableTotal: number
  isYearly: boolean
  contactOnly: boolean
}
