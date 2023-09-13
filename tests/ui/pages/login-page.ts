import { type Page, type Locator , expect } from '@playwright/test';
import messages from '../../utils/messages';
import uiPages from '../../utils/uiPages';

class LoginPage {
  readonly page: Page;
  readonly loginButton: Locator;
  readonly messagePanel: Locator;
  readonly password: Locator;
  readonly userName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.messagePanel = page.locator('#output');
    this.password = page.getByPlaceholder('Password');
    this.userName = page.getByPlaceholder('UserName');
  }

  async goto() {
    // await this.page.goto(uiPages.login);
    await this.page.goto('/login');
    console.log(this.page.url());
  }
  async waitForURL(url: string) {
    await this.page.waitForURL(uiPages.profile) ;
  }
  async fillEmail(email: string) {
    await this.userName.fill(email);
  }

  async fillPassword(password: string) {
    await this.password.fill(password);
  }

  async doLogin(email: string, password: string) {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.loginButton.click()
    await this.waitForURL(uiPages.profile);
    await this.checkLoggedIn();;
  }

  async checkLoggedIn() {
    await expect(this.page).toHaveURL(/.*profile/);
    await expect(this.page).toHaveTitle(/DEMOQA/);
  }

  async checkInvalidCredentials() {
    await expect(this.messagePanel).toHaveText(messages.login.invalid);
  }
}

export default LoginPage;
