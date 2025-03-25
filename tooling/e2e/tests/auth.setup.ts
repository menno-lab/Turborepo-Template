import { faker } from "@faker-js/faker";
import { expect, test as setup } from "@playwright/test";
import { db } from "@repo/db";
import { user } from "@repo/db/schema";
import path from "path";
import { eq } from "drizzle-orm";

const authFile = path.join(
  import.meta.dirname,
  "../playwright/.auth/user.json"
);

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email({ firstName, lastName }).toLowerCase();
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

  const dbQuery = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  expect(dbQuery).not.toBeNull();

  await page.context().storageState({ path: authFile });
});
