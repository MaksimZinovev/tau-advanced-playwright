import { type Page, type Locator, expect } from "@playwright/test";
import { buildUrl } from "../../utils/uiUrlBuilder";
import messages from "../../utils/messages";
import pages from "../../utils/pages";

type Gender = "Male" | "Female" | "Other";

class FormPage {
  readonly page: Page;
  readonly SubmitButton: Locator;
  readonly firstNameLabel: Locator;
  readonly lastNameLabel: Locator;
  readonly emailLabel: Locator;
  readonly mobileLabel: Locator;
  readonly dobLabel: Locator;
  readonly subjectsLabel: Locator;
  readonly genderMaleRadioButton: Locator;
  readonly genderFemaleRadioButton: Locator;
  readonly genderOtherRadioButton: Locator;
  readonly header: Locator;
  readonly headingH5: Locator;

  constructor(page: Page) {
    this.page = page;
    this.SubmitButton = page.getByText("Add To Your Collection", {
      exact: true,
    });
    this.firstNameLabel = page.getByPlaceholder("First Name");
    this.lastNameLabel = page.getByPlaceholder("Last Name");
    this.emailLabel = page.getByPlaceholder("name@example.com");
    this.mobileLabel = page.getByPlaceholder("name@example.com");
    this.dobLabel = page.locator("#dateOfBirthInput");
    this.subjectsLabel = page.locator("#subjectsContainer");
    this.genderFemaleRadioButton = page
      .locator("#title-wrapper")
      .locator("#userName-value");
    this.genderFemaleRadioButton = page.getByText("Female", { exact: true });
    this.genderMaleRadioButton = page.getByText("Male", { exact: true });
    this.genderOtherRadioButton = page.getByText("Other");
    this.header = page.getByText("Practice Form").first();
    this.headingH5 = page.getByRole("heading", {
      name: "Student Registration Form",
    });
  }

  async selectGender(gender: Gender) {
    switch (gender) {
      case "Male":
        await this.genderMaleRadioButton.click();
        break;
      case "Female":
        await this.genderFemaleRadioButton.click();
        break;
      case "Other":
        await this.genderOtherRadioButton.click();
    }
  }
  async checkGenderChecked(gender: Gender, ctimeout?: number) {
    switch (gender) {
      case "Male":
        await expect(this.genderMaleRadioButton).toBeChecked({
          timeout: ctimeout,
        });
        break;
      case "Female":
        await expect(this.genderFemaleRadioButton).toBeChecked({
          timeout: ctimeout,
        });
        break;
      case "Other":
        await expect(this.genderOtherRadioButton).toBeChecked({
          timeout: ctimeout,
        });
        break;
    }
  }
  async checkHeader() {
    await expect(this.header).toBeVisible();
  }
  async checkHeading() {
    await expect(this.headingH5).toBeVisible();
  }
}

export default FormPage;
