export type TestimonialColor = "blue" | "emerald" | "amber" | "primary" | "teal"

export interface Testimonial {
  name: string
  role: string
  institution: string
  avatar: string
  color: TestimonialColor
  content: string
  rating: number
  featured?: boolean
}
