import { expect, test } from "@playwright/test"

import { aboutContent } from "@/constants/about"
import { productModules } from "@/constants/modules"
import { loadAboutContent, loadProductModules } from "@/lib/supabase-content"

const connection = {
  url: "https://example.supabase.co",
  key: "sb_publishable_test_key",
}

function respond(body: unknown, status = 200): typeof fetch {
  return async () => new Response(JSON.stringify(body), { status })
}

test("local starter content works with no Supabase project", async () => {
  const neverFetch: typeof fetch = async () => {
    throw new Error("Must not fetch")
  }
  expect(await loadProductModules(null, neverFetch)).toEqual(productModules)
  expect(await loadAboutContent(null, neverFetch)).toEqual(aboutContent)
})

test("published database content overrides starter content and excludes drafts", async () => {
  const updated = { ...productModules[0], title: "Supabase থেকে নতুন ফি মডিউল" }
  let requested = ""
  let requestHeaders: Headers | undefined
  const fetcher: typeof fetch = async (input, init) => {
    requested = String(input)
    requestHeaders = new Headers(init?.headers)
    return new Response(
      JSON.stringify([
        { slug: "fee-management", content: updated, is_published: true },
        { slug: "draft-module", content: updated, is_published: false },
      ])
    )
  }
  const result = await loadProductModules(connection, fetcher)
  expect(result.map((module) => module.slug)).toEqual(["fee-management"])
  expect(result[0].title).toBe(updated.title)
  expect(new URL(requested).searchParams.get("is_published")).toBe("eq.true")
  expect(requestHeaders?.get("apikey")).toBe(connection.key)
  expect(requestHeaders?.has("Authorization")).toBe(false)
})

test("unpublished modules stay absent and malformed examples cannot render", async () => {
  expect(await loadProductModules(connection, respond([]))).toEqual([])
  const invalid = {
    ...productModules[0],
    example: { ...productModules[0].example, rows: [["০৭"]] },
  }
  expect(
    await loadProductModules(
      connection,
      respond([
        { slug: "fee-management", content: invalid, is_published: true },
      ])
    )
  ).toEqual([])
})

test("network and API failures preserve the public starter pages", async () => {
  const failed: typeof fetch = async () => {
    throw new Error("Network failure")
  }
  expect(await loadProductModules(connection, failed)).toEqual(productModules)
  expect(
    await loadAboutContent(connection, respond({ error: "Unavailable" }, 503))
  ).toEqual(aboutContent)
})

test("About content reads published data and rejects invalid content", async () => {
  const content = {
    ...aboutContent,
    intro: "ডাটাবেসে সংরক্ষিত প্রতিষ্ঠান পরিচিতি।",
  }
  expect(
    await loadAboutContent(
      connection,
      respond([{ slug: "about", content, is_published: true }])
    )
  ).toEqual(content)
  expect(
    await loadAboutContent(
      connection,
      respond([
        { slug: "about", content: { title: "Incomplete" }, is_published: true },
      ])
    )
  ).toEqual(aboutContent)
})

test("screenshots reject unsafe URLs and keep validated dimensions and labels", async () => {
  const screenshot = {
    src: "https://example.supabase.co/storage/v1/object/public/landing-media/fees.webp",
    alt: "ফি মডিউল",
    caption: "ডেমো তথ্যের ফি স্ক্রিন",
    width: 1200,
    height: 800,
  }
  const content = { ...productModules[0], screenshot }
  const row = { slug: "fee-management", content, is_published: true }
  expect(
    (await loadProductModules(connection, respond([row])))[0].screenshot
  ).toEqual(screenshot)
  expect(
    await loadProductModules(
      connection,
      respond([
        {
          ...row,
          content: {
            ...content,
            screenshot: { ...screenshot, src: "javascript:alert(1)" },
          },
        },
      ])
    )
  ).toEqual([])
})
