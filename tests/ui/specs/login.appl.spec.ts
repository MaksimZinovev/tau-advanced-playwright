import { test, expect } from "@playwright/test";

// test.describe.configure({ mode: 'serial' });
const BASE_URL_APPL = "https://demo.applitools.com/";
test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL_APPL);
});

test.only(`successfull login aplitools`, async ({ page }) => {
  await page.goto(BASE_URL_APPL+'/app.html')
  await expect(page).toHaveURL(/app.html/i);
});
