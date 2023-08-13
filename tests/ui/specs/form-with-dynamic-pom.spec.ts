import { test, expect } from "@playwright/test";
import FormPage from "../pages/form-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

let formPage: FormPage;

// test.beforeEach(async ({ page }) => {
//   await page.goto("https://demoqa.com/automation-practice-form");
// });
test.beforeEach(async ({ page }) => {
  formPage = await hooks.beforeEach(page, FormPage, pages.formPage);
});

test.describe("Form POM - Dynamic Page Object Model", () => {
  test("Open form page POM", async () => {
    await formPage.checkHeader();
    await formPage.checkHeading();
    
    // await expect(page.getByPlaceholder("First Name")).toBeVisible();
    // await expect(page.getByPlaceholder("Last Name")).toBeVisible();;
  });
  test("Select Male gender on form page", async ({ page }) => {
    await formPage.selectGender("Male");
    await formPage.checkGenderChecked('Male');
  });
  test("Select Female gender on form page", async ({ page }) => {
    await formPage.selectGender("Female");
    await formPage.checkGenderChecked('Female', 7000);
  });
});
