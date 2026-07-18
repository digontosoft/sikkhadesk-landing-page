import emailjs from "@emailjs/browser"

import type { ContactFormValues } from "@/lib/contact-schema"

const EMAILJS_SERVICE_ID = "service_8r7y12v"
const EMAILJS_TEMPLATE_ID = "template_9ej8muu"
const EMAILJS_PUBLIC_KEY = "9mVdhgJu-bhPJb2ud"

function buildTemplateParams(values: ContactFormValues) {
  return {
    name: values.name,
    email: values.email,
    phone: values.phone || "দেওয়া হয়নি",
    subject: values.subject,
    message: values.message,
    title: values.subject,
  }
}

function getEmailJsErrorMessage(error: unknown) {
  if (typeof error === "string" && error.trim()) {
    return error
  }

  if (error && typeof error === "object") {
    const record = error as {
      text?: string
      message?: string
      status?: number
    }

    if (typeof record.text === "string" && record.text.trim()) {
      return record.text
    }

    if (typeof record.message === "string" && record.message.trim()) {
      return record.message
    }
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message
  }

  return "মেসেজ পাঠানো যায়নি। কিছুক্ষণ পর আবার চেষ্টা করুন।"
}

export async function sendContactEmail(values: ContactFormValues) {
  try {
    return await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      buildTemplateParams(values),
      { publicKey: EMAILJS_PUBLIC_KEY }
    )
  } catch (error) {
    throw new Error(getEmailJsErrorMessage(error))
  }
}
