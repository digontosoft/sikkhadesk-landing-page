# Supabase landing-page content

## Scope and deployment

The three module pages and About copy can read published content from Supabase. Module titles, descriptions, capabilities, workflows, fictional examples, FAQ and optional screenshots are editable. Homepage/feature-page module links and the sitemap use the same source. DigontoSoft is the confirmed operator. Contact details, pricing, checkout and other homepage sections remain in their existing constants.

Local `.env.local` targets the user-provided Supabase project with a publishable key. On 11 October 2026, the project owner ran the supplied setup SQL. Subsequent live read-only checks succeeded: the public key can read three published modules and one published About page. A production build with these settings succeeded without content-service fallback warnings. Worked examples are explicitly fictional; no customer results, team identities, screenshots or videos were invented.

The project now uses **Next.js server hosting**, as requested. `npm run build` creates `.next/`; `npm start` runs the production server. Deploy to Vercel or another host supporting Next.js Node/ISR. The old `out/` export and `scripts/serve-export.mjs` are historical artifacts. Do not upload `out/` as the current deployment.

## Connect Supabase

For a new setup, open [supabase/setup.sql](supabase/setup.sql), copy its complete contents into the intended project's SQL Editor and run it. This generated file combines the schema and starter seed in one transaction, preserves existing content rows, enables published-only public reads and creates the marketing screenshot bucket. It contains no API keys. The owner completed this step for the current project. Use `npm run content:check` to verify live reads. That check does not filter by publication: it also fails if any unpublished row is returned to the public key. An absence of returned drafts alone does not prove all database policies; inspect them in the Dashboard too.

1. Choose a Supabase project and run [the schema migration](supabase/migrations/202610110001_landing_content.sql) in its SQL Editor, or apply it through your migration workflow.
2. Run [the starter seed](supabase/seed.sql) after the schema. It inserts three modules and About copy while preserving existing rows. `npm run content:seed` regenerates this local SQL file from the constants; it makes no network requests.
3. Copy `.env.example` to `.env.local`. Set `SUPABASE_URL` to the HTTPS project URL and `SUPABASE_PUBLISHABLE_KEY` to its publishable key. A legacy `anon` JWT also works in that field. Secret and `service_role` keys are rejected. Both settings are read only on the server.
4. Set these variables in the hosting environment **before building/deploying**. Run `npm run build`, then `npm run preview` to check production at `http://127.0.0.1:4173`.
5. Use the project's trusted Table Editor to edit the JSON `content` column. Use `is_published` for publication and `sort_order` for module-link ordering. New valid published module slugs get `/features/<slug>/` routes and sitemap entries without a new route file.

An in-app admin workspace is available at `/admin/`; see [ADMIN-CMS.md](ADMIN-CMS.md) for account activation and editor policies. It supports structured module/About forms, unsaved previews, module drafts/publication, ordering and screenshot uploads. The Supabase Dashboard remains available to trusted project administrators. Keep new material as a draft until it is accurate and ready to publish.

The integration uses Supabase's REST Data API through Next's server `fetch`, keeping content reads in the Next cache without a browser SDK. Published reads use a restricted public key and Row Level Security. [Supabase security guidance](https://supabase.com/docs/guides/database/secure-data).

## Data format

Module JSON follows [ProductModule](types/product-module.ts), with the slug taken from the database row. The generated seed is a complete example. Required fields:

```text
title, shortTitle, englishTitle, description, problem
capabilities: [{ title, body }]
workflow: [{ title, body }]
example: { title, context, caption, columns, rows, takeaway }
preparation: [text]
demo: text
questions: [{ question, answer }]
```

Example rows must match the number of columns and have unique first cells. Every example has a visible fictional-data disclaimer. Optional real product screenshots use:

```json
{
  "screenshot": {
    "src": "https://YOUR_PROJECT.supabase.co/storage/v1/object/public/landing-media/fees.webp",
    "alt": "SikkhaDesk-এর ফি সংগ্রহের স্ক্রিন",
    "caption": "ফি মডিউল — ডেমো তথ্য ব্যবহার করা হয়েছে।",
    "width": 1200,
    "height": 800
  }
}
```

Merge this property into existing module content; retain all required fields. Upload an approved real image to Storage > `landing-media`, use its public URL, and enter its actual dimensions. The bucket accepts JPEG/PNG/WebP up to 5 MB. No assets have been uploaded. Public assets remain accessible when a module is unpublished; remove an asset separately when it must cease to be public. Never upload real student/payment records.

About uses `landing_pages` with slug `about`. Its JSON follows [AboutContent](types/about.ts): title, description, intro and sections of title/body. The factual operator/contact block remains centralized in `constants/site.ts`.

React renders the content as text; it is not executed as HTML. Validation rejects missing fields, mismatched table rows, unsafe screenshot protocols and unreasonable dimensions. Content edits still need human verification of product and business claims.

## Refresh and availability

Database reads, module/About pages and sitemap use a **300-second revalidation interval** for direct Dashboard edits. Updates become eligible for refresh after that period when pages receive traffic; stale-while-revalidate can serve the previous version on the first request. Saves through the app admin expire tagged data and mark affected public pages and sitemap for refresh on the next visit. New module routes render on demand and check publication status.

Without valid settings, or when a database request fails, modules use the local public starter content. Only generic warnings are logged. This fallback can restore a starter module during an outage even if its database row was unpublished; it never reveals remote draft content.

A successful empty module query remains empty. Invalid individual published modules are skipped and their routes return 404. About is permanent and uses confirmed starter copy when its published override is missing, invalid or unavailable. Seed empty tables before expecting the default modules to appear.

The initial schema enables RLS and public SELECT access to published rows only. The admin increment adds a private UUID allowlist and RLS policies allowing approved Auth users to read drafts, create modules, edit content/publication/order and upload marketing screenshots. Other authenticated users retain published-only reads and cannot write. The app uses no elevated database key. The owner completed the initial content setup; see ADMIN-CMS.md for activation of the additional admin policies. No real admin password is used in automated tests.

## Verification

```powershell
npm.cmd run build
npm.cmd run content:check
npm.cmd run lint
npm.cmd run test:seo
npm.cmd run preview
```

Tests cover starter fallback, published overrides, draft exclusion, empty publication lists, malformed content, network/API failures, screenshot validation, crawlable page content, metadata, sitemap, responsive layouts, pricing and conversion behavior. When `.env.local` contains a connection, an additional read-only live test validates database content using the app's schemas and compares it with page headings and sitemap entries without JavaScript. It skips when no project is configured. Storage URLs, draft/write permissions and cache refresh after a remote edit have not been independently exercised.

Verification on 11 October 2026 after connecting the project: production build and standalone TypeScript checks passed; all 16 tests passed (50.7 seconds), including the live Supabase-to-page/sitemap test. Lint has zero errors and two existing checkout warnings. Browser checks cover desktop, tablet and mobile widths. The final browser test run exited successfully.
