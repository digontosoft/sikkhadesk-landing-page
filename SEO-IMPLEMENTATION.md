# SikkhaDesk SEO implementation — October 11, 2026

> **Supabase update:** This project now uses Next.js server hosting, not the historical static export. See [current setup and scope](SUPABASE-CONTENT.md). Module pages now have numbered workflows, fictional worked examples, extra questions and live-demo links. The new About page identifies DigontoSoft. The current sitemap has 11 starter routes and discovers published database modules.

The `/admin/` workspace now supports structured module/About editing, unsaved previews, publication, ordering and image uploads. It is noindex, excluded from the sitemap, and uses editor-only APIs. See [ADMIN-CMS.md](ADMIN-CMS.md) for activation and validation: five isolated admin checks passed in addition to the 16 public/content checks. Saves invalidate content caches and mark affected pages/sitemap for refresh.

## Implemented locally

| Area | Change |
| --- | --- |
| Crawl discovery | `robots.txt` permits crawling and advertises the sitemap. Sitemap contains 11 starter routes, discovers published database modules and excludes checkout. |
| Canonicals | Each page points to its own `https://www.sikkhadesk.com/.../` URL. Checkout is `noindex, follow`. |
| Search content | Bangla homepage names the product category and Bangladesh audience. `/en/` provides an English product overview, features, pricing, FAQ and contact details. |
| Detailed pages | Added `/features/fee-management/`, `/features/attendance-management/` and `/features/exam-results/`, with distinct workflows, preparation guidance, demo questions and related links. |
| Language | Existing URLs use Bangla HTML; English landing page uses English HTML. Homepage variants have reciprocal `bn-BD`, `en-BD` and `x-default` alternates. English legal content is explicitly marked `lang="en"`. |
| Entity information | Organization, WebSite and SoftwareApplication JSON-LD on the homepages; breadcrumb JSON-LD on feature, pricing, contact and module pages. No rating schema. |
| Share previews | Created a 1200 × 630 branded Open Graph image and linked it in Open Graph and Twitter metadata. |
| Performance | Prebuilt responsive dashboard WebP variants; smaller institution logos, brand logo and support portrait. Original dashboard: 1,228,935 bytes; 800px variant: 27,880 bytes; 1200px variant: 50,014 bytes. |
| Rendering | Core marketing content starts visible in exported HTML. FAQ uses native disclosures and works without JavaScript. Reduced motion is respected for smooth scrolling and CSS animation. |
| Accuracy | Centralized the confirmed Mymensingh address, Sunday–Thursday 9am–7pm support hours, 14-day trial and Android listing. Removed the public unverified testimonial section and unsupported user-count badges. Source testimonials remain available for verification. |
| Conversion paths | Free demo goes to contact; live demo goes to the demo app; all-features links go to features. Navigation CTAs have link semantics. |
| Pricing | Monthly/yearly units, one-time setup, 15% VAT, first payment and renewal totals are visible. Added plan comparison and integration-cost clarification. Uses the existing checkout calculation. |
| Analytics | Installed GA4 `G-0WRWB3NDCL` after hydration. Analytics is configured only on the production domain, not local previews. Added the website analytics disclosure to the privacy page. |

Public URLs were preserved when existing routes moved into the `(bn)` route group. Separate root layouts give `/` and `/en/` their correct document languages. Navigation between those two layouts loads a new document, as documented by Next.js.

## GA4 events

| Event | Trigger | Meaning |
| --- | --- | --- |
| `generate_lead` | EmailJS reports successful contact-form delivery | Submitted enquiry; custom payload contains only `lead_source: contact_form`. |
| `contact_click` | Phone, email or WhatsApp link clicked | Contact intent, with `contact_method` and `page_path`; does not prove a message or call happened. |
| `demo_click` | Live demo link clicked | Demo intent. |
| `app_download_click` | Google Play link clicked | App listing visit, not an installed app. |
| `begin_checkout` | A valid purchasable plan opens in checkout | Plan ID, billing period, BDT value including setup and VAT. |
| `checkout_step` | Valid institution form progresses to payment | Institution step completed; no institution fields are included. |
| `payment_verification_request` | Checkout opens the verification message in WhatsApp | Verification handoff intent. Does not prove delivery or payment approval. |

The code does not emit `purchase`: payments are manually verified. Custom event payloads exclude names, email addresses, phone numbers, transaction references and uploaded files. Early interactions queue until analytics initialization; analytics errors cannot fail a form submission.

Page views use the Google tag's initial page view and GA4 enhanced history measurement. No extra manual route page views are emitted. To capture client-side navigation, enable **Enhanced measurement → Page views → Page loads and Page changes based on browser history events** in this property's web stream. This avoids adding a second manual page-view implementation. [Google's SPA measurement guide](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications) explains the required account setting.

## Build and verification

Validation completed after connecting Supabase on 11 October 2026: production build and standalone TypeScript checks passed; all 16 content/Playwright checks passed (50.7 seconds), including live public reads, database content validation and page/sitemap comparisons. Lint reported no errors and two existing React Hook Form compatibility warnings in checkout. Layout checks cover 1440px, 1024px and 390px. About and module-example snapshots were visually reviewed. Public reads return three published modules and one About page. Draft/write permissions, Storage URLs and cache refresh after a remote edit have not been independently exercised.

```powershell
npm.cmd ci
npm.cmd run build
npm.cmd run lint
npm.cmd run test:seo
npm.cmd run preview
```

`build` creates the Next.js production build in `.next/`. `preview` runs it on `http://127.0.0.1:4173`; `npm start` uses the default production port. Use Next.js server hosting. The image assets are already generated; run `npm.cmd run optimize:images` when changing the source images.

Playwright uses locally installed Chrome. If Chrome is unavailable, install a Playwright browser and adjust the `channel` option in `playwright.config.ts`. Tests intercept external traffic and mock EmailJS, so they do not send real enquiries, analytics hits or payments. Visual snapshots are stored under `test-results/visual/`.

Checks cover exported content without JavaScript, unique titles, canonicals, language alternates, JSON-LD syntax, image availability, robots/sitemap, checkout noindex, desktop/mobile overflow, responsive images, pricing-to-checkout totals and analytics events for successful and failed enquiries. These are local checks; they do not establish production Core Web Vitals, Google indexing or receipt of events in the GA4 account.

## After deployment

1. Deploy the Next.js production build to Vercel or another Next.js server host. Configure Supabase before building when using database content. Confirm published sitemap URLs, robots, sitemap and the share image return 200. Missing paths must return 404 rather than a homepage with status 200. Do not deploy the old `out/` folder.
2. Keep the HTTPS non-www → www redirect at the hosting/CDN layer. Confirm exported canonical URLs match the final public URLs, and that the CDN/WAF permits the desired search crawlers. `robots.txt` permission cannot override a firewall block.
3. Verify the `sikkhadesk.com` domain property in Search Console. Submit `https://www.sikkhadesk.com/sitemap.xml`. Inspect the homepages and three new module pages using a live test, then request indexing. Check that Google reads the selected canonicals and that checkout is excluded. [Search Console guidance](https://support.google.com/webmasters/answer/10351509) and [URL Inspection](https://support.google.com/webmasters/answer/9012289) cover these steps.
4. Enable the GA4 history setting described above. Use Realtime/DebugView to confirm initial and internal page views and events. Mark `generate_lead` as a key event. Keep contact clicks separately identifiable as intent. [Google's key-event guide](https://support.google.com/analytics/answer/12946393) covers lead measurement. Account configuration and live event receipt have not been verified here.
5. Review organic search queries and landing pages in Search Console. In GA4, compare session source/medium, landing pages and successful enquiries from organic search and identifiable AI referrals. Referral attribution cannot measure AI mentions that produce no visit or visits whose referral is removed.

## Remaining business evidence and growth work

- Verify customer quotes, dates, permission and the basis of any ratings before restoring testimonials. Replace unsupported counts with a dated count derived from actual records. Confirm permission to display the existing institution logos; those assets were optimized, not authenticated.
- Add a real case study with the institution's permission, a named workflow, evidence and measured outcomes. No fictional customers or results were added.
- **Verify the payment accounts before using checkout publicly.** `constants/checkout.ts` still contains the original placeholder-looking bKash and bank account details. They were not replaced with guessed financial details, and no payment was tested.
- Confirm offline sync, encryption, backups, account-change behavior, trial feature access and other operational promises currently stated in the original FAQ/legal text. Those capabilities were not independently audited against the application backend.
- Build institution-specific pages and guides from real product demonstrations and customer questions. Add English module translations when they can provide comparable substance; do not label Bangla module pages as English alternates.
- Maintain an accurate business profile and obtain legitimate relevant citations and editorial links. Outreach, directory submissions and external publishing were not performed.

No changes have been deployed and no Search Console or GA4 account settings have been changed. Search ranking and AI recommendations must be measured after deployment; the code changes alone do not guarantee a top position.
