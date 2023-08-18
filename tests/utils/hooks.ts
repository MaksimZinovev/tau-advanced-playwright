import { Page } from '@playwright/test';
import { buildUrl } from './uiUrlBuilder';
import BookPage from '../ui/pages/book-page';
import LoginPage from '../ui/pages/login-page';
import ProfilePage from '../ui/pages/profile-page';
import BookStorePage from '../ui/pages/book-store-page';
import FormPage from '../ui/pages/form-page';

async function beforeEach(
  page: Page,
  PageObjectParam: LoginPage | BookPage | ProfilePage | FormPage | BookStorePage,
  targetPage: string,
  params?: Record<any, any>
) {
  // console.log(`targetPage: ${targetPage}`)
  await page.goto(buildUrl(targetPage, params), { timeout: 4*10000 });
  await page.waitForLoadState('domcontentloaded', { timeout: 10000 });
  const pageObject = await new PageObjectParam(page);
  return pageObject;
}

export default { beforeEach };
