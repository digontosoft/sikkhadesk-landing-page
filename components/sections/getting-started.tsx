import { CtaButton } from "@/components/common/cta-button"
import { Section } from "@/components/layout/section"

const steps = [
  {
    title: "ডেমোতে আপনার কাজ দেখুন",
    body: "বর্তমান শিক্ষার্থী, ফি ও পরীক্ষার কাজের প্রয়োজন জানান। লাইভ ডেমোতে সংশ্লিষ্ট মডিউলগুলো দেখুন।",
  },
  {
    title: "১৪ দিনের ফ্রি ট্রায়াল নিন",
    body: "আপনার প্রতিষ্ঠানের প্রয়োজনের সাথে ফিচারগুলো মিলিয়ে দেখুন। সেটআপ ও ব্যবহার নিয়ে প্রশ্ন করুন।",
  },
  {
    title: "শিক্ষার্থীসংখ্যা অনুযায়ী প্ল্যান বেছে নিন",
    body: "মাসিক বা বার্ষিক সাবস্ক্রিপশন, এককালীন সেটআপ ও ভ্যাটসহ মোট খরচ দেখে প্ল্যান নির্বাচন করুন।",
  },
]

export function GettingStarted() {
  return (
    <Section className="bg-muted/20">
      <h2 className="text-center text-2xl/snug font-bold sm:text-3xl/snug">
        SikkhaDesk দিয়ে শুরু করুন
      </h2>
      <ol className="mt-8 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <span className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-primary/10 font-bold text-primary">
              {new Intl.NumberFormat("bn-BD").format(index + 1)}
            </span>
            <h3 className="text-lg font-semibold">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {step.body}
            </p>
          </li>
        ))}
      </ol>
      <div className="mt-8 text-center">
        <CtaButton href="/contact" size="lg">
          ডেমো ও ফ্রি ট্রায়ালের জন্য যোগাযোগ করুন
        </CtaButton>
      </div>
    </Section>
  )
}
