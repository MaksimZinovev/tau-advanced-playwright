import { test } from '@playwright/test';
import BookPage from '../pages/book-page';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';
import BookStorePage from '../pages/book-store-page';

let bookPage: BookPage;

test.beforeEach(async ({ page }) => {
    const pageInstance = await hooks.beforeEach(page, BookPage, pages.bookStorePage);
    if (pageInstance instanceof BookPage) {
        bookPage = pageInstance;
        //   await hooks.beforeEach(page, BookPage, pages.bookStorePage);
    }
});

test.describe('Books - Dynamic Page Object Model', () => {
    test('Add brand new book', async () => {
        await bookPage.clickAtSpeakingJSBook();
        await bookPage.checkSpeakingJSIsbn();
    });
});
