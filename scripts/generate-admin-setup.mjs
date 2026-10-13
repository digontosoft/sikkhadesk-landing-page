import { readFile, writeFile } from "node:fs/promises"

const root = new URL("../", import.meta.url)
const migration = await readFile(
  new URL("supabase/migrations/202610110002_landing_admin.sql", root),
  "utf8"
)
const email = "sikkhadesk@gmail.com"
const escaped = email.replaceAll("'", "''")
const sql = [
  "-- First create/confirm the requested account in Supabase Authentication > Users.",
  `-- This setup grants marketing editor access only to ${email}. No password or API key is included.`,
  "begin;",
  `do $$ begin if not exists (select 1 from auth.users where lower(email) = lower('${escaped}') and email_confirmed_at is not null) then raise exception 'Create and confirm ${escaped} in Authentication > Users before running this setup.'; end if; end $$;`,
  migration,
  `insert into landing_private.editors (user_id) select id from auth.users where lower(email) = lower('${escaped}') and email_confirmed_at is not null on conflict (user_id) do nothing;`,
  "commit;",
  "",
].join("\n")
await writeFile(new URL("supabase/admin-setup.sql", root), sql, "utf8")
console.log(
  "Prepared supabase/admin-setup.sql. This command made no network requests."
)
