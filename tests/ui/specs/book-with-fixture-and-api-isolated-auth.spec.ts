import { test, expect } from '../fixtures/books-fixture';
import { APIRequestContext } from '@playwright/test';
import LoginPage from '../pages/login-page';
import ProfilePage from '../pages/profile-page';
import baseAPIUrl from '../../utils/environmentBaseUrl';
import createBookAPIRequest from '../../api/requests/create-books-collection';
import deleteBookAPIRequest from '../../api/requests/delete-books-collection';
import hooks from '../../utils/hooks';
import pages from '../../utils/pages';
import userData from '../../data/user-data';

const env = process.env.ENV!;
const password = process.env.PASSWORD!;
const userId = process.env.USERID!;
const userName = process.env.USERNAME!;

let apiContext: APIRequestContext;
let loginPage: LoginPage;

test.use({ storageState: { cookies: [], origins: [] } }); // doesn't share the logged in session
test.describe.configure({ mode: 'serial' });

test.beforeAll(async ({ playwright }) => {
  // console.log("baseAPIUrl: ");
  // console.log(baseAPIUrl);
  // console.log(env);
  apiContext = await playwright.request.newContext({
    baseURL: baseAPIUrl[env].api,
    extraHTTPHeaders: {
      Authorization: `Basic ${Buffer.from(`${userName}:${password}`).toString('base64')}`,
      Accept: 'application/json',
    },
  });
});

test.beforeEach(async ({ page }) => {
  const pageInstance = await hooks.beforeEach(page, LoginPage, pages.loginPage);
  if (pageInstance instanceof LoginPage) {
    loginPage = pageInstance;
    await loginPage.doLogin(userName, password);
    await loginPage.checkLoggedIn();
  } else throw new Error('Page instance is not LoginPage');
});

test.describe('Book - Fixture & API with isolated auth', () => {
  test.use({ isDupe: true });

  test('Add duplicate book', async ({ bookPage }) => {
    await addBooks(userId, userData.books.duplicate);
    await bookPage.goto(userData.books.duplicate);
  });

  test.only('Delete 1 book from the collection', async ({ page }) => {

    // Arrange
    await addBooks(userId, userData.books.new);

    // Act
    const profilePage = new ProfilePage(page);
    await profilePage.goto();
    // The next action triggers first dialog
    await profilePage.deleteBook(1);
    await profilePage.clickOkButtonDeleteDialog();
    // Second dialog appears after closing first dialog
    // For some reason second dialog is not closed when running from VS Code. Test still passes
    
    // Assert
    await profilePage.checkLoggedIn();
    await profilePage.checkNoBooksDisplaying();
    await profilePage.checkSearchResultsTitles([]);
    
  });
});

/* 
* Test: Delete 1 book from the collection
* 1. Authenticate
* 2. Create API connection 
* 3. Add book to the collection (not duplicate) 
* 4. Open Profile page
* 5. Delete book from the collection
* 6. Check if book is deleted from the collection (npo books displaying)
*/

async function addBooks(userId: string, isbn: string) {
  await deleteBookAPIRequest.deleteAllBooksByUser(apiContext, userId);
  await createBookAPIRequest.addBookToCollection(apiContext, userId, isbn);
};
