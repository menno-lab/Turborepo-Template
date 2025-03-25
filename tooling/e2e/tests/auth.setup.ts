import { test as setup, expect } from "@playwright/test";
import path, { dirname } from "path";
import { faker } from "@faker-js/faker";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const authFile = path.join(__dirname, "../playwright/.auth/user.json");

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email({ firstName, lastName });
const password = "!Aa0" + faker.internet.password({ length: 8 });

setup("authenticate", async ({ page }) => {
  await page.goto("/signup");
  await page.getByLabel("Name").fill(firstName);
  await page.getByLabel("Email").fill(email);
  await page.locator("[name='password']").fill(password);
  await page.locator("[name='confirmPassword']").fill(password);
  await page.getByRole("button", { name: "Sign up" }).click();
  await expect(
    page.getByText(
      "Account has been created, you can log in with your credentials."
    )
  ).toBeVisible();
  await expect(page).toHaveURL("/login");

  await page.getByLabel("Email").fill(email);
  await page.locator("[name='password']").fill(password);
  await page.getByRole("button", { name: "Sign in", exact: true }).click();
  await expect(page).toHaveURL("/dashboard");

  await page.context().storageState({ path: authFile });
});
