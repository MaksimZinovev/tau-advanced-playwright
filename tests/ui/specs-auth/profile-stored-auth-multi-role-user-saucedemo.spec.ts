import { test, expect } from "@playwright/test";
import { STORAGE_STATE_SD } from "../../../playwright.config";

test.use({ storageState: STORAGE_STATE_SD });

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/inventory.html");
});

test.describe("Check inventory page as standard_user", () => {
  test("Check logged in as standard_user", async ({ page }) => {
    await expect(page).toHaveURL(/inventory\.html/i);
    await expect(page.getByText("Swag Labs")).toBeVisible();
  });
});
