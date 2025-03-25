import { test, expect } from "@playwright/test";

test("Home page is accessible", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "welcome to your app" })
  ).toBeVisible();
});
