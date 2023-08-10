import { test, expect } from "@playwright/test";


// test.describe.configure({ mode: 'serial' });

test.beforeEach(async ({ page }) => {
  await page.goto("https://demoqa.com/books");
});

test(`successful login into bookstore`, async ({ page }) => {
  // Successfully logged in using API login in api-setup
  // Running `npx playwright test profile.api.spec.ts --project=chromium-api`
  // Output: 
//   Cookies:
// []
// state written to file!
// undefined
// storageState:
// { cookies: [], origins: [] }
  await expect(page).toHaveURL(/books/i);
  await expect(page.getByText(/tau\-playwright/i)).toBeVisible();
});
