import { defineConfig, devices } from "@playwright/test";

/*
 * Uses the system Chrome (channel "chrome") so the suite runs on machines
 * where Playwright's own browser download is blocked. CI can switch to the
 * bundled Chromium by setting PW_CHANNEL="".
 */
const channel = process.env.PW_CHANNEL ?? "chrome";

export default defineConfig({
  testDir: "tests",
  timeout: 30_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:3100",
    ...(channel ? { channel } : {}),
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 }, ...(channel ? { channel } : {}) },
    },
    {
      name: "mobile",
      use: { ...devices["Pixel 7"], viewport: { width: 375, height: 812 }, ...(channel ? { channel } : {}) },
    },
  ],
  webServer: {
    command: "npm run start -- -p 3100",
    url: "http://localhost:3100",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
