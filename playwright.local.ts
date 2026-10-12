import { defineConfig } from "@playwright/test";

// TEMPORARY local runner - delete after use. This machine has system Chrome
// but not Playwright's bundled headless shell, so use `channel: "chrome"`.
export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  reporter: "list",
  use: { baseURL: "http://localhost:3000", trace: "off" },
  webServer: {
    command: "bun run build && bun run start",
    url: "http://localhost:3000",
    reuseExistingServer: true,
  },
  projects: [
    { name: "chrome", use: { browserName: "chromium", channel: "chrome" } },
  ],
});
