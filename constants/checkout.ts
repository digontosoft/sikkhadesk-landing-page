import type { CheckoutStepId, InstitutionFormData, PaymentFormData } from "@/types/checkout"

export const YEARLY_DISCOUNT_RATE = 0.1
export const VAT_RATE = 0.15

export const checkoutSteps: { id: CheckoutStepId; label: string }[] = [
  { id: "institution", label: "প্রতিষ্ঠানের তথ্য" },
  { id: "package", label: "প্যাকেজ নির্বাচন" },
  { id: "payment-method", label: "পেমেন্ট পদ্ধতি" },
  { id: "confirmation", label: "নিশ্চিতকরণ" },
]

export const emptyInstitutionForm: InstitutionFormData = {
  logo: null,
  logoPreview: null,
  name: "",
  code: "",
  phone: "",
  email: "",
  address: "",
  district: "",
  districtBn: "",
  upazila: "",
  upazilaBn: "",
  postCode: "",
}

export const emptyPaymentForm: PaymentFormData = {
  method: "bkash",
  transactionId: "",
  transferredAt: "",
  proof: null,
  proofName: null,
}

export const paymentAccounts = {
  bkash: {
    label: "bKash",
    accountType: "পার্সোনাল",
    number: "01712-345678",
    instruction:
      "উপরের নম্বরে Send Money করে ট্রানজ্যাকশন আইডিটি নিচের ফর্মে দিন।",
  },
  bank: {
    label: "ব্যাংক অ্যাকাউন্ট",
    bankName: "BRAC Bank Limited",
    accountName: "SikkhaDesk Limited",
    accountNumber: "2050 1234 5678 90",
    branch: "Banani, Dhaka",
    routingNumber: "060261234",
    instruction:
      "ব্যাংক ট্রান্সফার সম্পন্ন করে রেফারেন্স নম্বর ও প্রমাণ আপলোড করুন।",
  },
} as const
