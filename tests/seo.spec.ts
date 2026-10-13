import { expect, test, type Page } from "@playwright/test"
import { mkdir } from "node:fs/promises"

declare global {
  interface Window {
    testEvents?: unknown[][]
  }
}

const routes = [
  "/",
  "/en/",
  "/features/",
  "/features/student-management/",
  "/features/fee-management/",
  "/features/attendance-management/",
  "/features/exam-results/",
  "/pricing/",
  "/contact/",
  "/about/",
  "/blog/",
  "/blog/school-management-software-buying-checklist/",
  "/privacy-policy/",
  "/terms/",
]

test.beforeEach(async ({ context }) => {
  // Tests never send analytics, messages or payment data to an external service.
  await context.route("**/*", (route) => {
    const hostname = new URL(route.request().url()).hostname
    return hostname === "127.0.0.1" ? route.continue() : route.abort()
  })
})

test("server pages expose content, language, metadata and valid structured data without JavaScript", async ({
  browser,
  request,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false })
  const page = await context.newPage()
  const titles = new Set<string>()
  for (const path of routes) {
    const response = await page.goto(`http://127.0.0.1:4173${path}`)
    expect(response?.status(), path).toBe(200)
    await expect(page.locator("h1"), path).toHaveCount(1)
    await expect(page.locator("h1"), path).toBeVisible()
    await expect(page.locator("html"), path).toHaveAttribute(
      "lang",
      path === "/en/" ? "en" : "bn"
    )
    await expect(page.locator('link[rel="canonical"]'), path).toHaveCount(1)
    await expect(page.locator('link[rel="canonical"]'), path).toHaveAttribute(
      "href",
      `https://www.sikkhadesk.com${path}`
    )
    await expect(page.locator('meta[name="robots"]'), path).toHaveAttribute(
      "content",
      "index, follow"
    )
    expect(
      await page.locator('meta[name="description"]').getAttribute("content")
    ).toBeTruthy()
    if (path.startsWith("/features/") && path !== "/features/") {
      await expect(
        page.getByRole("heading", { name: "ধাপে ধাপে কাজের পদ্ধতি" })
      ).toBeVisible()
      await expect(page.getByRole("table")).toHaveCount(1)
      await expect(
        page.getByText("এটি সফটওয়্যারের স্ক্রিনশট বা আসল রিপোর্ট নয়।", {
          exact: false,
        })
      ).toBeVisible()
      await page.getByRole("link", { name: "কাজের উদাহরণ দেখুন ↓" }).click()
      await expect(page.locator("#example")).toBeInViewport()
    }
    const title = await page.title()
    expect(titles.has(title), `duplicate title: ${title}`).toBe(false)
    titles.add(title)
    for (const json of await page
      .locator('script[type="application/ld+json"]')
      .allTextContents()) {
      const value = JSON.parse(json)
      expect(value["@context"]).toBe("https://schema.org")
      expect(json).not.toContain("AggregateRating")
    }
    const brokenImages = await page
      .locator("img")
      .evaluateAll((images: HTMLImageElement[]) =>
        images
          .filter(
            (image) =>
              image.loading !== "lazy" &&
              (!image.complete || image.naturalWidth === 0)
          )
          .map((image) => image.src)
      )
    expect(brokenImages, path).toEqual([])
    for (const source of new Set(
      await page
        .locator("img")
        .evaluateAll((images: HTMLImageElement[]) => images.map((image) => image.src))
    )) {
      expect((await request.get(source)).status(), source).toBe(200)
    }
  }
  await page.goto("http://127.0.0.1:4173/")
  await expect(page.locator('link[hreflang="en-BD"]')).toHaveAttribute(
    "href",
    "https://www.sikkhadesk.com/en/"
  )
  await expect(page.locator("#testimonials")).toHaveCount(0)
  await page.getByText("ফ্রি ট্রায়াল আছে কি?", { exact: true }).click()
  await expect(
    page.getByText(/হ্যাঁ, প্রতিটি প্ল্যানের সাথে ১৪ দিনের/)
  ).toBeVisible()
  await page.goto("http://127.0.0.1:4173/en/")
  await expect(page.locator('link[hreflang="bn-BD"]')).toHaveAttribute(
    "href",
    "https://www.sikkhadesk.com/"
  )
  await context.close()
})

test("sitemap and robots allow discovery and exclude checkout from indexing", async ({
  request,
  page,
}) => {
  const robots = await request.get("/robots.txt")
  expect(robots.status()).toBe(200)
  expect(await robots.text()).toContain("User-Agent: *")
  expect(await robots.text()).toContain("Allow: /")
  expect(await robots.text()).toContain(
    "Sitemap: https://www.sikkhadesk.com/sitemap.xml"
  )
  const sitemap = await request.get("/sitemap.xml")
  expect(sitemap.status()).toBe(200)
  const xml = await sitemap.text()
  for (const path of routes)
    expect(xml).toContain(`<loc>https://www.sikkhadesk.com${path}</loc>`)
  expect(xml).not.toContain("/checkout")
  await page.goto("/checkout/?plan=basic&range=0&billing=monthly")
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow"
  )
})

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 1024, height: 900 },
  { width: 390, height: 844 },
]) {
  test(`layout and images fit a ${viewport.width}px viewport`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    await mkdir("test-results/visual", { recursive: true })
    for (const path of [
      "/",
      "/en/",
      "/features/student-management/",
      "/features/fee-management/",
      "/features/attendance-management/",
      "/features/exam-results/",
      "/pricing/",
      "/contact/",
      "/about/",
    ]) {
      await page.goto(path)
      await expect(page.locator("h1")).toBeVisible()
      await page.evaluate(() => document.fonts.ready)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth + 1
        ),
        path
      ).toBe(true)
      await page.screenshot({
        path: `test-results/visual/${path.replaceAll("/", "-") || "home"}-${viewport.width}.png`,
      })
      if (path.startsWith("/features/") && path !== "/features/") {
        await page.locator("#example").screenshot({
          path: `test-results/visual/example${path.replaceAll("/", "-")}-${viewport.width}.png`,
        })
      }
    }
    await page.goto("/")
    expect(
      await page
        .locator('img[fetchpriority="high"]')
        .evaluate((image: HTMLImageElement) => image.currentSrc)
    ).toContain(".webp")
    await expect(
      page.getByRole("link", { name: "ফ্রি ডেমো নিন" }).first()
    ).toHaveAttribute("href", "/contact/")
    expect(errors).toEqual([])
  })
}

test("monthly and annual prices match checkout totals", async ({ page }) => {
  await page.goto("/pricing/")
  const card = page
    .locator("div")
    .filter({
      has: page.getByRole("heading", { name: "বেসিক প্ল্যান", exact: true }),
    })
    .filter({ hasText: "শুরুতে মোট:" })
    .last()
  await expect(card).toContainText("শুরুতে মোট: ৳২,৮৭৫")
  await page.getByRole("button", { name: /Yearly/ }).click()
  await expect(card).toContainText("শুরুতে মোট: ৳৮,৫১০")
  await card.getByRole("button", { name: /১৫১ - ৩০০ জন/ }).click()
  await expect(card).toContainText("শুরুতে মোট: ৳১২,২৩৬")
  const link = card.getByRole("link", {
    name: "এই প্ল্যান নির্বাচন করুন",
    exact: true,
  })
  await expect(link).toHaveAttribute(
    "href",
    "/checkout/?plan=basic&range=1&billing=yearly"
  )
  await link.click()
  await expect(page).toHaveURL(/plan=basic&range=1&billing=yearly/)
  await expect(page.getByText("১২,২৩৬", { exact: false }).first()).toBeVisible()
})

test("contact clicks and checkout starts emit distinct analytics events", async ({
  page,
}) => {
  await page.goto("/en/")
  await page.waitForFunction(() => !!document.getElementById("sikkhadesk-ga4"))
  expect(await page.evaluate(() => window.gtag)).toBeUndefined()
  await page.evaluate(() => {
    window.gtag = (...args: unknown[]) => {
      ;(window.testEvents ??= []).push(args)
    }
    document.addEventListener(
      "click",
      (event) => {
        if ((event.target as Element)?.closest('a[href^="https://wa.me"]'))
          event.preventDefault()
      },
      true
    )
  })
  await page
    .getByRole("link", { name: "Contact us on WhatsApp ↗", exact: true })
    .click()
  expect(
    await page.evaluate(
      () => window.testEvents
    )
  ).toEqual([
    [
      "event",
      "contact_click",
      { page_path: "/en/", contact_method: "whatsapp" },
    ],
  ])
  await page.goto("/pricing/")
  await page.evaluate(() => {
    window.gtag = (...args: unknown[]) => {
      ;(window.testEvents ??= []).push(args)
    }
  })
  await page
    .getByRole("link", { name: "এই প্ল্যান নির্বাচন করুন", exact: true })
    .first()
    .click()
  await expect
    .poll(() =>
      page.evaluate(
        () => window.testEvents
      )
    )
    .toContainEqual([
      "event",
      "begin_checkout",
      {
        plan_id: "basic",
        billing_period: "monthly",
        currency: "BDT",
        value: 2875,
      },
    ])
})

async function fillEnquiry(page: Page) {
  await page.getByLabel("আপনার নাম").fill("SEO Test")
  await page.getByLabel("ইমেইল ঠিকানা").fill("seo-test@example.com")
  await page.getByRole("combobox").click()
  await page.getByRole("option", { name: "ডেমো অনুরোধ", exact: true }).click()
  await page
    .getByLabel("বার্তা")
    .fill("Automated enquiry test, intercepted locally.")
}

test("a lead is recorded only after a successful enquiry, without personal form fields", async ({
  page,
  context,
}) => {
  await context.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({ status: 200, contentType: "text/plain", body: "OK" })
  )
  await page.goto("/contact/")
  await page.evaluate(() => {
    window.gtag = (...args: unknown[]) => {
      ;(window.testEvents ??= []).push(args)
    }
  })
  await fillEnquiry(page)
  await page.getByRole("button", { name: "মেসেজ পাঠান", exact: true }).click()
  await expect
    .poll(() =>
      page.evaluate(
        () => window.testEvents ?? []
      )
    )
    .toEqual([["event", "generate_lead", { lead_source: "contact_form" }]])
})

test("a failed enquiry does not count as a lead", async ({ page, context }) => {
  await context.route("https://api.emailjs.com/**", (route) =>
    route.fulfill({
      status: 400,
      contentType: "text/plain",
      body: "Mock submission failure",
    })
  )
  await page.goto("/contact/")
  await page.evaluate(() => {
    window.gtag = (...args: unknown[]) => {
      ;(window.testEvents ??= []).push(args)
    }
  })
  await fillEnquiry(page)
  await page.getByRole("button", { name: "মেসেজ পাঠান", exact: true }).click()
  await expect(
    page.getByText("Mock submission failure", { exact: true })
  ).toBeVisible()
  expect(
    await page.evaluate(
      () => window.testEvents ?? []
    )
  ).toEqual([])
})
