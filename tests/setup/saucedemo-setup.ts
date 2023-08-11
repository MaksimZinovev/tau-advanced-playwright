import { test as setup, expect } from "@playwright/test";
import { STORAGE_STATE_SD } from "../../playwright.config";

setup("do login saucedemo as standard_user", async ({ page }) => {
  const user = "standard_user";
  const password = "secret_sauce";
  await page.goto("https://www.saucedemo.com/");

  await page.getByPlaceholder(/username/i).fill(user);
  await page.getByPlaceholder(/password/i).fill(password);
  await page.getByRole('button', {  name: /login/i}).click();

  await expect(page).toHaveURL(/inventory\.html/i);
  await page.context().storageState({ path: STORAGE_STATE_SD });
});
