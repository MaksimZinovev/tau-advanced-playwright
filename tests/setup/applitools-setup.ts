import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_APPL } from "../../playwright.config";

setup("do login applitools", async ({ page }) => {
  const user = "user";
  const password = "pass";
  await page.goto("https://demo.applitools.com");
  await page.getByPlaceholder(/enter your username/i).fill(user);
  await page.getByPlaceholder(/enter your password/i).fill(password);
  await page.getByRole("link", {
    name: /sign in/i,
  }).click();

  await expect(page).toHaveURL(/app.html/i);
  await page.context().storageState({ path: STORAGE_STATE_APPL });
});
