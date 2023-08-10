import { test, expect } from "@playwright/test";
import {  BASE_URL_ } from "./constants";



// test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/books");
});

test(`successful login into bookstore`, async ({ page }) => {
  // Successfully logged in using API login in api-setup
  await expect(page).toHaveURL(/books/i);
  await expect(page.getByText(/tau\-playwright/i)).toBeVisible();
});
