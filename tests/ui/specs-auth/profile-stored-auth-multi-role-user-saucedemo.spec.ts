import { test, expect } from "@playwright/test";
import { STORAGE_STATE_SD, STORAGE_STATE_SD_PROBLEM } from "../../../playwright.config";



test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
});

test.describe("Check inventory page as standard_user", () => {
  test.use({ storageState: STORAGE_STATE_SD });
  test("Check logged in as standard_user", async ({ page }) => {
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });
});

test.describe("Check inventory page as problem_user", () => {
  test.use({ storageState: STORAGE_STATE_SD_PROBLEM });
  test("Check logged in as standard_user", async ({ page }) => {
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText("Swag Labs")).toBeVisible();
    await expect(page.getByAltText(/sauce labs backpack/i)).toHaveAttribute('src', '/static/media/sl-404.168b1cce.jpg');
  });
});