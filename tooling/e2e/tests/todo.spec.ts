import { expect, test } from "@playwright/test";

test("Should be logged in and see dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/dashboard");
});
