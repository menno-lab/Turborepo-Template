import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import "dotenv/config";
import path from "path";

/**
 * Configures the environment variables for the web app for local e2e tests
 */
const projectRoot = path.resolve(import.meta.dirname, "..", "..");
const webAppRoot = path.resolve(projectRoot, "apps", "web");
dotenv.config({
  path: path.resolve(webAppRoot, ".env.local"),
});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://127.0.0.1:3000",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    { name: "setup", testMatch: /.*\.setup\.ts/, teardown: "cleanup db" },
    {
      name: "cleanup db",
      testMatch: /.*\.teardown\.ts/,
      use: {
        storageState: "playwright/.auth/user.json",
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },
  ],
});
