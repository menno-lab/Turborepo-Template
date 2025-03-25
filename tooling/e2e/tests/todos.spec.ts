import { expect, test } from "@playwright/test";

test("Should be logged in and see dashboard", async ({ page }) => {
  await page.goto("/dashboard");
  await expect(page).toHaveURL("/dashboard");
});

test("Should create a todo", async ({ page }) => {
  await page.goto("/todos");

  // expect initial list to be empty
  await expect(page.getByText("No todos yet")).toBeVisible();

  // click href="/todos/new"
  await page.locator('a[href="/todos/new"]').click();

  // expect to be on /todos/new
  await expect(page).toHaveURL("/todos/new");

  // fill in title
  await page.getByLabel("Title").fill("Buy groceries");

  // click button[type="submit"]
  await page.getByRole("button", { name: "Create" }).click();

  // expect to be on /todos
  await expect(page).toHaveURL("/todos");

  const appLayout = page.locator("[data-testid='app-layout']");
  await expect(appLayout).toBeVisible();

  // expect list lenght to be 1
  await expect(appLayout.getByRole("listitem")).toHaveCount(1);

  // expect list to contain "Buy groceries"
  await expect(page.getByText("Buy groceries")).toBeVisible();
});
