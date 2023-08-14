import { type Page, type Locator, expect } from "@playwright/test";

class BookStorePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly logoutButton: Locator;
  readonly userNameLabel: Locator;
  readonly resultRows: Locator;
  readonly resultCellsImage: Locator;
  readonly resultCellsTitle: Locator;
  readonly header: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder(/type to search/i);
    this.userNameLabel = page.locator("#userName-value");
    this.resultRows = page.getByRole("row");
    this.resultCellsTitle = page.getByRole("row").getByRole("link");
    this.header = page.getByText("Book Store", { exact: true }).first();
  }

  async typeToSearch(searchQuery: string) {
    if (searchQuery) {
      await this.searchInput.fill(searchQuery);
    }
  }

  async checkSearchResultsTitles(expectedTitles: string[]) {
    await expect(this.resultCellsTitle as Locator).toHaveText(expectedTitles);

    console.log(await (this.resultCellsTitle as Locator).all());

    (await (this.resultCellsTitle as Locator).all()).map(
      async (title) => await expect(title).not.toBeVisible()
    );
  }
  async checkHeader() {
    await expect(this.header).toHaveText("Book Store");
    await expect(this.header).toBeVisible();
  }
}

export default BookStorePage;
