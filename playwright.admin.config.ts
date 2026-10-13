import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  outputDir: "./test-results-admin",
  testMatch: "admin.spec.ts",
  workers: 1,
  fullyParallel: false,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4174",
    channel: "chrome",
    headless: true,
    screenshot: "only-on-failure",
  },
  webServer: {
    command:
      "node --import ./tests/fixtures/admin-fetch-mock.mjs node_modules/next/dist/bin/next start --hostname 127.0.0.1 --port 4174",
    url: "http://127.0.0.1:4174/admin/",
    reuseExistingServer: false,
    env: {
      SUPABASE_URL: "https://admin-test.supabase.co",
      SUPABASE_PUBLISHABLE_KEY: "sb_publishable_fixture_only",
    },
  },
})
