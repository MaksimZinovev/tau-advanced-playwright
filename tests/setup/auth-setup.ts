import { test as setup, type Page } from '@playwright/test';
import LoginPage from '../ui/pages/login-page';
import uiPages from '../utils/uiPages';

const adminFile = '.auth/admin.json';

let loginPage: LoginPage;

setup.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();

})

// setup('authenticate as admin', async ({ page }) => {
//   const user = process.env.USERNAME_ADMIN!;
//   const password = process.env.PASSWORD!;
//   await loginPage.doLogin(user, password);

//   await page.context().storageState({ path: adminFile });
// });

const userFile = '.auth/user.json';

setup('authenticate as user', async ({ page }) => {
    const user = process.env.USERNAME!;
    const password = process.env.PASSWORD!;

    await loginPage.doLogin(user, password);
    await page.context().storageState({ path: userFile });
});

// async function doLogin(user:string, password: string) {
//     // const baseURL = setup.info().project.use.baseURL!; 
//     await loginPage.waitForURL(uiPages.profile);
//     await loginPage.checkLoggedIn();
// }
