# SikkhaDesk landing page

Next.js 16 marketing website with server-rendered, Supabase-backed module and About content. See [SUPABASE-CONTENT.md](SUPABASE-CONTENT.md) for database setup and publication behavior, [SEO-IMPLEMENTATION.md](SEO-IMPLEMENTATION.md) for SEO, analytics and deployment steps, and [SEO-AUDIT-2026-10-11.md](SEO-AUDIT-2026-10-11.md) for the original audit.

The `/admin/` content workspace supports structured editing, unsaved previews, module publication, ordering and screenshot uploads. See [ADMIN-CMS.md](ADMIN-CMS.md) to activate the requested editor account. Run `npm run test:admin` for isolated admin security/API/browser checks using mocked Supabase responses; these checks do not write to the live database.

Build with `npm run build`, run production with `npm start`, preview at port 4173 with `npm run preview`, and run content/SEO/browser checks with `npm run test:seo`. The test runner uses installed Chrome. Bangla routes are in `app/(bn)`; the English landing page is in `app/en`. Deploy to Vercel or another Next.js server host; the old `out/` static export is not the current deployment.

Leave `.env.example` settings empty to use local starter content. For a new Supabase project, run `supabase/setup.sql`, set the project URL and publishable key before building, and edit published content in the Supabase Dashboard. This checkout is connected through `.env.local`; live reads return three published modules and one About page. Set the same environment variables on the hosting platform before deployment. Run `npm run content:check` to check live access without printing the key.

## Component development

This is a Next.js template with shadcn/ui.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button";
```

```
sikkhadesk-landing-page
├─ .prettierignore
├─ .prettierrc
├─ AGENTS.md
├─ app
│  ├─ favicon.ico
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components
│  ├─ theme-provider.tsx
│  └─ ui
│     └─ button.tsx
├─ components.json
├─ eslint.config.mjs
├─ hooks
├─ lib
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
├─ README.md
└─ tsconfig.json

```
