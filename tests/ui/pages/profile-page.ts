import { type Page, type Locator , expect, type BrowserContext } from '@playwright/test';
import bookListData from '../../data/book-list-data';
import apiPaths from '../../utils/apiPaths';
import { buildUrl } from '../../utils/uiUrlBuilder';
import pages from '../../utils/pages';

class SearchPage {
  readonly page: Page;
  readonly bookAdminLabel: Locator;
  readonly booksCollectionRequestRegExp: RegExp;
  readonly bookUserLabel: Locator;
  readonly gridRow1: Locator;
  readonly gridRow2: Locator;
  readonly notLoggedInLabel: Locator;
  readonly searchField: Locator;
  readonly titleHeaderLabel: Locator;
  readonly gridRows: Locator;
  readonly okButtonDeleteDialog: Locator;
  readonly gridRowDeleteButtonElement: string;
  readonly noRowsFoundMessage: Locator;
  readonly resultCellsTitle : Locator;
  
  constructor(page: Page) {
    this.page = page;
    this.bookAdminLabel = page.getByText('Eloquent JavaScript, Second Edition');
    this.booksCollectionRequestRegExp = new RegExp(apiPaths.account);
    this.bookUserLabel = page.getByText('Understanding ECMAScript 6');
    this.gridRow1 = page.locator('div:nth-child(1) > .rt-tr > div:nth-child(2)').last();
    this.gridRow2 = page.locator('div:nth-child(2) > .rt-tr > div:nth-child(2)');
    this.notLoggedInLabel = page.getByText('Currently you are not logged into the Book Store application, please visit the login page to enter or register page to register yourself.');
    this.searchField = page.getByPlaceholder('Type to search');
    this.titleHeaderLabel = page.getByText('Title');
    this.gridRows = page.getByRole("row");
    this.resultCellsTitle = page.getByRole("row").getByRole("link");
    this.gridRowDeleteButtonElement = "#delete-record-undefined";
    this.okButtonDeleteDialog = page.getByRole('button', { name: 'OK' });
    this.noRowsFoundMessage = page.getByText('No rows found');

  }

  async goto() {
    await this.page.goto(buildUrl(pages.profile));
    await this.page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  }

  async fillSearchField(q: string) {
    await this.searchField.fill(q);
  }

  async deleteBook(rowNumber: number) {
    const firstRow = await this.gridRows; //rows start from header "0"
    await firstRow.locator(this.gridRowDeleteButtonElement).click();
  }

  async clickOkButtonDeleteDialog() {
    await this.okButtonDeleteDialog.click();
  }


  async checkSearchResult(q: string, items: string) {
  }

  async checkBooksList() {
    for (const book of bookListData.books){
      await expect(this.page.getByRole('link', { name: book.title })).toBeVisible();
    }
  }
  async checkNoBooksDisplaying() {
    await expect(this.noRowsFoundMessage).toBeVisible();
  }

  async checkSearchResultsTitles(expectedTitles: string[]) {

    await expect(this.resultCellsTitle).toHaveText(expectedTitles);
    await expect(this.resultCellsTitle).toHaveCount(expectedTitles.length);
  }



  async sortBooksList() {
    await this.titleHeaderLabel.click({ clickCount: 2 });
  }

  async checkLoggedIn() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    // await expect(this.notLoggedInLabel).toBeVisible();
  }

  async checkLoggedInUser() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.bookUserLabel).toBeVisible();
  }

  async checkLoggedInAdmin() {
    await expect(this.notLoggedInLabel).not.toBeVisible();
    await expect(this.bookAdminLabel).toBeVisible();
  }

  async checkSort() {
    await expect(this.gridRow1).toContainText(bookListData.books[1].title);
    await expect(this.gridRow2).toContainText(bookListData.books[0].title);
  }

  async getBooksList() {
  }

  async mockBooksListResponse(context: BrowserContext) {
    await context.route(this.booksCollectionRequestRegExp, (route) => route.fulfill({
      body: JSON.stringify({...(bookListData)})
    }));
  }
}

export default SearchPage;
