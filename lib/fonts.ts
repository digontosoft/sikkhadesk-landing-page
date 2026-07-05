import { Noto_Sans_Bengali } from "next/font/google"

export const fontSans = Noto_Sans_Bengali({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
})
