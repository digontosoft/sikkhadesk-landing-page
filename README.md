# Next.js template

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