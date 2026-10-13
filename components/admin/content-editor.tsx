"use client"

import { useId, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ModuleWorkflow } from "@/components/sections/module-workflow"
import type { EditorDraft } from "@/types/admin"
import type { ProductModule } from "@/types/product-module"
import type { AboutContent } from "@/types/about"

function Field({
  label,
  value,
  onChange,
  multiline = false,
  hint,
  type = "text",
  disabled = false,
}: {
  label: string
  value: string | number
  onChange: (value: string) => void
  multiline?: boolean
  hint?: string
  type?: string
  disabled?: boolean
}) {
  const id = useId()
  return (
    <label className="grid gap-2 text-sm font-medium">
      <span id={`${id}-label`}>{label}</span>
      {multiline ? (
        <Textarea
          aria-labelledby={`${id}-label`}
          aria-describedby={hint ? `${id}-hint` : undefined}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={3}
          className="min-h-24 bg-white"
        />
      ) : (
        <Input
          aria-labelledby={`${id}-label`}
          aria-describedby={hint ? `${id}-hint` : undefined}
          type={type}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={disabled}
          className="h-10 bg-white"
        />
      )}
      {hint && (
        <span
          id={`${id}-hint`}
          className="text-xs leading-relaxed font-normal text-slate-500"
        >
          {hint}
        </span>
      )}
    </label>
  )
}

function Group({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">
      <h3 className="mb-5 text-lg font-semibold">{title}</h3>
      <div className="grid gap-5">{children}</div>
    </section>
  )
}

function ParagraphList({
  title,
  items,
  onChange,
  max = 16,
}: {
  title: string
  items: { title: string; body: string }[]
  onChange: (items: { title: string; body: string }[]) => void
  max?: number
}) {
  return (
    <Group title={title}>
      {items.map((item, index) => (
        <div key={index} className="grid gap-3 rounded-xl bg-slate-50 p-4">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-500">
              Item {index + 1}
            </span>
            <Button
              type="button"
              variant="ghost"
              disabled={items.length === 1}
              onClick={() => onChange(items.filter((_, i) => i !== index))}
            >
              Remove
            </Button>
          </div>
          <Field
            label={`${title} ${index + 1} title`}
            value={item.title}
            onChange={(value) =>
              onChange(
                items.map((row, i) =>
                  i === index ? { ...row, title: value } : row
                )
              )
            }
          />
          <Field
            label={`${title} ${index + 1} body`}
            value={item.body}
            multiline
            onChange={(value) =>
              onChange(
                items.map((row, i) =>
                  i === index ? { ...row, body: value } : row
                )
              )
            }
          />
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="justify-self-start"
        disabled={items.length >= max}
        onClick={() => onChange([...items, { title: "", body: "" }])}
      >
        + Add item
      </Button>
    </Group>
  )
}

function StringList({
  title,
  items,
  onChange,
}: {
  title: string
  items: string[]
  onChange: (items: string[]) => void
}) {
  return (
    <Group title={title}>
      {items.map((item, index) => (
        <div className="flex items-end gap-2" key={index}>
          <div className="min-w-0 flex-1">
            <Field
              label={`${title} ${index + 1}`}
              value={item}
              multiline
              onChange={(value) =>
                onChange(items.map((row, i) => (i === index ? value : row)))
              }
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            disabled={items.length === 1}
            onClick={() => onChange(items.filter((_, i) => i !== index))}
          >
            Remove
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        className="justify-self-start"
        disabled={items.length >= 16}
        onClick={() => onChange([...items, ""])}
      >
        + Add item
      </Button>
    </Group>
  )
}

export function ContentEditor({
  draft,
  onChange,
  onSave,
  onBack,
  saving,
  issues,
}: {
  draft: EditorDraft
  onChange: (draft: EditorDraft) => void
  onSave: () => void
  onBack: () => void
  saving: boolean
  issues: { path: string; message: string }[]
}) {
  const [preview, setPreview] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")
  const content = draft.content
  const setContent = (patch: Record<string, unknown>) =>
    onChange({ ...draft, content: { ...content, ...patch } })
  const moduleContent = content as Omit<ProductModule, "slug">
  const aboutContent = content as AboutContent

  async function upload(file?: File) {
    if (!file) return
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Choose an image no larger than 5 MB.")
      return
    }
    setUploading(true)
    setUploadError("")
    try {
      const response = await fetch("/api/admin/media/", {
        method: "POST",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file,
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Upload failed")
      setContent({
        screenshot: {
          ...result,
          alt: moduleContent.screenshot?.alt ?? "",
          caption: moduleContent.screenshot?.caption ?? "",
        },
      })
    } catch (error) {
      setUploadError(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-w-0">
      <div className="sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/95 p-4 backdrop-blur sm:mx-0 sm:px-0">
        <div>
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            disabled={saving || uploading}
          >
            ← Content library
          </Button>
          <h2 className="mt-2 text-xl font-semibold">
            {draft.kind === "about"
              ? "About page"
              : draft.updated_at
                ? "Edit module"
                : "New module"}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreview(!preview)}
          >
            {preview ? "Back to editor" : "Preview"}
          </Button>
          <Button type="button" disabled={saving || uploading} onClick={onSave}>
            {saving
              ? "Saving…"
              : draft.is_published
                ? "Save & publish"
                : "Save draft"}
          </Button>
        </div>
      </div>
      {issues.length > 0 && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <p className="font-semibold">Check these fields before saving:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {issues.map((issue, index) => (
              <li key={index}>
                {issue.path}: {issue.message}
              </li>
            ))}
          </ul>
        </div>
      )}
      {preview ? (
        <article className="space-y-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-8">
          <p className="text-xs font-semibold tracking-wider text-indigo-600 uppercase">
            Unsaved preview
          </p>
          <h1 className="text-3xl font-bold">{content.title}</h1>
          <p>{content.description}</p>
          {draft.kind === "about" ? (
            <>
              <p>{aboutContent.intro}</p>
              {aboutContent.sections.map((section, index) => (
                <section key={index}>
                  <h2 className="text-xl font-semibold">{section.title}</h2>
                  <p className="mt-2">{section.body}</p>
                </section>
              ))}
            </>
          ) : (
            <>
              <p>{moduleContent.problem}</p>
              {moduleContent.capabilities.map((item, index) => (
                <section key={index}>
                  <h2 className="text-xl font-semibold">{item.title}</h2>
                  <p className="mt-2">{item.body}</p>
                </section>
              ))}
              <ModuleWorkflow
                productModule={{ ...moduleContent, slug: draft.slug }}
              />
              {moduleContent.screenshot && (
                <div>
                  <p className="font-semibold">
                    Screenshot: {moduleContent.screenshot.alt}
                  </p>
                  <a
                    href={moduleContent.screenshot.src}
                    target="_blank"
                    rel="noreferrer"
                    className="break-all text-indigo-600 underline"
                  >
                    View image
                  </a>
                  <p>{moduleContent.screenshot.caption}</p>
                </div>
              )}
              <ul className="list-disc pl-5">
                {moduleContent.preparation.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <p>{moduleContent.demo}</p>
              {moduleContent.questions.map((item, index) => (
                <section key={index}>
                  <h2 className="font-semibold">{item.question}</h2>
                  <p className="mt-2">{item.answer}</p>
                </section>
              ))}
            </>
          )}
        </article>
      ) : (
        <fieldset disabled={saving || uploading} className="grid min-w-0 gap-5">
          <Group title="Publication & URL">
            {draft.kind === "module" && (
              <>
                <Field
                  label="URL slug"
                  value={draft.slug}
                  disabled={!!draft.updated_at}
                  onChange={(value) => onChange({ ...draft, slug: value })}
                  hint="Lowercase English letters, numbers and hyphens. Existing slugs are locked to preserve SEO links."
                />
                <p className="text-xs break-all text-slate-500">
                  /features/{draft.slug || "your-slug"}/
                </p>
                <label className="flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={draft.is_published}
                    onChange={(event) =>
                      onChange({ ...draft, is_published: event.target.checked })
                    }
                    className="mt-1 size-4"
                  />
                  <span>
                    <strong>Publish on the website</strong>
                    <span className="mt-1 block text-slate-500">
                      Checked: Save & publish makes this content public.
                      Unchecked: Save draft removes it from module links,
                      sitemap and its public page.
                    </span>
                  </span>
                </label>
                <Field
                  label="Display order"
                  type="number"
                  value={draft.sort_order}
                  onChange={(value) =>
                    onChange({ ...draft, sort_order: Number(value) })
                  }
                  hint="Smaller numbers appear first."
                />
              </>
            )}
            {draft.kind === "about" && (
              <p className="text-sm text-slate-500">
                About is a permanent page. Saving publishes its updated copy.
              </p>
            )}
            {draft.updated_at && (
              <p className="text-xs text-slate-500">
                Last saved: {new Date(draft.updated_at).toLocaleString()}
              </p>
            )}
          </Group>
          <Group title="Page & SEO copy">
            <Field
              label="Page title"
              value={content.title}
              onChange={(value) => setContent({ title: value })}
            />
            <Field
              label="SEO description"
              value={content.description}
              multiline
              onChange={(value) => setContent({ description: value })}
              hint="Write a useful, specific description. Avoid unsupported claims."
            />
            {draft.kind === "module" ? (
              <>
                <Field
                  label="Short card title"
                  value={moduleContent.shortTitle}
                  onChange={(value) => setContent({ shortTitle: value })}
                />
                <Field
                  label="English module title"
                  value={moduleContent.englishTitle}
                  onChange={(value) => setContent({ englishTitle: value })}
                />
                <Field
                  label="Problem & introduction"
                  value={moduleContent.problem}
                  multiline
                  onChange={(value) => setContent({ problem: value })}
                />
              </>
            ) : (
              <Field
                label="Introduction"
                value={aboutContent.intro}
                multiline
                onChange={(value) => setContent({ intro: value })}
              />
            )}
          </Group>
          {draft.kind === "about" ? (
            <ParagraphList
              title="About sections"
              items={aboutContent.sections}
              max={12}
              onChange={(sections) => setContent({ sections })}
            />
          ) : (
            <>
              <ParagraphList
                title="Capabilities"
                items={moduleContent.capabilities}
                onChange={(capabilities) => setContent({ capabilities })}
              />
              <ParagraphList
                title="Workflow steps"
                items={moduleContent.workflow}
                max={12}
                onChange={(workflow) => setContent({ workflow })}
              />
              <Group title="Worked example">
                <p className="text-sm text-slate-500">
                  Use fictional data. The public page labels this example as
                  fictional.
                </p>
                {(["title", "context", "caption", "takeaway"] as const).map(
                  (key) => (
                    <Field
                      key={key}
                      label={`Example ${key}`}
                      value={moduleContent.example[key]}
                      multiline={key === "context" || key === "takeaway"}
                      onChange={(value) =>
                        setContent({
                          example: { ...moduleContent.example, [key]: value },
                        })
                      }
                    />
                  )
                )}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[32rem] border-separate border-spacing-2">
                    <caption className="mb-3 text-left text-sm font-medium">
                      Example table — edit column headings and cells
                    </caption>
                    <thead>
                      <tr>
                        {moduleContent.example.columns.map((column, index) => (
                          <th key={index}>
                            <Input
                              aria-label={`Column ${index + 1} heading`}
                              value={column}
                              onChange={(event) =>
                                setContent({
                                  example: {
                                    ...moduleContent.example,
                                    columns: moduleContent.example.columns.map(
                                      (value, i) =>
                                        i === index ? event.target.value : value
                                    ),
                                  },
                                })
                              }
                            />
                          </th>
                        ))}
                        <th aria-label="Row controls" />
                      </tr>
                    </thead>
                    <tbody>
                      {moduleContent.example.rows.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                          {row.map((cell, columnIndex) => (
                            <td key={columnIndex}>
                              <Input
                                aria-label={`Row ${rowIndex + 1} column ${columnIndex + 1}`}
                                value={cell}
                                onChange={(event) =>
                                  setContent({
                                    example: {
                                      ...moduleContent.example,
                                      rows: moduleContent.example.rows.map(
                                        (cells, i) =>
                                          i === rowIndex
                                            ? cells.map((value, j) =>
                                                j === columnIndex
                                                  ? event.target.value
                                                  : value
                                              )
                                            : cells
                                      ),
                                    },
                                  })
                                }
                              />
                            </td>
                          ))}
                          <td>
                            <Button
                              type="button"
                              variant="ghost"
                              aria-label={`Remove row ${rowIndex + 1}`}
                              disabled={moduleContent.example.rows.length === 1}
                              onClick={() =>
                                setContent({
                                  example: {
                                    ...moduleContent.example,
                                    rows: moduleContent.example.rows.filter(
                                      (_, i) => i !== rowIndex
                                    ),
                                  },
                                })
                              }
                            >
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={moduleContent.example.rows.length >= 30}
                    onClick={() =>
                      setContent({
                        example: {
                          ...moduleContent.example,
                          rows: [
                            ...moduleContent.example.rows,
                            moduleContent.example.columns.map(() => ""),
                          ],
                        },
                      })
                    }
                  >
                    + Add row
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    disabled={moduleContent.example.columns.length >= 8}
                    onClick={() =>
                      setContent({
                        example: {
                          ...moduleContent.example,
                          columns: [...moduleContent.example.columns, ""],
                          rows: moduleContent.example.rows.map((row) => [
                            ...row,
                            "",
                          ]),
                        },
                      })
                    }
                  >
                    + Add column
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    disabled={moduleContent.example.columns.length <= 2}
                    onClick={() =>
                      setContent({
                        example: {
                          ...moduleContent.example,
                          columns: moduleContent.example.columns.slice(0, -1),
                          rows: moduleContent.example.rows.map((row) =>
                            row.slice(0, -1)
                          ),
                        },
                      })
                    }
                  >
                    Remove last column
                  </Button>
                </div>
              </Group>
              <StringList
                title="Preparation"
                items={moduleContent.preparation}
                onChange={(preparation) => setContent({ preparation })}
              />
              <Group title="Demo guidance">
                <Field
                  label="Demo guidance"
                  value={moduleContent.demo}
                  multiline
                  onChange={(value) => setContent({ demo: value })}
                />
              </Group>
              <ParagraphList
                title="FAQ"
                max={20}
                items={moduleContent.questions.map((item) => ({
                  title: item.question,
                  body: item.answer,
                }))}
                onChange={(items) =>
                  setContent({
                    questions: items.map((item) => ({
                      question: item.title,
                      answer: item.body,
                    })),
                  })
                }
              />
              <Group title="Product screenshot">
                <p className="text-sm text-slate-500">
                  Upload an approved screenshot with demo data. Images are
                  public immediately after upload, even before the page is
                  published. Removing it here detaches the image; Storage
                  retains the file.
                </p>
                <label className="grid gap-2 text-sm font-medium">
                  Upload JPEG, PNG or WebP (up to 5 MB)
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    disabled={uploading}
                    onChange={(event) => {
                      void upload(event.target.files?.[0])
                      event.target.value = ""
                    }}
                    className="w-full min-w-0 rounded-lg border border-slate-200 p-3 text-sm"
                  />
                </label>
                {uploading && <p role="status">Uploading…</p>}
                {uploadError && (
                  <p role="alert" className="text-sm text-red-700">
                    {uploadError}
                  </p>
                )}
                {!moduleContent.screenshot ? (
                  <Button
                    type="button"
                    variant="outline"
                    className="justify-self-start"
                    onClick={() =>
                      setContent({
                        screenshot: {
                          src: "",
                          alt: "",
                          caption: "",
                          width: 1200,
                          height: 800,
                        },
                      })
                    }
                  >
                    Use an existing image URL
                  </Button>
                ) : (
                  <>
                    {(["src", "alt", "caption"] as const).map((key) => (
                      <Field
                        key={key}
                        label={`Screenshot ${key === "src" ? "URL" : key}`}
                        value={moduleContent.screenshot![key]}
                        onChange={(value) =>
                          setContent({
                            screenshot: {
                              ...moduleContent.screenshot,
                              [key]: value,
                            },
                          })
                        }
                      />
                    ))}
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(["width", "height"] as const).map((key) => (
                        <Field
                          key={key}
                          label={`Screenshot ${key}`}
                          value={moduleContent.screenshot![key]}
                          type="number"
                          onChange={(value) =>
                            setContent({
                              screenshot: {
                                ...moduleContent.screenshot,
                                [key]: Number(value),
                              },
                            })
                          }
                        />
                      ))}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      className="justify-self-start"
                      onClick={() => setContent({ screenshot: undefined })}
                    >
                      Remove screenshot from page
                    </Button>
                  </>
                )}
              </Group>
            </>
          )}
        </fieldset>
      )}
    </div>
  )
}
