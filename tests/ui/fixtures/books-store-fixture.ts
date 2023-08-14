import { test as base } from "@playwright/test";
import BookStorePage from "../pages/book-store-page";
import hooks from "../../utils/hooks";
import pages from "../../utils/pages";

type MyFixtures = {
  bookStorePage: BookStorePage;
};

export const test = base.extend<MyFixtures>({
  bookStorePage: async ({ page }, use) => {
    const bookStorePage = await hooks.beforeEach(
      page,
      BookStorePage,
      pages.bookStorePage
    );

    await use(bookStorePage);
  },
});

export { expect } from "@playwright/test";
