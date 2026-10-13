# SikkhaDesk content admin

Open `/admin/` to sign in and edit module pages and About content. Structured forms support page titles/descriptions, card titles, capabilities, numbered workflows, fictional example tables, preparation notes, demo guidance, FAQs, screenshot metadata and image upload. Create modules as drafts, preview unsaved content, set display order and publish/unpublish modules. Existing URL slugs remain locked. About remains a permanent published page. No hard-delete action is exposed.

## Activate the requested account

1. In Supabase **Authentication → Users**, create the user `sikkhadesk@gmail.com` with a password you choose privately and ensure the email is confirmed. If this confirmed user already exists, reuse it. Your Supabase Dashboard login account is separate from the project's Auth users. Do not send the password in chat.
2. In the project's SQL Editor, run the complete [admin-setup.sql](supabase/admin-setup.sql). It adds editor-only RLS policies and allowlists this confirmed Auth user's UUID. If the account does not exist or is unconfirmed, the entire transaction fails before changes are applied. Running it again preserves existing content.
3. Run `npm run build`, then `npm run preview` and open `http://127.0.0.1:4173/admin/`. Sign in using the requested project's Auth email and password. Hosting needs the existing Supabase URL and publishable key; no elevated database key is required.

The owner confirmed creation/confirmation of the requested user and successful execution of the admin setup on 11 October 2026. A live read-only check confirmed that the admin permission function exists and rejects execution by the public role. Sign in privately through the app to verify the actual account; no real password has been shared or used in automated tests.

`node scripts/generate-admin-setup.mjs` regenerates the combined admin setup from the migration. Apply this increment after the initial landing-content setup. Do not rerun the old initial `supabase/setup.sql` afterward: it resets authenticated grants to read-only. Additional editors can only be approved by the project owner through SQL against `landing_private.editors`; the app cannot grant itself editor access. `npm run content:check -- --admin` checks public content reads and the restricted permission function without exposing the key.

## Publication and images

Save & publish changes the public website. Save draft hides a module from its URL, module links and sitemap. The current public fallback can restore a starter module during a Supabase outage; unpublication is not guaranteed during an outage. Draft copy from Supabase is never used as fallback. About has no unpublish operation because it uses a permanent confirmed starter fallback.

Saving expires tagged content reads and marks the homepage, module pages, feature index, About and sitemap for refresh on their next visit. Separate edits through the Supabase Dashboard retain the existing 300-second revalidation interval. Concurrent edits are checked using `updated_at`: stale updates return a conflict and preserve the form so the editor can copy their changes before reloading.

Images are restricted to JPEG, PNG and WebP, up to 5 MB and 32 million pixels. The server verifies and converts them to WebP, removes embedded metadata, and uses random filenames. Upload grants are restricted to approved editors in the `landing-media/modules/` folder. No overwrite or delete action is granted. Images in this public marketing bucket become public immediately when uploaded, including for drafts. Detaching a screenshot from a page does not delete its Storage file. Use approved screenshots containing demo data; never upload real student or payment records.

## Authentication and verification

The app uses Supabase Auth password login. Tokens remain in HttpOnly, SameSite Strict cookies scoped to the admin API, with Secure cookies on production hosting. Browser JavaScript never receives session tokens. Every content/media API request verifies the user with Supabase and checks the private editor allowlist. Cookies and the editor UI alone never grant access. Same-origin checks protect mutations; inputs and image bodies have size limits. Failed logins use generic errors; Supabase Auth supplies its own rate limits. This panel has no public registration or password-reset endpoint; manage accounts privately through the Supabase Dashboard.

`/admin/` is noindex and excluded from the sitemap; private API responses use no-store and noindex headers. The admin layout omits public navigation, analytics and smooth scrolling. Tests do not use a real admin password or write to the remote project. Authenticated API/UI flows are tested with locally mocked Supabase responses; public live-content verification remains read-only. Real authenticated save/upload verification requires the owner to complete a private login.

References: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Storage permissions](https://supabase.com/docs/guides/storage/security/access-control).

Verification on 11 October 2026: production build and TypeScript passed; all five isolated admin tests and all 16 content/SEO/live-read tests passed. Admin tests cover unauthorized and cross-origin requests, non-editor denial, private cookies, refresh/logout, draft/publication, sitemap refresh, concurrent edit conflicts, image validation and structured form editing at desktop/mobile widths. Lint has zero errors and two existing checkout warnings. Real authenticated editing/upload was not performed by the agent; the owner can sign in using their private password.
