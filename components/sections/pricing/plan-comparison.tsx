import { Section } from "@/components/layout/section"

const rows = [
  ["শিক্ষার্থী, উপস্থিতি, ফি ও পরীক্ষা", "আছে", "আছে", "আছে"],
  ["Android অ্যাপ", "আছে", "আছে", "আছে"],
  ["ওয়েবসাইট", "অন্তর্ভুক্ত নয়", "আছে", "আছে"],
  ["Google Meet-এ সহায়তা", "অন্তর্ভুক্ত নয়", "আছে", "আছে"],
  ["মাল্টি-ব্রাঞ্চ ব্যবস্থাপনা", "অন্তর্ভুক্ত নয়", "অন্তর্ভুক্ত নয়", "আছে"],
  ["এককালীন সেটআপ (ভ্যাটের আগে)", "৳২,০০০", "৳৩,০০০", "৳৫,০০০"],
]

export function PlanComparison() {
  return (
    <Section className="bg-muted/20">
      <h2 className="text-2xl font-bold sm:text-3xl">
        কোন প্ল্যানে কোন সুবিধা
      </h2>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        শিক্ষার্থীসংখ্যা মাসিক মূল্য নির্ধারণ করে। ওয়েবসাইট বা একাধিক শাখা
        পরিচালনার প্রয়োজন অনুযায়ী প্ল্যান বেছে নিন। কাস্টম সুবিধার জন্য আলাদা
        কোটেশন নিন।
      </p>
      <div className="mt-8 overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">
            বেসিক, স্ট্যান্ডার্ড ও প্রিমিয়াম প্ল্যানের সুবিধা তুলনা
          </caption>
          <thead className="bg-muted">
            <tr>
              {["সুবিধা", "বেসিক", "স্ট্যান্ডার্ড", "প্রিমিয়াম"].map(
                (name) => (
                  <th key={name} scope="col" className="p-4 whitespace-nowrap">
                    {name}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, ...values]) => (
              <tr key={label} className="border-t border-border">
                <th scope="row" className="p-4 font-medium">
                  {label}
                </th>
                {values.map((value, index) => (
                  <td key={index} className="p-4">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        বার্ষিক সাবস্ক্রিপশনে ১০% ছাড় রয়েছে। এককালীন সেটআপ শুধু শুরুতে
        প্রযোজ্য। SMS, পেমেন্ট গেটওয়ে বা ডিভাইস ইন্টিগ্রেশনের প্রয়োজন থাকলে
        প্রাপ্যতা ও অতিরিক্ত খরচ আগে নিশ্চিত করুন।
      </p>
    </Section>
  )
}
