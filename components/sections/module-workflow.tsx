import type { ProductModule } from "@/types/product-module"
import { cn } from "@/lib/utils"

export function ModuleWorkflow({
  productModule,
}: {
  productModule: ProductModule
}) {
  const { workflow, example } = productModule

  return (
    <>
      <section
        id="workflow"
        className="scroll-mt-24"
        aria-labelledby="workflow-title"
      >
        <h2 id="workflow-title" className="text-2xl font-bold">
          ধাপে ধাপে কাজের পদ্ধতি
        </h2>
        <ol className="mt-6 grid gap-5 md:grid-cols-2">
          {workflow.map((step, index) => (
            <li
              key={step.title}
              className="rounded-2xl border border-border bg-card p-6"
            >
              <span
                className="mb-4 inline-flex size-9 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary"
                aria-hidden="true"
              >
                {new Intl.NumberFormat("bn-BD").format(index + 1)}
              </span>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="example"
        className="scroll-mt-24"
        aria-labelledby="example-title"
      >
        <h2 id="example-title" className="text-2xl font-bold">
          {example.title}
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {example.context}
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          বোঝার সুবিধার জন্য কাল্পনিক তথ্য দেখানো হয়েছে। এটি সফটওয়্যারের
          স্ক্রিনশট বা আসল রিপোর্ট নয়।
        </p>
        {example.columns.length > 3 && (
          <p className="mt-4 text-xs text-muted-foreground sm:hidden">
            সব কলাম দেখতে টেবিলটি পাশে স্ক্রল করুন →
          </p>
        )}
        <div
          className="mt-6 overflow-x-auto rounded-2xl border border-border focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          role="region"
          aria-label={example.caption}
          tabIndex={0}
        >
          <table
            className={cn(
              "w-full border-collapse text-left text-sm",
              example.columns.length > 3 && "min-w-[36rem]"
            )}
          >
            <caption className="border-b border-border bg-card px-5 py-4 text-left font-semibold">
              {example.caption}
            </caption>
            <thead className="bg-primary/5">
              <tr>
                {example.columns.map((column) => (
                  <th
                    key={column}
                    scope="col"
                    className="px-5 py-4 font-semibold"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {example.rows.map((row) => (
                <tr key={row[0]}>
                  <th scope="row" className="px-5 py-4 font-medium">
                    {row[0]}
                  </th>
                  {row.slice(1).map((cell, index) => (
                    <td
                      key={example.columns[index + 1]}
                      className="px-5 py-4 text-muted-foreground"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-5 max-w-3xl leading-relaxed text-muted-foreground">
          {example.takeaway}
        </p>
      </section>
    </>
  )
}
