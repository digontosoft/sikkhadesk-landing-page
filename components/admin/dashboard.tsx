"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import {
  FileText,
  LayoutDashboard,
  LogOut,
  Plus,
  ShieldCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ContentEditor } from "@/components/admin/content-editor"
import { productModules } from "@/constants/modules"
import { aboutContent } from "@/constants/about"
import { editorSaveSchema } from "@/lib/admin-validation"
import type { ContentIndex, EditorDraft } from "@/types/admin"

interface User {
  email: string
}
interface Issue {
  path: string
  message: string
}

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [index, setIndex] = useState<ContentIndex | null>(null)
  const [draft, setDraft] = useState<EditorDraft | null>(null)
  const [dirty, setDirty] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [issues, setIssues] = useState<Issue[]>([])
  const [search, setSearch] = useState("")

  const loadContent = useCallback(async () => {
    const response = await fetch("/api/admin/content/", { cache: "no-store" })
    const result = await response.json()
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        setUser(null)
        setIndex(null)
      }
      throw new Error(result.error || "Unable to load content")
    }
    setIndex(result)
  }, [])

  useEffect(() => {
    let active = true
    void (async () => {
      try {
        const response = await fetch("/api/admin/session/", {
          cache: "no-store",
        })
        const result = await response.json()
        if (!active) return
        if (response.ok) {
          setUser(result.user)
          await loadContent()
        } else if (response.status !== 401) setError(result.error)
      } catch (failure) {
        if (active)
          setError(
            failure instanceof Error ? failure.message : "Unable to connect"
          )
      } finally {
        if (active) setLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [loadContent])

  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty) {
        event.preventDefault()
        event.returnValue = ""
      }
    }
    window.addEventListener("beforeunload", warn)
    return () => window.removeEventListener("beforeunload", warn)
  }, [dirty])

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setBusy(true)
    setError("")
    const form = event.currentTarget
    const values = new FormData(form)
    try {
      const response = await fetch("/api/admin/session/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.get("email"),
          password: values.get("password"),
        }),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Sign-in failed")
      form.reset()
      setUser(result.user)
      await loadContent()
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Sign-in failed")
    } finally {
      setBusy(false)
    }
  }

  function open(next: EditorDraft) {
    if (dirty && !window.confirm("Discard unsaved changes?")) return
    setDraft(structuredClone(next))
    setDirty(false)
    setIssues([])
    setError("")
    setMessage("")
    window.scrollTo({ top: 0 })
  }

  async function save() {
    if (!draft) return
    setIssues([])
    setError("")
    setMessage("")
    const validated = editorSaveSchema.safeParse(draft)
    if (!validated.success) {
      setIssues(
        validated.error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }))
      )
      return
    }
    setBusy(true)
    try {
      const response = await fetch("/api/admin/content/", {
        method: draft.updated_at ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      })
      const result = await response.json()
      if (!response.ok) {
        if (result.issues) setIssues(result.issues)
        throw new Error(result.error || "Save failed")
      }
      setDraft({ ...draft, ...result.record })
      setDirty(false)
      setMessage(
        draft.is_published
          ? "Saved and published. Website content refreshes on the next visit."
          : "Draft saved. This module is hidden from the website."
      )
      await loadContent()
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Save failed")
    } finally {
      setBusy(false)
    }
  }

  async function logout() {
    if (dirty && !window.confirm("Discard unsaved changes and sign out?"))
      return
    setBusy(true)
    setError("")
    try {
      const response = await fetch("/api/admin/session/", { method: "DELETE" })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Sign-out failed")
      setUser(null)
      setIndex(null)
      setDraft(null)
      setDirty(false)
      setMessage("")
      if (!result.sessionRevoked)
        setError(
          "Signed out locally. The remote session could not be revoked; manage sessions in Supabase if needed."
        )
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Sign-out failed")
    } finally {
      setBusy(false)
    }
  }

  if (loading)
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 text-slate-700">
        <p role="status">Loading content workspace…</p>
      </main>
    )

  if (!user)
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-5 text-slate-900">
        <div className="w-full max-w-md">
          <Link href="/" className="mb-8 inline-block text-sm text-slate-500">
            ← SikkhaDesk website
          </Link>
          <section className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-9">
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ShieldCheck size={25} />
            </div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
              SikkhaDesk workspace
            </p>
            <h1 className="mt-3 text-2xl font-bold">Content admin</h1>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              Sign in with your approved editor account to manage module pages
              and About content.
            </p>
            <form onSubmit={login} className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-medium">
                Email
                <Input
                  name="email"
                  type="email"
                  autoComplete="username"
                  required
                  className="h-11"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Password
                <Input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="h-11"
                />
              </label>
              {error && (
                <p
                  role="alert"
                  className="text-sm leading-relaxed text-red-700"
                >
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy} size="lg">
                {busy ? "Signing in…" : "Sign in"}
              </Button>
            </form>
            <p className="mt-6 text-xs leading-relaxed text-slate-500">
              Access is approved by the project owner. Account and password
              setup are managed in Supabase.
            </p>
          </section>
        </div>
      </main>
    )

  const modules = index?.modules ?? []
  const filtered = modules.filter((row) =>
    `${row.slug} ${row.content.title} ${row.content.englishTitle}`
      .toLowerCase()
      .includes(search.toLowerCase())
  )
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-5">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-indigo-600 text-white">
              <LayoutDashboard size={21} />
            </span>
            <div>
              <p className="font-bold">SikkhaDesk</p>
              <p className="text-xs text-slate-500">Content workspace</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="max-w-[16rem] truncate text-xs text-slate-500">
              {user.email}
            </span>
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-indigo-600"
            >
              View website ↗
            </a>
            <Button variant="outline" disabled={busy} onClick={logout}>
              <LogOut size={15} /> Sign out
            </Button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-9">
        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
          >
            {error}
          </div>
        )}
        {message && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
          >
            {message}
          </div>
        )}
        {draft ? (
          <ContentEditor
            draft={draft}
            saving={busy}
            issues={issues}
            onChange={(next) => {
              setDraft(next)
              setDirty(true)
            }}
            onSave={save}
            onBack={() => {
              if (!dirty || window.confirm("Discard unsaved changes?")) {
                setDraft(null)
                setDirty(false)
                setIssues([])
              }
            }}
          />
        ) : (
          <>
            <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase">
                  Website content
                </p>
                <h1 className="mt-2 text-3xl font-bold">Content library</h1>
                <p className="mt-3 text-sm text-slate-500">
                  Edit page copy, workflows, examples and FAQs. Preview before
                  publishing.
                </p>
              </div>
              <Button
                size="lg"
                onClick={() => {
                  const { slug: _slug, ...template } = productModules[0]
                  void _slug
                  open({
                    kind: "module",
                    slug: "",
                    content: template,
                    is_published: false,
                    sort_order: modules.length,
                    updated_at: null,
                  })
                }}
              >
                <Plus size={18} /> New module
              </Button>
            </div>
            <div className="mb-7 grid gap-4 sm:grid-cols-3">
              {[
                ["Modules", modules.length],
                ["Published", modules.filter((row) => row.is_published).length],
                ["Drafts", modules.filter((row) => !row.is_published).length],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-slate-200 bg-white p-5"
                >
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold">{value}</p>
                </div>
              ))}
            </div>
            <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex gap-3">
                  <FileText className="mt-1 text-indigo-600" size={22} />
                  <div>
                    <h2 className="font-semibold">
                      About DigontoSoft & SikkhaDesk
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Company introduction and About page SEO copy
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() =>
                    open({
                      kind: "about",
                      ...(index?.about ?? {
                        slug: "about",
                        content: aboutContent,
                        is_published: true,
                        sort_order: 0,
                        updated_at: null,
                      }),
                      is_published: true,
                    })
                  }
                >
                  Edit About
                </Button>
              </div>
            </section>
            <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold">Module pages</h2>
                <Input
                  aria-label="Search modules"
                  placeholder="Search title or slug…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="max-w-sm"
                />
              </div>
              <div className="grid gap-3">
                {filtered.map((row) => (
                  <div
                    key={row.slug}
                    className="flex flex-col items-stretch justify-between gap-4 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold">{row.content.title}</h3>
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${row.is_published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}
                        >
                          {row.is_published ? "Published" : "Draft"}
                        </span>
                      </div>
                      <p className="mt-2 text-xs break-all text-slate-500">
                        /features/{row.slug}/ · Order {row.sort_order}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="self-start sm:self-auto"
                      onClick={() => open({ kind: "module", ...row })}
                    >
                      Edit {row.content.englishTitle}
                    </Button>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <p className="py-8 text-center text-sm text-slate-500">
                    {index
                      ? "No modules match this view."
                      : "Content has not loaded."}
                  </p>
                )}
              </div>
              <Button
                variant="ghost"
                className="mt-5"
                onClick={() => {
                  setError("")
                  void loadContent().catch((failure) =>
                    setError(failure.message)
                  )
                }}
              >
                Reload content
              </Button>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
